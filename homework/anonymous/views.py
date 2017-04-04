#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers
import json

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

