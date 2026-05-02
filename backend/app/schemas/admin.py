from datetime import date, datetime

from pydantic import BaseModel


class AppointmentOut(BaseModel):
    id: int
    external_id: str
    name: str
    email: str
    phone: str
    city: str
    preferred_date: date
    preferred_time: str
    scheduled_for: datetime
    whatsapp_updates: bool
    notes: str | None
    source: str
    created_at: datetime
    status: str = "pending"

    class Config:
        from_attributes = True


class AvailabilitySlot(BaseModel):
    date: date
    start_time: str
    end_time: str
    is_available: bool = True


class AvailabilityResponse(BaseModel):
    slots: list[AvailabilitySlot]


class DashboardStats(BaseModel):
    total_appointments: int
    today_appointments: int
    total_leads: int
    total_quotes: int = 0
    total_users: int
