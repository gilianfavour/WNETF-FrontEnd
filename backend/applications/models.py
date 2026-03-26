from django.db import models


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    # Personal Information
    full_name = models.CharField(max_length=200)
    dob = models.DateField()
    email = models.EmailField()
    phone = models.CharField(max_length=30)

    # Academic Information
    course = models.CharField(max_length=300)
    university = models.CharField(max_length=300)
    university_reg_number = models.CharField(max_length=100)
    university_email = models.EmailField()
    student_number = models.CharField(max_length=100)
    grades = models.TextField()

    # Location & Guardian
    district = models.CharField(max_length=100)
    other_district = models.CharField(max_length=100, blank=True)
    guardian_name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)

    # Personal Statement
    personal_statement = models.TextField()

    # Supporting Document
    attachment = models.FileField(upload_to='applications/documents/')

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} — {self.university} ({self.status})"


class ApplicationNote(models.Model):
    NOTE_TYPES = [
        ('comment',    'Comment'),
        ('assignment', 'Assignment'),
    ]

    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='notes')
    author      = models.CharField(max_length=200)          # logged-in user's name
    body        = models.TextField(blank=True)
    note_type   = models.CharField(max_length=20, choices=NOTE_TYPES, default='comment')
    assigned_to = models.CharField(max_length=200, blank=True)  # filled when type=assignment
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.note_type}] {self.author} on #{self.application_id}"
