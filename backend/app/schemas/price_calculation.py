from datetime import datetime
from pydantic import BaseModel


class PriceCalculationCreate(BaseModel):
    name: str
    email: str
    phone: str
    city: str
    scope: str
    bhk: str
    rooms: str
    package: str
    home_type: str
    total_price: float
    whatsapp_updates: bool = True
    notes: str | None = None


class PriceCalculationOut(BaseModel):
    id: int
    external_id: str
    name: str
    email: str
    phone: str
    city: str
    scope: str
    bhk: str
    rooms: str
    package: str
    home_type: str
    total_price: float
    whatsapp_updates: bool
    notes: str | None
    created_at: datetime

    class Config:
        from_attributes = True
