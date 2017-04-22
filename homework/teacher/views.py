#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone

from django.core import serializers
from django.db.models import Q
import json
from django.core.mail import send_mail

from models import *
import os
import time
import sys
import codecs

from itertools import chain

from anonymous.models import *

reload(sys)
sys.setdefaultencoding('utf-8')

# Create your views here.

def uploadXlsFile(request):
    if request.method == "POST":
        teacher_id = request.POST['teacher_id']
        print 'steacher_id: ', teacher_id
        xls_file = request.FILES.get("xls_file", None)
        return HttpResponse("2")
    return HttpResponse("2")

def cicosGetUnsubmitHomework(request):
    if request.POST.has_key('task_id'):
        task_id = request.POST['task_id']
        course_id = request.POST['course_id']
        try:
            finish_student_ids = Finish.objects.all().filter(task_id=task_id).values("student_id")
            clazz_id = Course.objects.get(course_id=course_id).clazz_id
            clazz = Clazz.objects.get(clazz_id=clazz_id)
            clazz_name = clazz.clazz_name
            clazz_student_unsubmit = Student.objects.all().filter(Q(clazz_id=clazz_id), ~Q(student_id__in=finish_student_ids)).values("student_id", "student_name")
            print clazz_student_unsubmit
            for i in clazz_student_unsubmit:
                i['clazz_name'] = clazz_name
                print i
                print type(i)
            print clazz_student_unsubmit
            clazz_student_unsubmit = json.dumps(list(clazz_student_unsubmit))
            return HttpResponse(clazz_student_unsubmit)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')

def cicosGetOvertimeHomework(request):
    if request.POST.has_key('task_id'):
        task_id = request.POST['task_id']
        try:
            # return is_overtime=True
            finishs = Finish.objects.all().filter(task_id=task_id, is_overtime=True).values("file_path")
            print finishs
            finishs = json.dumps(list(finishs))
            return HttpResponse(finishs)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')

def cicosGetSubmitHomework(request):
    if request.POST.has_key('task_id'):
        task_id = request.POST['task_id']
        try:
            finishs = Finish.objects.all().filter(task_id=task_id).values("file_path")
            print finishs
            finishs = json.dumps(list(finishs))
            return HttpResponse(finishs)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')

def cicosLoadExp(request):
    if request.POST.has_key('course_id'):
        course_id = request.POST['course_id']
        try:
            tasks = Task.objects.all().filter(course_id=course_id).values("task_id", "task_name")
            tasks = json.dumps(list(tasks))
            return HttpResponse(tasks)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')
    return HttpResponse('none')

def teacherAddCourse(request):
    if request.POST.has_key('teacher_id'):
        teacher_id = request.POST['teacher_id']
        course_name = request.POST['add_course_name']
        clazz_id = request.POST['clazz_id']
        teach_year = request.POST['teach_year']
        term = request.POST['term']
        try:
            course_exist = Course.objects.all().filter(Q(teacher_id=teacher_id), Q(clazz_id=clazz_id), Q(course_name=course_name))
            if len(course_exist) > 0:
                print 'aready have this course_name'
                return HttpResponse("2")
            teacher = Teacher.objects.get(teacher_id=teacher_id)
            clazz = Clazz.objects.get(clazz_id=clazz_id)
            Course.objects.create(course_name=course_name, teach_year=teach_year, term=term,teacher_id=teacher,clazz_id=clazz)
            return HttpResponse("0")
        except Exception, e:
            print Exception, ":", e
            return HttpResponse("2")
        return HttpResponse("2")

def cicosAddTask(request):
    if request.POST.has_key('teacher_id'):
        teacher_id = request.POST['teacher_id']
        course_id = request.POST['issue_course_id']
        issue_task_name = request.POST['issue_task_name']
        issue_last_time = request.POST['issue_last_time']
        begin_remind = request.POST['begin_remind']
        print type(begin_remind)
        print teacher_id, course_id, issue_task_name, issue_last_time
        try:
            task_exist = Task.objects.all().filter(Q(course_id=course_id), Q(task_name=issue_task_name))
            print task_exist
            print len(task_exist)
            print type(len(task_exist))
            if len(task_exist) > 0:
                print 'aready have this task_name'
                return HttpResponse("2")
            course = Course.objects.get(course_id=course_id)
            Task.objects.create(task_name=issue_task_name, course_id=course, last_time=issue_last_time, begin_remind=begin_remind)
            return HttpResponse("0")
        except Exception, e:
            print Exception, ":", e
            return HttpResponse("2")
        return HttpResponse('2')

def cicosLoadCourse(request):
    if request.POST.has_key('teacher_id'):
        teacher_id = request.POST['teacher_id']
        try:
            courses = Course.objects.all().filter(teacher_id = teacher_id).values("course_id", "course_name")
            courses = list(courses)
            courses = json.dumps(courses)
            return HttpResponse(courses)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')
    return HttpResponse('none')

def teacherLoadClazz(request):
    if request.POST.has_key('teacher_id'):
        teacher_id = request.POST['teacher_id']
        try:
            clazzs = Clazz.objects.all().values("clazz_id", "clazz_name")
            clazzs = list(clazzs)
            clazzs = json.dumps(clazzs)
            return HttpResponse(clazzs)
        except Exception, e:
            print Exception, ":", e
            return HttpResponse('none')
    return HttpResponse('none')

def index(request):
    return render(request, 'teacher/teacher_index.html')

def loadTeacher(request):
    if request.POST.has_key('account'):
        account = request.POST['account']
        user = User.objects.get(account = account)
        teacher_id = user.role_id
        teacher = Teacher.objects.get(teacher_id = teacher_id)
        teacher_name = teacher.teacher_name
        dic = {}
        dic['teacher_name'] = str(teacher_name)
        dic['teacher_id'] = str(teacher_id)
        ret_str = json.dumps(dic)
        return HttpResponse(ret_str)

def updatePsw(request):
    if request.POST.has_key('new_psw'):
        ret_code = 2
        new_psw = request.POST['new_psw']
        old_psw = request.POST['old_psw']
        account = request.POST['account']
        user = User.objects.get(account = account)
        password = user.password
        if (password == old_psw):
            user.password = new_psw
            user.save()
            ret_code = 0
        else:
            ret_code = 1
        return HttpResponse(ret_code)