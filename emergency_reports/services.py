# my_app/services.py
from supabase import create_client, Client
from decouple import config

# Initialize Supabase client using credentials from .env
url: str = config('SUPABASE_URL')
key: str = config('SUPABASE_ANON_KEY')
supabase: Client = create_client(url, key)

def upload_file_to_supabase(file_object, folder_name="uploads"):
    """
    Uploads a file object to a Supabase Storage bucket.
    """
    try:
        bucket_name = "incident-uploads"
        file_path = f"{folder_name}/{file_object.name}"

        # The upload method handles the file upload to Supabase Storage
        response = supabase.storage.from_(bucket_name).upload(
            file_path, file_object.read()
        )

        # Get the public URL for the uploaded file
        public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)

        return public_url

    except Exception as e:
        print(f"Error uploading file to Supabase: {e}")
        return None