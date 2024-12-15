from rest_framework import serializers
from .models import Calcpipe

class CalcpipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calcpipe
        fields = '__all__'  