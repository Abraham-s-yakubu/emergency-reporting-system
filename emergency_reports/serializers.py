# In a new file, e.g., 'your_app/serializers.py'

from rest_framework import serializers
from .models import AccidentIncident

class AccidentIncidentSerializer(serializers.ModelSerializer):
    # This maps 'incident_id' to the custom 'id' field with an 'ACC-' prefix.
    id = serializers.SerializerMethodField()
    # This maps 'address' to 'location'.
    location = serializers.CharField(source='address')
    # This maps 'severity_level' to 'impact'.
    impact = serializers.CharField(source='severity_level')
    # This combines 'reported_date' and 'reported_time' into a single 'dateTime' string.
    dateTime = serializers.SerializerMethodField()
    # This maps 'accident_cause' to 'cause'.
    cause = serializers.CharField(source='accident_cause')
    # 'status' and 'is_duplicate' map directly and are included in the Meta fields.

    class Meta:
        model = AccidentIncident
        fields = ['id', 'location', 'impact', 'status', 'dateTime', 'cause', 'is_duplicate']

    def get_id(self, obj):
        # Prefixes the incident_id with 'ACC-' to match the requested format, e.g., 'ACC-001'.
        return f'ACC-{str(obj.incident_id).zfill(3)}'
    
    def get_dateTime(self, obj):
        # Combines the date and time fields and formats them into an ISO 8601 string.
        combined_datetime = f'{obj.reported_date}T{obj.reported_time}Z'
        return combined_datetime