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

import xlrd

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
        if not xls_file:
            print 'no xls_file for upload!'
            return HttpResponse("no xls_files for upload!")
        xls_name = xls_file.name
        print 'xls_file name is: ', str(xls_name)
        file_save = "/file_homework/upload_xls_file/"
        if not os.path.exists(file_save):
            os.makedirs(file_save, mode=0777)
        destination = codecs.open(os.path.join(file_save, str(xls_name)), 'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in xls_file.chunks():  # 分块写入文件
            destination.write(chunk)
        destination.close()
        print 'write finish by codecs---------------------'
        print 'in xlrd operate begin---'
        xls_path = file_save + str(xls_name)
        bk = xlrd.open_workbook(xls_path)
        try:
            #sh = bk.sheet_by_name("Sheet1") # get from name
            sh = bk.sheets()[0]
        except Exception, e:
            print Exception, ":", e
            ret_str =  "no sheet in %s, please check it" % xls_name
            print ret_str
            return HttpResponse(ret_str)
        nrows = sh.nrows
        #ncols = sh.ncols
        #stu_id, stu_name, sex, clazz_name = 'default'
        for i in range(nrows):
            if (0 == i):
                continue
            #for j in range(ncols):
            #    print i,j
            #    print sh.cell(i, j).value,
            #    a = sh.cell(i, j).value,
            #    print type(a)
            #    b = str(a)
            #    print b,type(b)
            stu_id = str(sh.cell(i, 0).value)
            stu_name = str(sh.cell(i, 1).value)
            sex_name = str(sh.cell(i, 2).value)
            sex = 1
            if "女" == sex_name:
                sex = 0
            clazz_name = str(sh.cell(i, 3).value)
            try:
                clazz_id = Clazz.objects.get(clazz_name=clazz_name).clazz_id
            except Exception, e:
                print Exception, ":", e
                return HttpResponse("2")
            aready_stu = Student.objects.filter(student_id=stu_id)
            if len(aready_stu) > 0:
                print 'this student had exist!!!'
                ret_txt = 3 + i
                return HttpResponse(ret_txt)
            clazz = Clazz.objects.get(clazz_name=clazz_name)
            Student.objects.create(student_id=stu_id, student_name=stu_name, sex=sex, clazz_id=clazz)
        print 'in xlrd operate end------'
        return HttpResponse("0")
    return HttpResponse("3")

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

def cicos_check_download_all(request):
    if request.POST.has_key('task_id'):
        task_id = request.POST['task_id']
        is_overtime = request.POST['is_overtime']
        print is_overtime, type(is_overtime)
        if ("1" == is_overtime):
            is_overtime = True
        else:
            is_overtime = False
        print is_overtime, type(is_overtime)
        if (is_overtime):
            print is_overtime, type(is_overtime)
            file_paths = Finish.objects.all().filter(task_id=task_id, is_overtime=is_overtime).values("file_path")
        else:
            file_paths = Finish.objects.all().filter(task_id=task_id).values("file_path")

        print file_paths
        file_paths = json.dumps(list(file_paths))
        print file_paths


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
