from rest_framework import serializers
from .models import Calcstruc

class CalcstrucSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calcstruc
        fields = '__all__'  