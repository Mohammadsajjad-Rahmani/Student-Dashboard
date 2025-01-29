from django.urls import path
from Home_module import views

urlpatterns = [
    path('', views.Home_page, name='temp'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('home/semester/<int:sn>', views.HomeView.as_view(), name='filter-semester'),
    path('home/semester/filter', views.FilterData, name='filter-data'),
    path('download/pdf/', views.DownloadPDFView.as_view(), name='download-pdf'),
    path('download/excel/', views.DownloadExcelView.as_view(), name='download-excel'),
    path('download/word/', views.DownloadWordView.as_view(), name='download-word'),
    path('overall/', views.Overall, name='overall'),
]

