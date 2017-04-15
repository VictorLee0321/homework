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

from anonymous.models import *

reload(sys)
sys.setdefaultencoding('utf-8')
# Create your views here.

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
        clazz_id = str(student.clazz_id).split("_")[0]
        print 'clazz_id is: ', clazz_id
        clazz_name = Clazz.objects.get(clazz_id = clazz_id).clazz_name
        dic = {}
        dic['clazz_name'] = str(clazz_name)
        dic['stu_name'] = str(stu_name)
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