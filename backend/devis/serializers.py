
from rest_framework import serializers
from .models import Devis


class DevisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devis
        fields =[
            "id", "nom", "societe", "email", "telephone", "ville",
            "service", "largeur_cm", "hauteur_cm", "eclairage",
            "pose", "message", "fichier",

        ]
        read_only_fields =["id"]
    def validate_fichier(self, fichier):
        if fichier and fichier.size> 5 * 1024 * 1024:
            raise serializers.ValidationError("le fichier ne doit pas depasser 5 Mo")
        return fichier 
    