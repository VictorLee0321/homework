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

class User(models.Model):
    role_choices = ((0, 'admin'), (1, 'teacher'), (2, 'student'), (3, 'guest'))
    account = models.CharField(max_length=20, primary_key=True)
    password = models.CharField(max_length=20)
    role = models.IntegerField(choices=role_choices, default=3)
    role_id = models.CharField(max_length=20)
    email = models.EmailField()
    register_time = models.DateTimeField()
    validate_code = models.CharField(max_length=32)

class Student(models.Model):
    sex_choices = ((0, 'female'), (1, 'male'))
    student_id = models.CharField(max_length=20, primary_key=True)
    student_name = models.CharField(max_length=50)
    sex = models.IntegerField(choices=sex_choices, default=1)
    clazz_id = models.ForeignKey(Clazz)

class Teacher(models.Model):
    sex_choices = ((0, 'female'), (1, 'male'))
    teacher_id = models.CharField(max_length=20, primary_key=True)
    teacher_name = models.CharField(max_length=50)
    sex = models.IntegerField(choices=sex_choices, default=1)

class Course(models.Model):
    course_id = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=20)
    teach_year = models.DateField()

