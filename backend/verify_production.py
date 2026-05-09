#!/usr/bin/env python3
"""
Production deployment helper script for Vercel.
Run before deployment to verify everything is configured correctly.
"""

import os
import sys
from pathlib import Path

def check_env_vars():
    """Check if required environment variables are set."""
    required_vars = [
        "DATABASE_URL",
        "ALLOWED_ORIGINS",
    ]
    
    optional_vars = [
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "TWILIO_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN",
        "WHATSAPP_ACCESS_TOKEN",
    ]
    
    print("🔍 Checking Environment Variables...\n")
    
    missing_required = []
    for var in required_vars:
        if not os.getenv(var):
            missing_required.append(var)
            print(f"❌ Missing required: {var}")
        else:
            print(f"✅ {var} configured")
    
    print("\nOptional variables:")
    for var in optional_vars:
        if os.getenv(var):
            print(f"✅ {var} configured")
        else:
            print(f"⚠️  {var} not configured (optional)")
    
    if missing_required:
        print(f"\n❌ Missing required variables: {', '.join(missing_required)}")
        return False
    
    print("\n✅ All required environment variables are set!")
    return True

def check_database():
    """Check database connection."""
    try:
        from app.core.config import settings
        from sqlalchemy import create_engine, text
        
        print("\n🔍 Checking Database Connection...\n")
        
        engine = create_engine(settings.database_url, pool_pre_ping=True)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            if result.fetchone():
                print("✅ Database connection successful!")
                return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def check_dependencies():
    """Check if all dependencies are installed."""
    print("\n🔍 Checking Dependencies...\n")
    
    dependencies = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "pydantic_settings",
        "psycopg",
        "resend",
    ]
    
    all_good = True
    for dep in dependencies:
        try:
            __import__(dep)
            print(f"✅ {dep}")
        except ImportError:
            print(f"❌ {dep} not installed")
            all_good = False
    
    if all_good:
        print("\n✅ All dependencies installed!")
    else:
        print("\n❌ Some dependencies missing. Run: pip install -r requirements.txt")
    
    return all_good

def main():
    """Run all checks."""
    print("=" * 60)
    print("Production Deployment Verification")
    print("=" * 60)
    
    checks = [
        check_env_vars(),
        check_dependencies(),
    ]
    
    # Only check database if env vars are set
    if checks[0]:
        checks.append(check_database())
    
    print("\n" + "=" * 60)
    if all(checks):
        print("✅ All checks passed! Ready for deployment.")
        sys.exit(0)
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
