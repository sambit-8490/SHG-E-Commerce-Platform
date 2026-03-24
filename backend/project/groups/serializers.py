from rest_framework import serializers
from groups.models import Shg_Group_Registration
from Products.models import Products


class ShgFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shg_Group_Registration
        fields = ['name_of_shg',
                  'date_of_formation',
                  'registration_number',
                  'contact_number',
                  'village',
                  'taluka',
                  'district',
                  'type_of_shg',
                  'address',
                  'image']

# --- FIX: THIS ENTIRE CLASS IS REPLACED ---


class AdminPanelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products

        # This tells the serializer to not require 'shg_group_id' from the frontend
        read_only_fields = ('shg_group_id',)

        fields = [
            'shg_group_id',  # It must be in 'fields' to be in 'read_only_fields'
            'product_name',
            'price',
            'stock_quantity',
            'description',
            'category',
            'image'
        ]

        # Make image optional
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True}
        }
