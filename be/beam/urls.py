from django.urls import path
from .views import BeamEN100561ListAPIView, BeamEN10365ListAPIView
urlpatterns = [
    path('api/beam/en100561/', BeamEN100561ListAPIView.as_view(), name='beam100561-list'),
    path('api/beam/en10365/', BeamEN10365ListAPIView.as_view(), name='beam10365-list'),
]
