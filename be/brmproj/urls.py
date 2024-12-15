from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('news.urls')), 
    path('', include('contact.urls')),
    path('', include('pipe.urls')),
    path('', include('flange.urls')),
    path('', include('stdpipe.urls')),
    path('', include('calcpipe.urls')),
    path('', include('beam.urls')),
    path('', include('stdstruc.urls')),
    path('', include('calcstruc.urls')), 
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
    ]