from datetime import datetime, timezone

from pydantic import BaseModel, EmailStr, Field


class QuoteCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    city: str = Field(min_length=2, max_length=120)
    whatsapp_updates: bool = True
    scope: str = Field(min_length=2, max_length=120)
    bhk: str = Field(min_length=2, max_length=20)
    rooms: str = Field(min_length=2)  # JSON string of room counts
    package: str = Field(min_length=2, max_length=50)


class QuoteResponse(BaseModel):
    id: str
    message: str
    created_at: datetime

    @classmethod
    def success(cls, *, quote_id: str) -> "QuoteResponse":
        return cls(
            id=quote_id,
            message="Quote request submitted successfully",
            created_at=datetime.now(timezone.utc),
        )
