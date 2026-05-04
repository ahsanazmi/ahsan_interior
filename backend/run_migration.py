#!/usr/bin/env python3
"""
Run database migrations for quote_requests table
Adds home_type and total_price columns if they don't exist
"""
import sys
import os
from sqlalchemy import text, create_engine
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("ERROR: DATABASE_URL not set in .env file")
    sys.exit(1)

try:
    # Create engine and connect
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        # Add home_type column
        print("Adding home_type column to quote_requests...")
        connection.execute(text("""
            ALTER TABLE quote_requests 
            ADD COLUMN IF NOT EXISTS home_type VARCHAR(50) NULL
        """))
        print("✅ home_type column added")
        
        # Add total_price column
        print("Adding total_price column to quote_requests...")
        connection.execute(text("""
            ALTER TABLE quote_requests 
            ADD COLUMN IF NOT EXISTS total_price FLOAT NULL
        """))
        print("✅ total_price column added")
        
        # Commit changes
        connection.commit()
        
    print("\n✅ Database migration completed successfully!")
    print("Quote requests table is now ready to store price calculations.")
    
except Exception as e:
    print(f"❌ Migration failed: {str(e)}")
    sys.exit(1)
