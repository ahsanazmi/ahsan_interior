import os
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.review import ReviewCreate, ReviewOut, ReviewResponse
from app.services.reviews import create_review, list_reviews


upload_env = os.getenv("UPLOAD_DIR")
if upload_env:
    UPLOAD_DIR = Path(upload_env)
else:
    UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads"
try:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/tmp/uploads"))
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[ReviewOut])
def get_reviews(
    limit: int = Query(default=6, ge=1, le=24),
    db: Session = Depends(get_db),
) -> list[ReviewOut]:
    return list_reviews(limit=limit, db=db)


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def submit_review(
    name: str = Form(...),
    city: str = Form(...),
    service: str = Form(...),
    rating: int = Form(default=5),
    title: str | None = Form(default=None),
    review: str = Form(...),
    source: str = Form(default="website-review"),
    review_image: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
) -> ReviewResponse:
    review_image_url = None
    if review_image is not None:
        if not review_image.content_type or not review_image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Review image must be an image")

        ext = os.path.splitext(review_image.filename or "review.jpg")[1] or ".jpg"
        unique_name = f"{uuid.uuid4().hex}{ext}"
        file_path = UPLOAD_DIR / unique_name

        content = await review_image.read()
        with open(file_path, "wb") as f:
            f.write(content)

        review_image_url = f"/uploads/{unique_name}"

    payload = ReviewCreate(
        name=name,
        city=city,
        service=service,
        rating=rating,
        title=title,
        review=review,
        source=source,
        review_image_url=review_image_url,
    )
    return create_review(payload, db)