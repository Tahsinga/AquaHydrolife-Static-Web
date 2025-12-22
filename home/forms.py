from django import forms

class ContactForm(forms.Form):
    full_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20, required=False)
    service = forms.ChoiceField(
        choices=[
            ('camera', 'Camera Installation'),
            ('starlink', 'Starlink Setup'),
            ('security', 'Security System'),
            ('network', 'Network Integration'),
        ],
        required=False
    )
    message = forms.CharField(widget=forms.Textarea)
