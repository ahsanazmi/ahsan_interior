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
    email_sent: bool = False
    reminder_sent: bool = False

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
    total_price_calculations: int = 0
    total_users: int


class MarketingCampaignBase(BaseModel):
    campaign_name: str
    channel: str
    audience: str
    subject: str
    body: str
    cta_text: str = "Book a consultation"
    cta_url: str | None = None
    scheduled_for: datetime | None = None


class MarketingCampaignCreate(MarketingCampaignBase):
    pass


class MarketingCampaignUpdate(BaseModel):
    campaign_name: str | None = None
    channel: str | None = None
    audience: str | None = None
    subject: str | None = None
    body: str | None = None
    cta_text: str | None = None
    cta_url: str | None = None
    scheduled_for: datetime | None = None
    status: str | None = None


class MarketingCampaignOut(MarketingCampaignBase):
    id: int
    external_id: str
    status: str
    total_recipients: int = 0
    sent_count: int = 0
    last_error: str | None = None
    created_at: datetime
    sent_at: datetime | None = None

    class Config:
        from_attributes = True
