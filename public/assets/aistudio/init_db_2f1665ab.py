"""Create the database (if missing) and all tables.

Usage:  python init_db.py [--reset]
  --reset  drops the database first (DANGEROUS: deletes all data)
"""
import os
import re
import sys

from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL, make_url

from app import config


def init_db(url: str = config.DATABASE_URL, reset: bool = False) -> None:
    u = make_url(url)
    db_name = u.database
    server_url = URL.create(u.drivername, u.username, u.password, u.host, u.port, None, u.query)
    server_engine = create_engine(server_url, future=True)
    with server_engine.begin() as conn:
        if reset:
            conn.execute(text(f"DROP DATABASE IF EXISTS `{db_name}`"))
        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS `{db_name}` CHARACTER SET utf8mb4"))
    server_engine.dispose()

    engine = create_engine(url, future=True)
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "schema.sql"), encoding="utf-8") as f:
        sql = re.sub(r"--.*", "", f.read())
    with engine.begin() as conn:
        for stmt in (s.strip() for s in sql.split(";")):
            if stmt:
                conn.execute(text(stmt))
    engine.dispose()
    print(f"Database '{db_name}' is ready.")


if __name__ == "__main__":
    init_db(reset="--reset" in sys.argv)
