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
from django.conf.urls import url, include
from django.contrib import admin

from teacher import views

urlpatterns = [
    url(r'student', include('student.urls', namespace='student')),

    url(r'teacher', include('teacher.urls', namespace='teacher')),

    url(r'^admin/', admin.site.urls),

    url(r'^download/filename=(?P<filename>.{1,500})/$', views.get_download_all),

    url(r'^', include('anonymous.urls', namespace='anonymous')),

    #url(r'loadUniversity', include('anonymous.urls', namespace='anonymous')),
    #url(r'loadDepartment', include('anonymous.urls', namespace='anonymous')),
    #url(r'loadMajor', include('anonymous.urls', namespace='anonymous')),
    #url(r'loadClazz', include('anonymous.urls', namespace='anonymous')),
    #url(r'loadCourse', include('anonymous.urls', namespace='anonymous')),
    #url(r'loadTask', include('anonymous.urls', namespace='anonymous')),
    #url(r'sendEmailCode', include('anonymous.urls', namespace='anonymous')),
    #url(r'register', include('anonymous.urls', namespace='anonymous')),
    #url(r'checkAnonStudent', include('anonymous.urls', namespace='anonymous')),
    #url(r'uploadFile', include('anonymous.urls', namespace='anonymous')),
]
