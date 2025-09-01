from django.db import models
from django.contrib.auth import get_user_model

# Get the custom user model defined in a previous response
User = get_user_model()

class AccidentIncident(models.Model):
    """
    Stores detailed information about a reported accident incident,
    with fields tailored to the dashboard's needs.
    """
    # Incident Details
    incident_id = models.AutoField(primary_key=True)

    INCIDENT_TYPE_CHOICES = [
        ('Vehicle Collision', 'Vehicle Collision'),
        ('Motorbike Accident', 'Motorbike Accident'),
        ('Truck Overturn', 'Truck Overturn'),
        ('Others', 'Others'),
    ]
    incident_type = models.CharField(
        max_length=50,
        choices=INCIDENT_TYPE_CHOICES,
        help_text="The type of accident incident."
    )

    SEVERITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    severity_level = models.CharField(
        max_length=10,
        choices=SEVERITY_CHOICES,
        help_text="The severity of the accident."
    )

    STATUS_CHOICES = [
        ('Reported', 'Reported'),
        ('Investigating', 'Investigating'),
        ('Resolved', 'Resolved'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Reported',
        help_text="The current status of the incident."
    )
    
    is_duplicate = models.BooleanField(
        default=False,
        help_text="Flag if the report is a potential duplicate."
    )

    # Location and Time
    address = models.TextField(help_text="Full address of the incident.")
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Latitude of the incident location."
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Longitude of the incident location."
    )
    reported_date = models.DateField(auto_now_add=True)
    reported_time = models.TimeField(auto_now_add=True)

    # Casualties and Damage
    casualties = models.IntegerField(default=0, help_text="Total number of casualties (injured + fatalities).")
    number_of_injured = models.IntegerField(default=0, help_text="Number of people injured.")
    
    AREA_UNIT = 'sqm'
    area_affected = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text=f"The estimated area affected in {AREA_UNIT}."
    )
    
    estimated_damage = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Estimated monetary value of the damage."
    )
    
    # Property and Cause
    PROPERTY_TYPE_CHOICES = [
        ('Road', 'Road'),
        ('Bridge', 'Bridge'),
        ('Intersection', 'Intersection'),
        ('Expressway', 'Expressway'),
        ('Toll Gate', 'Toll Gate'),
        ('Rural Area', 'Rural Area'),
        ('Gate', 'Gate'),
        ('Others', 'Others'),
    ]
    property_affected = models.CharField(
        max_length=50,
        choices=PROPERTY_TYPE_CHOICES,
        null=True,
        blank=True,
        help_text="The type of property affected by the accident."
    )
    
    ACCIDENT_CAUSE_CHOICES = [
        ('Speeding', 'Speeding'),
        ('Pothole', 'Pothole'),
        ('Brake Failure', 'Brake Failure'),
        ('Driver Distraction', 'Driver Distraction'),
        ('Poor Visibility', 'Poor Visibility'),
        ('Traffic Light Violation', 'Traffic Light Violation'),
        ('Improper Lane Change', 'Improper Lane Change'),
        ('Mechanical Failure', 'Mechanical Failure'),
        ('Animal Crossing', 'Animal Crossing'),
        ('Drunk Driving', 'Drunk Driving'),
        ('Tyre Burst', 'Tyre Burst'),
        ('Others', 'Others'),
    ]
    accident_cause = models.CharField(
        max_length=50,
        choices=ACCIDENT_CAUSE_CHOICES,
        null=True,
        blank=True,
        help_text="The cause of the accident."
    )
    
    number_of_vehicles_affected = models.IntegerField(
        default=0,
        help_text="The number of vehicles involved in the accident."
    )

    # Response Details
    response_time_minutes = models.IntegerField(
        null=True,
        blank=True,
        help_text="Time in minutes from report to resolution."
    )
    
    def __str__(self):
        return f"{self.incident_type} at {self.address} on {self.reported_date}"
    
    class Meta:
        db_table = 'accident_incidents'
        
        
        

class FireIncident(models.Model):
    """
    Stores detailed information about a reported fire incident,
    with fields tailored to the dashboard's needs.
    """
    incident_id = models.AutoField(primary_key=True)
    
    INCIDENT_TYPE_CHOICES = [
        ('Building', 'Building on Fire'),
        ('Market', 'Market on Fire'),
        ('Vehicle', 'Vehicle on Fire'),
        ('Others', 'Others'),
    ]
    incident_type = models.CharField(
        max_length=50,
        choices=INCIDENT_TYPE_CHOICES,
        help_text="The type of fire incident."
    )
    
    SEVERITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    severity_level = models.CharField(
        max_length=10,
        choices=SEVERITY_CHOICES,
        help_text="The severity of the fire."
    )

    STATUS_CHOICES = [
        ('Reported', 'Reported'),
        ('Investigating', 'Investigating'),
        ('Resolved', 'Resolved'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Reported',
        help_text="The current status of the incident."
    )

    is_duplicate = models.BooleanField(
        default=False,
        help_text="Flag if the report is a potential duplicate."
    )

    address = models.TextField(help_text="Full address of the incident.")
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Latitude of the incident location."
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Longitude of the incident location."
    )
    reported_date = models.DateField(auto_now_add=True)
    reported_time = models.TimeField(auto_now_add=True)
    
    casualties = models.IntegerField(default=0, help_text="Total number of casualties (injured + fatalities).")
    number_of_injured = models.IntegerField(default=0, help_text="Number of people injured.")
    
    AREA_UNIT = 'sqm'
    area_affected = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text=f"The estimated area affected in {AREA_UNIT}."
    )
    
    estimated_damage = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Estimated monetary value of the damage."
    )
    
    PROPERTY_TYPE_CHOICES = [
        ('Residential', 'Residential'),
        ('Market', 'Market'),
        ('Commercial', 'Commercial'),
        ('Bushland', 'Bushland'),
        ('Industrial', 'Industrial'),
        ('Vehicle', 'Vehicle'),
        ('Construction', 'Construction'),
    ]
    property_type = models.CharField(
        max_length=50,
        choices=PROPERTY_TYPE_CHOICES,
        null=True,
        blank=True,
        help_text="The type of property affected by the fire."
    )
    
    FIRE_CAUSE_CHOICES = [
        ('Electrical fault', 'Electrical fault'),
        ('Cooking accident', 'Cooking accident'),
        ('Bush burning', 'Bush burning'),
        ('Arson', 'Arson'),
        ('Overloaded circuit', 'Overloaded circuit'),
        ('Candle', 'Candle'),
        ('Fuel spill', 'Fuel spill'),
        ('Cigarette', 'Cigarette'),
        ('Spontaneous combustion', 'Spontaneous combustion'),
        ('Faulty appliance', 'Faulty appliance'),
        ('Gas leak', 'Gas leak'),
    ]
    cause_of_fire = models.CharField(
        max_length=50,
        choices=FIRE_CAUSE_CHOICES,
        null=True,
        blank=True,
        help_text="The cause of the fire."
    )

    number_of_properties_affected = models.IntegerField(
        default=0,
        help_text="The number of properties involved in the fire."
    )

    response_time_minutes = models.IntegerField(
        null=True,
        blank=True,
        help_text="Time in minutes from report to resolution."
    )
    
    def __str__(self):
        return f"{self.incident_type} at {self.address} on {self.reported_date}"
    
    class Meta:
        db_table = 'fire_incidents'        