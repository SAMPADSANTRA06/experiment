-- Smart Inventory schema (MySQL 8 / MariaDB 10.5+)
-- Run via: python init_db.py   (creates the database if it does not exist)

CREATE TABLE IF NOT EXISTS warehouses (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL UNIQUE,
  location  VARCHAR(150) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  sku              VARCHAR(40)  NOT NULL UNIQUE,
  name             VARCHAR(150) NOT NULL,
  category         VARCHAR(80)  NULL,
  unit_cost        DECIMAL(12,2) NOT NULL DEFAULT 0,
  unit_price       DECIMAL(12,2) NOT NULL DEFAULT 0,
  reorder_point    INT NOT NULL DEFAULT 0,     -- manual minimum level
  lead_time_days   INT NOT NULL DEFAULT 7,     -- supplier lead time
  is_active        TINYINT(1) NOT NULL DEFAULT 1,
  CHECK (unit_cost >= 0), CHECK (unit_price >= 0),
  CHECK (reorder_point >= 0), CHECK (lead_time_days >= 0)
) ENGINE=InnoDB;

-- Running balance per product per warehouse
CREATE TABLE IF NOT EXISTS stock (
  product_id    INT NOT NULL,
  warehouse_id  INT NOT NULL,
  quantity      INT NOT NULL DEFAULT 0,
  PRIMARY KEY (product_id, warehouse_id),
  FOREIGN KEY (product_id)   REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CHECK (quantity >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchases (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id    INT NOT NULL,
  warehouse_id  INT NOT NULL,
  quantity      INT NOT NULL,
  unit_cost     DECIMAL(12,2) NOT NULL,
  supplier      VARCHAR(120) NULL,
  purchase_date DATE NOT NULL,
  FOREIGN KEY (product_id)   REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CHECK (quantity > 0),
  INDEX idx_purchases_date (purchase_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id    INT NOT NULL,
  warehouse_id  INT NOT NULL,
  quantity      INT NOT NULL,
  unit_price    DECIMAL(12,2) NOT NULL,
  sale_date     DATE NOT NULL,
  FOREIGN KEY (product_id)   REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CHECK (quantity > 0),
  INDEX idx_sales_date (sale_date),
  INDEX idx_sales_pw (product_id, warehouse_id, sale_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transfers (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id       INT NOT NULL,
  from_warehouse   INT NOT NULL,
  to_warehouse     INT NOT NULL,
  quantity         INT NOT NULL,
  transfer_date    DATE NOT NULL,
  FOREIGN KEY (product_id)     REFERENCES products(id),
  FOREIGN KEY (from_warehouse) REFERENCES warehouses(id),
  FOREIGN KEY (to_warehouse)   REFERENCES warehouses(id),
  CHECK (quantity > 0),
  CHECK (from_warehouse <> to_warehouse)
) ENGINE=InnoDB;

-- Physical stock-count corrections (fixes inaccurate records, keeps an audit trail)
CREATE TABLE IF NOT EXISTS adjustments (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id     INT NOT NULL,
  warehouse_id   INT NOT NULL,
  old_quantity   INT NOT NULL,
  new_quantity   INT NOT NULL,
  delta          INT NOT NULL,
  reason         VARCHAR(200) NULL,
  adjusted_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id)   REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
) ENGINE=InnoDB;
