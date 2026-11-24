from rest_framework import serializers
from .models import Question
class QuestionSerializer(serializers.ModelSerializer):
    categorie_label = serializers.CharField(source="get_categorie_display",read_only=True)
    class Meta :
        model = Question 
        fields = ["id","question","reponse","categorie","categorie_label"]