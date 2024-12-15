from django.urls import path
from .views import Asmeb3610ListAPIView, Asmeb3619ListAPIView
urlpatterns = [
    path('api/pipe/asmeb3610/', Asmeb3610ListAPIView.as_view(), name='asmeb3610-list'),
    path('api/pipe/asmeb3619/', Asmeb3619ListAPIView.as_view(), name='asmeb3619-list'),
]
