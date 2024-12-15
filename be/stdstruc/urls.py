from django.urls import path
from .views import StdstrucListAPIView
urlpatterns = [
    path('api/stdstruc/', StdstrucListAPIView.as_view(), name='stdstruc'),
]