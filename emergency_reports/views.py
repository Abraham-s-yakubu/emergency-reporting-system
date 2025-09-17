from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import FireIncident, AccidentIncident, FireMedia, AccidentMedia
from django.db import transaction
from supabase import create_client, Client
import os
import uuid

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL") 
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


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
def fire_dashboard_main(request):
    return render(request,'admin fire/fire_main_dashboard.html')
def accident_dashboard_main(request):
    return render(request,'admin frsc/accident_main_dashboard.html')
def fire_map(request):
    return render(request,'admin fire/fire map.html')
def accident_map(request):
    return render(request,'admin frsc/accident map.html')
def fire_report_management(request):
    return render(request,'admin fire/Fire Report Management.html')
def accident_report_management(request):
    return render(request,'admin frsc/accident report management.html')
def fire_analysis_and_trend(request):
    return render(request,'admin fire/fire analysis and trend.html')
def accident_analysis_and_trend(request):
    return render(request,'admin frsc/accident analysis and trend.html')

def fire_admin(request):
    return render(request,'admin fire/fire admin page.html')
def accident_admin(request):
    return render(request,'admin frsc/accident admin page.html')
# @csrf_exempt
# def submit_report(request):
#     """
#     Receives and processes an emergency report submitted via a POST request
#     from the front-end JavaScript.
#     """
#     if request.method == 'POST':
#         try:
#             # Access text data from request.POST
#             mode = request.POST.get('mode')
#             incident_type = request.POST.get('incident_type')
#             severity = request.POST.get('severity')
#             explanation = request.POST.get('explanation')
#             num_injured = request.POST.get('num_injured', 0)
#             address = request.POST.get('address', '')
#             latitude = request.POST.get('latitude')
#             longitude = request.POST.get('longitude')
            
#             # Use a transaction to ensure atomicity
#             with transaction.atomic():
#                 if mode == 'fire':
#                     # Create a new FireIncident object
#                     new_incident = FireIncident.objects.create(
#                         incident_type=incident_type,
#                         severity_level=severity,
#                         additional_info=explanation,
#                         number_of_injured=num_injured,
#                         address=address,
#                         latitude=latitude,
#                         longitude=longitude,
#                     )
#                     media_model = FireMedia
#                 elif mode == 'accident':
#                     # Create a new AccidentIncident object
#                     new_incident = AccidentIncident.objects.create(
#                         incident_type=incident_type,
#                         severity_level=severity,
#                         additional_info=explanation,
#                         number_of_injured=num_injured,
#                         address=address,
#                         latitude=latitude,
#                         longitude=longitude,
#                     )
#                     media_model = AccidentMedia
#                 else:
#                     return JsonResponse({'status': 'error', 'message': 'Invalid report mode.'}, status=400)

#                 # Access uploaded files from request.FILES
#                 uploaded_files = request.FILES.getlist('incident_images')
#                 # Note: This is where you would upload files to Supabase and get the URLs.
#                 # For this example, we will simulate this by creating a URL from the filename.
#                 for file in uploaded_files:
#                     # In a real-world scenario, you would upload the file to Supabase here
#                     # and get the public URL.
#                     # Example: public_url = supabase.storage.from('your_bucket').upload(file)
                    
#                     # For now, we'll create a placeholder URL
#                     image_url = f"https://your-supabase-url.com/storage/v1/object/public/{file.name}"
                    
#                     # Create a new media object for each uploaded file
#                     media_model.objects.create(incident=new_incident, image_url=image_url)

#             # Return a success message as JSON
#             return JsonResponse({'status': 'success', 'message': 'Report submitted successfully!'})

#         except Exception as e:
#             # Log the error for debugging
#             print(f"Error submitting report: {e}")
#             # Return an error message as JSON
#             return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)
    
#     # Handle non-POST requests
#     return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)
@csrf_exempt
def submit_report(request):
    """
    Receives and processes an emergency report submitted via a POST request
    from the front-end JavaScript.
    """
    if request.method == 'POST':
        try:
            # Access text data from request.POST
            mode = request.POST.get('mode')
            incident_type = request.POST.get('incident_type')
            severity = request.POST.get('severity')
            explanation = request.POST.get('explanation')
            num_injured = request.POST.get('num_injured', 0)
            address = request.POST.get('address', '')
            latitude = request.POST.get('latitude')
            longitude = request.POST.get('longitude')
            
            # Use a transaction to ensure atomicity
            with transaction.atomic():
                if mode == 'fire':
                    # Create a new FireIncident object
                    new_incident = FireIncident.objects.create(
                        incident_type=incident_type,
                        severity_level=severity,
                        additional_info=explanation,
                        number_of_injured=num_injured,
                        address=address,
                        latitude=latitude,
                        longitude=longitude,
                    )
                    media_model = FireMedia
                    bucket_name = "fire_media" 
                elif mode == 'accident':
                    # Create a new AccidentIncident object
                    new_incident = AccidentIncident.objects.create(
                        incident_type=incident_type,
                        severity_level=severity,
                        additional_info=explanation,
                        number_of_injured=num_injured,
                        address=address,
                        latitude=latitude,
                        longitude=longitude,
                    )
                    media_model = AccidentMedia
                    bucket_name = "accident_media" 
                else:
                    return JsonResponse({'status': 'error', 'message': 'Invalid report mode.'}, status=400)

                # Access uploaded files from request.FILES
                uploaded_files = request.FILES.getlist('incident_images')
                
                for file in uploaded_files:
                    try:
                       # Generate a unique filename
                        file_extension = os.path.splitext(file.name)[1]
                        unique_filename = f"{uuid.uuid4()}{file_extension}"
                        
                        # Get the file's content and MIME type
                        file_content = file.read()
                        mime_type = file.content_type
                        
                        # Upload the file to Supabase, passing the MIME type
                        supabase.storage.from_(bucket_name).upload(
                            unique_filename,
                            file_content,
                            file_options={'contentType': mime_type}
                        )
                        
                        # Get the public URL for the uploaded file
                        public_url = supabase.storage.from_(bucket_name).get_public_url(unique_filename)
                        
                        # Create a new media object for each uploaded file
                        media_model.objects.create(incident=new_incident, image_url=public_url)
                                        
                    except Exception as upload_e:
                        # If an upload fails, raise the exception to roll back the transaction
                        raise Exception(f"Supabase upload error for file {file.name}: {str(upload_e)}")

            # Return a success message as JSON
            return JsonResponse({'status': 'success', 'message': 'Report submitted successfully!'})

        except Exception as e:
            # Log the error for debugging
            print(f"Error submitting report: {e}")
            # Return an error message as JSON
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)
    
    # Handle non-POST requests
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)