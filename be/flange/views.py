from rest_framework import generics
from .models import FlangeB165
from .serializers import FlangeB165Serializer


class FlangeB165ListAPIView(generics.ListAPIView):
    queryset = FlangeB165.objects.all()
    serializer_class = FlangeB165Serializer

