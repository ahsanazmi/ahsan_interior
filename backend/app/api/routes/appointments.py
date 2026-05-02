from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.appointment import AppointmentCreate, AppointmentResponse
from app.services.appointments import create_appointment

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post(
    "/",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Book a new appointment",
    response_description="Appointment created successfully",
    response_model_exclude_none=True,
)
def book_appointment(
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
) -> AppointmentResponse:
    """Create a new appointment booking"""
    try:
        return create_appointment(payload, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))