# emergency_reporting_system/asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# This import must point to the routing.py file in your app.
# Your app is named 'emergency_reports'.
import emergency_reports.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emergency_reporting_system.settings')

# This is the main routing configuration.
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Handles standard HTTP requests
    "websocket": AuthMiddlewareStack(  # Handles WebSocket requests
        URLRouter(
            # This must also point to the correct list in your routing file.
            emergency_reports.routing.websocket_urlpatterns
        )
    ),
})