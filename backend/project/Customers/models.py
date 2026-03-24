from django.db import models
from django.contrib.auth.models import User

# customer model
class CustomerForm(models.Model):
    customer=models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    customer_name= models.CharField(max_length=30, null=False, blank=False)
    phone_number = models.CharField(max_length=15, null=False, blank=False)
    customer_email = models.EmailField(max_length=50, null = False, blank =False)
    address = models.CharField(max_length=100, null=True, blank=True)
    

# orders model
class Customer_Orders(models.Model):
    customer_id= models.ForeignKey(CustomerForm, on_delete=models.CASCADE , null = True, blank = True)
    order_date = models.DateField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    shipping_address = models.CharField(max_length=100, null=False, blank=False)
    order_status = models.CharField(choices=[('PENDING', 'Pending'), ('SHIPPED', 'Shipped'), ('DELIVERED', 'Delivered')], max_length=10, default='PENDING')