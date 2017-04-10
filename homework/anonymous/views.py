#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers
from django.db.models import Q
import json
from django.core.mail import send_mail
import random
from models import *

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
		print 'email: ' + email + ' check code is: ' + str(check_code)
		e1 = Emails(email = email, check_code = check_code)
		try:
			e1.save(force_insert=True)
		except Exception, e:
			print Exception, ":", e
			check_code = 1
			return HttpResponse(check_code)
		#send_mail('Sure 4 Register 2 homework_web', 'check code is: ' + str(check_code), 'homework_victor@163.com', [email], fail_silently=False)
		return HttpResponse(check_code)

def register(request):
	if request.POST.has_key('email_code'):
		email_code = request.POST['email_code']
		email = request.POST['email']
		account = request.POST['account']
		studentID = request.POST['studentID']
		type = request.POST['type']
		name = request.POST['name']
		sex = request.POST['sex']
		psw = request.POST['psw']
		ret_code = 1
		role = 3
		if ('2' == type):
			try:
				stu = Student.objects.get(student_id = studentID)
				if (stu.student_name == name and str(stu.sex) == sex):
					ret_code = 0
					role = 2
			except Exception, e:
				print Exception, ":", e
		else:
			try:
				tec = Teacher.objects.get(teacher_id = studentID)
				if (tec.teacher_name == name and str(tec.sex) == sex):
					ret_code = 0
					role = 1
			except Exception, e:
				print Exception, ":", e
		if (0 == ret_code):
			u1 = User(account=account, password=psw, role=role, role_id=studentID, email=email, validate_code=email_code)
			try:
				u1.save(force_insert=True)
			except Exception, e:
				print Exception, ":", e
				ret_code = 2
		return HttpResponse(ret_code)