from rest_framework import generics
from .models import Calcstruc
from .serializers import CalcstrucSerializer

class CalcstrucListAPIView(generics.ListAPIView):
    queryset = Calcstruc.objects.all()
    serializer_class = CalcstrucSerializer