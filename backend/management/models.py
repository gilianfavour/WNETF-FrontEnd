from django.db import models

class TeamMember(models.Model):
    full_name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    email = models.EmailField()
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    password = models.CharField(max_length=128, default='admin123') # Basic password storage
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'full_name']

    def __str__(self):
        return f"{self.full_name} — {self.role}"

class Partner(models.Model):
    PARTNER_TYPES = [
        ('collaborator', 'Collaborator'),
        ('sponsor', 'Sponsor'),
        ('donor', 'Donor'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=200)
    partnership_type = models.CharField(max_length=50, choices=PARTNER_TYPES, default='collaborator')
    website_url = models.URLField(blank=True)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    password = models.CharField(max_length=128, default='partner123')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
