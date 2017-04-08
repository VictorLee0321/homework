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

    def __unicode__(self):
        return self.clazz_id

class User(models.Model):
    role_choices = ((0, 'admin'), (1, 'teacher'), (2, 'student'), (3, 'guest'))
    account = models.CharField(max_length=20, primary_key=True)
    password = models.CharField(max_length=20)
    role = models.IntegerField(choices=role_choices, default=3)
    role_id = models.CharField(max_length=20)
    email = models.EmailField()
    register_time = models.DateTimeField(auto_now_add=True)
    validate_code = models.CharField(max_length=32)

class Student(models.Model):
    sex_choices = ((0, 'female'), (1, 'male'))
    student_id = models.CharField(max_length=20, primary_key=True)
    student_name = models.CharField(max_length=50)
    sex = models.IntegerField(choices=sex_choices, default=1)
    clazz_id = models.ForeignKey(Clazz)

    def __unicode__(self):
        return self.student_id

class Teacher(models.Model):
    sex_choices = ((0, 'female'), (1, 'male'))
    teacher_id = models.CharField(max_length=20, primary_key=True)
    teacher_name = models.CharField(max_length=50)
    sex = models.IntegerField(choices=sex_choices, default=1)

    def __unicode__(self):
        return self.teacher_id

class Course(models.Model):
    term_choices = ((1, '1'), (2, '2'))
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=50)
    teach_year = models.DateField()
    term = models.IntegerField(choices=term_choices, default=1)
    teacher_id = models.ForeignKey(Teacher)
    clazz_id = models.ForeignKey(Clazz)

    #def __str__(self):
        #return u'%s_%s' % (self.course_id, self.course_name)

    def __unicode__(self):
        return u'%s_%s' % (self.course_id, self.course_name)

class Admin(models.Model):
    admin_id = models.AutoField(primary_key=True)
    admin_name = models.CharField(max_length=50)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_name  = models.CharField(max_length=50)
    course_id = models.ForeignKey(Course)
    last_time = models.DateTimeField()
    issue_time = models.DateTimeField(auto_now_add=True)
    begin_remind = models.IntegerField()

    def __unicode__(self):
        #return str(self.task_id) + ":" + self.task_name
        return u'%s_%s' % (self.task_id, self.task_name)

class Finish(models.Model):
    task_id = models.ForeignKey(Task)
    student_id = models.ForeignKey(Student)
    submit_time = models.DateTimeField(auto_now=True)
    is_overtime = models.BooleanField(default=False)
    file_path = models.CharField(max_length=300)



