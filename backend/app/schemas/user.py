from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    password: str = Field(min_length=6, max_length=128)
    role: str = Field(default="user", pattern="^(user|admin)$")
    city: str | None = Field(default=None, max_length=120)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class AppointmentAccountVerify(BaseModel):
    appointment_id: str = Field(min_length=10, max_length=36)
    email: EmailStr
    otp: str | None = Field(default=None, min_length=4, max_length=8)
    password: str = Field(min_length=6, max_length=128)


class AppointmentOtpResend(BaseModel):
    appointment_id: str = Field(min_length=10, max_length=36)
    email: EmailStr


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserProfile"


class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    role: str
    city: str | None
    created_at: datetime
