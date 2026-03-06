from django.db import models


class Donation(models.Model):
    FREQUENCY_CHOICES = [
        ('once', 'One-time'),
        ('monthly', 'Monthly'),
        ('annually', 'Annually'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default='UGX')
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default='once')
    message = models.TextField(blank=True)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.currency} {self.amount} ({self.frequency})"
