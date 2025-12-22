import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'camerainstallationweb.settings')
django.setup()

from django.core.mail import send_mail

send_mail(
    subject='Gmail Test Email',
    message='This email was sent successfully using Gmail SMTP.',
    from_email=None,
    recipient_list=['munqitshwatashinga1@gmail.com'],
)

print('✅ Email sent successfully')
