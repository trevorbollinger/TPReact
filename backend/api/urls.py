from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.UserDetailView.as_view(), name='user-detail'),
    path('attractions/', views.AttractionsView.as_view(), name='attractions'),
    path('hotels/', views.HotelsView.as_view(), name='hotels'),
]
