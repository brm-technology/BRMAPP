from django.contrib import admin
from .models import Calcstruc

@admin.register(Calcstruc)
class Calcstruc(admin.ModelAdmin):
    list_display = ['__str__'] 