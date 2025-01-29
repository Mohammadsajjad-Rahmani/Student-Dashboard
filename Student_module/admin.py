from django.contrib import admin

from Student_module.models import Student, Semester, Course


# Register your models here.

class StudentAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'username']


class SemesterAdmin(admin.ModelAdmin):
    list_display = ['semester_number']


class CourseAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(Student, StudentAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(Course, CourseAdmin)
