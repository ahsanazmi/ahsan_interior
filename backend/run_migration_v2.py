#!/usr/bin/env python
"""Add status, email_sent, reminder_sent columns to appointments table"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ DATABASE_URL not set in .env")
    exit(1)

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        # Add status column
        try:
            connection.execute(text("""
                ALTER TABLE appointments ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' NOT NULL;
            """))
            print("✅ status column added")
        except Exception as e:
            print(f"⚠️  status column: {e}")
        
        # Add email_sent column
        try:
            connection.execute(text("""
                ALTER TABLE appointments ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false NOT NULL;
            """))
            print("✅ email_sent column added")
        except Exception as e:
            print(f"⚠️  email_sent column: {e}")
        
        # Add reminder_sent column
        try:
            connection.execute(text("""
                ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT false NOT NULL;
            """))
            print("✅ reminder_sent column added")
        except Exception as e:
            print(f"⚠️  reminder_sent column: {e}")
        
        connection.commit()
        print("\n✅ Database migration v2 completed successfully!")
        print("Appointments table is now ready with status tracking and email reminders.")

except Exception as e:
    print(f"❌ Migration failed: {e}")
    exit(1)
