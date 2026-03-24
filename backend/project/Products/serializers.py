from rest_framework import serializers
from .models import Products

class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = [
            "product_name",
            "category",
            "description",
            "price",
            "stock_quantity",
            "image",
        ]
