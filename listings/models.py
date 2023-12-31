from cloudinary.models import CloudinaryField
from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor


class Listing(models.Model):
    class SaleType(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'

    class HomeType(models.TextChoices):
        HOUSE = 'House'
        TOWNHOUSE = 'Townhouse'
        CONDO = 'Condo'

    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=15, null=True)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqft = models.IntegerField()
    open_house = models.BooleanField(default=False)
    # photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    # photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/')
    # photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/')
    # photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/')
    # photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_main = CloudinaryField('Image', overwrite=True, format="jpg")
    photo_1 = CloudinaryField('Image', overwrite=True, format="jpg")
    photo_2 = CloudinaryField('Image', overwrite=True, format="jpg")
    photo_3 = CloudinaryField('Image', overwrite=True, format="jpg")
    photo_4 = CloudinaryField('Image', overwrite=True, format="jpg")
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title