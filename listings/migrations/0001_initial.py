# Generated by Django 4.2.2 on 2023-07-11 02:09

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('realtors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=200, unique=True)),
                ('title', models.CharField(max_length=150)),
                ('address', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=15)),
                ('description', models.TextField(blank=True)),
                ('sale_type', models.CharField(choices=[('For Sale', 'For Sale'), ('For Rent', 'For Rent')], default='For Sale', max_length=50)),
                ('price', models.IntegerField()),
                ('bedrooms', models.IntegerField()),
                ('bathrooms', models.DecimalField(decimal_places=1, max_digits=2)),
                ('home_type', models.CharField(choices=[('House', 'House'), ('Townhouse', 'Townhouse'), ('Multi-Family', 'Multi Family'), ('Condo', 'Condo'), ('Lots/Land', 'Lots Land'), ('Manufactured', 'Manufactured')], default='House', max_length=50)),
                ('sqft', models.IntegerField()),
                ('open_house', models.BooleanField(default=False)),
                ('photo_main', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_1', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_2', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_3', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_4', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_5', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_6', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_7', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_8', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_9', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_10', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_11', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_12', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_13', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_14', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_15', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('photo_16', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('is_published', models.BooleanField(default=True)),
                ('list_date', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('realtor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='realtors.realtor')),
            ],
        ),
    ]