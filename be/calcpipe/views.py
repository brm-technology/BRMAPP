from rest_framework import generics
from .models import Calcpipe
from .serializers import CalcpipeSerializer

class CalcpipeListAPIView(generics.ListAPIView):
    queryset = Calcpipe.objects.all()
    serializer_class = CalcpipeSerializer