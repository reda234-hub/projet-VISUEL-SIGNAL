from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    nom = models.CharField("Nom", max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField("Description")
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    ordre = models.PositiveIntegerField(default=0)
    actif = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["ordre", "nom"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.nom

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom)
        super().save(*args, **kwargs)

# Create your models here.
