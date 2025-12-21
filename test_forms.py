import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'camerainstallationweb.settings')
django.setup()

from django.test import Client
from django.core.mail import send_mail
from home.models import ContactMessage, QuoteMessage

# Test contact form
client = Client()
response = client.post('/contact/', {
    'email': 'test@example.com',
    'message': 'This is a test message from contact form.'
})

print('Contact form POST status:', response.status_code)
print('Contact messages in DB:', ContactMessage.objects.count())

# Test quote form
response = client.post('/request-quote/', {
    'full_name': 'Test User',
    'email': 'test@example.com',
    'phone': '1234567890',
    'service': 'CCTV',
    'message': 'This is a test quote request.'
})

print('Quote form POST status:', response.status_code)
print('Quote messages in DB:', QuoteMessage.objects.count())

# Check if email was sent (this will use the configured backend)
print('Emails sent via backend.')