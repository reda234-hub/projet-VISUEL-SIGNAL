from django.db import models
from services.models import Service 

class Devis(models.Model):

    class Statut(models.TextChoices):
        NOUVEAU = "nouveau", "Nouveau"
        EN_COURS = "en_cours", "En cours de traitement"
        ENVOYE = "envoye", "Devis envoyé"
        ACCEPTE = "accepte", "Accepté"
        REFUSE = "refuse", "Refusé"

    class Eclairage(models.TextChoices):
        AUCUN = "aucun", "Sans éclairage"
        LED = "led", "LED"
        NEON = "neon", "Néon"
        SPOT = "spot", "Spots extérieurs"

    # --- Informations client ---
    nom = models.CharField("Nom complet", max_length=100)
    societe = models.CharField("Société", max_length=150, blank=True)
    email = models.EmailField("Email")
    telephone = models.CharField("Téléphone", max_length=20)
    ville = models.CharField("Ville", max_length=100)

    # --- Détails du projet ---
    service = models.ForeignKey(
        Service,
        on_delete=models.SET_NULL,
        null=True,
        related_name="demandes_devis",
    )
    largeur_cm = models.PositiveIntegerField("Largeur (cm)", null=True, blank=True)
    hauteur_cm = models.PositiveIntegerField("Hauteur (cm)", null=True, blank=True)
    eclairage = models.CharField(
        max_length=10, choices=Eclairage.choices, default=Eclairage.AUCUN
    )
    pose = models.BooleanField("Pose souhaitée", default=True)
    message = models.TextField("Message", blank=True)
    fichier = models.FileField("Logo / photo façade", upload_to="devis/%Y/%m/", blank=True, null=True)

    # --- Suivi interne ---
    statut = models.CharField(
        max_length=10, choices=Statut.choices, default=Statut.NOUVEAU
    )
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_creation"]
        verbose_name = "Demande de devis"
        verbose_name_plural = "Demandes de devis"

    def __str__(self):
        return f"Devis #{self.pk} - {self.nom}"
