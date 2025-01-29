from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from django.views import View
from Entrycontrol_module.forms import LoginForm
from Student_module.backends import StudentBackend

class LoginView(View):
    def get(self, request):
        login_form = LoginForm()
        context = {
            'login_form': login_form
        }
        return render(request, 'login-page.html', context)

    def post(self, request):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')
            backend = StudentBackend()
            student = backend.authenticate(request, username=username, password=password)
            print(student)
            if student is not None:
                if student.active:
                    print('logged in')
                    login(request, student, backend='Student_module.backends.StudentBackend')
                    return redirect('home')

            login_form.add_error(None, 'Cant Find Student With This Information')
        context = {
            'login_form': login_form
        }
        return render(request, 'login-page.html', context)

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')