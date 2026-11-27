from rest_framework import generics
from .models import Question 
from .serializer import QuestionSerializer

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    pagination_class = None
    def get_queryset(self):
        qs = Question.objects.filter(publie=True)
        categorie= self.request.query_params.get("categorie")
        if categorie:
            qs = qs.filter(categorie=categorie)
        return qs 
    
    

# Create your views here.
