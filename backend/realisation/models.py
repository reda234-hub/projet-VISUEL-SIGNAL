from django.db import models
from django.utils.text import slugify
from services.models import Service


class Realisation(models.Model):
    titre = models.CharField("Titre", max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    client = models.CharField("Client", max_length=150, blank=True)
    ville = models.CharField("Ville", max_length=100, blank=True)
    service = models.ForeignKey(
        Service,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="realisations",
    )
    description = models.TextField("Description", blank=True)
    image_principale = models.ImageField(upload_to="realisations/")
    date_realisation = models.DateField("Date de réalisation", null=True, blank=True)
    en_vedette = models.BooleanField("Mettre en avant", default=False)
    publie = models.BooleanField("Publié", default=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_realisation", "-date_creation"]
        verbose_name = "Réalisation"
        verbose_name_plural = "Réalisations"

    def __str__(self):
        return self.titre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titre)
        super().save(*args, **kwargs)


class PhotoRealisation(models.Model):
    realisation = models.ForeignKey(
        Realisation,
        on_delete=models.CASCADE,
        related_name="photos",
    )
    image = models.ImageField(upload_to="realisations/galerie/")
    legende = models.CharField("Légende", max_length=200, blank=True)
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["ordre"]
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self):
        return f"Photo de {self.realisation.titre}"








