from django.db import models
class ImpactStat(models.Model):
    stat_value = models.CharField(max_length=50)   # e.g. '26', '9', '6'
    stat_label = models.CharField(max_length=200)  # e.g. 'Students Sponsored'
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['order']
    def __str__(self):
        return f'{self.stat_value} {self.stat_label}'

class ImpactStory(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    image = models.ImageField(upload_to='impact/', blank=True, null=True)
    beneficiary_name = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.title
