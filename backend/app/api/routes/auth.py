from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_user

from app.core.security import create_access_token, hash_password, verify_password
from app.db import get_db
from app.models.appointment import Appointment
from app.models.user import User
from app.schemas.user import (
    AppointmentAccountVerify,
    AppointmentOtpResend,
    TokenResponse,
    UserLogin,
    UserProfile,
    UserRegister,
)
from app.services.notifications import (
    send_login_promotion_email,
    send_login_promotion_whatsapp,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _profile(user: User) -> UserProfile:
    return UserProfile(
        id=user.external_id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        role=user.role,
        city=user.city,
        created_at=user.created_at,
    )


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, db: Session = Depends(get_db)) -> TokenResponse:
    # Only "user" role can self-register; admin accounts are seeded from the backend
    if payload.role == "admin":
        raise HTTPException(status_code=403, detail="Admin accounts cannot be created via registration.")

    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role="user",
        city=payload.city,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.external_id, "role": user.role})
    return TokenResponse(access_token=token, user=_profile(user))


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if user.role == "user":
        send_login_promotion_email(to_email=user.email, name=user.name, city=user.city)
        send_login_promotion_whatsapp(phone=user.phone, name=user.name, city=user.city)

    token = create_access_token({"sub": user.external_id, "role": user.role})
    return TokenResponse(access_token=token, user=_profile(user))


@router.post("/appointment-account/verify", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def verify_appointment_account(
    payload: AppointmentAccountVerify,
    db: Session = Depends(get_db),
) -> TokenResponse:
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.external_id == payload.appointment_id,
            Appointment.email == payload.email,
        )
        .first()
    )
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")

    user = User(
        name=appointment.name,
        email=appointment.email,
        phone=appointment.phone,
        password_hash=hash_password(payload.password),
        role="user",
        city=appointment.city,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.external_id, "role": user.role})
    return TokenResponse(access_token=token, user=_profile(user))


@router.post("/appointment-account/resend-otp")
def resend_appointment_account_otp(
    payload: AppointmentOtpResend,
    db: Session = Depends(get_db),
) -> dict[str, str]:
    _ = payload
    _ = db
    raise HTTPException(status_code=410, detail="OTP flow is disabled. Please create account with password.")


@router.get("/me", response_model=UserProfile)
def get_me(user: User = Depends(get_current_user)) -> UserProfile:
    return _profile(user)


