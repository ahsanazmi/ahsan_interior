"""
Script to add sample leads for testing
"""
import sys
import os
from pathlib import Path
import uuid

# Add backend to path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

from app.db import SessionLocal, init_db
from app.models.lead import Lead

def add_leads():
    init_db()
    db = SessionLocal()
    
    try:
        leads_data = [
            {
                'external_id': str(uuid.uuid4()),
                'name': 'Rajesh Kumar',
                'email': 'rajesh.kumar@email.com',
                'phone': '+91 9876543210',
                'city': 'Mumbai',
                'whatsapp_updates': True,
                'source': 'website'
            },
            {
                'external_id': str(uuid.uuid4()),
                'name': 'Priya Sharma',
                'email': 'priya.sharma@email.com',
                'phone': '+91 9123456789',
                'city': 'Bangalore',
                'whatsapp_updates': False,
                'source': 'referral'
            },
            {
                'external_id': str(uuid.uuid4()),
                'name': 'Amit Patel',
                'email': 'amit.patel@email.com',
                'phone': '+91 9988776655',
                'city': 'Delhi',
                'whatsapp_updates': True,
                'source': 'instagram'
            },
            {
                'external_id': str(uuid.uuid4()),
                'name': 'Sarah Williams',
                'email': 'sarah.williams@email.com',
                'phone': '+91 9765432198',
                'city': 'Pune',
                'whatsapp_updates': True,
                'source': 'google'
            },
        ]
        
        for lead_data in leads_data:
            lead = Lead(**lead_data)
            db.add(lead)
        
        db.commit()
        print('✅ Added 4 sample leads successfully!')
        
    except Exception as e:
        db.rollback()
        print(f'❌ Error adding leads: {e}')
    finally:
        db.close()

if __name__ == '__main__':
    add_leads()
