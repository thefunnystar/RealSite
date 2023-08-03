# Generated by Django 4.2.2 on 2023-08-02 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='photo_10',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_11',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_12',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_13',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_14',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_15',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_16',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_5',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_6',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_7',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_8',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='photo_9',
        ),
        migrations.AddField(
            model_name='listing',
            name='city',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='listing',
            name='zipcode',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='state',
            field=models.CharField(max_length=100),
        ),
    ]
