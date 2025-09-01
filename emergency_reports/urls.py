from django.urls import path
from . import views 

urlpatterns = [
    path('', views.home_view, name='index'),
    path('chatbot/', views.chatbot_view, name='Chatbot'),
    path('video-gallery/', views.video_gallery_view, name='video_gallery'),
    ]
    