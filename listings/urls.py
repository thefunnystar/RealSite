from django.urls import path
from .views import ListingsView, ListingView, SearchView

urlpatterns = [
    path('', ListingsView.as_view()),
    path('search', SearchView.as_view()),
    path('<slug>', ListingsView.as_view()),
]
