from django.contrib import admin
from .models import Devis
@admin.register(Devis)
class DevisAdmin(admin.ModelAdmin):

    list_display = ("id", "nom", "service", "ville", "statut", "date_creation")
    list_filter = ("statut","service","eclairage")
    search_fields = ("nom","email","societe","telephone")
    readonly_filds = ("date_creation",)


# Register your models here.
