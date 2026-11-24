from django.db import models


class Question(models.Model):

    class Categorie(models.TextChoices):
        GENERAL = "general", "Général"
        DEVIS = "devis", "Devis et tarifs"
        FABRICATION = "fabrication", "Fabrication"
        POSE = "pose", "Pose et installation"
        REGLEMENTATION = "reglementation", "Réglementation"

    question = models.CharField("Question", max_length=255)
    reponse = models.TextField("Réponse")
    categorie = models.CharField(
        max_length=20,
        choices=Categorie.choices,
        default=Categorie.GENERAL,
    )
    ordre = models.PositiveIntegerField(default=0)
    publie = models.BooleanField("Publié", default=True)

    class Meta:
        ordering = ["categorie", "ordre"]
        verbose_name = "Question FAQ"
        verbose_name_plural = "Questions FAQ"

    def __str__(self):
        return self.question


