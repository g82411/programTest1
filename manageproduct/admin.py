from django.contrib import admin
from .models import Product, Order

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = ('shop', 'inventory', 'price', 'vipOnly')
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fields = ('product', 'quantity', 'order')