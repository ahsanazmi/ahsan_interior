"""
Seed script to create the fixed admin account.
Run once: python seed_admin.py

If the admin already exists, it prints a message and exits.
"""
import sys
import os

# Ensure the backend package is importable
sys.path.insert(0, os.path.dirname(__file__))

from app.db import SessionLocal, init_db
from app.models.user import User
from app.core.security import hash_password

# ── Admin credentials (change these!) ──
ADMIN_NAME = "NextGen Admin"
ADMIN_EMAIL = "admin@nextgenlivingspace.com"
ADMIN_PHONE = "+91 9557930504"
ADMIN_PASSWORD = "Admin@123"  # Change after first login!


def seed():
    init_db()
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == ADMIN_EMAIL).first()
        if existing:
            print(f"✅ Admin already exists: {existing.email} (role={existing.role})")
            return

        admin = User(
            name=ADMIN_NAME,
            email=ADMIN_EMAIL,
            phone=ADMIN_PHONE,
            password_hash=hash_password(ADMIN_PASSWORD),
            role="admin",
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print(f"✅ Admin account created successfully!")
        print(f"   Email:    {ADMIN_EMAIL}")
        print(f"   Password: {ADMIN_PASSWORD}")
        print(f"   ⚠️  Change the password after first login!")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
