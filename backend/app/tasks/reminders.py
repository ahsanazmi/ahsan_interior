"""Appointment reminders background task"""

from datetime import datetime, timedelta, date
from sqlalchemy.orm import Session
from app.db import get_db, engine
from app.models.appointment import Appointment
from app.services.email_service import send_appointment_reminder
from sqlalchemy import create_engine, inspect
import os
from dotenv import load_dotenv

load_dotenv()

def check_and_send_reminders():
    """Check for upcoming appointments and send reminder emails"""
    
    # Get tomorrow's date
    tomorrow = date.today() + timedelta(days=1)
    
    # Create a session
    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=engine)
    db = Session()
    
    try:
        # Find appointments scheduled for tomorrow that haven't been reminded yet
        appointments = db.query(Appointment).filter(
            Appointment.preferred_date == tomorrow,
            Appointment.reminder_sent == False,
            Appointment.status != "cancelled"
        ).all()
        
        print(f"Found {len(appointments)} appointments for tomorrow")
        
        for appointment in appointments:
            # Send reminder email
            sent = send_appointment_reminder(
                name=appointment.name,
                email=appointment.email,
                date=str(appointment.preferred_date),
                time=appointment.preferred_time.strftime("%H:%M"),
                city=appointment.city
            )
            
            if sent:
                # Mark as reminded
                appointment.reminder_sent = True
                db.commit()
                print(f"✅ Reminder sent and marked for {appointment.name}")
            else:
                print(f"❌ Failed to send reminder for {appointment.name}")
        
        db.close()
        print("\n✅ Reminder check completed!")
        
    except Exception as e:
        print(f"❌ Error checking reminders: {e}")
        db.close()


if __name__ == "__main__":
    check_and_send_reminders()
