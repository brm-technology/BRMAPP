from django.urls import path
from .views import CalcpipeListAPIView
urlpatterns = [
    path('api/calcpipe/', CalcpipeListAPIView.as_view(), name='calcpipe'),
]