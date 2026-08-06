from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    headline = models.CharField(max_length=200, blank=True)
    about = models.TextField(blank=True)

    skills = models.TextField(
        blank=True,
        help_text="Comma separated skills"
    )

    experience = models.TextField(blank=True)
    education = models.TextField(blank=True)

    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email