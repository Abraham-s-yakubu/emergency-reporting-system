# your_app_name/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "notifications"
        # Join the 'notifications' group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the 'notifications' group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # This method is called when a message is sent to the group
    async def send_notification(self, event):
        message = event["message"]
        # Send message down the WebSocket to the client
        await self.send(text_data=json.dumps({"message": message}))