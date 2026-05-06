import json
import base64
import html
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage
from urllib.parse import quote, urlencode

from app.core.config import settings


def send_marketing_email(
    *,
    to_email: str,
    name: str,
    subject: str,
    body: str,
    cta_text: str = "Book a consultation",
    cta_url: str | None = None,
    city: str | None = None,
) -> None:
    _send_email(
        to_email=to_email,
        subject=subject,
        body=body,
        html=_marketing_template(
            name=name,
            subject=subject,
            body=body,
            cta_text=cta_text,
            cta_url=cta_url,
            city=city,
        ),
    )


def send_marketing_whatsapp(*, phone: str, name: str, body: str, city: str | None = None) -> None:
    city_text = f" in {city}" if city else ""
    send_whatsapp_message(phone=phone, message=f"Hi {name}{city_text}, {body.strip()}")


def send_appointment_product_email(
    *,
    to_email: str,
    name: str,
    city: str,
    appointment_time: str,
) -> None:
    subject = "Your NextGen Living Space appointment is booked"
    body = f"""Hi {name},

Your appointment with NextGen Living Space is confirmed for {appointment_time} in {city}.

Explore our interior services:
- Modular kitchens
- Wardrobes and storage
- Living room interiors
- Bedroom interiors
- Full home design and execution

Our team will contact you soon with product details, package options, and next steps.

Regards,
NextGen Living Space
"""
    _send_email(to_email=to_email, subject=subject, body=body)


def send_login_promotion_email(*, to_email: str, name: str, city: str | None = None) -> None:
    city_line = f" in {city}" if city else ""
    subject = "Fresh interior offers from NextGen Living Space"
    body = f"""Hi {name},

Welcome back to NextGen Living Space.

Here are today's featured interior services for your home{city_line}:
- Full home interior design consultation
- Modular kitchen planning
- Wardrobe and smart storage solutions
- Living room and bedroom makeovers
- End-to-end execution support

Book a design consultation from your dashboard or reply to this email to speak with our team.

Regards,
NextGen Living Space
"""
    html = _promotion_template(name=name, city=city)
    _send_email(to_email=to_email, subject=subject, body=body, html=html)


def send_login_promotion_whatsapp(*, phone: str, name: str, city: str | None = None) -> None:
    city_text = f" in {city}" if city else ""
    send_whatsapp_message(
        phone=phone,
        message=(
            f"Hi {name}, welcome back to NextGen Living Space. Explore fresh interior offers"
            f"{city_text}: full home interiors, modular kitchens, wardrobes and design consultation."
        ),
    )


def send_account_otp(*, phone: str, name: str, otp: str) -> None:
    message = f"Hi {name}, your NextGen Living Space account OTP is {otp}. It expires in 10 minutes."
    send_sms(phone=phone, message=message)


def send_sms(*, phone: str, message: str) -> None:
    provider = (settings.sms_provider or "").lower()
    if provider == "fast2sms" and settings.sms_api_key:
        _send_fast2sms(phone=phone, message=message)
        return
    if provider == "twilio" and all(
        [settings.twilio_account_sid, settings.twilio_auth_token, settings.twilio_from_number]
    ):
        _send_twilio_sms(phone=phone, message=message)
        return
    _debug("SMS", phone, message)


def send_whatsapp_appointment_update(
    *,
    phone: str,
    name: str,
    city: str,
    appointment_time: str,
) -> None:
    send_whatsapp_message(
        phone=phone,
        message=(
            f"Hi {name}, your NextGen Living Space appointment is booked for "
            f"{appointment_time} in {city}. Our team will contact you soon."
        ),
    )


def send_whatsapp_message(*, phone: str, message: str) -> None:
    if not settings.whatsapp_access_token or not settings.whatsapp_phone_number_id:
        _debug("WhatsApp", phone, message)
        return

    payload = {
        "messaging_product": "whatsapp",
        "to": _normalize_phone(phone),
        "type": "text",
        "text": {"preview_url": False, "body": message},
    }
    request = urllib.request.Request(
        f"https://graph.facebook.com/v19.0/{settings.whatsapp_phone_number_id}/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.whatsapp_access_token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        urllib.request.urlopen(request, timeout=10).read()
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"[notification] WhatsApp send failed: {exc}")


def whatsapp_contact_url(message: str) -> str | None:
    phone = settings.whatsapp_contact_number
    if not phone:
        return None
    return f"https://wa.me/{_normalize_phone(phone)}?text={quote(message)}"


