from rest_framework import serializers
from .models import Stdstruc

class StdstrucSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stdstruc
        fields = '__all__'  