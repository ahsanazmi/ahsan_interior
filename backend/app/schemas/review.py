from datetime import datetime, timezone

from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    city: str = Field(min_length=2, max_length=120)
    service: str = Field(min_length=2, max_length=120)
    rating: int = Field(default=5, ge=1, le=5)
    title: str | None = Field(default=None, max_length=160)
    review: str = Field(min_length=10, max_length=2000)
    source: str = Field(default="website-review", max_length=120)
    review_image_url: str | None = Field(default=None, max_length=500)


class ReviewOut(BaseModel):
    id: str
    name: str
    city: str
    service: str
    rating: int
    title: str | None
    review: str
    review_image_url: str | None = None
    created_at: datetime

    @classmethod
    def from_payload(
        cls,
        *,
        review_id: str,
        name: str,
        city: str,
        service: str,
        rating: int,
        title: str | None,
        review: str,
        review_image_url: str | None = None,
        created_at: datetime | None = None,
    ) -> "ReviewOut":
        return cls(
            id=review_id,
            name=name,
            city=city,
            service=service,
            rating=rating,
            title=title,
            review=review,
            review_image_url=review_image_url,
            created_at=created_at or datetime.now(timezone.utc),
        )


class ReviewResponse(BaseModel):
    id: str
    message: str
    created_at: datetime
    review: ReviewOut

    @classmethod
    def success(cls, *, review: ReviewOut) -> "ReviewResponse":
        return cls(
            id=review.id,
            message="Review submitted successfully",
            created_at=review.created_at,
            review=review,
        )