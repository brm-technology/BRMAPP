from rest_framework import serializers
from .models import BeamEN100561, BeamEN10365

class BeamEN10365Serializer(serializers.ModelSerializer):
    class Meta:
        model = BeamEN10365
        fields = '__all__'  

class BeamEN100561Serializer(serializers.ModelSerializer):
    class Meta:
        model = BeamEN100561
        fields = '__all__'  
