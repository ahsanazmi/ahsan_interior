from datetime import datetime, timezone

from pydantic import BaseModel, EmailStr, Field


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    city: str = Field(min_length=2, max_length=120)
    whatsapp_updates: bool = True
    source: str = Field(default="city-page", max_length=120)


class LeadResponse(BaseModel):
    id: str
    message: str
    city: str
    created_at: datetime

    @classmethod
    def from_city(cls, *, lead_id: str, city: str) -> "LeadResponse":
        return cls(
            id=lead_id,
            message="Lead submitted successfully",
            city=city,
            created_at=datetime.now(timezone.utc),
        )
