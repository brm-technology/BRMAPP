from django.urls import path
from .views import NewsListAPIView

urlpatterns = [
    path('api/news/', NewsListAPIView.as_view(), name='news-list'),
]
