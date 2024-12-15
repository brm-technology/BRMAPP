from rest_framework import generics
from .models import Stdpipe
from .serializers import StdpipeSerializer

class StdpipeListAPIView(generics.ListAPIView):
    queryset = Stdpipe.objects.all()
    serializer_class = StdpipeSerializer