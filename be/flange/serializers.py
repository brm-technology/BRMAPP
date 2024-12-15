from rest_framework import serializers
from .models import FlangeB165

class FlangeB165Serializer(serializers.ModelSerializer):
    class Meta:
        model = FlangeB165
        fields = '__all__'  

