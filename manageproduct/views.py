from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from .models import Order
from .models import Product
import json
from traceback import print_exc
from django.utils.decorators import method_decorator
from functools import wraps
from django.http import HttpResponseRedirect
# Create your views here.

def checkInventory(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if request.method == "POST":
            try:
                req = json.loads(request.body.decode('utf-8'))
                product = req.get('product', 0)
                quantity = int(req.get('quantity', 0))
                productEntity = Product.objects.get(pk=product)
                if (productEntity.inventory < quantity):
                    return JsonResponse({ "message": "Inventory is not enough"}, status=403)

            except json.JSONDecodeError:
                return JsonResponse({ "message": "Parameter Error"}, status=400)
            except:
                print_exc()
                return JsonResponse({ "message": "Internal Server Error"}, status=500)
        return function(request, *args, **kwargs)
    return wrap

class OrderController(View):
    @method_decorator([checkInventory, csrf_exempt])
    def dispatch(self, request, *args, **kwargs):
        return super(OrderController, self).dispatch(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        try:
            req = json.loads(request.body.decode('utf-8'))
            orderID = req.get('order', 0)
            if (not orderID):
                return JsonResponse({ "message": "Parameter Error"}, status=400)
            with transaction.atomic():
                orderEntity = Order.objects.get(pk=orderID)
                productEntity = Product.objects.get(pk=orderEntity.product.pk)
                productEntity.inventory += orderEntity.quantity
                productEntity.save()
                orderEntity.delete()
            return JsonResponse({ "message": "success" }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({ "message": "Parameter Error"}, status=400)
        except:
            print_exc()
            return JsonResponse({ "message": "Internal Server Error"}, status=500)
    def post(self, request, *args, **kwargs):
        try:
            req = json.loads(request.body.decode('utf-8'))
            customer = int(req.get('customer', 0))
            product = int(req.get('product', 0))
            quantity = int(req.get('quantity', 0))
            isVipOrder = req.get('isVipOrder', False)
            if (not (customer and product and quantity)):
                return JsonResponse({ "message": "Parameter Error"}, status=400)
            productEntity = Product.objects.get(pk=product)
            if (productEntity.vipOnly and not isVipOrder):
                return JsonResponse({ "message": "Permission denied"}, status=403)
            with transaction.atomic():
                productEntity = Product.objects.get(pk=product)
                newOrder = Order(**{
                    'quantity': quantity,
                    'product': productEntity,
                    'customer': customer
                })
                productEntity.inventory = productEntity.inventory - quantity
                productEntity.save()
                newOrder.save()
            return JsonResponse({
                'id': newOrder.pk,
                'product': productEntity.pk,
                'quantity': quantity,
                'price': productEntity.price,
                'shop': productEntity.shop,
                'customer': customer
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({ "message": "Parameter Error"}, status=400)
        except:
            print_exc()
            return JsonResponse({ "message": "Internal Server Error"}, status=500)
    def get(self, request, *args, **kwargs):
        try:
            orders = Order.objects.all()[0:20]
            ordersResult = [
                {
                    'id': order.pk,
                    'product': order.product.pk,
                    'quantity': order.quantity,
                    'price': order.product.price,
                    'shop': order.product.shop,
                    'customer': order.customer
                } for order in orders
            ]
            return JsonResponse({ "orders": ordersResult}, status=200)
        except:
            print_exc()
            return JsonResponse({ "message": "Internal Server Error"}, status=500)

class ProductController(View):
    def get(self, request, *args, **kwargs):
        try:
            products = Product.objects.all()[0:20]
            productsResult = [
                {
                    'id': product.pk,
                    'inventory': product.inventory,
                    'shop': product.shop,
                    'price': product.price,
                    'vipOnly': product.vipOnly
                } for product in products
            ]
            return JsonResponse({ "products": productsResult}, status=200)
        except:
            print_exc()
            return JsonResponse({ "message": "Internal Server Error"}, status=500)
