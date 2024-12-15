from rest_framework import generics
from .models import BeamEN100561, BeamEN10365
from .serializers import BeamEN100561Serializer, BeamEN10365Serializer

class BeamEN100561ListAPIView(generics.ListAPIView):
    queryset = BeamEN100561.objects.all()
    serializer_class = BeamEN100561Serializer

class BeamEN10365ListAPIView(generics.ListAPIView):
    queryset = BeamEN10365.objects.all()
    serializer_class = BeamEN10365Serializer
