from django.contrib import admin

from models import Clazz
from models import User
from models import Admin
from models import Task
from models import Finish
from models import Teacher
from models import Student
from models import Course
from models import Emails

# Register your models here.
class ClazzAdmin(admin.ModelAdmin):
    list_display = ('clazz_id', 'clazz_name', 'province', 'university', 'department', 'major', 'entrance', 'graduation')

class UserAdmin(admin.ModelAdmin):
    list_display = ('account', 'password', 'role', 'role_id', 'email', 'register_time', 'validate_code')

class AdminAdmin(admin.ModelAdmin):
    list_display = ('admin_id', 'admin_name')

class TaskAdmin(admin.ModelAdmin):
    list_display = ('task_id', 'task_name', 'course_id', 'last_time', 'issue_time', 'begin_remind')

class FinishAdmin(admin.ModelAdmin):
    list_display = ('task_id', 'student_id', 'submit_time', 'is_overtime', 'file_path')

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('teacher_id', 'teacher_name', 'sex')

class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'student_name', 'sex', 'clazz_id')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_id', 'course_name', 'teach_year', 'term', 'teacher_id', 'clazz_id')

class EmailsAdmin(admin.ModelAdmin):
    list_display = ('email', 'check_code')


admin.site.register(Clazz, ClazzAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Finish, FinishAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Emails, EmailsAdmin)
