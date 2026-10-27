"""Fill the database with realistic demo data (120 days of history).

Usage:  python seed_data.py            # only works on an empty database
        python seed_data.py --reset    # wipes all data first (DANGEROUS)

The simulation: weekday pattern + slow growth + random noise; stock is replenished
when it hits a reorder level and arrives after the supplier lead time.
Two products are deliberately out of balance so the dashboard has something to show.
"""
import sys
from datetime import date, timedelta

import numpy as np
from sqlalchemy import create_engine, text

from app import config

DAYS = 120
WEEKDAY = np.array([0.85, 0.9, 0.9, 1.0, 1.15, 1.4, 1.2])      # Mon..Sun

WAREHOUSES = [("Main Warehouse", "Howrah", 0.5), ("Kolkata Branch", "Kolkata", 0.3), ("Siliguri Depot", "Siliguri", 0.2)]
# sku, name, category, cost, price, manual reorder point, lead time, avg daily demand (all warehouses)
PRODUCTS = [
    ("RICE-5", "Basmati Rice 5kg", "Grocery", 420, 520, 15, 5, 6),
    ("OIL-1", "Mustard Oil 1L", "Grocery", 150, 185, 20, 4, 9),
    ("SUG-1", "Sugar 1kg", "Grocery", 38, 46, 30, 3, 14),
    ("TEA-250", "Tea Leaves 250g", "Beverages", 90, 118, 15, 4, 7),
    ("SOAP-3", "Bath Soap 3-pack", "Personal Care", 95, 125, 10, 6, 5),
    ("BIS-200", "Biscuits 200g", "Snacks", 18, 25, 40, 3, 20),
    ("NOOD-6", "Instant Noodles 6-pack", "Snacks", 60, 80, 20, 4, 8),
    ("PEN-10", "Gel Pen 10-pack", "Stationery", 55, 80, 10, 7, 4),
    ("NOTE-A4", "A4 Notebook", "Stationery", 42, 65, 15, 7, 5),
    ("SHMP-180", "Shampoo 180ml", "Personal Care", 110, 149, 10, 6, 4),
    ("DET-1", "Detergent Powder 1kg", "Household", 85, 110, 12, 5, 6),
    ("LIGHT-9", "LED Bulb 9W", "Household", 70, 110, 8, 10, 3),
]
DELAYED = "OIL-1"        # supplier stopped delivering 3 weeks ago -> runs low / out of stock
OVERSTOCKED = "LIGHT-9"  # bought far too much -> overstock


def simulate(seed: int = 42, today: date | None = None):
    rng = np.random.default_rng(seed)
    today = today or date.today()
    start = today - timedelta(days=DAYS - 1)
    purchases, sales, balance = [], [], {}
    for pi, (sku, _n, _c, cost, price, rop, lead, base) in enumerate(PRODUCTS):
        for wi, (_wn, _loc, share) in enumerate(WAREHOUSES):
            mean = base * share
            stock = int(mean * 25)
            purchases.append((pi + 1, wi + 1, stock, cost, "Opening stock", start))
            pending = []                                             # (arrival_date, qty)
            # reorder a bit earlier than the dashboard's reorder point, like a careful shopkeeper
            lvl = int(1.25 * (mean * lead + 1.65 * 1.3 * (mean * lead) ** 0.5)) + 1
            for k in range(DAYS):
                d = start + timedelta(days=k)
                for arr in [p for p in pending if p[0] == d]:
                    stock += arr[1]
                    purchases.append((pi + 1, wi + 1, arr[1], cost, f"Supplier {pi % 4 + 1}", d))
                pending = [p for p in pending if p[0] > d]
                growth = 1 + 0.15 * k / DAYS
                demand = int(rng.poisson(mean * WEEKDAY[d.weekday()] * growth))
                sold = min(demand, stock)
                if sold > 0:
                    sales.append((pi + 1, wi + 1, sold, price, d))
                    stock -= sold
                stop_orders = sku == DELAYED and k > DAYS - 21
                if stock <= lvl and not pending and not stop_orders:
                    qty = int(mean * 320) if sku == OVERSTOCKED else max(5, int(mean * 21))
                    pending.append((d + timedelta(days=lead), qty))
            balance[(pi + 1, wi + 1)] = stock
    return purchases, sales, balance


def seed(url: str = config.DATABASE_URL, reset: bool = False) -> dict:
    engine = create_engine(url, future=True)
    with engine.begin() as c:
        if reset:
            c.execute(text("SET FOREIGN_KEY_CHECKS=0"))
            for t in ("adjustments", "transfers", "sales", "purchases", "stock", "products", "warehouses"):
                c.execute(text(f"TRUNCATE TABLE {t}"))
            c.execute(text("SET FOREIGN_KEY_CHECKS=1"))
        elif c.execute(text("SELECT COUNT(*) FROM products")).scalar_one() > 0:
            raise SystemExit("Database already has data. Use --reset to wipe it first.")
        c.execute(text("INSERT INTO warehouses (name, location) VALUES (:n,:l)"),
                  [{"n": n, "l": l} for n, l, _ in WAREHOUSES])
        c.execute(text(
            "INSERT INTO products (sku,name,category,unit_cost,unit_price,reorder_point,lead_time_days) "
            "VALUES (:sku,:name,:cat,:cost,:price,:rop,:lead)"),
            [{"sku": p[0], "name": p[1], "cat": p[2], "cost": p[3], "price": p[4], "rop": p[5], "lead": p[6]}
             for p in PRODUCTS])
        purchases, sales, balance = simulate()
        c.execute(text("INSERT INTO purchases (product_id,warehouse_id,quantity,unit_cost,supplier,purchase_date) "
                       "VALUES (:p,:w,:q,:c,:s,:d)"),
                  [dict(p=a, w=b, q=q, c=cst, s=s, d=d) for a, b, q, cst, s, d in purchases])
        c.execute(text("INSERT INTO sales (product_id,warehouse_id,quantity,unit_price,sale_date) "
                       "VALUES (:p,:w,:q,:u,:d)"),
                  [dict(p=a, w=b, q=q, u=u, d=d) for a, b, q, u, d in sales])
        c.execute(text("INSERT INTO stock (product_id,warehouse_id,quantity) VALUES (:p,:w,:q)"),
                  [dict(p=k[0], w=k[1], q=v) for k, v in balance.items()])
    engine.dispose()
    return {"products": len(PRODUCTS), "warehouses": len(WAREHOUSES),
            "purchases": len(purchases), "sales": len(sales)}


if __name__ == "__main__":
    print("Seeded:", seed(reset="--reset" in sys.argv))
