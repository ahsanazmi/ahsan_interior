from __future__ import annotations

import resend

from app.core.config import settings

# Sender identity – uses your verified domain nextgenlivingspace.in
_DEFAULT_FROM = "Interior Design <noreply@nextgenlivingspace.in>"


def send_email(*, to_email: str, subject: str, body: str, html: str | None = None) -> bool:
    """Send an email via the Resend API.

    Keeps the exact same signature and return semantics as the old
    SMTP-based implementation so that callers do not need any changes.
    """
    api_key = settings.resend_api_key
    if not api_key:
        print("[mailer] RESEND_API_KEY not set – email not sent")
        return False

    resend.api_key = api_key
    from_email = settings.resend_from_email or _DEFAULT_FROM

    payload: dict = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "text": body,
    }
    if html:
        payload["html"] = html

    try:
        resend.Emails.send(payload)
        return True
    except Exception as exc:
        print(f"[mailer] Resend send failed: {exc}")
        return False
