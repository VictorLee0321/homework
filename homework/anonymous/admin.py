from django.contrib import admin

from models import Clazz

# Register your models here.
class ClazzAdmin(admin.ModelAdmin):
    list_display = ('clazz_id', 'clazz_name', 'province', 'university', 'department', 'major', 'entrance', 'graduation')

admin.site.register(Clazz, ClazzAdmin)
