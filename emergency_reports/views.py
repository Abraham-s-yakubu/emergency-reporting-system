from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request, 'emergency_reporting/report.html')
def chatbot_view(request):
    return render(request,  'emergency_reporting/chat bot.html')
def video_gallery_view(request):
    # You would fetch video data here
    # For example: media_items = AccidentMedia.objects.filter(file_type__startswith='video')
    context = {}
    return render(request,  'emergency_reporting/video gallary.html', context)
