from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import Devis
from .serializers import DevisSerializer


class DevisCreateView(generics.CreateAPIView):
    queryset = Devis.objects.all()
    serializer_class = DevisSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_create(self, serializer):
        devis = serializer.save()

        send_mail(
            subject=f"Nouvelle demande de devis #{devis.pk} - {devis.nom}",
            message=(
                f"Client : {devis.nom} ({devis.societe})\n"
                f"Email : {devis.email}\n"
                f"Téléphone : {devis.telephone}\n"
                f"Ville : {devis.ville}\n"
                f"Service : {devis.service}\n"
                f"Dimensions : {devis.largeur_cm} x {devis.hauteur_cm} cm\n"
                f"Éclairage : {devis.get_eclairage_display()}\n"
                f"Pose : {'Oui' if devis.pose else 'Non'}\n\n"
                f"Message :\n{devis.message}"
            ),
            from_email=None,
            recipient_list=[settings.EMAIL_ARTISAN],
            fail_silently=True,
        )

