from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('get_key/', views.get_key, name='get_key'),
    path('', views.index, name='index')
]


