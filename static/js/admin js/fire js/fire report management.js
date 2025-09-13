 // Sample data for reports (in a real Django app, this would be fetched from a Django REST API endpoint,
        // e.g., using `fetch('/api/fire_reports/')` in `DOMContentLoaded`).
        let sampleReports = [
            { id: 'FR-001', location: 'Downtown, Lagos', dateTime: '2025-05-29T14:30', cause: 'Electrical Fault', severity: 'High', status: 'Resolved', media: ['https://placehold.co/150x100/374151/E5E7EB?text=Image+1', 'https://placehold.co/150x100/374151/E5E7EB?text=Image+2'], description: 'Large fire reported in a commercial building. Electrical fault suspected. Fire services dispatched quickly.', chatbotLog: 'User: There\'s a fire at Yola Market!\nChatbot: Thank you for reporting. Can you confirm the exact address or a nearby landmark?\nUser: Near the main entrance, opposite the large mosque.\nChatbot: Understood. Fire services have been alerted. Please ensure your safety and evacuate the area if possible. Do not attempt to extinguish the fire yourself unless it\'s very small and safe to do so.', adminLog: 'Admin User: Report Acknowledged (2025-05-29 14:35)\nAdmin User: Dispatched Fire Service (2025-05-29 14:40)', damageEstimate: 50000, fatalities: 0, injuries: 1, responseTime: 10, internalNotes: 'Initial assessment: High risk due to proximity to residential area.', propertyType: 'Commercial' },
            { id: 'FR-002', location: 'Residential, Abuja', dateTime: '2025-06-10T08:00', cause: 'Cooking Accident', severity: 'Medium', status: 'Pending', media: [], description: 'Small kitchen fire, quickly contained by resident. Minor smoke damage.', chatbotLog: 'User: Fire in my kitchen!\nChatbot: Is anyone hurt? What is the extent of the fire?\nUser: No, just a pan fire, put it out. Lots of smoke.\nChatbot: Understood. Fire services will still be dispatched to ensure safety.', adminLog: 'Admin User: Report Received (2025-06-10 08:05)', damageEstimate: 1500, fatalities: 0, injuries: 0, responseTime: 8, internalNotes: 'Follow up with fire safety tips.' , propertyType: 'Residential'},
            { id: 'FR-003', location: 'Industrial Zone, Kano', dateTime: '2025-06-05T22:15', cause: 'Flammable Materials', severity: 'High', status: 'Investigating', media: ['https://placehold.co/150x100/374151/E5E7EB?text=Factory+Fire'], description: 'Large fire at a chemical factory. Hazardous materials involved. Area evacuated.', chatbotLog: 'User: Huge fire at the factory! Explosions!\nChatbot: Please confirm location and stay clear. Emergency services are being alerted.\nUser: [Location details]. It\'s bad.\nChatbot: We are dispatching all available units.', adminLog: 'Admin User: Major Incident Declared (2025-06-05 22:20)\nAdmin User: Hazmat team dispatched (2025-06-05 22:30)', damageEstimate: 1000000, fatalities: 3, injuries: 10, responseTime: 20, internalNotes: 'Ongoing investigation with environmental agencies.' , propertyType: 'Industrial'},
            { id: 'FR-004', location: 'Bushland, Enugu', dateTime: '2025-06-01T11:00', cause: 'Bush Burning', severity: 'Low', status: 'Resolved', media: [], description: 'Controlled bush burning got out of hand. No structures threatened. Contained by local farmers and fire service.', chatbotLog: 'User: Bush fire spreading!\nChatbot: Is it near any residential areas or farms?\nUser: No, just open land, but getting bigger.\nChatbot: Local units are being informed.', adminLog: 'Admin User: Report Acknowledged (2025-06-01 11:05)\nAdmin User: Contained by local efforts (2025-06-01 12:30)', damageEstimate: 500, fatalities: 0, injuries: 0, responseTime: 60, internalNotes: 'Educate community on safe burning practices.' , propertyType: 'Bushland'},
            { id: 'FR-005', location: 'Commercial Street, Port Harcourt', dateTime: '2025-05-20T09:45', cause: 'Arson', severity: 'Medium', status: 'Pending', media: ['https://placehold.co/150x100/374151/E5E7EB?text=Shop+Fire'], description: 'Small shop fire, suspected arson. Police investigation initiated.', chatbotLog: 'User: Fire in a shop on Main Street.\nChatbot: Is anyone inside? What kind of shop is it?\nUser: Clothes shop, no one inside now. Smoke everywhere.\nChatbot: Police and fire services are on their way.', adminLog: 'Admin User: Report Received (2025-05-20 09:50)\nAdmin User: Police notified for arson investigation (2025-05-20 10:10)', damageEstimate: 25000, fatalities: 0, injuries: 0, responseTime: 15, internalNotes: 'Follow up with police department.' , propertyType: 'Commercial'},
            { id: 'FR-006', location: 'Market Area, Ibadan', dateTime: '2025-05-28T10:15', cause: 'Arson', severity: 'High', status: 'Pending', media: ['https://placehold.co/150x100/374151/E5E7EB?text=Market+Fire'], description: 'Multiple stalls on fire in the main market. Suspected arson. Police and fire services en route.', chatbotLog: 'User: Market is on fire!\nChatbot: Can you provide more details about the location within the market?\nUser: Near the textile section, spreading fast.\nChatbot: Emergency services are on their way. Please stay clear of the area.', adminLog: 'Admin User: Report Acknowledged (2025-05-28 10:20)', damageEstimate: 150000, fatalities: 2, injuries: 5, responseTime: 12, internalNotes: 'Requires follow-up by police investigation team.', propertyType: 'Market' },
            { id: 'FR-007', location: 'Residential, Enugu', dateTime: '2025-05-27T20:00', cause: 'Cooking Accident', severity: 'Medium', status: 'Resolved', media: [], description: 'Kitchen fire in a residential apartment. Contained by residents before fire service arrival. Minor damage.', chatbotLog: 'User: My kitchen is on fire!\nChatbot: Are there any injuries? Is everyone safely evacuated?\nUser: No injuries, fire is small, we put it out. Lots of smoke.\nChatbot: Great! Fire services will still come to ensure it\'s completely safe.', adminLog: 'Admin User: Report Acknowledged (2025-05-27 20:05)\nAdmin User: Fire Service confirmed contained (2025-05-27 20:30)', damageEstimate: 5000, fatalities: 0, injuries: 0, responseTime: 25, internalNotes: 'Remind residents about fire extinguisher use.', propertyType: 'Residential' },
            { id: 'FR-008', location: 'Rural Farm, Kano', dateTime: '2025-05-26T08:45', cause: 'Bush Burning', severity: 'Medium', status: 'Investigating', media: [], description: 'Bush fire spreading near a farm. No immediate threat to structures but needs monitoring.', chatbotLog: 'User: Bush fire near my farm!\nChatbot: Is it close to any homes or buildings? What is the wind direction?\nUser: Not yet, wind blowing away from homes. Just need it controlled.\nChatbot: Understood. Local fire units are being notified.', adminLog: 'Admin User: Report Acknowledged (2025-05-26 08:50)', damageEstimate: 1000, fatalities: 0, injuries: 0, responseTime: 45, internalNotes: 'Monitor wind changes and potential spread to crops.', propertyType: 'Bushland' },
            { id: 'FR-009', location: 'Commercial, Port Harcourt', dateTime: '2025-05-25T16:00', cause: 'Flammable Materials', severity: 'High', status: 'Resolved', media: ['https://placehold.co/150x100/374151/E5E7EB?text=Warehouse+Fire'], description: 'Fire in a warehouse storing flammable materials. Quickly brought under control by fire brigade.', chatbotLog: 'User: Warehouse on fire, lots of smoke!\nChatbot: Is anyone trapped inside? Are there any explosions?\nUser: No one trapped, just smoke. Fire brigade is here.\nChatbot: Excellent. Please remain at a safe distance.', adminLog: 'Admin User: Report Acknowledged (2025-05-25 16:05)\nAdmin User: Fire under control (2025-05-25 16:45)', damageEstimate: 75000, fatalities: 0, injuries: 1, responseTime: 15, internalNotes: 'Review safety protocols for hazardous material storage.', propertyType: 'Industrial' },
            { id: 'FR-010', location: 'Vehicle Workshop, Kaduna', dateTime: '2025-06-12T13:00', cause: 'Fuel Spill', severity: 'Medium', status: 'Resolved', media: [], description: 'Small fire caused by accidental fuel spill during vehicle repair. Quickly extinguished.', chatbotLog: 'User: Fire at the workshop, fuel spill!\nChatbot: Is it contained? Any injuries?\nUser: Yes, contained. No injuries.\nChatbot: Good. Fire services will confirm safety.', adminLog: 'Admin User: Report Acknowledged (2025-06-12 13:05)', damageEstimate: 3000, fatalities: 0, injuries: 0, responseTime: 7, internalNotes: 'Remind workshops about safety protocols.' , propertyType: 'Vehicle'},
            { id: 'FR-011', location: 'Construction Site, Abuja', dateTime: '2025-06-11T16:45', cause: 'Electrical Fault', severity: 'Low', status: 'Resolved', media: [], description: 'Minor electrical fire in temporary wiring. Quickly isolated and extinguished by site workers.', chatbotLog: 'User: Small fire at construction site.\nChatbot: Is it contained? Any injuries?\nUser: Contained, no injuries.\nChatbot: Fire services will verify.', adminLog: 'Admin User: Report Acknowledged (2025-06-11 16:50)', damageEstimate: 800, fatalities: 0, injuries: 0, responseTime: 10, internalNotes: 'Site inspection recommended.' , propertyType: 'Construction'},
            { id: 'FR-012', location: 'Residential, Calabar', dateTime: '2025-06-08T03:00', cause: 'Candle Left Unattended', severity: 'Medium', status: 'Pending', media: [], description: 'Bedroom fire due to unattended candle. Resident evacuated safely. Moderate damage.', chatbotLog: 'User: House on fire! Bedroom!\nChatbot: Is everyone out safely? What caused it?\nUser: Yes, out. Candle fell over.\nChatbot: Fire services are coming.', adminLog: 'Admin User: Report Received (2025-06-08 03:05)', damageEstimate: 12000, fatalities: 0, injuries: 1, responseTime: 18, internalNotes: 'Support for displaced family.' , propertyType: 'Residential'},
            { id: 'FR-013', location: 'Market Area, Kano', dateTime: '2025-06-07T12:30', cause: 'Cooking Accident', severity: 'Low', status: 'Resolved', media: [], description: 'Small fire at a food stall due to cooking oil. Quickly put out by vendors.', chatbotLog: 'User: Food stall fire!\nChatbot: Is it contained? Any injuries?\nUser: Yes, contained. No injuries.\nChatbot: Fire services will check.', adminLog: 'Admin User: Report Acknowledged (2025-06-07 12:35)', damageEstimate: 700, fatalities: 0, injuries: 0, responseTime: 5, internalNotes: 'Regular market safety checks needed.' , propertyType: 'Market'},
            { id: 'FR-014', location: 'Rural Village, Plateau', dateTime: '2025-06-06T18:00', cause: 'Bush Burning', severity: 'High', status: 'Investigating', media: [], description: 'Large bush fire threatening a rural village. High winds spreading quickly.', chatbotLog: 'User: Village is threatened by bush fire!\nChatbot: Are residents evacuating? What direction is the wind?\nUser: Yes, evacuating. Wind towards us.\nChatbot: All available resources are being sent.', adminLog: 'Admin User: Emergency declared (2025-06-06 18:10)\nAdmin User: Reinforcements requested (2025-06-06 18:30)', damageEstimate: 50000, fatalities: 0, injuries: 2, responseTime: 90, internalNotes: 'Long-term prevention strategies needed.' , propertyType: 'Bushland'},
            { id: 'FR-015', location: 'Office Building, Lagos', dateTime: '2025-06-04T17:00', cause: 'Electrical Fault', severity: 'Medium', status: 'Resolved', media: [], description: 'Electrical fire in server room. Contained by building\'s suppression system. Minor disruption.', chatbotLog: 'User: Fire alarm at my office building, smoke in server room!\nChatbot: Is the fire contained? Are you safe?\nUser: Yes, sprinklers activated. We evacuated.\nChatbot: Fire services are en route.', adminLog: 'Admin User: Report Acknowledged (2025-06-04 17:05)\nAdmin User: Building cleared (2025-06-04 17:45)', damageEstimate: 10000, fatalities: 0, injuries: 0, responseTime: 12, internalNotes: 'Check electrical systems regularly.' , propertyType: 'Commercial'},
            { id: 'FR-016', location: 'Residential, Maiduguri', dateTime: '2025-05-15T01:00', cause: 'Cooking Accident', severity: 'Low', status: 'Resolved', media: [], description: 'Late night cooking fire, quickly put out by resident. No major damage.', chatbotLog: 'User: Fire in my apartment!\nChatbot: Are you safe? Can you describe the fire?\nUser: Yes, safe. Small pan fire, put it out.\nChatbot: Fire services will verify.', adminLog: 'Admin User: Report Acknowledged (2025-05-15 01:05)', damageEstimate: 500, fatalities: 0, injuries: 0, responseTime: 6, internalNotes: 'Remind about night safety.' , propertyType: 'Residential'},
            { id: 'FR-017', location: 'Rural Area, Adamawa', dateTime: '2025-05-18T14:00', cause: 'Bush Burning', severity: 'Medium', status: 'Pending', media: [], description: 'Bush fire near a cluster of huts. Local community assisting with containment.', chatbotLog: 'User: Bush fire near our village!\nChatbot: Is it threatening homes? What resources are available locally?\nUser: Yes, close to some huts. We are trying to stop it.\nChatbot: Fire services are on their way to assist.', adminLog: 'Admin User: Report Acknowledged (2025-05-18 14:05)', damageEstimate: 2000, fatalities: 0, injuries: 0, responseTime: 40, internalNotes: 'Coordination with local authorities needed.' , propertyType: 'Bushland'},
            { id: 'FR-018', location: 'Market Area, Onitsha', dateTime: '2025-05-22T11:30', cause: 'Electrical Fault', severity: 'High', status: 'Investigating', media: [], description: 'Electrical fault caused fire in a busy market section. Rapid response needed.', chatbotLog: 'User: Fire in the market! Electrical sparks!\nChatbot: Which section of the market? Is it spreading?\nUser: Electronics section, spreading fast.\nChatbot: Emergency teams are being dispatched immediately.', adminLog: 'Admin User: High Priority Incident (2025-05-22 11:35)\nAdmin User: Power cut requested (2025-05-22 11:40)', damageEstimate: 80000, fatalities: 1, injuries: 3, responseTime: 10, internalNotes: 'Market electrical infrastructure audit required.' , propertyType: 'Market'},
            { id: 'FR-019', location: 'Residential, Jos', dateTime: '2025-06-03T05:00', cause: 'Other', severity: 'Low', status: 'Resolved', media: [], description: 'Small fire from a faulty generator. Quickly put out by residents.', chatbotLog: 'User: Generator caught fire!\nChatbot: Is it contained? Any injuries?\nUser: Yes, put out. No injuries.\nChatbot: Fire services will confirm safety.', adminLog: 'Admin User: Report Acknowledged (2025-06-03 05:05)', damageEstimate: 1000, fatalities: 0, injuries: 0, responseTime: 15, internalNotes: 'Advise on generator maintenance.' , propertyType: 'Residential'},
            { id: 'FR-020', location: 'Industrial Estate, Ogun', dateTime: '2025-06-09T10:00', cause: 'Flammable Materials', severity: 'High', status: 'Pending', media: [], description: 'Warehouse fire involving industrial solvents. Large scale operation underway.', chatbotLog: 'User: Huge fire at the industrial estate!\nChatbot: Which warehouse? Any specific materials involved?\nUser: Warehouse 7, solvents. Very dangerous.\nChatbot: All emergency protocols activated.', adminLog: 'Admin User: Major Incident (2025-06-09 10:05)\nAdmin User: Evacuation of adjacent buildings (2025-06-09 10:15)', damageEstimate: 750000, fatalities: 0, injuries: 5, responseTime: 25, internalNotes: 'Requires long-term monitoring for environmental impact.' , propertyType: 'Industrial'}
        ];

        // Global flag to prevent immediate closing of newly opened modals by the global click listener
        let isModalOpening = false;

        /**
         * Creates and initializes a Chart.js chart on a given canvas element.
         * This function handles canvas resizing for sharpness and destroys existing charts.
         * @param {string} ctxId - The ID of the canvas element.
         * @param {string} type - The type of chart (e.g., 'line', 'bar', 'pie').
         * @param {Array<string>} labels - Labels for the chart's axes or segments.
         * @param {Array<number>} data - Data values for the chart.
         * @param {string} label - Label for the dataset.
         * @param {string|Array<string>} backgroundColor - Background color(s) for chart elements.
         * @param {string|Array<string>} borderColor - Border color(s) for chart elements.
         */
        function createChart(ctxId, type, labels, data, label, backgroundColor, borderColor) {
            const canvas = document.getElementById(ctxId);
            if (!canvas) {
                console.error(`Canvas element with ID '${ctxId}' not found.`);
                return;
            }
            const ctx = canvas.getContext('2d');

            // Get the actual display size of the canvas's parent container
            const parent = canvas.parentElement;
            const computedStyle = getComputedStyle(parent);
            const displayWidth = parseFloat(computedStyle.width);
            const displayHeight = parseFloat(computedStyle.height);

            // Set the canvas element's width and height attributes to match its display size
            // multiplied by the device pixel ratio for sharper rendering on high-DPI screens
            const dpr = window.devicePixelRatio || 1;
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;

            // Ensure the canvas is styled to fit its container
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;

            // If a chart instance already exists on this canvas, destroy it to prevent duplicates
            if (Chart.getChart(ctxId)) {
                Chart.getChart(ctxId).destroy();
            }

            new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                        fill: type === 'line' ? true : false, // Fill area under line for line charts
                        tension: type === 'line' ? 0.4 : 0 // Smooth curves for line charts
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    devicePixelRatio: dpr, // Crucial for high-DPI screens
                    plugins: {
                        legend: {
                            labels: {
                                color: '#e2e8f0' // Light color for legend text
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: '#440000' /* Red grid lines from screenshot */
                            },
                            ticks: {
                                color: '#e2e8f0' // Light color for x-axis labels
                            }
                        },
                        y: {
                            grid: {
                                color: '#440000' /* Red grid lines from screenshot */
                            },
                            ticks: {
                                color: '#e2e8f0', // Light color for y-axis labels
                                beginAtZero: true
                            }
                        }
                    }
                }
            });
        }

        /**
         * Renders the recent reports table with a subset of the sample data.
         * @param {Array<Object>} reportsToDisplay - The array of report objects to render.
         */
        function renderReportsTable(reportsToDisplay = sampleReports.slice(0, 10)) {
            const tableBody = document.getElementById('fireReportsTableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            reportsToDisplay.forEach(report => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-red-900 transition duration-150 ease-in-out'; /* Hover effect - adjusted for new red */
                // Determine severity and status badge colors
                const severityClass = report.severity === 'High' ? 'bg-red-700' :
                                      report.severity === 'Medium' ? 'bg-orange-600' : 'bg-green-600';
                const statusClass = report.status === 'Resolved' ? 'bg-green-600' :
                                    report.status === 'Pending' ? 'bg-orange-600' : 'bg-blue-600';

                row.innerHTML = `
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">${report.id}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.location}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.dateTime}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.cause}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severityClass} text-white">
                            ${report.severity}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} text-white">
                            ${report.status}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <button class="text-red-400 hover:text-red-500 mr-2 view-details-btn" data-report-id="${report.id}">Details</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Re-attach event listeners for "Details" buttons after re-rendering
            document.querySelectorAll('#fireReportsTableBody .view-details-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const reportId = event.target.dataset.reportId;
                    console.log(`Details button clicked for Report ID: ${reportId}`); // Debugging log
                    const report = sampleReports.find(r => r.id === reportId);
                    if (report) {
                        populateReportDetailsModal(report);
                    } else {
                        console.error(`Report with ID ${reportId} not found for details.`);
                    }
                });
            });

            // Removed the event listener for the "Resolve" button
        }

        /**
         * Populates the Report Details Modal with data from a specific report object.
         * @param {Object} report - The report object to display.
         */
        function populateReportDetailsModal(report) {
            const reportDetailsModal = document.getElementById('reportDetailsModal');
            document.getElementById('modalReportIdDisplay').textContent = report.id;
            document.getElementById('editReportId').value = report.id; // Hidden ID for saving
            document.getElementById('editLocation').value = report.location;
            document.getElementById('editDateTime').value = report.dateTime;
            document.getElementById('editCause').value = report.cause;
            document.getElementById('editSeverity').value = report.severity;
            document.getElementById('editStatus').value = report.status;
            document.getElementById('editDamageEstimate').value = report.damageEstimate || '';
            document.getElementById('editFatalities').value = report.fatalities || '';
            document.getElementById('editInjuries').value = report.injuries || '';
            document.getElementById('editResponseTime').value = report.responseTime || '';
            document.getElementById('editPropertyType').value = report.propertyType || '';
            document.getElementById('editDescription').value = report.description;
            document.getElementById('editChatbotLog').textContent = report.chatbotLog;
            document.getElementById('editAdminLog').textContent = report.adminLog;
            document.getElementById('editInternalNotes').value = report.internalNotes || '';

            const editMediaContainer = document.getElementById('editMedia');
            editMediaContainer.innerHTML = ''; // Clear previous media
            if (report.media && report.media.length > 0) {
                report.media.forEach(mediaUrl => {
                    const img = document.createElement('img');
                    img.src = mediaUrl;
                    img.alt = 'Incident Media';
                    img.className = 'rounded-md w-full h-24 object-cover'; // Changed h-auto to h-24 for consistent size
                    editMediaContainer.appendChild(img);
                });
            } else {
                editMediaContainer.innerHTML = '<div class="w-full h-24 bg-red-900 rounded-md flex items-center justify-center text-red-200 text-sm p-4 border border-red-700">No media available</div>'; /* Adjusted for new red */
            }

            // Removed the call to setAccidentDetailsEditable(false);
            reportDetailsModal.classList.remove('hidden'); // Show the modal

            isModalOpening = true; // Set flag when opening
            setTimeout(() => {
                isModalOpening = false; // Reset flag after a short delay
            }, 100);
        }

        /**
         * Updates the summary statistics displayed on the dashboard based on the current reports data.
         * @param {Array<Object>} reports - The array of report objects to use for calculations.
         */
        function updateSummaryStatistics(reports = sampleReports) {
            document.getElementById('totalFireReports').textContent = reports.length;
            document.getElementById('resolvedFireReports').textContent = reports.filter(r => r.status === 'Resolved').length;
            document.getElementById('pendingFireReports').textContent = reports.filter(r => r.status === 'Pending' || r.status === 'Investigating').length;

            const today = new Date().toISOString().slice(0, 10);
            document.getElementById('newReportsToday').textContent = reports.filter(r => r.dateTime.startsWith(today)).length;

            const electricalFaults = reports.filter(r => r.cause === 'Electrical Fault').length;
            document.getElementById('electricalFaultsCount').textContent = electricalFaults;

            const totalDamage = reports.reduce((sum, r) => sum + (r.damageEstimate || 0), 0);
            document.getElementById('estimatedDamage').textContent = `$${totalDamage.toLocaleString()}`;

            const highSeverity = reports.filter(r => r.severity === 'High').length;
            document.getElementById('highSeverityFires').textContent = highSeverity;

            const totalResponseTime = reports.reduce((sum, r) => sum + (r.responseTime || 0), 0);
            const avgResponseTime = reports.length > 0 ? (totalResponseTime / reports.length).toFixed(1) : 0;
            document.getElementById('avgResponseTimeDisplay').textContent = `${avgResponseTime} min`;
        }

        /**
         * Initializes all Chart.js charts on the dashboard. This function is called on page load
         * and on window resize to ensure charts are rendered sharply.
         * @param {Array<Object>} reports - The array of report objects to use for chart data.
         */
        function initializeAllCharts(reports = sampleReports) {
            // Data for Monthly Fire Reports Chart (Line Chart)
            const monthlyReports = {};
            reports.forEach(report => {
                const monthYear = report.dateTime.substring(0, 7); // YYYY-MM
                monthlyReports[monthYear] = (monthlyReports[monthYear] || 0) + 1;
            });
            const sortedMonths = Object.keys(monthlyReports).sort();
            const monthlyReportsLabels = sortedMonths.map(my => {
                const [year, month] = my.split('-');
                return new Date(year, month - 1).toLocaleString('en-US', { month: 'short', year: '2-digit' });
            });
            const monthlyReportsData = sortedMonths.map(my => monthlyReports[my]);

            createChart(
                'monthlyFireReportsChart',
                'line',
                monthlyReportsLabels,
                monthlyReportsData,
                'Number of Fire Reports',
                'rgba(255, 99, 71, 0.4)', /* Tomato red with transparency */
                'rgba(255, 99, 71, 1)'   /* Solid Tomato red */
            );

            // Data for Fire Cause Distribution Chart (Pie Chart)
            const fireCauseLabels = ['Electrical Fault', 'Arson', 'Cooking Accident', 'Bush Burning', 'Flammable Materials', 'Others'];
            const causeCounts = {};
            reports.forEach(report => {
                const cause = fireCauseLabels.includes(report.cause) ? report.cause : 'Others';
                causeCounts[cause] = (causeCounts[cause] || 0) + 1;
            });
            const fireCauseData = fireCauseLabels.map(cause => causeCounts[cause] || 0);

            const fireCauseColors = [
                'rgba(255, 69, 0, 0.8)',   /* OrangeRed */
                'rgba(255, 140, 0, 0.8)',  /* DarkOrange */
                'rgba(255, 165, 0, 0.8)',  /* Orange */
                'rgba(255, 215, 0, 0.8)',  /* Gold */
                'rgba(255, 255, 0, 0.8)',  /* Yellow */
                'rgba(255, 0, 0, 0.8)'     /* Red */
            ];
            createChart(
                'fireCauseDistributionChart',
                'pie',
                fireCauseLabels,
                fireCauseData,
                'Fire Causes',
                fireCauseColors,
                fireCauseColors // Border color same as background for pie
            );

            // Data for Fire Severity Breakdown Chart (Bar Chart)
            const fireSeverityLabels = ['High', 'Medium', 'Low'];
            const severityCounts = {};
            reports.forEach(report => {
                severityCounts[report.severity] = (severityCounts[report.severity] || 0) + 1;
            });
            const fireSeverityData = fireSeverityLabels.map(severity => severityCounts[severity] || 0);

            const fireSeverityColors = [
                'rgba(220, 20, 60, 0.8)',   /* Crimson for High */
                'rgba(255, 165, 0, 0.8)',   /* Orange for Medium */
                'rgba(50, 205, 50, 0.8)'    /* LimeGreen for Low */
            ];
            createChart(
                'fireSeverityBreakdownChart',
                'bar',
                fireSeverityLabels,
                fireSeverityData,
                'Fire Severity',
                fireSeverityColors,
                fireSeverityColors // Border color same as background for bar
            );

            // Data for Property Type Distribution Chart (New Pie Chart)
            const propertyTypeLabels = ['Residential', 'Commercial', 'Market', 'Bushland', 'Industrial', 'Vehicle', 'Construction', 'Other'];
            const propertyTypeCounts = {};
            reports.forEach(report => {
                const type = propertyTypeLabels.includes(report.propertyType) ? report.propertyType : 'Other';
                propertyTypeCounts[type] = (propertyTypeCounts[type] || 0) + 1;
            });
            const propertyTypeData = propertyTypeLabels.map(type => propertyTypeCounts[type] || 0);

            const propertyTypeColors = [
                'rgba(255, 99, 71, 0.8)',  /* Tomato */
                'rgba(255, 140, 0, 0.8)',  /* DarkOrange */
                'rgba(255, 165, 0, 0.8)',  /* Orange */
                'rgba(255, 215, 0, 0.8)',  /* Gold */
                'rgba(255, 0, 0, 0.8)',    /* Red */
                'rgba(178, 34, 34, 0.8)',  /* Firebrick */
                'rgba(139, 0, 0, 0.8)',    /* DarkRed */
                'rgba(200, 200, 200, 0.8)' /* Light Gray */
            ];
            createChart(
                'propertyTypeDistributionChart',
                'pie',
                propertyTypeLabels,
                propertyTypeData,
                'Property Types',
                propertyTypeColors,
                propertyTypeColors
            );
        }

        /**
         * Converts an array of JavaScript objects into a CSV (Comma Separated Values) string.
         * @param {Array<Object>} data - The array of objects to convert.
         * @returns {string} The CSV string.
         */
        function convertToCSV(data) {
            if (data.length === 0) return '';

            const headers = Object.keys(data[0]);
            const csvRows = [];

            csvRows.push(headers.join(','));

            for (const row of data) {
                const values = headers.map(header => {
                    // Handle potential null/undefined values and escape double quotes
                    const value = row[header] !== undefined && row[header] !== null ? String(row[header]) : '';
                    const escaped = value.replace(/"/g, '""');
                    return `"${escaped}"`;
                });
                csvRows.push(values.join(','));
            }
            return csvRows.join('\n');
        }

        /**
         * Triggers the download of a file to the user's browser.
         * @param {string} content - The content of the file.
         * @param {string} filename - The desired name of the file.
         * @param {string} mimeType - The MIME type of the file.
         */
        function downloadFile(content, filename, mimeType) {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
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
                <div class="bg-red-950 p-6 rounded-lg shadow-lg text-white">
                    <h3 class="text-xl font-semibold mb-3">${title}</h3>
                    <p>${message}</p>
                    <button class="mt-4 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700" onclick="this.closest('.fixed').remove()">OK</button>
                </div>
            `;
            document.body.appendChild(customAlert);
        }

        /**
         * Opens the custom report generation modal and populates its filters.
         */
        function openCustomReportModal() {
            const customReportModal = document.getElementById('customReportModal');
            customReportModal.classList.remove('hidden');
            populateReportFilters(); // Populate location and property type dropdowns

            isModalOpening = true; // Set flag when opening
            setTimeout(() => {
                isModalOpening = false; // Reset flag after a short delay
            }, 100);
        }

        /**
         * Populates the location and property type filter dropdowns in the custom report modal
         * with unique values from the sampleReports data.
         */
        function populateReportFilters() {
            const locationFilter = document.getElementById('reportLocationFilter');
            const propertyTypeFilter = document.getElementById('reportPropertyTypeFilter');

            // Store original "All" options to re-add them after clearing
            const originalLocationOption = locationFilter.querySelector('option[value="all"]').outerHTML;
            const originalPropertyTypeOption = propertyTypeFilter.querySelector('option[value="all"]').outerHTML;

            // Clear existing options, then re-add "All"
            locationFilter.innerHTML = originalLocationOption;
            propertyTypeFilter.innerHTML = originalPropertyTypeOption;

            const uniqueLocations = new Set();
            const uniquePropertyTypes = new Set();

            sampleReports.forEach(report => {
                uniqueLocations.add(report.location);
                if (report.propertyType) { // Ensure propertyType exists before adding
                    uniquePropertyTypes.add(report.propertyType);
                }
            });

            Array.from(uniqueLocations).sort().forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                locationFilter.appendChild(option);
            });

            Array.from(uniquePropertyTypes).sort().forEach(propertyType => {
                const option = document.createElement('option');
                option.value = propertyType;
                option.textContent = propertyType;
                propertyTypeFilter.appendChild(option);
            });
        }

        /**
         * Processes the custom report generation based on selected filters and format.
         * This function is triggered when the "Generate Report" button in the modal is clicked.
         * In a Django context, this would typically send an AJAX request to a Django view
         * that handles report generation (e.g., `/api/generate_report/`).
         * The Django view would then return the CSV or PDF content.
         * @param {Event} event - The form submission event.
         */
        function processReportGeneration(event) {
            event.preventDefault(); // Prevent form default submission

            const startDate = document.getElementById('reportStartDate').value;
            const endDate = document.getElementById('reportEndDate').value;
            const severityFilter = document.getElementById('reportSeverityFilter').value;
            const locationFilter = document.getElementById('reportLocationFilter').value;
            const propertyTypeFilter = document.getElementById('reportPropertyTypeFilter').value;
            const format = document.getElementById('reportFormat').value;

            // Filter reports based on selected criteria
            const filteredReports = sampleReports.filter(report => {
                const reportDate = new Date(report.dateTime);
                const startDateTime = startDate ? new Date(startDate) : null;
                const endDateTime = endDate ? new Date(endDate) : null;

                const matchesDate = (!startDateTime || reportDate >= startDateTime) &&
                                    (!endDateTime || reportDate <= endDateTime);
                const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
                const matchesLocation = locationFilter === 'all' || report.location === locationFilter;
                const matchesPropertyType = propertyTypeFilter === 'all' || report.propertyType === propertyTypeFilter;

                return matchesDate && matchesSeverity && matchesLocation && matchesPropertyType;
            });

            let reportContent = '';
            let filename = 'custom_fire_report';
            let mimeType = '';

            if (format === 'csv') {
                reportContent = convertToCSV(filteredReports);
                filename += '.csv';
                mimeType = 'text/csv';
            } else if (format === 'pdf_summary') {
                reportContent = generatePdfSummary(filteredReports, {
                    startDate, endDate, severityFilter, locationFilter, propertyTypeFilter
                });
                filename += '.txt'; // Using .txt for a simple text-based summary
                mimeType = 'text/plain';
            }

            if (filteredReports.length > 0) {
                downloadFile(reportContent, filename, mimeType);
                showCustomAlert(`Custom report generated successfully as ${filename}!`, 'Report Generated');
            } else {
                showCustomAlert('No fire incidents found matching your selected criteria for the report.', 'No Data');
            }

            document.getElementById('customReportModal').classList.add('hidden'); // Close the modal
        }

        /**
         * Generates a text-based summary resembling a PDF report.
         * This includes key statistics and a list of filtered reports.
         * @param {Array<Object>} reports - The filtered fire reports.
         * @param {Object} filters - The filters applied to generate this report.
         * @returns {string} A formatted text summary.
         */
        function generatePdfSummary(reports, filters) {
            let summary = `Fire Report Management - Custom Report\n`;
            summary += `Generated On: ${new Date().toLocaleString()}\n\n`;

            summary += `--- Report Parameters ---\n`;
            summary += `Date Range: ${filters.startDate || 'All Time'} to ${filters.endDate || 'All Time'}\n`;
            summary += `Severity: ${filters.severityFilter}\n`;
            summary += `Location: ${filters.locationFilter}\n`;
            summary += `Property Type: ${filters.propertyTypeFilter}\n\n`;

            summary += `--- Summary Statistics ---\n`;
            summary += `Total Reports: ${reports.length}\n`;
            summary += `Total Fatalities: ${reports.reduce((sum, r) => sum + (r.fatalities || 0), 0)}\n`;
            summary += `Total Injuries: ${reports.reduce((sum, r) => sum + (r.injuries || 0), 0)}\n`;
            summary += `Estimated Total Damage: $${reports.reduce((sum, r) => sum + (r.damageEstimate || 0), 0).toLocaleString()}\n`;

            const uniqueCauses = [...new Set(reports.map(r => r.cause))];
            summary += `Unique Causes: ${uniqueCauses.join(', ') || 'N/A'}\n`;

            const avgResponseTime = reports.length > 0 ? (reports.reduce((sum, r) => sum + (r.responseTime || 0), 0) / reports.length).toFixed(1) : '0';
            summary += `Average Response Time: ${avgResponseTime} minutes\n\n`;

            summary += `--- Report Details (First 10, if available) ---\n`;
            if (reports.length === 0) {
                summary += "No reports to display.\n";
            } else {
                reports.slice(0, 10).forEach((report, index) => {
                    summary += `\nReport #${index + 1}\n`;
                    summary += `  ID: ${report.id}\n`;
                    summary += `  Location: ${report.location}\n`;
                    summary += `  Date/Time: ${new Date(report.dateTime).toLocaleString()}\n`;
                    summary += `  Cause: ${report.cause}\n`;
                    summary += `  Severity: ${report.severity}\n`;
                    summary += `  Status: ${report.status}\n`;
                    summary += `  Fatalities: ${report.fatalities}\n`;
                    summary += `  Injuries: ${report.injuries}\n`;
                    summary += `  Damage Estimate: $${(report.damageEstimate || 0).toLocaleString()}\n`;
                });
                if (reports.length > 10) {
                    summary += `\n... and ${reports.length - 10} more reports.\n`;
                }
            }

            summary += `\n--- End of Report ---\n`;
            return summary;
        }

        /**
         * Opens the "All Incidents" modal and populates its filters and table.
         * In a Django context, the data for this modal would likely be fetched via AJAX
         * from a Django REST API endpoint that supports filtering and pagination.
         */
        function openAllIncidentsModal() {
            document.getElementById('allIncidentsModal').classList.remove('hidden');
            populateAllIncidentsFilters(); // Populate dropdowns in this modal
            filterAllIncidents(); // Apply initial filters and render table
            
            // Close other modals if open
            document.getElementById('reportDetailsModal').classList.add('hidden');
            document.getElementById('addEditReportModal').classList.add('hidden');
            document.getElementById('customReportModal').classList.add('hidden');

            isModalOpening = true; // Set flag when opening
            setTimeout(() => {
                isModalOpening = false; // Reset flag after a short delay
            }, 100);
        }

        /**
         * Populates the filter dropdowns within the "All Incidents" modal
         * with unique values from the entire `sampleReports` dataset.
         * In a Django context, these unique values might be fetched from a dedicated API endpoint
         * or pre-rendered into the template.
         */
        function populateAllIncidentsFilters() {
            const causeFilter = document.getElementById('allIncidentsCauseFilter');
            const locationFilter = document.getElementById('allIncidentsLocationFilter');
            const propertyTypeFilter = document.getElementById('allIncidentsPropertyTypeFilter');

            // Store original "All" options
            const originalCauseOption = causeFilter.querySelector('option[value="All"]').outerHTML;
            const originalLocationOption = locationFilter.querySelector('option[value="All"]').outerHTML;
            const originalPropertyTypeOption = propertyTypeFilter.querySelector('option[value="All"]').outerHTML;

            // Clear existing options, then re-add "All"
            causeFilter.innerHTML = originalCauseOption;
            locationFilter.innerHTML = originalLocationOption;
            propertyTypeFilter.innerHTML = originalPropertyTypeOption;

            const uniqueCauses = new Set();
            const uniqueLocations = new Set();
            const uniquePropertyTypes = new Set();

            sampleReports.forEach(report => {
                uniqueCauses.add(report.cause);
                uniqueLocations.add(report.location);
                if (report.propertyType) {
                    uniquePropertyTypes.add(report.propertyType);
                }
            });

            Array.from(uniqueCauses).sort().forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                causeFilter.appendChild(option);
            });
            Array.from(uniqueLocations).sort().forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                locationFilter.appendChild(option);
            });
            Array.from(uniquePropertyTypes).sort().forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                propertyTypeFilter.appendChild(option);
            });
        }

        /**
         * Applies filters to the full list of incidents and renders the table in the "All Incidents" modal.
         * In a Django context, this function would typically trigger an AJAX request to a Django view
         * with the filter parameters, and the view would return the filtered data.
         */
        function filterAllIncidents() {
            const searchTerm = document.getElementById('allIncidentsSearch').value.toLowerCase();
            const selectedSeverity = document.getElementById('allIncidentsSeverityFilter').value;
            const selectedStatus = document.getElementById('allIncidentsStatusFilter').value;
            const selectedCause = document.getElementById('allIncidentsCauseFilter').value;
            const selectedLocation = document.getElementById('allIncidentsLocationFilter').value;
            const selectedPropertyType = document.getElementById('allIncidentsPropertyTypeFilter').value;
            const startDate = document.getElementById('allIncidentsStartDate').value;
            const endDate = document.getElementById('allIncidentsEndDate').value;

            const filteredReports = sampleReports.filter(report => {
                const reportDate = new Date(report.dateTime);
                const startDateTime = startDate ? new Date(startDate) : null;
                const endDateTime = endDate ? new Date(endDate) : null;

                const matchesSearch = report.id.toLowerCase().includes(searchTerm) ||
                                      report.location.toLowerCase().includes(searchTerm) ||
                                      report.cause.toLowerCase().includes(searchTerm) ||
                                      report.description.toLowerCase().includes(searchTerm);
                const matchesSeverity = selectedSeverity === 'All' || report.severity === selectedSeverity;
                const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
                const matchesCause = selectedCause === 'All' || report.cause === selectedCause;
                const matchesLocation = selectedLocation === 'All' || report.location === selectedLocation;
                const matchesPropertyType = selectedPropertyType === 'All' || report.propertyType === selectedPropertyType;
                const matchesDate = (!startDateTime || reportDate >= startDateTime) &&
                                    (!endDateTime || reportDate <= endDateTime);

                return matchesSearch && matchesSeverity && matchesStatus && matchesCause && matchesLocation && matchesPropertyType && matchesDate;
            });
            renderAllIncidentsTable(filteredReports);
        }

        /**
         * Renders the table inside the "All Incidents" modal.
         * @param {Array<Object>} reportsToDisplay - The filtered reports to display.
         */
        function renderAllIncidentsTable(reportsToDisplay) {
            const tableBody = document.getElementById('allIncidentsTableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            if (reportsToDisplay.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="8" class="px-4 py-4 text-center text-red-200">No incidents found matching your criteria.</td></tr>`;
                return;
            }

            reportsToDisplay.forEach(report => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-red-900 transition duration-150 ease-in-out'; /* Adjusted for new red */
                const severityClass = report.severity === 'High' ? 'bg-red-700' :
                                      report.severity === 'Medium' ? 'bg-orange-600' : 'bg-green-600';
                const statusClass = report.status === 'Resolved' ? 'bg-green-600' :
                                    report.status === 'Pending' ? 'bg-orange-600' : 'bg-blue-600';

                row.innerHTML = `
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">${report.id}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.location}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.dateTime}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.cause}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severityClass} text-white">
                            ${report.severity}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} text-white">
                            ${report.status}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-red-100">${report.propertyType || 'N/A'}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                        <button class="text-red-400 hover:text-red-500 mr-2 view-details-btn-all" data-report-id="${report.id}">Details</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Attach event listeners for "Details" buttons in this modal
            document.querySelectorAll('#allIncidentsTableBody .view-details-btn-all').forEach(button => {
                button.addEventListener('click', (event) => {
                    const reportId = event.target.dataset.reportId;
                    console.log(`Details button clicked in All Incidents for Report ID: ${reportId}`); // Debugging log
                    const report = sampleReports.find(r => r.id === reportId);
                    if (report) {
                        populateReportDetailsModal(report);
                        document.getElementById('allIncidentsModal').classList.add('hidden'); // Close this modal
                    } else {
                        console.error(`Report with ID ${reportId} not found in All Incidents for details.`);
                    }
                });
            });
        }


        // --- JavaScript for main functionality ---
        document.addEventListener('DOMContentLoaded', () => {
            // Get references to all necessary DOM elements
            const reportDetailsModal = document.getElementById('reportDetailsModal');
            const addNewReportButton = document.getElementById('addNewReportButton');
            const addEditReportModal = document.getElementById('addEditReportModal');
            const fireReportForm = document.getElementById('fireReportForm');
            const reportIdInput = document.getElementById('reportIdInput');
            const locationInput = document.getElementById('locationInput');
            const dateTimeInput = document.getElementById('dateTimeInput');
            const causeInput = document.getElementById('causeInput');
            const severityInput = document.getElementById('severityInput');
            const statusInput = document.getElementById('statusInput');
            const damageEstimateInput = document.getElementById('damageEstimateInput');
            const fatalitiesInput = document.getElementById('fatalitiesInput');
            const injuriesInput = document.getElementById('injuriesInput');
            const responseTimeInput = document.getElementById('responseTimeInput');
            const propertyTypeInput = document.getElementById('propertyTypeInput');
            const mediaUploadInput = document.getElementById('mediaUpload');
            const mediaPreviewContainer = document.getElementById('mediaPreview');

            // Elements for the EDITABLE Report Details Modal
            const editReportForm = document.getElementById('editReportForm');
            const editReportId = document.getElementById('editReportId');
            const modalReportIdDisplay = document.getElementById('modalReportIdDisplay');
            const editLocation = document.getElementById('editLocation');
            const editDateTime = document.getElementById('editDateTime');
            const editCause = document.getElementById('editCause');
            const editSeverity = document.getElementById('editSeverity');
            const editStatus = document.getElementById('editStatus');
            const editDamageEstimate = document.getElementById('editDamageEstimate');
            const editFatalities = document.getElementById('editFatalities');
            const editInjuries = document.getElementById('editInjuries');
            const editResponseTime = document.getElementById('editResponseTime');
            const editPropertyType = document.getElementById('editPropertyType');
            const editDescription = document.getElementById('editDescription');
            const editChatbotLog = document.getElementById('editChatbotLog');
            const editAdminLog = document.getElementById('editAdminLog');
            const editInternalNotes = document.getElementById('editInternalNotes');
            const flagAsDuplicateBtn = document.getElementById('flagAsDuplicateBtn');

            // Elements for filtering Recent Reports table
            const recentReportsSearchInput = document.getElementById('recentReportsSearchInput');
            const recentSeverityFilter = document.getElementById('recentSeverityFilter');
            const recentStatusFilter = document.getElementById('recentStatusFilter');

            // Custom Report button (assuming there's a button for this, though not explicitly in the provided HTML)
            // If you intend to have a "Generate Custom Report" button, add it to your HTML, e.g.:
            // <button id="generateCustomReportBtn" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg">Generate Custom Report</button>
            const generateCustomReportBtn = document.getElementById('generateCustomReportBtn'); // This might be null if not in HTML
            if (generateCustomReportBtn) { // Only add listener if button exists
                generateCustomReportBtn.addEventListener('click', openCustomReportModal);
            }
            document.getElementById('reportGenerationForm').addEventListener('submit', processReportGeneration);


            // All Incidents Modal elements
            const viewAllIncidentsBtn = document.getElementById('viewAllIncidentsBtn');
            const allIncidentsModal = document.getElementById('allIncidentsModal');
            const allIncidentsSearch = document.getElementById('allIncidentsSearch');
            const allIncidentsSeverityFilter = document.getElementById('allIncidentsSeverityFilter');
            const allIncidentsStatusFilter = document.getElementById('allIncidentsStatusFilter');
            const allIncidentsCauseFilter = document.getElementById('allIncidentsCauseFilter');
            const allIncidentsLocationFilter = document.getElementById('allIncidentsLocationFilter');
            const allIncidentsPropertyTypeFilter = document.getElementById('allIncidentsPropertyTypeFilter');
            const allIncidentsStartDate = document.getElementById('allIncidentsStartDate');
            const allIncidentsEndDate = document.getElementById('allIncidentsEndDate');


            let selectedMediaFiles = []; // To store base64 representations of uploaded images

            // --- Close modals if clicked outside (simplified for robustness) ---
            document.addEventListener('click', (event) => {
                // If a modal is in the process of opening, ignore this click to prevent immediate closing
                if (isModalOpening) {
                    return;
                }

                // Check if the click was inside any modal content area (for *currently visible* modals)
                // This handles clicks inside the modal to prevent closing it
                const isClickInsideAnyModalContent = Array.from(document.querySelectorAll('.modal:not(.hidden) .modal-content'))
                                                        .some(content => content.contains(event.target));

                // Check if the click originated from a button that *opens* a modal
                // This prevents closing when a modal is intentionally opened
                const isClickOnModalToggleButton = event.target.closest('#addNewReportButton') ||
                                                   event.target.closest('#viewAllIncidentsBtn') ||
                                                   event.target.closest('.view-details-btn'); // Crucial addition

                // If the click was NOT inside any open modal content AND NOT on a button that opens a modal, then close all modals.
                if (!isClickInsideAnyModalContent && !isClickOnModalToggleButton) {
                    document.querySelectorAll('.modal').forEach(modal => {
                        modal.classList.add('hidden');
                    });
                }
            });

            // --- Media Upload Logic for Add New Report Modal ---
            mediaUploadInput.addEventListener('change', (event) => {
                mediaPreviewContainer.innerHTML = ''; // Clear previous previews
                selectedMediaFiles = []; // Reset array
                const files = event.target.files;

                if (files.length > 0) {
                    Array.from(files).forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const img = document.createElement('img');
                                img.src = e.target.result;
                                img.alt = file.name; // Add alt text for accessibility
                                img.className = 'w-full h-24 object-cover rounded-md'; // Consistent size for preview
                                mediaPreviewContainer.appendChild(img);
                                selectedMediaFiles.push(e.target.result); // Store base64 string
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }
            });

            // --- Add New Fire Report Logic ---
            addNewReportButton.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden')); // Close others
                addEditReportModal.classList.remove('hidden');
                isModalOpening = true; // Set flag when opening
                setTimeout(() => { isModalOpening = false; }, 100); // Reset after a short delay
                fireReportForm.reset(); // Clear form for new entry
                mediaPreviewContainer.innerHTML = ''; // Clear media previews
                selectedMediaFiles = []; // Clear selected media files
                // Generate a simple dummy report ID (In Django, this would typically be handled by the database's auto-incrementing primary key)
                const nextIdNum = sampleReports.length > 0 ? Math.max(...sampleReports.map(r => parseInt(r.id.replace('FR-', '')))) + 1 : 1;
                reportIdInput.value = 'FR-' + nextIdNum.toString().padStart(3, '0');
                // Pre-fill current date/time (Django forms can also pre-fill this)
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
            });

            fireReportForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission

                // Construct data object from form inputs.
                // In a Django context, you would gather these values and send them as JSON or FormData
                // to a Django view (e.g., a Django REST Framework API endpoint).
                const newReport = {
                    id: reportIdInput.value, // This ID would likely be ignored or validated by Django
                    location: locationInput.value,
                    dateTime: dateTimeInput.value,
                    cause: causeInput.value,
                    severity: severityInput.value,
                    status: statusInput.value,
                    damageEstimate: parseFloat(damageEstimateInput.value) || 0,
                    fatalities: parseInt(fatalitiesInput.value) || 0,
                    injuries: parseInt(injuriesInput.value) || 0,
                    responseTime: parseInt(responseTimeInput.value) || 0,
                    propertyType: propertyTypeInput.value,
                    media: [...selectedMediaFiles], // For Django, these would be sent as file uploads or base64 strings
                    description: 'No description provided yet.',
                    chatbotLog: 'No chatbot log for this report yet.',
                    adminLog: `Admin User: Report Added (${new Date().toLocaleString()})`,
                    internalNotes: ''
                };

                // Simulate saving to a backend. In Django, this would be a fetch() POST request:
                // fetch('/api/fire_reports/create/', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'X-CSRFToken': getCookie('csrftoken') // Get CSRF token for Django
                //     },
                //     body: JSON.stringify(newReport)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     // On successful save, add the new report (with its actual ID from Django) to sampleReports
                //     sampleReports.push(data);
                //     sampleReports.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
                //     applyRecentReportsFilters();
                //     initializeAllCharts();
                //     updateSummaryStatistics();
                //     showCustomAlert('The new fire report has been successfully added.', 'Report Saved!');
                //     addEditReportModal.classList.add('hidden');
                //     fireReportForm.reset();
                //     mediaPreviewContainer.innerHTML = '';
                //     selectedMediaFiles = [];
                // })
                // .catch(error => {
                //     console.error('Error saving report:', error);
                //     showCustomAlert('Failed to save report. Please try again.', 'Error');
                // });

                sampleReports.push(newReport);
                // Sort reports by date to ensure "Recent Reports" always shows latest
                sampleReports.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

                // Re-render table and charts to reflect new data
                applyRecentReportsFilters(); // Re-render recent reports table
                initializeAllCharts();
                updateSummaryStatistics();

                // Show confirmation message (using custom alert)
                showCustomAlert('The new fire report has been successfully added.', 'Report Saved!');

                addEditReportModal.classList.add('hidden');
                fireReportForm.reset(); // Clear the form
                mediaPreviewContainer.innerHTML = ''; // Clear media previews after saving
                selectedMediaFiles = []; // Reset selected media files after saving
            });

            // --- Save Changes in Report Details Modal ---
            editReportForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const reportIdToUpdate = editReportId.value;
                const reportIndex = sampleReports.findIndex(r => r.id === reportIdToUpdate);

                if (reportIndex !== -1) {
                    const updatedReport = {
                        ...sampleReports[reportIndex], // Keep existing properties
                        location: editLocation.value,
                        dateTime: editDateTime.value,
                        cause: editCause.value,
                        severity: editSeverity.value,
                        status: editStatus.value,
                        damageEstimate: parseFloat(editDamageEstimate.value) || 0,
                        fatalities: parseInt(editFatalities.value) || 0,
                        injuries: parseInt(editInjuries.value) || 0,
                        responseTime: parseInt(editResponseTime.value) || 0,
                        propertyType: editPropertyType.value,
                        description: editDescription.value,
                        internalNotes: editInternalNotes.value,
                        adminLog: sampleReports[reportIndex].adminLog + `\nAdmin User: Details Updated (${new Date().toLocaleString()})`
                    };
                    sampleReports[reportIndex] = updatedReport;
                    console.log('Report updated:', updatedReport);

                    // In Django, this would be a fetch() PUT/PATCH request to update the specific report:
                    // fetch(`/api/fire_reports/${reportIdToUpdate}/`, {
                    //     method: 'PUT', // or 'PATCH'
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'X-CSRFToken': getCookie('csrftoken')
                    //     },
                    //     body: JSON.stringify(updatedReport)
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     // Update local data and UI
                    //     sampleReports[reportIndex] = data; // Use data from Django response
                    //     applyRecentReportsFilters();
                    //     initializeAllCharts();
                    //     updateSummaryStatistics();
                    //     showCustomAlert('Fire report details have been successfully updated.', 'Changes Saved!');
                    //     reportDetailsModal.classList.add('hidden');
                    // })
                    // .catch(error => {
                    //     console.error('Error updating report:', error);
                    //     showCustomAlert('Failed to update report. Please try again.', 'Error');
                    // });


                    // Re-render table and charts
                    applyRecentReportsFilters(); // Re-render recent reports table
                    initializeAllCharts();
                    updateSummaryStatistics();

                    // Show confirmation message
                    showCustomAlert('Fire report details have been successfully updated.', 'Changes Saved!');

                    reportDetailsModal.classList.add('hidden');
                } else {
                    console.error('Report not found for update:', reportIdToUpdate);
                }
            });

            // --- Flag as Duplicate Button Logic ---
            flagAsDuplicateBtn.addEventListener('click', () => {
                const reportIdToFlag = editReportId.value;
                const reportIndex = sampleReports.findIndex(r => r.id === reportIdToFlag);

                if (reportIndex !== -1) {
                    // Update status to 'Investigating' or a specific 'Duplicate' status
                    sampleReports[reportIndex].status = 'Investigating'; // Or 'Duplicate' if you add that option
                    sampleReports[reportIndex].adminLog += `\nAdmin User: Flagged as Duplicate (${new Date().toLocaleString()})`;
                    
                    // In Django, this would be an AJAX request to a specific view/endpoint
                    // that handles flagging a report as duplicate.
                    // fetch(`/api/fire_reports/${reportIdToFlag}/flag_duplicate/`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'X-CSRFToken': getCookie('csrftoken')
                    //     }
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     // Update local data based on Django response
                    //     sampleReports[reportIndex].status = data.status;
                    //     sampleReports[reportIndex].adminLog = data.admin_log;
                    //     showCustomAlert(`Report ${reportIdToFlag} has been flagged as a potential duplicate and its status set to 'Investigating'.`, 'Report Flagged!');
                    //     applyRecentReportsFilters();
                    //     reportDetailsModal.classList.add('hidden');
                    //     updateSummaryStatistics();
                    // })
                    // .catch(error => {
                    //     console.error('Error flagging report:', error);
                    //     showCustomAlert('Failed to flag report. Please try again.', 'Error');
                    // });

                    // Show confirmation message
                    showCustomAlert(`Report ${reportIdToFlag} has been flagged as a potential duplicate and its status set to 'Investigating'.`, 'Report Flagged!');

                    applyRecentReportsFilters(); // Update table to show new status
                    reportDetailsModal.classList.add('hidden');
                    updateSummaryStatistics();
                }
            });

            // --- Filtering Logic for Recent Reports Table ---
            function applyRecentReportsFilters() {
                const searchTerm = recentReportsSearchInput.value.toLowerCase();
                const selectedSeverity = recentSeverityFilter.value;
                const selectedStatus = recentStatusFilter.value;

                const filteredReports = sampleReports.filter(report => {
                    const matchesSearch = report.id.toLowerCase().includes(searchTerm) ||
                                          report.location.toLowerCase().includes(searchTerm) ||
                                          report.cause.toLowerCase().includes(searchTerm) ||
                                          report.description.toLowerCase().includes(searchTerm);
                    const matchesSeverity = selectedSeverity === 'All' || report.severity === selectedSeverity;
                    const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
                    return matchesSearch && matchesSeverity && matchesStatus;
                }).slice(0, 10); // Only show the most recent 10 filtered reports
                renderReportsTable(filteredReports);
            }

            // Event listeners for recent reports filters
            recentReportsSearchInput.addEventListener('input', applyRecentReportsFilters);
            recentSeverityFilter.addEventListener('change', applyRecentReportsFilters);
            recentStatusFilter.addEventListener('change', applyRecentReportsFilters);

            // --- Custom Report Generation Button Listener ---
            // This button would typically trigger a modal or redirect to a Django view for report generation.
            // If the report is generated via AJAX, the JS handles the download.
            // If Django generates a full PDF, it would return a FileResponse.
            // generateCustomReportBtn.addEventListener('click', openCustomReportModal); // Uncomment if you add this button to HTML


            // --- All Incidents Modal Event Listeners ---
            viewAllIncidentsBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent global click from immediately closing
                openAllIncidentsModal(); // This function already handles showing the modal
            });

            allIncidentsSearch.addEventListener('input', filterAllIncidents);
            allIncidentsSeverityFilter.addEventListener('change', filterAllIncidents);
            allIncidentsStatusFilter.addEventListener('change', filterAllIncidents);
            allIncidentsCauseFilter.addEventListener('change', filterAllIncidents);
            allIncidentsLocationFilter.addEventListener('change', filterAllIncidents);
            allIncidentsPropertyTypeFilter.addEventListener('change', filterAllIncidents);
            allIncidentsStartDate.addEventListener('change', filterAllIncidents);
            allIncidentsEndDate.addEventListener('change', filterAllIncidents);


            // Initial rendering on page load
            applyRecentReportsFilters(); // Render recent reports table initially
            initializeAllCharts();
            updateSummaryStatistics();

            // Re-render charts on window resize to maintain sharpness
            window.addEventListener('resize', () => {
                initializeAllCharts();
            });

            // Helper function to get CSRF token for Django AJAX requests
            // function getCookie(name) {
            //     let cookieValue = null;
            //     if (document.cookie && document.cookie !== '') {
            //         const cookies = document.cookie.split(';');
            //         for (let i = 0; i < cookies.length; i++) {
            //             const cookie = cookies[i].trim();
            //             // Does this cookie string begin with the name we want?
            //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
            //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            //                 break;
            //             }
            //         }
            //     }
            //     return cookieValue;
            // }
        });