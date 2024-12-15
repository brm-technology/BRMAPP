from django.contrib import admin
from .models import BeamEN100561, BeamEN10365

@admin.register(BeamEN10365)
class BeamEN10365Admin(admin.ModelAdmin):
    list_display = ['__str__'] 

@admin.register(BeamEN100561)
class BeamEN100561Admin(admin.ModelAdmin):
    list_display = ['__str__']