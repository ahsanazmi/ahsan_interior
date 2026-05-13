from uuid import uuid4

from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewOut, ReviewResponse


def create_review(payload: ReviewCreate, db: Session) -> ReviewResponse:
    external_id = str(uuid4())
    review = Review(
        external_id=external_id,
        name=payload.name,
        city=payload.city,
        service=payload.service,
        rating=payload.rating,
        title=payload.title,
        review=payload.review,
        review_image_url=payload.review_image_url,
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    review_out = ReviewOut.from_payload(
        review_id=external_id,
        name=review.name,
        city=review.city,
        service=review.service,
        rating=review.rating,
        title=review.title,
        review=review.review,
        review_image_url=review.review_image_url,
        created_at=review.created_at,
    )
    return ReviewResponse.success(review=review_out)


def list_reviews(*, limit: int, db: Session) -> list[ReviewOut]:
    rows = db.query(Review).order_by(Review.created_at.desc()).limit(limit).all()
    return [
        ReviewOut.from_payload(
            review_id=row.external_id,
            name=row.name,
            city=row.city,
            service=row.service,
            rating=row.rating,
            title=row.title,
            review=row.review,
            review_image_url=row.review_image_url,
            created_at=row.created_at,
        )
        for row in rows
    ]