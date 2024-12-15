from rest_framework import generics
from .models import Stdstruc
from .serializers import StdstrucSerializer

class StdstrucListAPIView(generics.ListAPIView):
    queryset = Stdstruc.objects.all()
    serializer_class = StdstrucSerializer