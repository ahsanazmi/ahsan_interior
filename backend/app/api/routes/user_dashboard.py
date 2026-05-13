from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db import get_db
from app.models.appointment import Appointment
from app.models.quote import QuoteRequest
from app.models.review import Review
from app.models.user import User
from app.schemas.admin import AppointmentOut
from app.schemas.appointment import AppointmentCreate
from app.schemas.review import ReviewOut

router = APIRouter(prefix="/user", tags=["user-dashboard"])


@router.get("/bookings", response_model=list[AppointmentOut])
def my_bookings(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[AppointmentOut]:
    """Return appointments that match the logged-in user's email."""
    rows = (
        db.query(Appointment)
        .filter(Appointment.email == user.email)
        .order_by(Appointment.created_at.desc())
        .all()
    )
    return [
        AppointmentOut(
            id=r.id,
            external_id=r.external_id,
            name=r.name,
            email=r.email,
            phone=r.phone,
            city=r.city,
            preferred_date=r.preferred_date,
            preferred_time=r.preferred_time.strftime("%H:%M"),
            scheduled_for=r.scheduled_for,
            whatsapp_updates=r.whatsapp_updates,
            notes=r.notes,
            source=r.source,
            created_at=r.created_at,
        )
        for r in rows
    ]


# ── User Delete Booking ──
@router.delete("/bookings/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_booking(
    booking_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """User can delete their own booking"""
    booking = db.query(Appointment).filter(
        Appointment.id == booking_id,
        Appointment.email == user.email
    ).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()


# ── User Update Booking ──
@router.put("/bookings/{booking_id}", response_model=AppointmentOut)
def update_booking(
    booking_id: int,
    payload: AppointmentCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """User can update their own booking"""
    booking = db.query(Appointment).filter(
        Appointment.id == booking_id,
        Appointment.email == user.email
    ).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking.name = payload.name
    booking.phone = payload.phone
    booking.city = payload.city
    booking.preferred_date = payload.preferred_date
    booking.preferred_time = payload.preferred_time
    booking.whatsapp_updates = payload.whatsapp_updates
    booking.notes = payload.notes
    
    db.commit()
    db.refresh(booking)
    
    return AppointmentOut(
        id=booking.id,
        external_id=booking.external_id,
        name=booking.name,
        email=booking.email,
        phone=booking.phone,
        city=booking.city,
        preferred_date=booking.preferred_date,
        preferred_time=booking.preferred_time.strftime("%H:%M"),
        scheduled_for=booking.scheduled_for,
        whatsapp_updates=booking.whatsapp_updates,
        notes=booking.notes,
        source=booking.source,
        created_at=booking.created_at,
    )


# ── User Quotes ──
@router.get("/quotes")
def my_quotes(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return quote requests that match the logged-in user's email."""
    rows = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.email == user.email)
        .order_by(QuoteRequest.created_at.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "external_id": r.external_id,
            "name": r.name,
            "email": r.email,
            "phone": r.phone,
            "city": r.city,
            "scope": r.scope,
            "bhk": r.bhk,
            "rooms": r.rooms,
            "package": r.package,
            "whatsapp_updates": r.whatsapp_updates,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


@router.get("/reviews", response_model=list[ReviewOut])
def my_reviews(
    _user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ReviewOut]:
    rows = db.query(Review).order_by(Review.created_at.desc()).limit(100).all()
    return [
        ReviewOut.from_payload(
            review_id=row.external_id,
            name=row.name,
            city=row.city,
            service=row.service,
            rating=row.rating,
            title=row.title,
            review=row.review,
            created_at=row.created_at,
        )
        for row in rows
    ]


# ── User Delete Quote ──
@router.delete("/quotes/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_quote(
    quote_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """User can delete their own quote request"""
    quote = db.query(QuoteRequest).filter(
        QuoteRequest.id == quote_id,
        QuoteRequest.email == user.email
    ).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    db.delete(quote)
    db.commit()


# ── User Update Quote ──
@router.put("/quotes/{quote_id}")
def update_user_quote(
    quote_id: int,
    payload: dict,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """User can update their own quote request"""
    quote = db.query(QuoteRequest).filter(
        QuoteRequest.id == quote_id,
        QuoteRequest.email == user.email
    ).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    if "name" in payload:
        quote.name = payload["name"]
    if "phone" in payload:
        quote.phone = payload["phone"]
    if "city" in payload:
        quote.city = payload["city"]
    if "scope" in payload:
        quote.scope = payload["scope"]
    if "bhk" in payload:
        quote.bhk = payload["bhk"]
    if "rooms" in payload:
        quote.rooms = payload["rooms"]
    if "package" in payload:
        quote.package = payload["package"]
    if "whatsapp_updates" in payload:
        quote.whatsapp_updates = payload["whatsapp_updates"]
    
    db.commit()
    db.refresh(quote)
    
    return {
        "id": quote.id,
        "external_id": quote.external_id,
        "name": quote.name,
        "email": quote.email,
        "phone": quote.phone,
        "city": quote.city,
        "scope": quote.scope,
        "bhk": quote.bhk,
        "rooms": quote.rooms,
        "package": quote.package,
        "whatsapp_updates": quote.whatsapp_updates,
        "created_at": quote.created_at.isoformat(),
    }
