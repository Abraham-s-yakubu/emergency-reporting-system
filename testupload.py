import os
import uuid
from supabase import create_client, Client

# Replace with your actual credentials and bucket name
SUPABASE_URL = "https://joxvwdoogkqjmpwadqna.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveHZ3ZG9vZ2txam1wd2FkcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg3NzQsImV4cCI6MjA2NjE5NDc3NH0.zD5lyn0HrAUUye_sVuxAyJ77VWSkd9UasOXG3Cmo23Q"
BUCKET_NAME = "accident_media" # e.g., "fire_media"

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Create a dummy file for the test
    with open('test_upload.txt', 'w') as f:
        f.write('This is a test file for Supabase upload.')

    # Upload the file
    with open('test_upload.txt', 'rb') as f:
        supabase.storage.from_(BUCKET_NAME).upload(f"test_upload_{uuid.uuid4()}.txt", f.read())

    print("✅ Success! File uploaded to Supabase.")
    print("Check your Supabase Storage bucket to confirm.")
    
    # Clean up the dummy file
    os.remove('test_upload.txt')

except Exception as e:
    print(f"❌ An error occurred: {e}")