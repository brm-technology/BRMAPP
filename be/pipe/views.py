from rest_framework import generics
from .models import Asmeb3610, Asmeb3619
from .serializers import Asmeb3610Serializer, Asmeb3619Serializer

# ListAPIView for Asmeb3610
class Asmeb3610ListAPIView(generics.ListAPIView):
    queryset = Asmeb3610.objects.all()
    serializer_class = Asmeb3610Serializer

# ListAPIView for Asmeb1619
class Asmeb3619ListAPIView(generics.ListAPIView):
    queryset = Asmeb3619.objects.all()
    serializer_class = Asmeb3619Serializer
