# Smart Inventory and Stock Prediction System

Shops lose money when a popular item runs out, when cash is tied up in stock that does not sell, and when the
stock numbers on paper do not match the shelf. This project tracks purchases, sales and several warehouses,
warns before stock runs out, and tells you **what to order and how much**.

**Stack:** Python (Flask, Pandas, NumPy, SQLAlchemy), MySQL, JavaScript (Chart.js).

## What it does

| Need | How |
|---|---|
| Track purchases and sales | `POST /api/purchases`, `POST /api/sales`; stock balances update in the same database transaction |
| Multiple warehouses | Every balance is per product **and** warehouse; transfers move stock between them |
| Never sell stock you do not have | Sales are rejected when the balance is too low (row locks make this safe for simultaneous sales) |
| Low-stock alerts | Dashboard and `GET /api/alerts`: out of stock, low, and "runs out before delivery arrives" |
| Predicted replenishment | `GET /api/replenishment` and a CSV purchase plan: what to order, how many, estimated cost |
| Fix inaccurate records | Stock counts create an audit trail; `GET /api/reconcile` rebuilds every balance from the history and shows any mismatch |
| Use spare stock first | Suggests transfers from a warehouse with excess to one that is short |
| Know if the forecast is any good | Back-test: hides the last 14 days, predicts them, reports the error next to a plain-average baseline |

## Quick start (local)

Requirements: Python 3.10+ (tested on 3.12), MySQL 8 (or MariaDB 10.5+), Node 18+ only if you want the optional frontend test.

```bash
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # edit the MySQL user/password
python init_db.py                                      # creates the database and tables
python seed_data.py                                    # optional: 120 days of demo data
python -m gunicorn wsgi:app -b 127.0.0.1:5000          # Windows: use  python -m flask --app wsgi run
```

Open <http://127.0.0.1:5000>. For development you can also run `flask --app wsgi run --debug`.

### Docker

```bash
DB_PASSWORD=choose-a-password docker compose up --build
```

Set `SEED_DEMO=0` to start with an empty database.

## Project layout

```
app/
  __init__.py          Flask app factory, JSON handling, error handlers
  routes.py            REST API
  services/inventory.py  purchases, sales, transfers, counts, reconcile (transactions + locks)
  services/forecast.py   Pandas demand forecast, reorder points, back-test
  services/reports.py    dashboard numbers
static/                index.html, style.css, app.js (dashboard)
schema.sql             MySQL tables      init_db.py   creates them
seed_data.py           demo data         tests/       pytest suite (+ optional frontend smoke test)
```

## How the forecast works

Deliberately simple, so every number can be explained to a shop owner. For each product in each warehouse:

1. Daily sales for the last 90 days (days without sales count as 0).
2. **Level** = exponentially weighted moving average (recent days count more).
3. **Weekday pattern** = how much busier or slower each weekday is than average, applied at half strength to limit noise.
4. **Safety stock** = 1.65 × standard deviation of daily sales × √(lead time)  (about a 95% service level).
5. **Reorder point** = level × lead time + safety stock. The larger of this and the manual reorder point on the product is used.
6. **Suggested order** (only when stock is at or below the reorder point) = expected demand over *lead time + 7 days* + safety stock − stock on hand.
7. **Overstock** = more than 90 days of stock at the current sales rate.

Tune it with environment variables: `SERVICE_LEVEL_Z`, `HISTORY_DAYS`, `REVIEW_DAYS`, `OVERSTOCK_DAYS`.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | database check |
| GET, POST | `/api/products`, `/api/warehouses` | master data |
| POST | `/api/purchases` `/api/sales` `/api/transfers` `/api/adjustments` | stock movements (JSON body) |
| GET | `/api/stock`, `/api/stock/by-warehouse` | balances |
| GET | `/api/purchases`, `/api/sales` | recent history (`?limit=`) |
| GET | `/api/alerts`, `/api/forecast`, `/api/replenishment` | planning (`?horizon=14`) |
| GET | `/api/replenishment.csv` | purchase plan download |
| GET | `/api/forecast/curve`, `/api/forecast/accuracy` | chart data, back-test |
| GET | `/api/summary`, `/api/reconcile` | dashboard KPIs, integrity check |

Example:

```bash
curl -X POST localhost:5000/api/sales -H 'Content-Type: application/json' \
     -d '{"product_id": 1, "warehouse_id": 1, "quantity": 3}'
```

Errors come back as `{"error": "..."}` with 400 (bad input), 404 (unknown id) or 409 (not enough stock, duplicate SKU).

## Tests

```bash
python -m pytest -q          # needs a MySQL user that may create the *_test database
```

`TEST_DATABASE_URL` (default `mysql+pymysql://root:password@localhost:3306/smart_inventory_test`) points to a
throwaway database that the tests drop and recreate. The suite covers stock rules, simultaneous sales, the
forecast maths against hand calculations, the API, and empty-database behaviour. GitHub Actions runs it against MySQL 8 on every push.

Optional end-to-end check of the dashboard code against a running server: `npm install && npm run test:frontend`.

## Known limits (good next steps)

* **No login.** Anyone who can reach the server can change stock. Put it behind a login or a private network before real use.
* **Open orders are not tracked.** After you order, the item stays "low" until the delivery is recorded as a purchase.
  A `purchase_orders` table with "on order" quantities would fix this.
* **Stockouts hide demand.** Days with zero stock show zero sales, so demand for frequently sold-out items is underestimated.
* Forecasts need roughly three weeks of sales history; new products fall back on the manual reorder point.
* Single currency (`CURRENCY` in `static/app.js`).

## Deploying

GitHub stores the code and runs the tests, but GitHub Pages cannot run Flask or MySQL. To run it online, use a host that
supports Python and MySQL (for example Render, Railway, PythonAnywhere, or a small VPS with the Docker setup above) and set
`DATABASE_URL` there. Never commit your `.env` file.
