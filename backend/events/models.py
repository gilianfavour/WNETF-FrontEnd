from django.db import models
class Event(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=300)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    is_upcoming = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    registration_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-date']
    def __str__(self):
        return self.title
