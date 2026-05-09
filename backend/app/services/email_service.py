"""Email notification service for appointments."""

from app.services.mailer import send_email


def send_appointment_confirmation(name: str, email: str, date: str, time: str, city: str, external_id: str) -> bool:
    """Send appointment confirmation email."""
    subject = "Appointment Confirmed - NextGen Living Space"

    html_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h2 style="color: #7c3aed;">Thank You, {name}! 🎉</h2>
                <p>Your appointment with <strong>NextGen Living Space</strong> has been confirmed.</p>

                <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #7c3aed;">
                    <h3 style="margin-top: 0;">Appointment Details</h3>
                    <p><strong>📅 Date:</strong> {date}</p>
                    <p><strong>⏰ Time:</strong> {time}</p>
                    <p><strong>📍 Location:</strong> {city}</p>
                    <p><strong>📋 Booking ID:</strong> {external_id[:8]}</p>
                </div>

                <p style="color: #666; font-size: 14px;">
                    Our team will reach out to confirm your appointment. If you need to reschedule, please reply to this email or contact us directly.
                </p>

                <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    © 2026 NextGen Living Space. All rights reserved.
                </p>
            </div>
        </body>
    </html>
    """

    body = (
        f"Thank you, {name}!\n\n"
        f"Your appointment with NextGen Living Space has been confirmed.\n\n"
        f"Date: {date}\n"
        f"Time: {time}\n"
        f"Location: {city}\n"
        f"Booking ID: {external_id[:8]}\n"
    )

    return send_email(to_email=email, subject=subject, body=body, html=html_body)


def send_appointment_reminder(name: str, email: str, date: str, time: str, city: str) -> bool:
    """Send appointment reminder email (24 hours before)."""
    subject = f"Reminder: Your Appointment Tomorrow at {time}"

    html_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h2 style="color: #7c3aed;">Appointment Reminder 📞</h2>
                <p>Hi {name},</p>
                <p>This is a friendly reminder about your upcoming appointment with <strong>NextGen Living Space</strong>.</p>

                <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <h3 style="margin-top: 0; color: #d97706;">Tomorrow!</h3>
                    <p><strong>⏰ Time:</strong> {time}</p>
                    <p><strong>📍 Location:</strong> {city}</p>
                </div>

                <p style="color: #666; font-size: 14px;">
                    Please make sure to be available at the scheduled time. If you need to reschedule, contact us as soon as possible.
                </p>

                <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    © 2026 NextGen Living Space. All rights reserved.
                </p>
            </div>
        </body>
    </html>
    """

    body = (
        f"Hi {name},\n\n"
        f"This is a friendly reminder about your upcoming appointment with NextGen Living Space.\n\n"
        f"Tomorrow!\n"
        f"Time: {time}\n"
        f"Location: {city}\n"
    )

    return send_email(to_email=email, subject=subject, body=body, html=html_body)


def send_status_update_email(name: str, email: str, status: str, city: str) -> bool:
    """Send status update email when admin changes appointment status."""
    status_messages = {
        "confirmed": ("Appointment Confirmed ✅", "Your appointment has been confirmed by our team."),
        "completed": ("Appointment Completed ✓", "Thank you for choosing NextGen Living Space!"),
        "cancelled": ("Appointment Cancelled", "Your appointment has been cancelled. Please contact us for further assistance."),
    }

    title, message = status_messages.get(status, (f"Status Update: {status}", "Your appointment status has been updated."))

    html_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h2 style="color: #7c3aed;">{title}</h2>
                <p>Hi {name},</p>
                <p>{message}</p>

                <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>📍 Location:</strong> {city}</p>
                    <p style="color: #666; font-size: 14px; margin-top: 10px;">
                        If you have any questions, please don't hesitate to reach out to us.
                    </p>
                </div>

                <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    © 2026 NextGen Living Space. All rights reserved.
                </p>
            </div>
        </body>
    </html>
    """

    body = f"Hi {name},\n\n{message}\n\nLocation: {city}\n"

    return send_email(to_email=email, subject=title, body=body, html=html_body)
