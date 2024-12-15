from django.urls import path
from .views import ContactListCreateAPIView

urlpatterns = [
    path('api/contact/', ContactListCreateAPIView.as_view(), name='contact-list'),
]
