# emergency_reports/management/commands/listen_for_changes.py

import os
import asyncio
from django.core.management.base import BaseCommand
from supabase import acreate_client, AsyncClient
from dotenv import load_dotenv

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
            
            # Debug: Print the entire payload structure
            self.stdout.write(f"DEBUG - Full payload: {payload}")
            self.stdout.write(f"DEBUG - Payload type: {type(payload)}")
            self.stdout.write(f"DEBUG - Payload keys: {list(payload.keys()) if isinstance(payload, dict) else 'Not a dict'}")
            
            # Try different possible event type keys
            event_type = payload.get('eventType') or payload.get('event_type') or payload.get('event')
            self.stdout.write(f"DEBUG - Event type: {event_type}")
            
            if event_type == 'INSERT':
                new_record = payload.get('new', {})
                self.stdout.write(
                    self.style.SUCCESS(
                        f"NEW INCIDENT: A '{new_record.get('incident_type')}' "
                        f"was reported at '{new_record.get('address')}'."
                    )
                )

            elif event_type == 'UPDATE':
                new_record = payload.get('new', {})
                old_record = payload.get('old', {})
                old_status = old_record.get('status')
                new_status = new_record.get('status')
                
                if old_status != new_status:
                    self.stdout.write(
                        self.style.WARNING(
                            f"STATUS UPDATE: Incident #{new_record.get('incident_id')} "
                            f"changed from '{old_status}' to '{new_status}'."
                        )
                    )

            elif event_type == 'DELETE':
                old_record = payload.get('old', {})
                self.stdout.write(
                    self.style.ERROR(
                        f"INCIDENT DELETED: Incident #{old_record.get('incident_id')} was removed."
                    )
                )
            else:
                self.stdout.write(f"UNKNOWN EVENT TYPE: {event_type}")
            
            self.stdout.write("---------------------------------------------")

        # 3. Subscribe to changes using the async client
        channel_name = "db-accident_incidents"
        
        self.stdout.write(f"Attempting to subscribe to channel '{channel_name}'...")

        channel = supabase.channel(channel_name).on_postgres_changes(
            event="*",
            schema="public",
            table="accident_incidents",
            callback=realtime_callback
        )
        
        subscription = await channel.subscribe()
        
        self.stdout.write(self.style.SUCCESS("Successfully subscribed! Listening for changes..."))

        # 4. Keep the script alive to listen for events
        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            self.stdout.write("\nListener stopped by user.")
        except Exception as e:
            self.stderr.write(f"Error occurred: {e}")
        finally:
            # It's good practice to unsubscribe when exiting
            try:
                await subscription.unsubscribe()
                self.stdout.write("Unsubscribed from channel.")
            except:
                pass
