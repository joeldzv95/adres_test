from rest_framework import serializers
from .models import Budget
from simple_history.models import HistoricalRecords

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class BudgetHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget.history.model
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation