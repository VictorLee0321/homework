# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-09 15:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anonymous', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Emails',
            fields=[
                ('email', models.EmailField(max_length=254, primary_key=True, serialize=False)),
                ('check_code', models.CharField(max_length=6)),
            ],
        ),
    ]