from django.urls import path
from . import views 

urlpatterns = [
    path('', views.home_view, name='index'),
    path('chatbot/', views.chatbot_view, name='Chatbot'),
    path('video-gallery/', views.video_gallery_view, name='video_gallery'),
    path('submit-report/', views.submit_report, name='submit_report'),
    path('fire-dashboard/', views.fire_dashboard_main, name='fire_dashboard_main'),
    path('accident-dashboard/', views.accident_dashboard_main, name='accident_dashboard_main'),
    path('fire-map/', views.fire_map, name='fire_map'),
    path('accident-map/', views.accident_map, name='accident_map'),
    path('fire-report-management/', views.fire_report_management, name='fire_report_management'),
    path('accident-report-management/', views.accident_report_management, name='accident_report_management'),
    path('fire-analysis-and-trend/', views.fire_analysis_and_trend, name='fire_analysis_and_trend'),
    path('accident-analysis-and-trend/', views.accident_analysis_and_trend, name='accident_analysis_and_trend'),
    path('fire-admin/', views.fire_admin, name='fire_admin'),
    path('accident-admin/', views.accident_admin, name='accident_admin'),
    
    ]
        