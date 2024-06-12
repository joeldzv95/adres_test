from django.db import models
from simple_history.models import HistoricalRecords
# Create your models here.
class Budget(models.Model):
    allocated_amount = models.DecimalField(max_digits=10, decimal_places=2)
    administrative_unit = models.CharField(max_length=255)
    item_type = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    unit_value = models.DecimalField(max_digits=10, decimal_places=2)
    total_value = models.DecimalField(max_digits=20, decimal_places=2)
    acquisition_date = models.DateField()
    supplier = models.CharField(max_length=255)
    documentation = models.TextField()
    history = HistoricalRecords()

    def __str__(self) -> str:
        return str(self.allocated_amount) 