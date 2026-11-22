from django.contrib import admin
from .models import Service
@admin.register (Service)
class ServicesAdmin(admin.ModelAdmin):
    list_display = ("nom","ordre","actif")
    list_editable=("ordre","actif")
    prepopulated_fields={"slug":("nom",)}

# Register your models here.
