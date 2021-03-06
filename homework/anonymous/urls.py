"""homework URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'loadUniversity', views.loadUniversity),
    url(r'loadDepartment', views.loadDepartment),
    url(r'loadMajor', views.loadMajor),
    url(r'loadClazz', views.loadClazz),
    url(r'loadCourse', views.loadCourse),
    url(r'loadTask', views.loadTask),
    url(r'sendEmailCode', views.sendEmailCode),
    url(r'register', views.register),
    url(r'checkAnonStudent', views.checkAnonStudent),
    url(r'uploadFile', views.uploadFile),
    #url(r'logout', views.logout),
]
