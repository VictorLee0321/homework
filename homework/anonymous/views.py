#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone

from django.core import serializers
from django.db.models import Q
import json
from django.core.mail import send_mail
import random
from models import *
import os
import time
import sys
import codecs

reload(sys)
sys.setdefaultencoding('utf-8')

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
		clazzss = clazzs.filter(Q(province = province), Q(university = university), Q(department = department), Q(major = major)).values("clazz_name", "clazz_id")
		clazzss = list(clazzss)
		clazzss = json.dumps(clazzss)
		return HttpResponse(clazzss)
	return HttpResponse('none')

def loadCourse(request):
	if request.POST.has_key('clazz_id'):
		clazz_id = request.POST['clazz_id']
		try:
			courses = Course.objects.all().filter(clazz_id = clazz_id).values("course_id", "course_name")
			courses = list(courses)
			courses = json.dumps(courses)
			return HttpResponse(courses)
		except Exception, e:
			print Exception, ":", e
			return HttpResponse('none')
	return HttpResponse('none')

def loadTask(request):
	if request.POST.has_key('course_id'):
		course_id = request.POST['course_id']
		try:
			tasks = Task.objects.all().filter(course_id = course_id).values("task_id", "task_name")
			tasks = json.dumps(list(tasks))
			return HttpResponse(tasks)
		except Exception, e:
			print Exception, ":", e
			return HttpResponse('none')
	return HttpResponse('none')

def checkAnonStudent(request):
	print 'sys default encoding is: ', sys.getdefaultencoding()

	if request.POST.has_key('student_id'):
		student_id = request.POST['student_id']
		student_name = request.POST['student_name']
		clazz_id = request.POST['clazz_id']
		try:
			stu = Student.objects.all().filter(Q(clazz_id = clazz_id), Q(student_id = student_id), Q(student_name = student_name)).values("student_id")
		except Exception, e:
			print Exception, ":", e
			return HttpResponse(1)
		if (0 == len(stu)):
			print stu, 'num is: ', len(stu)
			return HttpResponse(1)
		return HttpResponse(0)
	return HttpResponse(1)

def uploadFile(request):
	print 'sys default encoding is: ', sys.getdefaultencoding()

	if request.method == "POST":
		student_id = request.POST['student_id']
		task_id = request.POST['task_id']
		fileType = request.POST['fileType']
		print 's_id,tid is,fileType: ', student_id, task_id, fileType
		myFile = request.FILES.get("file", None)
		if not myFile:
			print 'no files for upload!'
			return HttpResponse("no files for upload!")
		#destination = open(os.path.join("/file_homework/", myFile.name), 'w+')  # 打开特定的文件进行二进制的写操作
		#for chunk in myFile.chunks():  # 分块写入文件
			#destination.write(chunk)
		print 'myFile name is: ', str(myFile.name)
		file_save = "/file_homework/" + str(task_id)
		print 'file_save is: ' + file_save
		if not os.path.exists(file_save):
			os.makedirs(file_save, mode=0777)
		student = Student.objects.get(student_id=student_id)
		task = Task.objects.get(task_id=task_id)
		# make the file_path
		student_name = student.student_name
		task_name = task.task_name
		course_id = task.course_id
		course_name = Course.objects.get(course_id=str(course_id)).course_name
		file_new_name = str(student_id) + '-' + str(student_name) + '-' + str(course_name) + '-' + str(task_name) + '.' + str(fileType)

		destination = codecs.open(os.path.join(file_save, str(file_new_name)), 'wb+')  # 打开特定的文件进行二进制的写操作
		#destination = codecs.open(os.path.join(file_save, str(myFile.name)), 'wb+')  # 打开特定的文件进行二进制的写操作 origin
		for chunk in myFile.chunks():  # 分块写入文件
			destination.write(chunk)
		destination.close()
		print 'write finish by codecs---------------------'
		#student = Student.objects.get(student_id=student_id)
		#task = Task.objects.get(task_id=task_id)
		# full save file path
		file_full_path = file_save + '/' + file_new_name
		print 'file_full_path is: ' + file_full_path
		last_time = task.last_time
		print 'last_time is: ', last_time
		last_time = time.mktime(time.strptime(str(last_time), "%Y-%m-%d %H:%M:%S"))
		print 'last_time seconds is: ', last_time
		now_time = time.time()
		print 'now_time is: ', now_time
		is_overtime = False
		ret_code = 0
		if (last_time < now_time):
			is_overtime = True
			ret_code = 1
		print 'is_overtime is: ', is_overtime

		finish = Finish(task_id=task, student_id=student, is_overtime = is_overtime, file_path = file_full_path)
		try:
			Finish.objects.filter(Q(task_id=task_id), Q(student_id=student_id)).delete()
		except Exception, e:
			print Exception, ":", e
		finish.save()
		print 'upload over!'
		return HttpResponse(ret_code)
	return HttpResponse("error: no files to post to backend!")

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
		send_mail('Sure 4 Register 2 homework_web', 'check code is: ' + str(check_code), 'homework_victor@163.com', [email], fail_silently=False)
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
		try:
			register_code = Emails.objects.get(email = email).check_code
		except Exception, e:
			print Exception, ":", e
			return HttpResponse(4)
		if (register_code != str(email_code)):
			return HttpResponse(3)
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
