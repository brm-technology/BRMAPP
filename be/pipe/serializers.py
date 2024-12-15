from rest_framework import serializers
from .models import Asmeb3610, Asmeb3619

class Asmeb3610Serializer(serializers.ModelSerializer):
    class Meta:
        model = Asmeb3610
        fields = '__all__'  

class Asmeb3619Serializer(serializers.ModelSerializer):
    class Meta:
        model = Asmeb3619
        fields = '__all__'  
