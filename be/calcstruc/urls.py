from django.urls import path
from .views import CalcstrucListAPIView
urlpatterns = [
    path('api/calcstruc/', CalcstrucListAPIView.as_view(), name='calcstruc'),
]