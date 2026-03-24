# common/email.py
from django.core.mail import send_mail
from django.conf import settings

def send_email(request, sender_email, receiver_email, message, subject):
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[receiver_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"SMTP Error: {str(e)}") # Check your terminal if it fails
        return False