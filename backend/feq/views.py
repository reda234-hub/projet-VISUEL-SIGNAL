from rest_framework import generics
from .models import Question 
from .serializer import QuestionSerializer

class QuestionListView(generics.ListAPIView):
    serializer_calss = QuestionSerializer
    pagination_class = None
    def get_queryset(self):
        qs = Question.objects.filter(publie=True)
        categorie= self.request.query_params.get("categorie")
        if categorie:
            qs = qs.fillter(categorie=categorie)
        return qs 
    
    

# Create your views here.
