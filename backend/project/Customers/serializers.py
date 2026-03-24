from rest_framework import serializers
from Customers.models import CustomerForm

class UserFormSerializer(serializers.Serializer):
    customer_name = serializers.CharField()
    email = serializers.EmailField()
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)
