import os
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.deps import require_admin
from app.db import get_db
from app.models.image import UploadedImage
from app.models.user import User

# Determine writable uploads directory. Prefer `UPLOAD_DIR` env var, then project `uploads`.
upload_env = os.getenv("UPLOAD_DIR")
if upload_env:
    UPLOAD_DIR = Path(upload_env)
else:
    UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads"
try:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    # Fallback to /tmp/uploads on serverless read-only filesystems
    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/tmp/uploads"))
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

router = APIRouter(prefix="/admin/images", tags=["admin-images"])


class ImageOut(BaseModel):
    id: int
    external_id: str
    filename: str
    original_name: str
    url: str
    alt_text: str | None
    category: str
    uploaded_at: str

    class Config:
        from_attributes = True


@router.get("", response_model=list[ImageOut])
def list_images(_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = db.query(UploadedImage).order_by(UploadedImage.uploaded_at.desc()).all()
    return [_to_out(r) for r in rows]


@router.post("", response_model=ImageOut, status_code=status.HTTP_201_CREATED)
async def upload_image(
    file: UploadFile = File(...),
    alt_text: str = Form(default=""),
    category: str = Form(default="general"),
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    ext = os.path.splitext(file.filename or "img.jpg")[1] or ".jpg"
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = UPLOAD_DIR / unique_name

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    url = f"/uploads/{unique_name}"
    img = UploadedImage(
        filename=unique_name,
        original_name=file.filename or "unknown",
        url=url,
        alt_text=alt_text,
        category=category,
    )
    db.add(img)
    db.commit()
    db.refresh(img)
    return _to_out(img)


@router.delete("/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(image_id: int, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    img = db.query(UploadedImage).filter(UploadedImage.id == image_id).first()
    if not img:
        raise HTTPException(status_code=404, detail="Image not found")
    file_path = UPLOAD_DIR / img.filename
    if file_path.exists():
        file_path.unlink()
    db.delete(img)
    db.commit()


def _to_out(r: UploadedImage) -> ImageOut:
    return ImageOut(
        id=r.id,
        external_id=r.external_id,
        filename=r.filename,
        original_name=r.original_name,
        url=r.url,
        alt_text=r.alt_text,
        category=r.category,
        uploaded_at=r.uploaded_at.isoformat(),
    )
