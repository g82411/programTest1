from django.test import TestCase
from django.test import Client
from django.contrib.auth.models import User
from .models import Product
import json

# Create your tests here.


class ProductCreateTest(TestCase):
    def setUp(self):
        # Create user for FAST1_CASE1
        user = User.objects.create_user('andy.lin', 'lmz8241@nisra.net', 'testPassword')
        user.save()

        productForVip = Product(**{
            'inventory': 10,
            'shop': "TPE",
            'price': 300,
            'vipOnly': True
        })
        productForVip.save()

    def test_RAT_CASE1(self):
        # RAT case, just test api is exists
        client = Client()
        response = client.post('/api/v1/order/')
        self.assertEqual(response.status_code, 400)

    def test_FAST1_CASE1(self):
        # FAST case, test a simple case
        client = Client()
        # Create product
        commomProduct = Product(**{
            'inventory': 10,
            'shop': "TPE",
            'price': 300,
            'vipOnly': False
        })
        commomProduct.save()
        client.login(username='andy.lin', password='testPassword')
        response = client.post('/api/v1/order/', json.dumps({
                                        'customer': 1,
                                        'product': commomProduct.pk,
                                        'quantity':10
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 201)
    def test_FAST1_CASE2(self):
        # FAST case2, test a vip order case
        client = Client()
        # Create product
        commomProduct = Product(**{
            'inventory': 10,
            'shop': "TPE",
            'price': 300,
            'vipOnly': True
        })
        commomProduct.save()
        client.login(username='andy.lin', password='testPassword')
        response = client.post('/api/v1/order/', json.dumps({
                                        'customer': 1,
                                        'product': commomProduct.pk,
                                        'quantity':10,
                                        'isVipOrder': True
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_FET1_CASE1(self):
        # FAST case2, test a vip order case
        client = Client()
        # Create product
        commomProduct = Product(**{
            'inventory': 5,
            'shop': "TPE",
            'price': 300,
            'vipOnly': False
        })
        commomProduct.save()
        client.login(username='andy.lin', password='testPassword')
        response = client.post('/api/v1/order/', json.dumps({
                                        'customer': 1,
                                        'product': commomProduct.pk,
                                        'quantity':10
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 403)
