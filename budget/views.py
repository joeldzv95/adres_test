from rest_framework import viewsets
from .serializer import BudgetSerializer, BudgetHistorySerializer
from .models import Budget
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.
class BudgetView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all()

class BudgetHistory(APIView):
    def get(self, request, budget_id):
        try:
            budget = Budget.objects.get(pk=budget_id)
            history = budget.history.all()  # Accede al historial de cambios a través del campo history
            serialized_history = BudgetHistorySerializer(history, many=True)
            return Response(serialized_history.data)
        except Budget.DoesNotExist:
            return Response(status=404)