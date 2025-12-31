import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'camerainstallationweb.settings')
django.setup()

from django.core.mail import send_mail

subject = 'Test Email from Aqua HydroLife'
message = 'This is a test message sent from the local project to verify email sending.'
from_email = 'no-reply@aquahydrolife.local'
recipient = ['munqitshwatashinga1@gmail.com']

sent = send_mail(subject, message, from_email, recipient)
print('send_mail returned:', sent)
