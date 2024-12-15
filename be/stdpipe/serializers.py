from rest_framework import serializers
from .models import Stdpipe

class StdpipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stdpipe
        fields = '__all__'  