from django.urls import include, path
from rest_framework import routers
from budget import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'budget', views.BudgetView , 'budget')

urlpatterns = [
    
    path('api/v1/', include(router.urls)),
    path('api/v1/budget/<int:budget_id>/history/', views.BudgetHistory.as_view(), name='budget_history'),
    path('docs/', include_docs_urls(title="Budget API", public=True, permission_classes=[])),
]