from django.db import models

class Product(models.Model):
    inventory = models.IntegerField()
    shop = models.CharField(max_length=15)
    price = models.IntegerField()
    vipOnly = models.BooleanField()

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    customer = models.IntegerField()