def _send_fast2sms(*, phone: str, message: str) -> None:
    payload = json.dumps(
        {
            "route": "q",
            "message": message,
            "language": "english",
            "flash": 0,
            "numbers": _normalize_phone(phone)[-10:],
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        "https://www.fast2sms.com/dev/bulkV2",
        data=payload,
        headers={
            "authorization": settings.sms_api_key or "",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        urllib.request.urlopen(request, timeout=10).read()
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"[notification] SMS send failed: {exc}")


def _send_twilio_sms(*, phone: str, message: str) -> None:
    auth = f"{settings.twilio_account_sid}:{settings.twilio_auth_token}".encode("utf-8")
    form = urlencode(
        {
            "To": f"+{_normalize_phone(phone)}",
            "From": settings.twilio_from_number,
            "Body": message,
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        f"https://api.twilio.com/2010-04-01/Accounts/{settings.twilio_account_sid}/Messages.json",
        data=form,
        headers={
            "Authorization": f"Basic {base64.b64encode(auth).decode('ascii')}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method="POST",
    )
    try:
        urllib.request.urlopen(request, timeout=10).read()
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"[notification] SMS send failed: {exc}")


def _send_email(*, to_email: str, subject: str, body: str, html: str | None = None) -> None:
    if not settings.smtp_host or not settings.mail_from:
        _debug("Email", to_email, f"{subject}\n\n{html or body}")
        return

    message = EmailMessage()
    message["From"] = settings.mail_from
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)
    if html:
        message.add_alternative(html, subtype="html")

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)
    except OSError as exc:
        print(f"[notification] Email send failed: {exc}")


def _normalize_phone(phone: str) -> str:
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) == 10:
        return f"91{digits}"
    return digits


def _debug(channel: str, target: str, message: str) -> None:
    print(f"[notification:{channel}] to={target}\n{message}")


def _promotion_template(*, name: str, city: str | None) -> str:
    city_text = f" for homes in {city}" if city else ""
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NextGen Living Space Offers</title>
  </head>
  <body style="margin:0;background:#f6f1eb;font-family:Arial,Helvetica,sans-serif;color:#24131f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1eb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #eadfd6;">
            <tr>
              <td style="background:#3c1432;color:#ffffff;padding:28px 30px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#e8c7d9;">NextGen Living Space</p>
                <h1 style="margin:0;font-size:30px;line-height:1.15;">Exclusive interior design offers{city_text}</h1>
                <p style="margin:12px 0 0;color:#f6eaf1;font-size:15px;line-height:1.6;">Hi {name}, welcome back. Your dream home upgrade is closer than you think.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <h2 style="margin:0 0 14px;font-size:21px;color:#3c1432;">Featured services</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px;border:1px solid #eadfd6;border-radius:12px;">
                      <strong>Full Home Interiors</strong>
                      <p style="margin:6px 0 0;color:#6f5d68;font-size:14px;line-height:1.5;">Design, material selection, production and installation managed end to end.</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px;border:1px solid #eadfd6;border-radius:12px;">
                      <strong>Modular Kitchens</strong>
                      <p style="margin:6px 0 0;color:#6f5d68;font-size:14px;line-height:1.5;">Smart kitchen layouts with practical storage, finishes and accessories.</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px;border:1px solid #eadfd6;border-radius:12px;">
                      <strong>Wardrobes and Storage</strong>
                      <p style="margin:6px 0 0;color:#6f5d68;font-size:14px;line-height:1.5;">Space-saving solutions for bedrooms, living rooms and compact homes.</p>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:24px;padding:18px;border-radius:14px;background:#fff4e8;">
                  <p style="margin:0;color:#3c1432;font-size:16px;font-weight:bold;">Login offer</p>
                  <p style="margin:8px 0 0;color:#6f5d68;font-size:14px;line-height:1.6;">Book a consultation this week and get a personalized design estimate from our team.</p>
                </div>
                <p style="margin:24px 0 0;text-align:center;">
                  <a href="https://nextgenlivingspace.com/hire-a-designer" style="display:inline-block;background:#d9467c;color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:999px;font-weight:bold;">Book consultation</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px;background:#faf7f4;color:#7d6d76;font-size:12px;line-height:1.5;text-align:center;">
                You are receiving this because you signed in to NextGen Living Space.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def _marketing_template(
        *,
        name: str,
        subject: str,
        body: str,
        cta_text: str,
        cta_url: str | None,
        city: str | None,
) -> str:
        safe_name = html.escape(name)
        safe_subject = html.escape(subject)
        safe_body = html.escape(body).replace("\n", "<br>")
        safe_cta_text = html.escape(cta_text)
        safe_cta_url = html.escape(cta_url or "https://nextgenlivingspace.com/hire-a-designer")
        city_text = f" in {html.escape(city)}" if city else ""
        return f"""<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{safe_subject}</title>
    </head>
    <body style="margin:0;background:#f6f1eb;font-family:Arial,Helvetica,sans-serif;color:#24131f;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1eb;padding:24px 12px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #eadfd6;">
                        <tr>
                            <td style="background:#3c1432;color:#ffffff;padding:28px 30px;">
                                <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#e8c7d9;">NextGen Living Space</p>
                                <h1 style="margin:0;font-size:30px;line-height:1.15;">{safe_subject}</h1>
                                <p style="margin:12px 0 0;color:#f6eaf1;font-size:15px;line-height:1.6;">Hi {safe_name}, a refined interior update for homes{city_text}.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:28px 30px;">
                                <div style="font-size:15px;line-height:1.8;color:#4b3742;">{safe_body}</div>
                                <div style="margin-top:24px;text-align:center;">
                                    <a href="{safe_cta_url}" style="display:inline-block;background:#3c1432;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:bold;">{safe_cta_text}</a>
                                </div>
                                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#7b6873;text-align:center;">Premium design. Clear timelines. End-to-end execution.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>"""
