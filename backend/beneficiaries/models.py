from django.db import models


class Beneficiary(models.Model):
    name = models.CharField(max_length=200)
    course = models.CharField(max_length=300)
    university = models.CharField(max_length=300)
    year = models.CharField(max_length=50)  # e.g. "3rd Year", "Graduate"
    district = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='beneficiaries/', blank=True, null=True)
    bio = models.TextField(blank=True)
    is_graduate = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Beneficiaries'

    def __str__(self):
        return f"{self.name} — {self.course}"
