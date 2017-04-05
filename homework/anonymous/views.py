#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers
from django.db.models import Q
import json
from django.core.mail import send_mail
import random

from models import Clazz

clazzs = Clazz.objects.all()

def index(request):
	provinces = clazzs.values("province").distinct()
	return render(request, 'anonymous/index.html', {'provinces': provinces})

def loadUniversity(request):
	if request.POST.has_key('province'):
		province = request.POST['province']
		universitys = clazzs.filter(province = province).values("university").distinct()
		universitys = list(universitys)
		universitys = json.dumps(universitys)
		return HttpResponse(universitys)
	return HttpResponse('none')

def loadDepartment(request):
	if request.POST.has_key('university'):
		province = request.POST['province']
		university = request.POST['university']
		departments = clazzs.filter(Q(province = province), Q(university = university)).values("department").distinct()
		departments = list(departments)
		departments = json.dumps(departments)
		return HttpResponse(departments)
	return HttpResponse('none')

def loadMajor(request):
	if request.POST.has_key('department'):
		province = request.POST['province']
		university = request.POST['university']
		department = request.POST['department']
		majors = clazzs.filter(Q(province = province), Q(university = university), Q(department = department)).values("major").distinct()
		majors = list(majors)
		majors = json.dumps(majors)
		return HttpResponse(majors)
	return HttpResponse('none')

def loadClazz(request):
	if request.POST.has_key('major'):
		province = request.POST['province']
		university = request.POST['university']
		department = request.POST['department']
		major = request.POST['major']
		clazzss = clazzs.filter(Q(province = province), Q(university = university), Q(department = department), Q(major = major)).values("clazz_name").distinct()
		clazzss = list(clazzss)
		clazzss = json.dumps(clazzss)
		return HttpResponse(clazzss)
	return HttpResponse('none')

def sendEmailCode(request):
	if request.POST.has_key('email'):
		email = request.POST['email']
		check_code = random.randint(100000, 999999)
		send_mail('Register to homework_web', 'check code is: ' + str(check_code), 'homework_victor@163.com', [email], fail_silently=False)
		return HttpResponse(check_code)