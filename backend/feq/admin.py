from django.contrib import admin
from .models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("question", "categorie", "ordre", "publie")
    list_editable = ("ordre", "publie")
    list_filter = ("categorie", "publie")
    search_fields = ("question", "reponse")

# Register your models here.
