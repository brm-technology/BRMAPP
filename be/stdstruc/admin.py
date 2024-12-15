from django.contrib import admin
from .models import Stdstruc

@admin.register(Stdstruc)
class Stdpipe(admin.ModelAdmin):
    list_display = ['__str__'] 