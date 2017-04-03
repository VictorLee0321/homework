from django.shortcuts import render
from django.http import HttpResponse

from models import Clazz

def index(request):
	clazzs = Clazz.objects.all()
	return render(request, 'anonymous/index.html', {'clazzs': clazzs})
