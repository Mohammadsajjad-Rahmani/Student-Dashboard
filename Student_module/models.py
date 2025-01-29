from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class Student(AbstractUser):
    class Gender(models.TextChoices):
        MALE = 'MALE', 'Male'
        FEMALE = 'FEMALE', 'Female'
    picture = models.ImageField(upload_to='uploads/images')
    first_name = models.CharField(max_length=50, verbose_name='first_name')
    last_name = models.CharField(max_length=50, verbose_name='last_name')
    username = models.CharField(max_length=50, unique=True,null=True,blank=False)
    password = models.CharField(max_length=50, verbose_name='password')
    gender = models.CharField(max_length=50, choices=Gender.choices, verbose_name='gender')
    birthday = models.DateField(verbose_name='birthday', null=True, blank=False)
    address = models.TextField(max_length=50, verbose_name='address')
    active = models.BooleanField(default=True,verbose_name='activate situation')
    last_login = models.DateTimeField(verbose_name='last login',null=True,blank=True)


    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Semester(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE,verbose_name='student')
    semester_number = models.IntegerField(verbose_name='semester_number')
    gpa = models.FloatField(verbose_name='gpa')
    total_credit = models.IntegerField(verbose_name='total_credit')
    passed_credit = models.IntegerField(verbose_name='passed_credit')

    def failed_credits(self):
        if self.total_credit - self.passed_credit > 0:
            return self.total_credit - self.passed_credit
        else:
            return 0

    def __str__(self):
        return f"Semester {self.semester_number} for Student {self.student.username}"



class Course(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE,verbose_name='semester')
    name = models.CharField(max_length=70, verbose_name='name')
    credit = models.IntegerField(verbose_name='credit score')
    grade = models.FloatField(verbose_name='grade')
    professor = models.CharField(max_length=70, verbose_name='professor',null=True, blank=False)
    rank = models.IntegerField(verbose_name='rank',null=True, blank=False)

    def __str__(self):
        return f"Course {self.name} in Semester {self.semester} for Student {self.semester.semester_number}"


