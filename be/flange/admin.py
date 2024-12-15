from django.contrib import admin
from .models import FlangeB165

@admin.register(FlangeB165)
class FlangeB165Admin(admin.ModelAdmin):
    list_display = ['__str__']

