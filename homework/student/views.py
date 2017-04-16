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

def getUnsubmitCourse(request):
    if request.POST.has_key('clazz_id'):
        clazz_id = request.POST['clazz_id']
        student_id = request.POST['student_id']
        account = request.POST['account']
        # 该班级课程
        courses = Course.objects.all().filter(clazz_id = clazz_id)
        print courses
        courses_ids = courses.values('course_id')
        # 班级所有课程作业
        tasks = Task.objects.all().filter(course_id__in = courses_ids)
        print tasks
        # 学生已经完成的作业
        finishs = Finish.objects.all().filter(student_id = student_id)
        print finishs
        # 学生未完成的作业
        finishs_task_ids = finishs.values('task_id')
        not_finishs = tasks.filter(~Q(task_id__in = finishs_task_ids))
        #index = 0
        ret_dic = []
        for pk in not_finishs.values("task_id"):
            print ',,,,,,,,,,,,,,,,,,,,,,,,,'
            print str(pk)
            #print not_finishs.get(task_id = pk['task_id']).course_id
            course_id = not_finishs.get(task_id=pk['task_id']).course_id
            print course_id
            course_name = Course.objects.get(course_id = str(course_id)).course_name
            print course_name
            task_name = not_finishs.get(task_id=pk['task_id']).task_name
            print task_name
            #last_time = not_finishs.get(task_id=pk['task_id']).last_time.strftime("%Y-%m-%d %H:%M:%S")
            last_time = not_finishs.get(task_id=pk['task_id']).last_time.strftime("%Y-%m-%d %H:%M:%S")
            print last_time
            print '-------------------------'
            course_task_name = course_name + ":" + task_name
            #print new_not_name
            #not_finishs.get(task_id=pk['task_id']).task_name = new_not_name
            #print not_finishs.get(task_id=pk['task_id']).task_name
            #ret_dic[index] = {"task_id":str(pk)['task_id'], "course_task_name":course_task_name, "last_time":last_time.strftime("%Y-%m-%d %H:%M:%S")}
            #ret_dic[index] = {"task_id":pk['task_id'], "course_task_name":course_task_name, "last_time":str(last_time)}
            ret_dic.append({"task_id":pk['task_id'], "course_task_name":course_task_name, "last_time":str(last_time)})
            #index = index + 1

        #not_finishs = serializers.serialize("json", not_finishs)
        #print not_finishs
        #ret_str_json = list(ret_dic)
        #ret_str_json = serializers.serialize("json", ret_dic)
        ret_str_json = json.dumps(ret_dic)
        print ret_str_json
        return HttpResponse(ret_str_json)


def checkUser(request):
    if request.POST.has_key('password'):
        account = request.POST['account']
        password = request.POST['password']
        ret_code = 5
        try:
            user = User.objects.get(account = account)
            psw = user.password
            if (password == psw):
                ret_code = user.role
        except Exception, e:
            print Exception, ":", e
            ret_code = 4
        return HttpResponse(ret_code)

def index(request):
    return render(request, 'student/stu_index.html')

def loadkUser(request):
    if request.POST.has_key('account'):
        account = request.POST['account']
        user = User.objects.get(account = account)
        stu_id = user.role_id
        student = Student.objects.get(student_id = stu_id)
        stu_name = student.student_name
        #clazz_id = str(student.clazz_id).split("_")[0]
        clazz_id = student.clazz_id
        print 'clazz_id is: ', clazz_id
        clazz_name = Clazz.objects.get(clazz_id = clazz_id).clazz_name
        dic = {}
        dic['clazz_name'] = str(clazz_name)
        dic['stu_name'] = str(stu_name)
        dic['stu_id'] = str(stu_id)
        dic['clazz_id'] = str(clazz_id)
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