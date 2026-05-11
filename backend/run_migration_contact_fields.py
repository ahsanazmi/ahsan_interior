#!/usr/bin/env python3
"""Add contact query fields to the leads table."""

import os
import sys

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("ERROR: DATABASE_URL not set in .env file")
    sys.exit(1)

try:
    engine = create_engine(database_url)

    with engine.connect() as connection:
        print("Adding query_type column to leads...")
        connection.execute(
            text("""
                ALTER TABLE leads
                ADD COLUMN IF NOT EXISTS query_type VARCHAR(120) NOT NULL DEFAULT 'General query'
            """)
        )
        print("✅ query_type column added")

        print("Adding message column to leads...")
        connection.execute(
            text("""
                ALTER TABLE leads
                ADD COLUMN IF NOT EXISTS message VARCHAR(2000) NULL
            """)
        )
        print("✅ message column added")

        connection.commit()

    print("\n✅ Contact fields migration completed successfully!")
except Exception as exc:
    print(f"❌ Migration failed: {exc}")
    sys.exit(1)