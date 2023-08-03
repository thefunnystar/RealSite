from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from datetime import datetime, timezone, timedelta
from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
class ListingsView(ListAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer
    lookup_field = 'slug'

# @csrf_exempt
class ListingView(RetrieveAPIView):
    queryset = Listing.objects.filter(is_published=True).order_by('-list_date')
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'


class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        data = self.request.data

        queryset = Listing.objects.order_by('-list_date').filter(is_published=True)

        sale_type = data['sale_type']
        if sale_type:
            queryset = queryset.filter(sale_type__iexact=sale_type)

        price = data['price']
        price_mapping = {
            '$0+': 0,
            '$200,000+': 200000,
            '$300,000+': 300000,
            '$500,000+': 500000,
            '$1,000,000+': 1000000,
            '$1,500,000+': 1500000,
            'Any': -1
        }
        if price in price_mapping:
            price = price_mapping[price]
            if price != -1:
                queryset = queryset.filter(price__gte=price)

        home_type = data['home_type']
        if home_type:
            queryset = queryset.filter(home_type__iexact=home_type)

        bedrooms = data['bedrooms']
        bedrooms_mapping = {
            '0+': 0,
            '1+': 1,
            '2+': 2,
            '3+': 3,
            '4+': 4,
            '5+': 5,
        }
        if bedrooms in bedrooms_mapping:
            bedrooms = bedrooms_mapping[bedrooms]
            queryset = queryset.filter(bedrooms__gte=bedrooms)

        bathrooms = data['bathrooms']
        bathrooms_mapping = {
            '0+': 0.0,
            '1+': 1.0,
            '2+': 2.0,
            '3+': 3.0,
            '4+': 4.0,
        }
        if bathrooms in bathrooms_mapping:
            bathrooms = bathrooms_mapping[bathrooms]
            queryset = queryset.filter(bathrooms__gte=bathrooms)

        sqft = data['sqft']
        sqft_mapping = {
            '1000+': 1000,
            '1200+': 1200,
            '1500+': 1500,
            '2000+': 2000,
            'Any': 0,
        }
        if sqft in sqft_mapping:
            sqft = sqft_mapping[sqft]
            if sqft != 0:
                queryset = queryset.filter(sqft__gte=sqft)

        open_house = data['open_house']
        if open_house:
            queryset = queryset.filter(open_house__iexact=open_house)

        serializer = ListingSerializer(queryset, many=True)

        return Response(serializer.data)
