from rest_framework import serializers
from .models import ImpactStat, ImpactStory
class ImpactStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactStat
        fields = '__all__'
class ImpactStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactStory
        fields = '__all__'
