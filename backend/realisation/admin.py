from django.contrib import admin
from .models import Realisation, PhotoRealisation


class PhotoRealisationInline(admin.TabularInline):
    model = PhotoRealisation
    extra = 3


@admin.register(Realisation)
class RealisationAdmin(admin.ModelAdmin):
    list_display = ("titre", "service", "ville", "en_vedette", "publie")
    list_editable = ("en_vedette", "publie")
    list_filter = ("service", "publie", "en_vedette")
    search_fields = ("titre", "client", "ville")
    prepopulated_fields = {"slug": ("titre",)}
    inlines = [PhotoRealisationInline]

# Register your models here.
