#!/usr/bin/env python3
"""
Run database migrations for calculator_settings table
Adds villa_design_multiplier and office_design_multiplier columns if they don't exist
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
        # Add villa_design_multiplier column
        print("Adding villa_design_multiplier column to calculator_settings...")
        connection.execute(text("""
            ALTER TABLE calculator_settings 
            ADD COLUMN IF NOT EXISTS villa_design_multiplier FLOAT NOT NULL DEFAULT 1.25
        """))
        print("✅ villa_design_multiplier column added")
        
        # Add office_design_multiplier column
        print("Adding office_design_multiplier column to calculator_settings...")
        connection.execute(text("""
            ALTER TABLE calculator_settings 
            ADD COLUMN IF NOT EXISTS office_design_multiplier FLOAT NOT NULL DEFAULT 1.2
        """))
        print("✅ office_design_multiplier column added")
        
        # Commit changes
        connection.commit()
        
    print("\n✅ Database migration completed successfully!")
    print("Calculator settings table now supports villa and office design pricing.")
    
except Exception as e:
    print(f"❌ Migration failed: {str(e)}")
    sys.exit(1)
