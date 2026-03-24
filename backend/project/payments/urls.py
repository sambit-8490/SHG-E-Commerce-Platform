from django.urls import path
from .views import create_payment_intent , confirm_payment,cash_on_delivery

urlpatterns = [
     path("create-payment-intent/", create_payment_intent),
     path('purchase/', confirm_payment ),  
     path('cash-purchase/',cash_on_delivery)
]