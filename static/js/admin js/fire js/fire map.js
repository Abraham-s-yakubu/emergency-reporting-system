 // --- Global Map and State Variables ---
        let map;
        let incidentVectorSource;
        let incidentVectorLayer;
        let selectedFireIncidentFeature = null; // Stores the OpenLayers feature of the currently selected incident

        // Drawing specific variables for map interactions (e.g., drawing points, lines)
        let drawVectorSource;
        let drawVectorLayer;
        let drawInteraction;
        let activeDrawButton = null;

        // Base map layers for OpenLayers
        let osmLayer;
        let satelliteLayer;
        let openTopoMapLayer;

        // OpenLayers Popup overlay for displaying brief incident info on hover
        let popupOverlay;

        // Global variable for incident details panel element
        let incidentDetailsPanelElement;
        let mapFiltersPanelElement; // Global variable for map filters panel element
        let allIncidentsModalElement; // Global variable for all incidents modal element
        let notificationPreferencesModalElement; // Global variable for notification preferences modal element
        let singleIncidentDetailsModalElement; // New: Global variable for single incident details modal

        // Flag to prevent immediate closing of newly opened panels by global click listener
        let isPanelOpening = false;


        // --- Sample Data for Fire Incidents ---
        const fireIncidents = [
            {
                id: 'FI-ABJ001', location: 'Wuse Zone 4, Abuja (Commercial Building)', lat: 9.0600, lng: 7.4800,
                dateTime: '2025-07-05T14:30', cause: 'Electrical Fault', severity: 'Critical', status: 'Active',
                media: ['https://placehold.co/150x100/DC2626/FFFFFF?text=Fire+Scene+1'],
                description: 'Major fire in a 5-story commercial building. Firefighters on scene, building evacuation ongoing.',
                adminLog: 'Admin User: Report Acknowledged (2025-07-05 14:35)\nAdmin User: Fire service dispatched (2025-07-05 14:40)\nAdmin User: Building partially contained (2025-07-05 15:30)',
                areaAffected: 500, casualties: 2, injuries: 10, responseTime: 10, internalNotes: 'High risk of spread. Coordinate with police for crowd control.'
            },
            {
                id: 'FI-ABJ002', location: 'Gwarinpa Estate, Area 2 (Residential)', lat: 9.0750, lng: 7.3850,
                dateTime: '2025-07-04T02:15', cause: 'Candle Left Unattended', severity: 'Serious', status: 'Closed',
                media: [],
                description: 'House fire caused by unattended candle. One room severely damaged. No casualties.',
                adminLog: 'Admin User: Report Acknowledged (2025-07-04 02:20)\nAdmin User: Fire extinguished (2025-07-04 03:00)\nAdmin User: Investigation complete (2025-07-04 09:00)',
                areaAffected: 50, casualties: 0, injuries: 0, responseTime: 25, internalNotes: 'Advise residents on fire safety.'
            },
            {
                id: 'FI-ABJ003', location: 'Nyanya Market (Market Stall)', lat: 9.0000, lng: 7.5500,
                dateTime: '2025-07-03T18:00', cause: 'Cooking Gas Leak', severity: 'Critical', status: 'Active',
                media: ['https://placehold.co/150x100/DC2626/FFFFFF?text=Fire+Scene+2'],
                description: 'Gas explosion in market stall leading to widespread fire. Multiple stalls affected. High risk.',
                adminLog: 'Admin User: Report Acknowledged (2025-07-03 18:05)\nAdmin User: Fire spreading rapidly (2025-07-03 18:20)\nAdmin User: Reinforcements requested (2025-07-03 18:45)',
                areaAffected: 1200, casualties: 5, injuries: 15, responseTime: 15, internalNotes: 'Secure perimeter. Mass casualty protocol initiated.'
            },
            {
                id: 'FI-ABJ004', location: 'Maitama District (Bush Fire)', lat: 9.0900, lng: 7.5000,
                dateTime: '2025-07-02T11:00', cause: 'Discarded Cigarette', severity: 'Minor', status: 'Closed',
                media: [],
                description: 'Small bush fire near residential area. Quickly contained by local residents.',
                adminLog: 'Admin User: Report Acknowledged (2025-07-02 11:05)\nAdmin User: Fire confirmed extinguished (2025-07-02 11:30)',
                areaAffected: 10, casualties: 0, injuries: 0, responseTime: 5, internalNotes: 'Educate public on proper waste disposal.'
            },
            {
                id: 'FI-ABJ005', location: 'Airport Road (Vehicle Fire)', lat: 9.0000, lng: 7.3500,
                dateTime: '2025-07-01T09:00', cause: 'Engine Overheat', severity: 'Serious', status: 'Reported',
                media: ['https://placehold.co/150x100/DC2626/FFFFFF?text=Fire+Scene+3'],
                description: 'Car caught fire on Airport Road due to engine overheat. Driver escaped unhurt. Road partially blocked.',
                adminLog: 'Admin User: Report Acknowledged (2025-07-01 09:05)\nAdmin User: Fire service en route (2025-07-01 09:10)',
                areaAffected: 5, casualties: 0, injuries: 0, responseTime: 20, internalNotes: 'Monitor traffic flow. Vehicle recovery needed.'
            },
            {
                id: 'FI-ABJ006', location: 'Asokoro District (Residential)', lat: 9.0500, lng: 7.5300,
                dateTime: '2024-12-20T23:00', cause: 'Christmas Lights', severity: 'Serious', status: 'Closed',
                media: [],
                description: 'Fire in a residential house, likely due to faulty Christmas lights. Two rooms damaged.',
                adminLog: 'Admin User: Report Acknowledged (2024-12-20 23:05)\nAdmin User: Fire extinguished (2024-12-20 23:45)',
                areaAffected: 30, casualties: 0, injuries: 1, responseTime: 30, internalNotes: 'Seasonal fire safety reminder needed.'
            },
            {
                id: 'FI-ABJ007', location: 'Central Area (Office Building)', lat: 9.0580, lng: 7.4890,
                dateTime: '2024-11-10T10:00', cause: 'Arson', severity: 'Critical', status: 'Closed',
                media: ['https://placehold.co/150x100/DC2626/FFFFFF?text=Fire+Scene+4'],
                description: 'Deliberate fire set in an office building. Extensive damage to one floor. Police investigation ongoing.',
                adminLog: 'Admin User: Report Acknowledged (2024-11-10 10:05)\nAdmin User: Police and fire investigators on scene (2024-11-10 11:30)',
                areaAffected: 200, casualties: 0, injuries: 3, responseTime: 20, internalNotes: 'High security alert for the area.'
            },
            {
                id: 'FI-ABJ008', location: 'Jabi Lake Mall (Restaurant Kitchen)', lat: 9.0650, lng: 7.4100,
                dateTime: '2024-09-15T19:00', cause: 'Cooking Oil Ignition', severity: 'Minor', status: 'Closed',
                media: [],
                description: 'Small kitchen fire in a mall restaurant. Quickly put out by staff with extinguishers. Mall evacuated as precaution.',
                adminLog: 'Admin User: Report Acknowledged (2024-09-15 19:05)\nAdmin User: Mall reopened (2024-09-15 20:00)',
                areaAffected: 5, casualties: 0, injuries: 0, responseTime: 10, internalNotes: 'Review restaurant fire safety protocols.'
            },
            {
                id: 'FI-ABJ009', location: 'Durumi (Waste Dump)', lat: 8.9800, lng: 7.4500,
                dateTime: '2024-08-01T16:00', cause: 'Spontaneous Combustion', severity: 'Serious', status: 'Active',
                media: [],
                description: 'Large waste dump caught fire. Producing thick smoke affecting nearby communities. Fire service battling it.',
                adminLog: 'Admin User: Report Acknowledged (2024-08-01 16:05)\nAdmin User: Local health advisory issued (2024-08-01 17:00)',
                areaAffected: 1000, casualties: 0, injuries: 0, responseTime: 40, internalNotes: 'Long-term operation expected. Air quality monitoring.'
            },
            {
                id: 'FI-ABJ010', location: 'Lugbe (Generator House)', lat: 8.9500, lng: 7.3000,
                dateTime: '2024-07-25T01:00', cause: 'Fuel Spill', severity: 'Minor', status: 'Closed',
                media: [],
                description: 'Small fire in a residential generator house due to fuel spill during refueling. Contained quickly.',
                adminLog: 'Admin User: Report Acknowledged (2024-07-25 01:05)\nAdmin User: Fire extinguished (2024-07-25 01:30)',
                areaAffected: 2, casualties: 0, injuries: 0, responseTime: 15, internalNotes: 'Remind residents about safe refueling practices.'
            }
        ];


        /**
         * Initializes the OpenLayers map, layers, and event listeners.
         */
        function initMap() {
            // Initialize vector sources for incidents and drawing features
            incidentVectorSource = new ol.source.Vector();
            drawVectorSource = new ol.source.Vector();

            // Define OpenLayers base map layers
            osmLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible: true,
                title: 'Standard Map'
            });

            satelliteLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 19
                }),
                visible: false,
                title: 'Satellite'
            });

            openTopoMapLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                    url: 'https://a.tile.opentopomap.org/{z}/{y}/{x}.png',
                    maxZoom: 17
                }),
                visible: false,
                title: 'Terrain Map'
            });

            // Layer for displaying fire incidents with simplified markers (Flame icon)
            incidentVectorLayer = new ol.layer.Vector({
                source: incidentVectorSource,
                style: function(feature) {
                    const severity = feature.get('severity');
                    const status = feature.get('status');
                    const fillColor = getSeverityColor(severity); // Main body color for the icon

                    let statusBgColor;
                    let statusStrokeColor = '#220F0F'; // Stroke for the status indicator (darker red-brown)
                    let statusSymbolPath = ''; // SVG path for the status icon

                    // Determine status indicator color and icon based on status
                    switch (status) {
                        case 'Reported':
                            statusBgColor = '#FACC15'; // Yellow
                            statusStrokeColor = '#4A2727'; // Darker red-brown for contrast
                            statusSymbolPath = '<circle cx="12" cy="12" r="2.5" fill="#4A2727"/>'; // Small dark dot for 'Reported'
                            break;
                        case 'Closed':
                            statusBgColor = '#22C55E'; // Green
                            statusSymbolPath = '<path d="M6 12L10 16L18 8" fill="white" stroke="white" stroke-width="2"/>'; // Checkmark
                            break;
                        case 'Active':
                            statusBgColor = '#EF4444'; // Red
                            statusSymbolPath = '<circle cx="12" cy="12" r="3" fill="white"/>'; // Simple white dot
                            break;
                    }

                    // Flame SVG icon (simplified)
                    const flameSvgPath = `
                        <path d="M12 2C10.5 5 9 8 9 11c0 2.5 1 4 3 4s3-1.5 3-4c0-3-1.5-6-3-9z" fill="${fillColor}"/>
                        <path d="M12 2c-1.5 3-3 6-3 9c0 2.5 1 4 3 4s3-1.5 3-4c0-3-1.5-6-3-9z" fill="url(#gradient)"/>
                    `;

                    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:white;stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:${fillColor};stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <!-- Main flame icon (severity color with gradient) -->
                        ${flameSvgPath}
                        <!-- Status indicator (smaller circle on top-right) -->
                        <circle cx="18" cy="6" r="5" fill="${statusBgColor}" stroke="${statusStrokeColor}" stroke-width="1"/>
                        <!-- Status icon inside the smaller circle (positioned relative to its own viewBox for easier scaling) -->
                        <svg x="13" y="1" width="10" height="10" viewBox="0 0 24 24">${statusSymbolPath}</svg>
                    </svg>`;

                    const svgDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent);

                    return new ol.style.Style({
                        image: new ol.style.Icon({
                            src: svgDataUrl,
                            scale: 1, // Keep scale uniform for simpler markers
                            anchor: [0.5, 0.5], // Anchor the icon at its center
                        }),
                    });
                }
            });

            // Layer for drawing interactions (points, lines, polygons) by the user
            drawVectorLayer = new ol.layer.Vector({
                source: drawVectorSource,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#EF4444', /* Red for drawing interactions */
                        width: 3
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#EF4444'
                        })
                    })
                })
            });

            // Initialize the map with defined layers and a default view
            map = new ol.Map({
                target: 'map',
                layers: [
                    osmLayer,
                    satelliteLayer,
                    openTopoMapLayer,
                    incidentVectorLayer,
                    drawVectorLayer
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([7.4939, 9.0437]), // Centered on Abuja City Gate, FCT
                    zoom: 8
                })
            });

            // Setup the popup overlay for displaying brief incident info on hover
            const popupElement = document.getElementById('popup');
            const popupCloser = document.getElementById('popup-closer');
            popupOverlay = new ol.Overlay({
                element: popupElement,
                autoPan: false, // Prevent map from panning to show the popup
                offset: [10, -40] // Offset the popup from the cursor/feature
            });
            map.addOverlay(popupOverlay);

            // Event listener to close the popup when the 'x' button is clicked
            popupCloser.onclick = function() {
                popupOverlay.setPosition(undefined); // Hide the popup
                popupCloser.blur(); // Remove focus from the button
                return false;
            };

            // Event listener for map click events to open the incident details panel
            map.on('click', function(event) {
                // Immediately stop propagation for map clicks to prevent document listener interference
                event.stopPropagation();

                let featureClicked = false;
                map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                    if (layer === incidentVectorLayer) { // Only handle clicks on incident markers
                        const incidentData = feature.getProperties().incidentData;
                        openIncidentDetails(incidentData); // Open the details panel
                        selectedFireIncidentFeature = feature; // Store the feature for potential re-population on cancel
                        featureClicked = true; // Set flag that a feature was clicked
                        return true; // Stop iterating over features once one is found
                    }
                });
                // If no incident feature was clicked, close the details panel
                if (!featureClicked) {
                    closeIncidentDetails();
                    selectedFireIncidentFeature = null;
                }
            });

            // Event listener for pointer movement on the map to show/hide incident popups
            map.on('pointermove', function(event) {
                const pixel = map.getEventPixel(event.originalEvent);
                let hit = false;
                map.forEachFeatureAtPixel(pixel, function(feature, layer) {
                    if (layer === incidentVectorLayer) { // Only show popup for incident markers
                        const incidentData = feature.getProperties().incidentData;
                        const popupContent = document.getElementById('popup-content');
                        // Populate popup content with brief incident details
                        popupContent.innerHTML = `
                            <p><strong>ID:</strong> ${incidentData.id}</p>
                            <p><strong>Loc:</strong> ${incidentData.location}</p>
                            <p><strong>Sev:</strong> ${incidentData.severity}</p>
                            <p><strong>Status:</strong> ${incidentData.status}</p>
                            <p><strong>Time:</strong> ${new Date(incidentData.dateTime).toLocaleTimeString()}</p>
                        `;
                        popupOverlay.setPosition(feature.getGeometry().getCoordinates()); // Position popup at feature coordinates
                        document.getElementById('popup').style.display = 'block'; // Show popup
                        map.getTargetElement().style.cursor = 'pointer'; // Change cursor to pointer
                        hit = true;
                        return true;
                    }
                });
                if (!hit) {
                    document.getElementById('popup').style.display = 'none'; // Hide popup if no feature is hovered
                    map.getTargetElement().style.cursor = ''; // Reset cursor
                }
            });

            renderFireIncidentsOnMap(fireIncidents); // Initial rendering of all incidents on map
        }

        /**
         * Renders fire incident features on the map based on the provided array.
         * Clears existing features before adding new ones.
         * @param {Array<Object>} incidentsToRender - An array of incident objects.
         */
        function renderFireIncidentsOnMap(incidentsToRender) {
            incidentVectorSource.clear(); // Clear existing features from the source

            incidentsToRender.forEach(incident => {
                const incidentFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([incident.lng, incident.lat])),
                    incidentData: incident, // Store full incident data within the feature for easy access
                    severity: incident.severity,
                    status: incident.status
                });
                incidentVectorSource.addFeature(incidentFeature);
            });
        }

        /**
         * Returns a color string (RGBA) based on the severity level for map icons.
         * Adapted for fire theme.
         * @param {string} severity - The severity level ('Critical', 'Serious', 'Minor').
         * @returns {string} RGBA color string.
         */
        function getSeverityColor(severity) {
            switch (severity) {
                case 'Critical': return 'rgba(220, 38, 38, 0.9)'; // Darker Red
                case 'Serious': return 'rgba(249, 115, 22, 0.9)'; // Orange
                case 'Minor': return 'rgba(250, 204, 21, 0.9)'; // Yellow
                default: return 'rgba(163, 148, 148, 0.9)'; // Grayish red-brown
            }
        }

        /**
         * Sets the editability of the incident details panel fields.
         * @param {boolean} isEditable - True to enable editing, false to disable.
         */
        function setFireDetailsEditable(isEditable) {
            const fields = [
                'detailCause', 'detailSeverity', 'detailStatus', 'detailAreaAffected',
                'detailCasualties', 'detailInjuries', 'detailResponseTime', 'detailDescription',
                'detailInternalNotes'
            ];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.disabled = !isEditable; // Use disabled for inputs and selects
                    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                        element.readOnly = !isEditable; // Also use readOnly for text inputs/textareas for visual cue
                    }
                }
            });

            // Toggle button visibility
            document.getElementById('editIncidentBtn').classList.toggle('hidden', isEditable);
            document.getElementById('updateIncidentBtn').classList.toggle('hidden', !isEditable);
            document.getElementById('cancelEditBtn').classList.toggle('hidden', !isEditable);
        }


        /**
         * Opens the incident details panel and populates it with data for the given incident.
         * @param {Object} incident - The incident data object.
         */
        function openIncidentDetails(incident) {
            console.log("openIncidentDetails called for incident:", incident.id); // Debugging log
            const panel = incidentDetailsPanelElement; // Use the globally assigned reference
            if (!panel) {
                console.error("Error: incidentDetailsPanel element not found!");
                return;
            }

            isPanelOpening = true; // Set flag to prevent global click listener from closing it immediately
            setTimeout(() => {
                isPanelOpening = false; // Reset flag after a short delay
            }, 100); // 100ms should be enough for the event loop to settle

            // Explicitly set display to block before removing 'hidden' and adding 'open'
            panel.style.display = 'block';
            panel.classList.remove('hidden'); // Make the panel visible
            panel.classList.add('open'); // Trigger the slide-in animation

            panel.dataset.currentIncidentId = incident.id; // Store the ID of the currently displayed incident for updates

            // Populate all the input/display fields in the details panel
            document.getElementById('detailReportId').textContent = incident.id;
            document.getElementById('detailLocation').textContent = incident.location;
            document.getElementById('detailDateTime').textContent = incident.dateTime.replace('T', ' '); // Format date/time

            // Directly assign values to input fields, ensuring default for potential undefined
            document.getElementById('detailCause').value = incident.cause || '';
            document.getElementById('detailSeverity').value = incident.severity || '';
            document.getElementById('detailStatus').value = incident.status || '';
            document.getElementById('detailAreaAffected').value = incident.areaAffected !== undefined ? incident.areaAffected : 0;
            document.getElementById('detailCasualties').value = incident.casualties !== undefined ? incident.casualties : 0;
            document.getElementById('detailInjuries').value = incident.injuries !== undefined ? incident.injuries : 0;
            document.getElementById('detailResponseTime').value = incident.responseTime !== undefined ? incident.responseTime : 0;
            document.getElementById('detailDescription').value = incident.description || '';
            document.getElementById('detailInternalNotes').value = incident.internalNotes || '';

            document.getElementById('detailAdminLog').textContent = incident.adminLog || 'No admin log available.';

            // Populate media (images) for the incident
            const mediaContainer = document.getElementById('detailMedia');
            mediaContainer.innerHTML = ''; // Clear previous media
            if (incident.media && incident.media.length > 0) {
                incident.media.forEach(mediaUrl => {
                    const img = document.createElement('img');
                    img.src = mediaUrl;
                    img.alt = 'Incident Media';
                    img.className = 'rounded-lg w-full h-auto object-cover shadow-md';
                    mediaContainer.appendChild(img);
                });
            } else {
                mediaContainer.innerHTML = '<div class="w-full h-auto bg-red-900 rounded-lg flex items-center justify-center text-red-400 text-sm p-4 border border-red-800">No media available</div>';
            }

            setFireDetailsEditable(false); // Set to read-only mode initially
        }

        /**
         * Closes the incident details panel by triggering its slide-out animation.
         */
        function closeIncidentDetails() {
            console.log("closeIncidentDetails called."); // Debugging log
            const panel = incidentDetailsPanelElement; // Use the globally assigned reference
            if (!panel) {
                console.error("Error: incidentDetailsPanel element not found for closing!");
                return;
            }
            panel.classList.remove('open'); // Start slide-out animation
            // Ensure the hidden class is added after the transition, and display is set to none
            setTimeout(() => {
                panel.classList.add('hidden'); // Hide completely after animation finishes
                panel.style.display = 'none'; // Explicitly set display to none
            }, 300); // Matches the CSS transition duration
        }

        /**
         * Updates an incident's details based on the current values in the details panel form.
         * Re-renders the map to reflect any changes and shows a success alert.
         */
        function updateIncidentDetails() {
            const panel = incidentDetailsPanelElement; // Use the globally assigned reference
            const currentIncidentId = panel.dataset.currentIncidentId;

            if (!currentIncidentId) {
                console.error("No incident selected for update.");
                return;
            }

            // Find the incident in the local data array
            const incidentIndex = fireIncidents.findIndex(inc => inc.id === currentIncidentId);
            if (incidentIndex === -1) {
                console.error(`Incident with ID ${currentIncidentId} not found.`);
                return;
            }

            // Create a mutable copy of the incident object
            const updatedIncident = { ...fireIncidents[incidentIndex] };

            // Update incident properties from the input fields
            updatedIncident.cause = document.getElementById('detailCause').value;
            updatedIncident.severity = document.getElementById('detailSeverity').value;
            updatedIncident.status = document.getElementById('detailStatus').value;
            updatedIncident.areaAffected = parseInt(document.getElementById('detailAreaAffected').value) || 0;
            updatedIncident.casualties = parseInt(document.getElementById('detailCasualties').value) || 0;
            updatedIncident.injuries = parseInt(document.getElementById('detailInjuries').value) || 0;
            updatedIncident.responseTime = parseInt(document.getElementById('detailResponseTime').value) || 0;
            updatedIncident.description = document.getElementById('detailDescription').value;
            updatedIncident.internalNotes = document.getElementById('detailInternalNotes').value;

            // Overwrite the old incident object with the updated one in the array
            fireIncidents[incidentIndex] = updatedIncident;

            renderFireIncidentsOnMap(fireIncidents); // Re-render markers on map with potentially updated styles
            setFireDetailsEditable(false); // Revert to read-only mode after update
            showCustomAlert(`Incident ${currentIncidentId} details have been successfully updated.`, 'Incident Updated!'); // Show a user-friendly confirmation
        }

        /**
         * Applies filters and search criteria from the map filters panel
         * to the incidents displayed on the OpenLayers map.
         * This function is now called on every input/change event for real-time filtering.
         */
        function applyFiltersAndSearch() {
            const statusFilter = document.getElementById('statusFilter').value;
            const severityFilter = document.getElementById('severityFilter').value;
            const timeRangeFilter = document.getElementById('timeRangeFilter').value;
            const searchTerm = document.getElementById('searchBar').value.toLowerCase();

            // Filter the main fireIncidents array based on selected criteria
            const filteredIncidents = fireIncidents.filter(incident => {
                const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
                const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;

                const incidentTime = new Date(incident.dateTime).getTime();
                const now = Date.now();
                let matchesTimeRange = true; // Assume true unless a time filter is applied
                if (timeRangeFilter === 'last_hour') {
                    matchesTimeRange = incidentTime > (now - 3600 * 1000); // Last 1 hour
                } else if (timeRangeFilter === 'last_24_hours') {
                    matchesTimeRange = incidentTime > (now - 24 * 3600 * 1000); // Last 24 hours
                } else if (timeRangeFilter === 'last_7_days') {
                    matchesTimeRange = incidentTime > (now - 7 * 24 * 3600 * 1000); // Last 7 days
                }

                const matchesSearch = searchTerm === '' || // If search term is empty, always match
                                      incident.location.toLowerCase().includes(searchTerm) ||
                                      incident.id.toLowerCase().includes(searchTerm) ||
                                      incident.cause.toLowerCase().includes(searchTerm) || // Search by cause
                                      incident.description.toLowerCase().includes(searchTerm); // Search by description

                return matchesStatus && matchesSeverity && matchesTimeRange && matchesSearch;
            });

            renderFireIncidentsOnMap(filteredIncidents); // Update the map with the filtered incidents
        }

        /**
         * Adds a drawing interaction (Point, LineString, Polygon) to the map.
         * Removes any existing drawing interaction before adding a new one.
         * @param {string} drawType - The type of geometry to draw ('Point', 'LineString', 'Polygon').
         */
        function addInteraction(drawType) {
            if (drawInteraction) {
                map.removeInteraction(drawInteraction); // Remove currently active drawing interaction
            }
            if (drawType !== 'None') { // 'None' means no drawing, just clear interaction
                drawInteraction = new ol.interaction.Draw({
                    source: drawVectorSource, // Source for the drawn features
                    type: drawType, // Type of geometry to draw
                    style: new ol.style.Style({ // Styling for the temporary drawn features
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#EF4444', /* Red for drawing interactions */
                            width: 3
                        }),
                        image: new ol.style.Circle({
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: '#EF4444'
                            })
                        })
                    })
                });
                map.addInteraction(drawInteraction); // Add the new drawing interaction to the map
            }
        }

        /**
         * Sets the active visual state for drawing buttons in the control panel.
         * @param {HTMLElement|null} button - The button element that is now active, or null to deactivate all.
         */
        function setActiveDrawButton(button) {
            // Remove 'active' class from all drawing buttons
            document.querySelectorAll('#drawingControls button').forEach(btn => btn.classList.remove('active'));
            if (button) {
                button.classList.add('active'); // Add 'active' class to the clicked button
            }
            activeDrawButton = button; // Keep track of the currently active button
        }

        /**
         * Switches the visible base map layer (e.g., OSM, Satellite, Terrain).
         * Ensures only one base layer is visible at a time and updates button active states.
         * @param {string} layerName - The title of the layer to make visible ('Standard Map', 'Satellite', 'Terrain Map').
         */
        function switchLayer(layerName) {
            // Set visibility for each base layer
            osmLayer.setVisible(layerName === 'Standard Map');
            satelliteLayer.setVisible(layerName === 'Satellite');
            openTopoMapLayer.setVisible(layerName === 'Terrain Map');

            // Update the 'active' class on layer switcher buttons
            document.getElementById('osmLayerBtn').classList.toggle('active', layerName === 'Standard Map');
            document.getElementById('satelliteLayerBtn').classList.toggle('active', layerName === 'Satellite');
            document.getElementById('terrainLayerBtn').classList.toggle('active', layerName === 'Terrain Map');
        }

        /* --- Reusable JS Functions for UI (closeAllPopups, showCustomAlert) START --- */
        /**
         * Closes all open popups, dropdowns, and modals except for a specified one.
         * This function promotes reusability by centralizing closing logic for various UI elements.
         * @param {string|null} exceptId - The ID of the HTML element to keep open, or null to close all.
         */
        function closeAllPopups(exceptId = null) {
            console.log("closeAllPopups called, exceptId:", exceptId); // Debugging log
            // List of all known popup/modal/dropdown IDs
            const popups = [
                { id: 'mapFiltersPanel', element: mapFiltersPanelElement },
                { id: 'incidentDetailsPanel', element: incidentDetailsPanelElement },
                { id: 'allIncidentsModal', element: allIncidentsModalElement },
                { id: 'notificationPreferencesModal', element: notificationPreferencesModalElement },
                { id: 'singleIncidentDetailsModal', element: singleIncidentDetailsModalElement } // New modal
            ];
            
            popups.forEach(item => {
                const element = item.element;
                if (element && item.id !== exceptId) {
                    if (element.classList.contains('open')) { // Handles animated panels like incidentDetailsPanel or mapFiltersPanel
                        element.classList.remove('open');
                        setTimeout(() => element.classList.add('hidden'), 300); // Hide after animation
                    } else if (!element.classList.contains('hidden')) { // Handles standard hidden/shown elements
                        element.classList.add('hidden');
                    }
                    // Also ensure display is set to none for elements that are truly hidden
                    if (element.classList.contains('hidden')) {
                        element.style.display = 'none';
                    }else{
                     

                    }

                }
            });
            // Ensure the OpenLayers map popup is also hidden if it's visible
            if (popupOverlay) {
                popupOverlay.setPosition(undefined); // Hides the OpenLayers popup
                document.getElementById('popup').style.display = 'none'; // Ensure its display is also set to none
            }
        }

        /**
         * Displays a custom alert message as a modal overlay.
         * This replaces browser's native `alert()` for better UI consistency and control.
         * @param {string} message - The main message content to display.
         * @param {string} title - The title for the alert modal.
         */
        function showCustomAlert(message, title = 'Alert') {
            const customAlert = document.createElement('div');
            customAlert.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[999]';
            customAlert.innerHTML = `
                <div class="bg-red-900 p-6 rounded-lg shadow-lg text-white">
                    <h3 class="text-xl font-semibold mb-3">${title}</h3>
                    <p>${message}</p>
                    <button class="mt-4 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700" onclick="this.closest('.fixed').remove()">OK</button>
                </div>
            `;
            document.body.appendChild(customAlert);
        }
        /* --- Reusable JS Functions for UI (closeAllPopups, showCustomAlert) END --- */

        /**
         * Filters and populates the "All Fire Incidents" modal table based on multiple criteria:
         * Status, Severity, Time Range, Year, Month, Day, and a general Search term.
         * This is a core function demonstrating advanced filtering logic.
         */
        function applyFiltersToAllIncidentsModal() {
            console.log("applyFiltersToAllIncidentsModal called."); // Debugging log

            // Get current filter values from the modal's dropdowns and search bar
            const modalStatusFilter = document.getElementById('modalStatusFilter').value;
            const modalSeverityFilter = document.getElementById('modalSeverityFilter').value;
            const modalTimeRangeFilter = document.getElementById('modalTimeRangeFilter').value;
            const modalYearFilter = document.getElementById('modalYearFilter').value;
            const modalMonthFilter = document.getElementById('modalMonthFilter').value;
            const modalDayFilter = document.getElementById('modalDayFilter').value;
            const modalSearchBar = document.getElementById('modalSearchBar').value.toLowerCase();

            console.log("Filters:", { modalStatusFilter, modalSeverityFilter, modalTimeRangeFilter, modalYearFilter, modalMonthFilter, modalDayFilter, modalSearchBar }); // Debugging log

            // Filter the main incidents array
            const filteredIncidents = fireIncidents.filter(incident => {
                // Check if incident matches selected status filter
                const matchesStatus = modalStatusFilter === 'all' || incident.status === modalStatusFilter;
                // Check if incident matches selected severity filter
                const matchesSeverity = modalSeverityFilter === 'all' || incident.severity === modalSeverityFilter;

                const incidentDate = new Date(incident.dateTime);
                const now = Date.now();
                let matchesTimeRange = true; // Assume time range matches by default
                let matchesSpecificDate = true; // Assume specific date matches by default

                // Determine if any specific date (year, month, day) filters are active
                const isYearFiltered = modalYearFilter !== 'all';
                const isMonthFiltered = modalMonthFilter !== 'all';
                const isDayFiltered = modalDayFilter !== 'all';

                // If any specific date filter is set, prioritize it over the generic time range filter
                if (isYearFiltered || isMonthFiltered || isDayFiltered) {
                    const incidentYear = incidentDate.getFullYear().toString();
                    const incidentMonth = (incidentDate.getMonth() + 1).toString(); // getMonth() is 0-indexed (0-11)
                    const incidentDay = incidentDate.getDate().toString();

                    // Check if incident date matches the selected year, month, and/or day
                    matchesSpecificDate = (isYearFiltered ? incidentYear === modalYearFilter : true) &&
                                          (isMonthFiltered ? incidentMonth === modalMonthFilter : true) &&
                                          (isDayFiltered ? incidentDay === modalDayFilter : true);
                    
                    matchesTimeRange = true; // Override time range filter if specific date is used

                } else {
                    // If no specific date filters are active, apply the general time range filter
                    if (modalTimeRangeFilter === 'last_hour') {
                        matchesTimeRange = incidentDate.getTime() > (now - 3600 * 1000); // Incidents within the last hour
                    } else if (modalTimeRangeFilter === 'last_24_hours') {
                        matchesTimeRange = incidentDate.getTime() > (now - 24 * 3600 * 1000); // Incidents within the last 24 hours
                    } else if (modalTimeRangeFilter === 'last_7_days') {
                        matchesTimeRange = incidentDate.getTime() > (now - 7 * 24 * 3600 * 1000); // Incidents within the last 7 days
                    }
                }

                // Check if incident matches the search term in location, ID, description, or cause
                const matchesSearch = modalSearchBar === '' ||
                                      incident.location.toLowerCase().includes(modalSearchBar) ||
                                      incident.id.toLowerCase().includes(modalSearchBar) ||
                                      incident.cause.toLowerCase().includes(modalSearchBar) || // Search by cause
                                      incident.description.toLowerCase().includes(modalSearchBar); // Search by description

                // Return true only if all selected filters and search criteria are met
                return matchesStatus && matchesSeverity && matchesTimeRange && matchesSpecificDate && matchesSearch;
            });

            console.log("Filtered Incidents for modal:", filteredIncidents); // Debugging log

            const modalBody = document.getElementById('allIncidentsTableBody');
            modalBody.innerHTML = ''; // Clear existing table rows

            // Populate the table with filtered incidents
            if (filteredIncidents.length === 0) {
                modalBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-400">No incidents found matching your criteria.</td></tr>';
            } else {
                filteredIncidents.forEach(incident => {
                    const row = document.createElement('tr');
                    // Changed the button to "View Details" and made it call openSingleIncidentDetailsModal
                    row.innerHTML = `
                        <td>${incident.id}</td>
                        <td>${incident.location}</td>
                        <td><span class="severity-text severity-${incident.severity.toLowerCase()}">${incident.severity}</span></td>
                        <td><span class="status-badge status-${incident.status.toLowerCase()}">${incident.status}</span></td>
                        <td>${new Date(incident.dateTime).toLocaleString()}</td>
                        <td>
                            <button class="btn-primary-small" onclick="openSingleIncidentDetailsModal('${incident.id}')">View Details</button>
                        </td>
                    `;
                    modalBody.appendChild(row);
                });
            }
            document.getElementById('totalIncidentsCount').textContent = filteredIncidents.length; // Update incident count display
        }

        /**
         * Populates the Year, Month, and Day dropdown filters in the "All Incidents" modal.
         * Years are dynamically extracted from the `fireIncidents` data.
         */
        function populateDateFilters() {
            console.log("populateDateFilters called."); // Debugging log
            const yearFilter = document.getElementById('modalYearFilter');
            const monthFilter = document.getElementById('modalMonthFilter');
            const dayFilter = document.getElementById('modalDayFilter');

            // Clear existing options, then add the default "All" option
            yearFilter.innerHTML = '<option value="all">All</option>';
            monthFilter.innerHTML = '<option value="all">All</option>';
            dayFilter.innerHTML = '<option value="all">All</option>';

            // Populate Years dynamically based on incident data
            const years = new Set(); // Use a Set to store unique years
            fireIncidents.forEach(incident => {
                years.add(new Date(incident.dateTime).getFullYear());
            });
            // Convert Set to Array, sort in descending order, and add to dropdown
            Array.from(years).sort((a, b) => b - a).forEach(year => {
                const option = document.createElement('option');
                option.value = year.toString();
                option.textContent = year.toString();
                yearFilter.appendChild(option);
            });

            // Populate Months (static list, as there are always 12 months)
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = (index + 1).toString(); // Month values are 1-12
                option.textContent = month;
                monthFilter.appendChild(option);
            });

            // Populate Days (static list, assuming max 31 days)
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i.toString();
                option.textContent = i.toString();
                dayFilter.appendChild(option);
            }
        }

        /**
         * Opens the "All Fire Incidents" modal, resets its filters to default,
         * populates the date filters, and then applies filters to display all incidents initially.
         */
        function openAllIncidentsModal() {
            console.log("openAllIncidentsModal called."); // Debugging log

            // Reset all modal filters to their default 'all' state
            document.getElementById('modalStatusFilter').value = 'all';
            document.getElementById('modalSeverityFilter').value = 'all';
            document.getElementById('modalTimeRangeFilter').value = 'all';
            document.getElementById('modalYearFilter').value = 'all';
            document.getElementById('modalMonthFilter').value = 'all';
            document.getElementById('modalDayFilter').value = 'all';
            document.getElementById('modalSearchBar').value = '';

            populateDateFilters(); // Ensure date filters are dynamically populated based on current data
            applyFiltersToAllIncidentsModal(); // Apply filters (which will show all incidents initially due to 'all' selections)
            
            // Ensure the modal is visible and animated
            allIncidentsModalElement.classList.remove('hidden'); // Show the modal
            allIncidentsModalElement.style.display = 'flex'; // Ensure display is flex for centering
            
            isPanelOpening = true; // Set flag to prevent global click listener from closing it immediately
            setTimeout(() => {
                isPanelOpening = false; // Reset flag after a short delay
            }, 100);
        }

        /**
         * Opens a smaller modal for displaying details of a single incident.
         * This modal appears on top of the 'All Incidents' modal.
         * @param {string} incidentId - The ID of the incident to display.
         */
        window.openSingleIncidentDetailsModal = function(incidentId) { // Make global for onclick
            console.log("openSingleIncidentDetailsModal called for ID:", incidentId); // Debugging log
            const incident = fireIncidents.find(inc => inc.id === incidentId);
            if (!incident) {
                console.error("Incident not found for single details modal:", incidentId);
                return;
            }

            // Populate the new single details modal
            document.getElementById('singleDetailReportId').textContent = `Incident: ${incident.id}`;
            document.getElementById('singleDetailLocation').textContent = incident.location;
            document.getElementById('singleDetailDateTime').textContent = new Date(incident.dateTime).toLocaleString();
            document.getElementById('singleDetailCause').textContent = incident.cause || 'N/A';
            document.getElementById('singleDetailSeverity').textContent = incident.severity || 'N/A';
            document.getElementById('singleDetailStatus').textContent = incident.status || 'N/A';
            document.getElementById('singleDetailAreaAffected').textContent = incident.areaAffected !== undefined ? incident.areaAffected : 'N/A';
            document.getElementById('singleDetailCasualties').textContent = incident.casualties !== undefined ? incident.casualties : 'N/A';
            document.getElementById('singleDetailInjuries').textContent = incident.injuries !== undefined ? incident.injuries : 'N/A';
            document.getElementById('singleDetailResponseTime').textContent = incident.responseTime !== undefined ? incident.responseTime : 'N/A';
            document.getElementById('singleDetailDescription').textContent = incident.description || 'No description provided.';
            document.getElementById('singleDetailAdminLog').textContent = incident.adminLog || 'No admin log available.';
            document.getElementById('singleDetailInternalNotes').textContent = incident.internalNotes || 'No internal notes.';

            const mediaContainer = document.getElementById('singleDetailMedia');
            mediaContainer.innerHTML = ''; // Clear previous media
            if (incident.media && incident.media.length > 0) {
                incident.media.forEach(mediaUrl => {
                    const img = document.createElement('img');
                    img.src = mediaUrl;
                    img.alt = 'Incident Media';
                    img.className = 'rounded-lg w-full h-auto object-cover shadow-md';
                    mediaContainer.appendChild(img);
                });
            } else {
                mediaContainer.innerHTML = '<div class="no-media">No media available</div>';
            }

            // Store incident ID on the "View on Map" button for easy access
            document.getElementById('singleDetailViewOnMapBtn').dataset.incidentId = incident.id;

            // Show the modal
            singleIncidentDetailsModalElement.classList.remove('hidden');
            singleIncidentDetailsModalElement.style.display = 'flex';

            isPanelOpening = true; // Set flag for global click listener
            setTimeout(() => { isPanelOpening = false; }, 100);
        };

        /**
         * Views a specific incident on the main map.
         * Closes any open modals/popups, zooms the map to the incident's location,
         * and then opens the incident details panel for that incident.
         * @param {string} incidentId - The ID of the incident to view.
         */
        window.viewFireOnMap = function(incidentId) { // Make global for onclick in HTML
            console.log("viewFireOnMap called for ID:", incidentId); // Debugging log
            closeAllPopups(); // Close any currently open popups or modals
            const incident = fireIncidents.find(inc => inc.id === incidentId); // Find the incident object
            if (incident) {
                const coords = ol.proj.fromLonLat([incident.lng, incident.lat]); // Convert lat/lng to map coordinates
                map.getView().animate({ // Animate the map view to the incident's location
                    center: coords,
                    zoom: 12, // Zoom in closer for better detail
                    duration: 500 // Animation duration in milliseconds
                });
                openIncidentDetails(incident); // Open the details panel for the selected incident
            } else {
                console.error("Incident not found for ID:", incidentId);
            }
        };


        // --- Event Listeners and Initial Setup on Document Load ---
        document.addEventListener('DOMContentLoaded', () => {
            // Get references to all necessary DOM elements for event handling
            incidentDetailsPanelElement = document.getElementById('incidentDetailsPanel'); // Assign global reference
            mapFiltersPanelElement = document.getElementById('mapFiltersPanel'); // Assign global reference
            allIncidentsModalElement = document.getElementById('allIncidentsModal'); // Assign global reference
            notificationPreferencesModalElement = document.getElementById('notificationPreferencesModal'); // Assign global reference
            singleIncidentDetailsModalElement = document.getElementById('singleIncidentDetailsModal'); // New: Assign global reference

            const updateIncidentBtn = document.getElementById('updateIncidentBtn');
            const editIncidentBtn = document.getElementById('editIncidentBtn');
            const cancelEditBtn = document.getElementById('cancelEditBtn');
            const viewAllIncidentsBtn = document.getElementById('viewAllIncidentsBtn');

            const openFiltersPanelBtn = document.getElementById('openFiltersPanelBtn'); // Button to open filter panel
            const closeFiltersPanel = document.getElementById('closeFiltersPanel'); // Close button for filter panel

            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const locateMeBtn = document.getElementById('locateMeBtn');
            const fullscreenBtn = document.getElementById('fullscreenBtn');

            const drawPointBtn = document.getElementById('drawPointBtn');
            const drawLineBtn = document.getElementById('drawLineBtn');
            const drawPolygonBtn = document.getElementById('drawPolygonBtn');
            const clearDrawingsBtn = document.getElementById('clearDrawingsBtn');

            const osmLayerBtn = document.getElementById('osmLayerBtn');
            const satelliteLayerBtn = document.getElementById('satelliteLayerBtn');
            const terrainLayerBtn = document.getElementById('terrainLayerBtn');

            // Elements for modal filters (within #allIncidentsModal)
            const modalStatusFilter = document.getElementById('modalStatusFilter');
            const modalSeverityFilter = document.getElementById('modalSeverityFilter');
            const modalTimeRangeFilter = document.getElementById('modalTimeRangeFilter');
            const modalYearFilter = document.getElementById('modalYearFilter');
            const modalMonthFilter = document.getElementById('modalMonthFilter');
            const modalDayFilter = document.getElementById('modalDayFilter');
            const modalSearchBar = document.getElementById('modalSearchBar');
            const applyModalFiltersBtn = document.getElementById('applyModalFiltersBtn');

            // New: Button inside single incident details modal
            const singleDetailViewOnMapBtn = document.getElementById('singleDetailViewOnMapBtn');


            // Event listener for opening the Map Filters Panel
            openFiltersPanelBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                closeAllPopups('mapFiltersPanel'); // Close all other popups, but keep mapFiltersPanel open
                mapFiltersPanelElement.classList.remove('hidden');
                setTimeout(() => mapFiltersPanelElement.classList.add('open'), 10); // Trigger slide-in with a slight delay
                isPanelOpening = true; // Set flag to prevent global click listener from closing it immediately
                setTimeout(() => {
                    isPanelOpening = false; // Reset flag after a short delay
                }, 100);
            });

            // Event listener for closing the Map Filters Panel
            closeFiltersPanel.addEventListener('click', () => {
                closeAllPopups(); // Use the general close function
            });

            // Event listener for the "View All Incidents" button
            viewAllIncidentsBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Stop propagation to prevent global click from closing the modal
                openAllIncidentsModal(); // Call the function to open the modal
            });

            // Global click listener to close popups/dropdowns when clicking anywhere outside them
            document.addEventListener('click', (event) => {
                if (isPanelOpening) {
                    return; // Ignore clicks while a panel is in the process of opening
                }

                // Check if the click was inside any of the interactive components using the global references
                const clickedInsideFilterPanel = mapFiltersPanelElement && mapFiltersPanelElement.contains(event.target);
                const clickedInsideDetailsPanel = incidentDetailsPanelElement && incidentDetailsPanelElement.contains(event.target);
                const clickedInsideAllIncidentsModal = allIncidentsModalElement && allIncidentsModalElement.contains(event.target);
                const clickedInsideNotificationPreferencesModal = notificationPreferencesModalElement && notificationPreferencesModalElement.contains(event.target);
                const clickedInsideSingleIncidentDetailsModal = singleIncidentDetailsModalElement && singleIncidentDetailsModalElement.contains(event.target); // New check
                const clickedInsideOpenFiltersBtn = openFiltersPanelBtn.contains(event.target); // This button is not a panel, so direct contains is fine.
                const clickedInsideViewAllIncidentsBtn = viewAllIncidentsBtn.contains(event.target); // Also check the button that opens the modal

                const shouldClose = !clickedInsideFilterPanel &&
                                   !clickedInsideDetailsPanel &&
                                   !clickedInsideAllIncidentsModal &&
                                   !clickedInsideNotificationPreferencesModal &&
                                   !clickedInsideSingleIncidentDetailsModal && // New check
                                   !clickedInsideOpenFiltersBtn &&
                                   !clickedInsideViewAllIncidentsBtn; // Add this check

                if (shouldClose) {
                    closeAllPopups();
                }
            });

            // Event listener to close the incident details panel using its dedicated close button
            document.getElementById('closeDetailsPanel').addEventListener('click', closeIncidentDetails);

            // Event listeners for applying filters to the main map (now real-time)
            document.getElementById('statusFilter').addEventListener('change', applyFiltersAndSearch);
            document.getElementById('severityFilter').addEventListener('change', applyFiltersAndSearch);
            document.getElementById('timeRangeFilter').addEventListener('change', applyFiltersAndSearch);
            document.getElementById('searchBar').addEventListener('input', applyFiltersAndSearch); // Use 'input' for real-time search

            // Event listener for the "Edit Incident" button
            editIncidentBtn.addEventListener('click', () => {
                setFireDetailsEditable(true); // Enable editing
            });

            // Event listener for the "Update Incident" button in the details panel
            updateIncidentBtn.addEventListener('click', updateIncidentDetails);

            // Event listener for the "Cancel" button in the details panel
            cancelEditBtn.addEventListener('click', () => {
                if (selectedFireIncidentFeature) {
                    // Re-populate with original data from the stored feature
                    openIncidentDetails(selectedFireIncidentFeature.getProperties().incidentData);
                }
                setFireDetailsEditable(false); // Disable editing
            });

            initMap(); // Initialize the OpenLayers map when the DOM is ready

            // Event listeners for map drawing controls
            drawPointBtn.addEventListener('click', () => {
                addInteraction('Point');
                setActiveDrawButton(drawPointBtn);
            });
            drawLineBtn.addEventListener('click', () => {
                addInteraction('LineString');
                setActiveDrawButton(drawLineBtn);
            });
            drawPolygonBtn.addEventListener('click', () => {
                addInteraction('Polygon');
                setActiveDrawButton(drawPolygonBtn);
            });
            clearDrawingsBtn.addEventListener('click', () => {
                drawVectorSource.clear(); // Clear all features drawn on the map
                if (drawInteraction) {
                    map.removeInteraction(drawInteraction); // Remove the active drawing interaction
                }
                setActiveDrawButton(null); // Deactivate all drawing buttons
            });

            // Event listeners for map base layer switching buttons
            osmLayerBtn.addEventListener('click', () => switchLayer('Standard Map'));
            satelliteLayerBtn.addEventListener('click', () => switchLayer('Satellite'));
            terrainLayerBtn.addEventListener('click', () => switchLayer('Terrain Map'));

            // Event listeners for map navigation controls (zoom, locate, fullscreen)
            zoomInBtn.addEventListener('click', () => {
                const view = map.getView();
                const zoom = view.getZoom();
                view.animate({ zoom: zoom + 1, duration: 250 }); // Zoom in with animation
            });

            zoomOutBtn.addEventListener('click', () => {
                const view = map.getView();
                const zoom = view.getZoom();
                view.animate({ zoom: zoom - 1, duration: 250 }); // Zoom out with animation
            });

            locateMeBtn.addEventListener('click', () => {
                if (navigator.geolocation) { // Check if geolocation is supported by the browser
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const coords = [position.coords.longitude, position.coords.latitude];
                        const view = map.getView();
                        view.animate({
                            center: ol.proj.fromLonLat(coords), // Center map on user's current location
                            zoom: 14, // Zoom level for the location
                            duration: 500
                        });
                    }, function(error) {
                        console.error('Geolocation error:', error);
                        // Show a user-friendly error if geolocation fails
                        showCustomAlert('Unable to retrieve your location. Please ensure location services are enabled and permissions are granted.', 'Geolocation Error');
                    });
                } else {
                    // Show a message if geolocation is not supported
                    showCustomAlert('Your browser does not support Geolocation.', 'Geolocation Not Supported');
                }
            });

            fullscreenBtn.addEventListener('click', () => {
                const mapElement = document.getElementById('map');
                if (document.fullscreenElement) { // Check if already in fullscreen mode
                    document.exitFullscreen(); // Exit fullscreen
                } else {
                    mapElement.requestFullscreen().catch(err => { // Request fullscreen mode for the map element
                        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                        // Show an error if fullscreen request fails
                        showCustomAlert(`Failed to enter fullscreen mode: ${err.message}`, 'Fullscreen Error');
                    });
                }
            });

            // Event listeners for filters within the "All Incidents" modal
            applyModalFiltersBtn.addEventListener('click', applyFiltersToAllIncidentsModal);
            modalSearchBar.addEventListener('input', applyFiltersToAllIncidentsModal); // Apply filters as user types in search bar
            modalStatusFilter.addEventListener('change', applyFiltersToAllIncidentsModal);
            modalSeverityFilter.addEventListener('change', applyFiltersToAllIncidentsModal);
            modalTimeRangeFilter.addEventListener('change', applyFiltersToAllIncidentsModal);
            modalYearFilter.addEventListener('change', applyFiltersToAllIncidentsModal);
            modalMonthFilter.addEventListener('change', applyFiltersToAllIncidentsModal);
            modalDayFilter.addEventListener('change', applyFiltersToAllIncidentsModal);

            // New: Event listener for "View on Map" button inside the single incident details modal
            singleDetailViewOnMapBtn.addEventListener('click', (event) => {
                const incidentId = event.target.dataset.incidentId;
                if (incidentId) {
                    viewFireOnMap(incidentId); // Call the global function to view on map
                }
            });
        });
