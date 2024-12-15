from django.contrib import admin
from .models import Stdpipe

@admin.register(Stdpipe)
class Stdpipe(admin.ModelAdmin):
    list_display = ['__str__'] 