from django.db import models


class Volunteer(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    occupation = models.CharField(max_length=200, blank=True)
    skills = models.TextField(help_text='Skills and areas of expertise')
    motivation = models.TextField(help_text='Why do you want to volunteer with WNETF?')
    availability = models.CharField(max_length=200, blank=True, help_text='e.g. Weekends, Evenings')
    is_diaspora = models.BooleanField(default=False, help_text='Are you based outside Uganda?')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.email}"
