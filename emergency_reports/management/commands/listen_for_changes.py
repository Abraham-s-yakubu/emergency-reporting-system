# emergency_reports/management/commands/listen_for_changes.py

import os
import asyncio
from django.core.management.base import BaseCommand
from supabase import acreate_client, AsyncClient
from dotenv import load_dotenv
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class Command(BaseCommand):
    help = 'Starts a listener for Supabase realtime changes on the accident_incidents table'

    def handle(self, *args, **options):
        load_dotenv()
        self.stdout.write("Starting Supabase listener...")

        url: str = os.getenv("SUPABASE_URL")
        key: str = os.getenv("SUPABASE_ANON_KEY")

        if not url or not key:
            self.stderr.write(self.style.ERROR("Supabase URL or Key not found in .env"))
            return

        # Run the async listener
        asyncio.run(self.start_listener(url, key))

    async def start_listener(self, url: str, key: str):
        # 1. Use the async client
        supabase: AsyncClient = await acreate_client(url, key)

        # 2. Define the callback function to handle incoming data
        def realtime_callback(payload):
            self.stdout.write("--- Change Detected on accident_incidents ---")
            
            event_type = payload.get('eventType')
            notification_message = None # Variable to hold our message
            
            if event_type == 'INSERT':
                new_record = payload.get('new', {})
                # Create a user-friendly message for the frontend
                notification_message = f"New Incident: A '{new_record.get('incident_type')}' was reported at '{new_record.get('address')}'."
                self.stdout.write(self.style.SUCCESS(notification_message))

            elif event_type == 'UPDATE':
                new_record = payload.get('new', {})
                old_record = payload.get('old', {})
                if old_record.get('status') != new_record.get('status'):
                    notification_message = f"Status Update: Incident #{new_record.get('incident_id')} changed to '{new_record.get('status')}'."
                    self.stdout.write(self.style.WARNING(notification_message))

            elif event_type == 'DELETE':
                old_record = payload.get('old', {})
                # You might not want to notify all users of a deletion, but here's how
                notification_message = f"Incident Cleared: Incident #{old_record.get('incident_id')} was removed."
                self.stdout.write(self.style.ERROR(notification_message))
            
            # --- THIS IS THE NEW PART ---
            # If we created a notification message, send it to the channel layer
            if notification_message:
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    "notifications", # The name of the group in your consumer
                    {
                        "type": "send_notification", # The method name to call on your consumer
                        "message": notification_message,
                    },
                )
                self.stdout.write(self.style.SUCCESS("--> Sent notification to frontend via Channels."))
            
            self.stdout.write("---------------------------------------------")
