from django.shortcuts import render
from django.http import HttpResponse

from . import models

def index(request):
	return render(request, 'anonymous/index.html', {'class': 'c0'})
