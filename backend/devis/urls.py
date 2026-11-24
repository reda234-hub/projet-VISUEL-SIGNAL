from django.urls import path
from .views import DevisCreateView

urlpatterns = [
    path("", DevisCreateView.as_view(), name="devis-create"),
]