from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.blog import BlogPost
from app.models.offer import Offer

router = APIRouter(tags=["public"])


class PublicBlog(BaseModel):
    id: int
    slug: str
    title: str
    category: str
    excerpt: str
    content: str
    cover_image: str | None
    author: str
    created_at: str


class PublicOffer(BaseModel):
    id: int
    title: str
    description: str | None
    category: str
    original_price: float
    offer_price: float
    unit: str


@router.get("/blogs", response_model=list[PublicBlog])
def public_blogs(db: Session = Depends(get_db)):
    rows = db.query(BlogPost).filter(BlogPost.published == True).order_by(BlogPost.created_at.desc()).all()
    return [
        PublicBlog(
            id=r.id, slug=r.slug, title=r.title, category=r.category,
            excerpt=r.excerpt, content=r.content, cover_image=r.cover_image,
            author=r.author, created_at=r.created_at.isoformat(),
        )
        for r in rows
    ]


@router.get("/blogs/{slug}", response_model=PublicBlog)
def public_blog_detail(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return PublicBlog(
        id=post.id, slug=post.slug, title=post.title, category=post.category,
        excerpt=post.excerpt, content=post.content, cover_image=post.cover_image,
        author=post.author, created_at=post.created_at.isoformat(),
    )


@router.get("/offers", response_model=list[PublicOffer])
def public_offers(db: Session = Depends(get_db)):
    rows = db.query(Offer).filter(Offer.active == True).order_by(Offer.created_at.desc()).all()
    return [
        PublicOffer(
            id=r.id, title=r.title, description=r.description, category=r.category,
            original_price=float(r.original_price), offer_price=float(r.offer_price), unit=r.unit,
        )
        for r in rows
    ]
