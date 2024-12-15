from django.contrib import admin
from .models import Asmeb3610, Asmeb3619

@admin.register(Asmeb3610)
class Asmeb3610Admin(admin.ModelAdmin):
    list_display = ['__str__'] 

@admin.register(Asmeb3619)
class Asmeb3619Admin(admin.ModelAdmin):
    list_display = ['__str__']
