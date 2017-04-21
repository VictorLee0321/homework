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