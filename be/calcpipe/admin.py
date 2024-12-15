from django.contrib import admin
from .models import Calcpipe

@admin.register(Calcpipe)
class Calcpipe(admin.ModelAdmin):
    list_display = ['__str__'] 