from django.urls import path
from .views import FlangeB165ListAPIView


urlpatterns = [
    path('api/flange/flangeb165/', FlangeB165ListAPIView.as_view(), name='FlangeB165-list'),
]
