from django.db import models

# product model
class Products(models.Model):
    shg_group_id = models.ForeignKey('groups.Shg_Group_Registration', on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, null=False, blank=False)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    
# category model
class Category(models.Model):
    category_name = models.CharField(max_length=50, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)

# cart model
class Cart_Items(models.Model):
    user_id = models.ForeignKey('Customers.CustomerForm', on_delete=models.CASCADE,null=True,   blank=True)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE, null=True, blank=True)
    shg_group_id = models.ForeignKey('groups.Shg_Group_Registration', on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)