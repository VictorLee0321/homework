from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Clazz(models.Model):
    clazz_id = models.CharField(max_length=20, primary_key=True)
    clazz_name = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    university = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    major = models.CharField(max_length=50)
    entrance = models.DateField()
    graduation = models.DateField()
