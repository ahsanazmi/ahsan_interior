import re
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.deps import require_admin
from app.db import get_db
from app.models.blog import BlogPost
from app.models.user import User

router = APIRouter(prefix="/admin/blogs", tags=["admin-blogs"])


class BlogCreate(BaseModel):
    title: str = Field(min_length=3, max_length=300)
    category: str = Field(min_length=2, max_length=120)
    excerpt: str = Field(min_length=10, max_length=500)
    content: str = Field(min_length=20)
    cover_image: str | None = None
    author: str = Field(default="NextGen Team", max_length=120)
    published: bool = False


class BlogOut(BaseModel):
    id: int
    external_id: str
    title: str
    slug: str
    category: str
    excerpt: str
    content: str
    cover_image: str | None
    author: str
    published: bool
    created_at: str

    class Config:
        from_attributes = True


def _slugify(text: str) -> str:
    slug = re.sub(r"[^\w\s-]", "", text.lower().strip())
    return re.sub(r"[-\s]+", "-", slug)


@router.get("", response_model=list[BlogOut])
def list_blogs(_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()
    return [_to_out(r) for r in rows]


@router.post("", response_model=BlogOut, status_code=status.HTTP_201_CREATED)
def create_blog(payload: BlogCreate, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    slug = _slugify(payload.title)
    existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing:
        slug = f"{slug}-{BlogPost.__table__.columns['id']}"
        # just append a number
        count = db.query(BlogPost).count()
        slug = f"{_slugify(payload.title)}-{count + 1}"

    post = BlogPost(
        title=payload.title,
        slug=slug,
        category=payload.category,
        excerpt=payload.excerpt,
        content=payload.content,
        cover_image=payload.cover_image,
        author=payload.author,
        published=payload.published,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return _to_out(post)


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(blog_id: int, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(post)
    db.commit()


def _to_out(r: BlogPost) -> BlogOut:
    return BlogOut(
        id=r.id,
        external_id=r.external_id,
        title=r.title,
        slug=r.slug,
        category=r.category,
        excerpt=r.excerpt,
        content=r.content,
        cover_image=r.cover_image,
        author=r.author,
        published=r.published,
        created_at=r.created_at.isoformat(),
    )
