from rest_framework import serializers
from .models import Realisation ,PhotoRealisation
class PhotoRealisationSerializer(serializers.ModelSerializer):
    class Meta :
        model= PhotoRealisation
        fields= ["id","image","legende","order"]
class RealisationListSerializer(serializers.ModelSerializer):
    service = serializers.StringRelatedField()
    class Meta:
        model=Realisation
        fields=["id","titre","slug","ville","service","image_principale","en_vedette"]
class RealisationDetailSerializer(serializers.ModelSerializer):
    services= serializers.StringRelatedField()
    photos = PhotoRealisationSerializer(many=True, read_only=True)
    class Meta:
        model= Realisation 
        fields=["id", "titre", "slug", "client", "ville", "service",
            "description", "image_principale", "date_realisation", "photos",]
    

