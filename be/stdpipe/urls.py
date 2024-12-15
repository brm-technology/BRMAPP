from django.urls import path
from .views import StdpipeListAPIView
urlpatterns = [
    path('api/stdpipe/', StdpipeListAPIView.as_view(), name='stdpipe'),
]