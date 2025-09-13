/**
 * ================================================================================
 * --- Page-Specific JS (To be placed in the Django content block) ---
 * This file contains JS that is only needed for the dashboard page.
 * ================================================================================
 */
(function() {
    // Ensure the global App object exists
    window.App = window.App || {};

    // --- Page-Specific Data ---
    // In a real Django app, this would be fetched via an API call
    App.data = {
        SIMULATED_DELAY: 800,
        allFireIncidents: [
            { id: 'FR-AD001', location: 'Yola Main Market, Adamawa', severity: 'High', status: 'Pending', dateTime: '2025-06-05T14:30:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD002', location: 'Mubi Residential Area, Adamawa', severity: 'Medium', status: 'Resolved', dateTime: '2025-06-04T10:15:00Z', cause: 'Gas Leakage', isDuplicate: false },
            { id: 'FR-AD003', location: 'Numan Industrial Layout, Adamawa', severity: 'High', status: 'Investigating', dateTime: '2025-06-02T20:00:00Z', cause: 'Unknown', isDuplicate: false },
            { id: 'FR-AD004', location: 'Gombi Farmland, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2025-05-26T08:45:00Z', cause: 'Bush Burning', isDuplicate: false },
            { id: 'FR-AD005', location: 'Federal Poly Mubi, Adamawa', severity: 'Medium', status: 'Resolved', dateTime: '2025-05-25T16:00:00Z', cause: 'Human Error', isDuplicate: true },
            { id: 'FR-AD006', location: 'Jimeta Modern Market, Adamawa', severity: 'High', status: 'Pending', dateTime: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), cause: 'Arson', isDuplicate: false },
            { id: 'FR-AD007', location: 'Girei Town, Adamawa', severity: 'Low', status: 'Pending', dateTime: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD008', location: 'Song Local Govt., Adamawa', severity: 'Medium', status: 'Investigating', dateTime: '2024-12-15T11:00:00Z', cause: 'Unknown', isDuplicate: true },
            { id: 'FR-AD009', location: 'Mayo Belwa, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-11-01T09:00:00Z', cause: 'Accidental', isDuplicate: false },
            { id: 'FR-AD010', location: 'Fufore Market, Adamawa', severity: 'High', status: 'Pending', dateTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), cause: 'Electrical', isDuplicate: false },
            { id: 'FR-AD011', location: 'Gombi Road, Adamawa', severity: 'Medium', status: 'Resolved', dateTime: '2025-01-10T09:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD012', location: 'Yola Bypass, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2025-01-15T11:00:00Z', cause: 'Carelessness', isDuplicate: false },
            { id: 'FR-AD013', location: 'Mubi South, Adamawa', severity: 'High', status: 'Pending', dateTime: '2025-01-20T18:00:00Z', cause: 'Arson', isDuplicate: false },
            { id: 'FR-AD014', location: 'Numan Village, Adamawa', severity: 'Medium', status: 'Investigating', dateTime: '2025-02-01T07:00:00Z', cause: 'Unknown', isDuplicate: true },
            { id: 'FR-AD015', location: 'Lamurde Farmland, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2025-02-05T13:00:00Z', cause: 'Bush Burning', isDuplicate: false },
            { id: 'FR-AD016', location: 'Shelleng Town, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2025-03-12T10:00:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD017', location: 'Ganye Market, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2025-03-20T16:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD018', location: 'Maiha, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2025-04-03T14:00:00Z', cause: 'Accidental', isDuplicate: false },
            { id: 'FR-AD019', location: 'Hong, Adamawa', severity: 'High', status: 'Investigating', dateTime: '2025-04-10T22:00:00Z', cause: 'Arson', isDuplicate: true },
            { id: 'FR-AD020', location: 'Jada, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2025-05-01T08:00:00Z', cause: 'Gas Leakage', isDuplicate: false },
            { id: 'FR-AD021', location: 'Madagali, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2025-05-15T17:00:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD022', location: 'Ganye Road, Adamawa', severity: 'Medium', status: 'Resolved', dateTime: '2024-12-01T09:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD023', location: 'Jada Bypass, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-12-10T11:00:00Z', cause: 'Carelessness', isDuplicate: false },
            { id: 'FR-AD024', location: 'Madagali South, Adamawa', severity: 'High', status: 'Pending', dateTime: '2024-12-25T18:00:00Z', cause: 'Arson', isDuplicate: false },
            { id: 'FR-AD025', location: 'Mayo Belwa Village, Adamawa', severity: 'Medium', status: 'Investigating', dateTime: '2024-11-05T07:00:00Z', cause: 'Unknown', isDuplicate: true },
            { id: 'FR-AD026', location: 'Fufore Farmland, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-11-10T13:00:00Z', cause: 'Bush Burning', isDuplicate: false },
            { id: 'FR-AD027', location: 'Song Town, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2024-10-18T10:00:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD028', location: 'Girei Market, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2024-10-22T16:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD029', location: 'Toungo, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-09-01T14:00:00Z', cause: 'Accidental', isDuplicate: false },
            { id: 'FR-AD030', location: 'Mubi North, Adamawa', severity: 'High', status: 'Investigating', dateTime: '2024-09-10T22:00:00Z', cause: 'Arson', isDuplicate: true },
            { id: 'FR-AD031', location: 'Gombi LGA, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2024-08-05T08:00:00Z', cause: 'Gas Leakage', isDuplicate: false },
            { id: 'FR-AD032', location: 'Michika LGA, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2024-08-15T17:00:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD033', location: 'Shani LGA, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-07-01T09:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD034', location: 'Askira Uba LGA, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2024-07-10T11:00:00Z', cause: 'Carelessness', isDuplicate: false },
            { id: 'FR-AD035', location: 'Mubi Town, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2024-06-01T12:00:00Z', cause: 'Electrical', isDuplicate: false },
            { id: 'FR-AD036', location: 'Yola South Area, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2024-06-15T14:00:00Z', cause: 'Gas Leak', isDuplicate: false },
            { id: 'FR-AD037', location: 'Numan Area, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2024-06-20T10:00:00Z', cause: 'Bush fire', isDuplicate: true },
            { id: 'FR-AD038', location: 'Girei South, Adamawa', severity: 'Medium', status: 'Resolved', dateTime: '2023-01-10T09:00:00Z', cause: 'Cooking Accident', isDuplicate: false },
            { id: 'FR-AD039', location: 'Yola North Campus, Adamawa', severity: 'High', status: 'Resolved', dateTime: '2023-01-15T11:00:00Z', cause: 'Electrical Fault', isDuplicate: false },
            { id: 'FR-AD040', location: 'Jada North, Adamawa', severity: 'Low', status: 'Resolved', dateTime: '2023-03-01T14:00:00Z', cause: 'Accidental', isDuplicate: false },
            { id: 'FR-AD041', location: 'Ganye West, Adamawa', severity: 'Medium', status: 'Pending', dateTime: '2023-03-10T22:00:00Z', cause: 'Arson', isDuplicate: true },
        ],
        youtubeVideos: [
            { id: 'lF4M37_b8jU', title: 'Fire Safety Basics: Your Home', description: 'Essential tips for preventing fires at home and what to do in case of one.', category: 'Prevention' },
            { id: 'jD2xH4XQn7E', title: 'Road Accident Response', description: 'What to do when you encounter a road accident and how to assist.', category: 'Response' },
            { id: 'D-3-vEw-k0M', title: 'Flood Preparedness in Nigeria', description: 'Important steps to take before, during, and after a flood in Nigerian communities.', category: 'Preparedness' },
            { id: 'dQw4w9WgXcQ', title: 'Emergency Medical First Aid', description: 'Basic first aid techniques for common medical emergencies like cuts and burns.', category: 'Medical' },
        ]
    };

    // Cache Dashboard-specific UI Elements
    App.els = {
        ...App.els, // Preserve general elements
        activeStatusFilter: document.getElementById('activeStatusFilter'),
        activeSeverityFilter: document.getElementById('activeSeverityFilter'),
        activeSearch: document.getElementById('activeSearch'),
        manageVideosButton: document.getElementById('manageVideosButton'),
        videoManagementModal: document.getElementById('videoManagementModal'),
        closeVideoManagementModal: document.getElementById('closeVideoManagementModal'),
        addVideoForm: document.getElementById('addVideoForm'),
        cancelEditButton: document.getElementById('cancelEditButton'),
        videoSearchInput: document.getElementById('videoSearchInput'),
        statisticsMonthFilter: document.getElementById('statisticsMonthFilter'),
        statisticsYearFilter: document.getElementById('statisticsYearFilter'),
        resolvedReportsEl: document.getElementById('resolved-reports'),
        pendingReportsEl: document.getElementById('pending-reports'),
        totalIncidentsThisMonthEl: document.getElementById('total-incidents-this-month'),
        responseRateProgress: document.getElementById('response-rate-progress'),
        responseRatePercentage: document.getElementById('response-rate-percentage'),
        responseRateCurrent: document.getElementById('response-rate-current'),
        responseRateLastMonth: document.getElementById('response-rate-last-month'),
        responseRateMessage1: document.getElementById('response-rate-message1'),
        responseRateMessage2: document.getElementById('response-rate-message2'),
        monthlyChartContainer: document.getElementById('monthly-chart-container'),
        monthlyIncidentsChart: document.getElementById('monthlyIncidentsChart'),
        statisticsChartContainer: document.getElementById('statistics-chart-container'),
        statisticsChart: document.getElementById('statisticsChart'),
        noDataStatisticsMessage: document.getElementById('noDataStatisticsMessage'),
        activeIncidentsTbody: document.getElementById('active-incidents-tbody'),
        activeIncidentsTable: document.getElementById('active-incidents-table-container')?.querySelector('table'),
        addVideoMessage: document.getElementById('addVideoMessage'),
        youtubeEmbedCodeInput: document.getElementById('youtubeEmbedCode'),
        videoTitleInput: document.getElementById('videoTitle'),
        videoDescriptionInput: document.getElementById('videoDescription'),
        videoCategorySelect: document.getElementById('videoCategory'),
        formTitle: document.getElementById('formTitle'),
        submitVideoButton: document.getElementById('submitVideoButton'),
        existingVideosList: document.getElementById('existingVideosList'),
    };

    let editingVideoId = null;
    let monthlyChartInstance = null;
    let statisticsChartInstance = null;

    async function getDashboardStats() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const incidentsThisMonth = App.data.allFireIncidents.filter(inc => {
            const incidentDate = new Date(inc.dateTime);
            return incidentDate.getMonth() === currentMonth && incidentDate.getFullYear() === currentYear;
        }).length;
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const incidentsLastMonth = App.data.allFireIncidents.filter(inc => {
            const incidentDate = new Date(inc.dateTime);
            return incidentDate.getMonth() === prevMonth && incidentDate.getFullYear() === prevMonthYear;
        }).length;
        let incidentsTrend = 0;
        let incidentsTrendDirection = 'neutral';
        if (incidentsLastMonth > 0) {
            incidentsTrend = ((incidentsThisMonth - incidentsLastMonth) / incidentsLastMonth) * 100;
            incidentsTrendDirection = incidentsTrend >= 0 ? 'up' : 'down';
        } else if (incidentsThisMonth > 0) {
            incidentsTrend = 100;
            incidentsTrendDirection = 'up';
        }
        return new Promise(r => setTimeout(() => r({
            resolvedReports: { value: 780, trend: 7, trendDirection: 'up' },
            pendingReports: { value: 170, trend: 3, trendDirection: 'down' },
            totalIncidentsThisMonth: { value: incidentsThisMonth, trend: Math.abs(incidentsTrend), trendDirection: incidentsTrendDirection },
            responseRate: { current: 81.14, lastMonth: 75.55, target: 90 }
        }), App.data.SIMULATED_DELAY));
    }

    async function getMonthlyIncidentsData() {
        return new Promise(r => setTimeout(() => r({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Fire Incidents',
                data: [22, 18, 28, 20, 25, 22, 15, 30, 32, 28, 24, 38],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
                borderRadius: 4,
            }]
        }), App.data.SIMULATED_DELAY));
    }

    async function getActiveIncidents() {
        return new Promise(r => setTimeout(() => r(
            App.data.allFireIncidents.filter(inc => inc.status !== 'Resolved')
        ), App.data.SIMULATED_DELAY));
    }

    function updateProgressBar(percentage, progressBarEl, percentageTextEl) {
        if (!progressBarEl || !percentageTextEl) return;
        const radius = progressBarEl.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        progressBarEl.style.strokeDasharray = circumference;
        const offset = circumference - (percentage / 100) * circumference;
        progressBarEl.style.strokeDashoffset = offset;
        percentageTextEl.textContent = `${percentage.toFixed(2)}%`;
        percentageTextEl.classList.remove('loading-placeholder');
    }

    function renderTrend(element, trendValue, trendDirection) {
        if (!element) return;
        let iconClass = 'fa-minus text-gray-400';
        if (trendDirection === 'up') iconClass = 'fa-arrow-up text-green-400';
        else if (trendDirection === 'down') iconClass = 'fa-arrow-down text-red-400';
        element.innerHTML = `<i class="fas ${iconClass}"></i> ${trendValue.toFixed(0)}% from last month`;
    }

    async function loadDashboardStats() {
        const stats = await getDashboardStats();
        if (App.els.resolvedReportsEl) {
            App.els.resolvedReportsEl.textContent = stats.resolvedReports.value;
            App.els.resolvedReportsEl.classList.remove('loading-placeholder');
            renderTrend(App.els.resolvedReportsEl.nextElementSibling, stats.resolvedReports.trend, stats.resolvedReports.trendDirection);
        }
        if (App.els.pendingReportsEl) {
            App.els.pendingReportsEl.textContent = stats.pendingReports.value;
            App.els.pendingReportsEl.classList.remove('loading-placeholder');
            renderTrend(App.els.pendingReportsEl.nextElementSibling, stats.pendingReports.trend, stats.pendingReports.trendDirection);
        }
        if (App.els.totalIncidentsThisMonthEl) {
            App.els.totalIncidentsThisMonthEl.textContent = stats.totalIncidentsThisMonth.value;
            App.els.totalIncidentsThisMonthEl.classList.remove('loading-placeholder');
            renderTrend(App.els.totalIncidentsThisMonthEl.nextElementSibling, stats.totalIncidentsThisMonth.trend, stats.totalIncidentsThisMonth.trendDirection);
        }
        updateProgressBar(stats.responseRate.current, App.els.responseRateProgress, App.els.responseRatePercentage);
        if (App.els.responseRateCurrent) {
            const trendIcon = stats.responseRate.current > stats.responseRate.lastMonth ? 'fa-arrow-up text-green-400' : 'fa-arrow-down text-red-400';
            App.els.responseRateCurrent.innerHTML = `${stats.responseRate.current.toFixed(2)}% <i class="fas ${trendIcon} text-xs"></i>`;
        }
        if(App.els.responseRateLastMonth) App.els.responseRateLastMonth.innerHTML = `${stats.responseRate.lastMonth.toFixed(2)}% <i class="fas fa-plus text-green-400 text-xs"></i>`; 
        if(App.els.responseRateMessage1 && App.els.responseRateMessage2) {
            if (stats.responseRate.current >= stats.responseRate.target) {
                App.els.responseRateMessage1.textContent = "Excellent response rate! Target achieved.";
                App.els.responseRateMessage2.textContent = "Maintain this high standard.";
            } else if (stats.responseRate.current >= 70) {
                App.els.responseRateMessage1.textContent = "Current fire response rate is good, keep it up!";
                App.els.responseRateMessage2.textContent = `Aim for ${stats.responseRate.target}% and above.`;
            } else {
                App.els.responseRateMessage1.textContent = "Response rate needs improvement.";
                App.els.responseRateMessage2.textContent = `Focus on reaching the ${stats.responseRate.target}% target.`;
            }
        }
    }

    async function initMonthlyChart() {
        if (!App.els.monthlyChartContainer || !App.els.monthlyIncidentsChart) return;
        const data = await getMonthlyIncidentsData();
        App.els.monthlyChartContainer.classList.remove('loading-placeholder');
        if (monthlyChartInstance) monthlyChartInstance.destroy();
        if (typeof Chart !== 'undefined') {
            monthlyChartInstance = new Chart(App.els.monthlyIncidentsChart.getContext('2d'), {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, labels: { color: '#e2e8f0', font: { size: 12 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.parsed.y} incidents` } }
                    },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#a0aec0', font: { size: 12 } } },
                        y: { beginAtZero: true, grid: { color: '#2d3748' }, ticks: { color: '#a0aec0', font: { size: 12 } } }
                    }
                }
            });
        } else console.error("Chart.js is not loaded.");
    }

    function getStatisticsCounts(incidents) {
        let highSeverity = 0, mediumSeverity = 0, lowSeverity = 0, duplicateReports = 0;
        incidents.forEach(inc => {
            if (inc.severity === 'High') highSeverity++;
            else if (inc.severity === 'Medium') mediumSeverity++;
            else if (inc.severity === 'Low') lowSeverity++;
            if (inc.isDuplicate) duplicateReports++;
        });
        return { highSeverity, mediumSeverity, lowSeverity, duplicateReports };
    }

    async function renderStatisticsChart(selectedMonth, selectedYear) {
        if (!App.els.statisticsChartContainer || !App.els.statisticsChart || !App.els.noDataStatisticsMessage) return;
        App.els.statisticsChartContainer.classList.add('loading-placeholder');
        App.els.statisticsChart.style.display = 'none';
        App.els.noDataStatisticsMessage.classList.add('hidden');
        const filteredIncidents = App.data.allFireIncidents.filter(inc => {
            const incidentDate = new Date(inc.dateTime);
            const monthMatch = selectedMonth === 'all' || (incidentDate.getMonth() + 1) === parseInt(selectedMonth);
            const yearMatch = selectedYear === 'all' || incidentDate.getFullYear() === parseInt(selectedYear);
            return monthMatch && yearMatch;
        });
        const { highSeverity, mediumSeverity, lowSeverity, duplicateReports } = getStatisticsCounts(filteredIncidents);
        await new Promise(resolve => setTimeout(resolve, App.data.SIMULATED_DELAY));
        const hasData = (highSeverity + mediumSeverity + lowSeverity + duplicateReports) > 0;
        if (!hasData) {
            if (statisticsChartInstance) statisticsChartInstance.destroy();
            App.els.noDataStatisticsMessage.classList.remove('hidden');
            App.els.statisticsChart.style.display = 'none';
        } else {
            App.els.noDataStatisticsMessage.classList.add('hidden');
            App.els.statisticsChart.style.display = 'block';
            const chartData = {
                labels: ['High Severity', 'Medium Severity', 'Low Severity', 'Duplicate Reports'],
                datasets: [{
                    label: 'Fire Incident Severity',
                    data: [highSeverity, mediumSeverity, lowSeverity, duplicateReports],
                    backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(52, 211, 153, 0.8)', 'rgba(107, 114, 128, 0.8)'],
                    borderColor: '#1a202c',
                    borderWidth: 2
                }]
            };
            if (statisticsChartInstance) statisticsChartInstance.destroy();
            if (typeof Chart !== 'undefined') {
                statisticsChartInstance = new Chart(App.els.statisticsChart.getContext('2d'), {
                    type: 'doughnut',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'right', labels: { color: '#e2e8f0', boxWidth: 14, padding: 20, font: { size: 12 } } },
                            tooltip: { callbacks: { label: (context) => (context.label || '') + (context.parsed !== null ? ': ' + context.parsed + ' incidents' : '') } }
                        }
                    }
                });
            } else console.error("Chart.js is not loaded.");
        }
        App.els.statisticsChartContainer.classList.remove('loading-placeholder');
    }

    function populateStatisticsFilters() {
        if (!App.els.statisticsMonthFilter || !App.els.statisticsYearFilter) return;
        App.els.statisticsMonthFilter.innerHTML = '<option value="all">All Months</option>';
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthNames.forEach((name, index) => { App.els.statisticsMonthFilter.innerHTML += `<option value="${index + 1}">${name}</option>`; });
        const currentYear = new Date().getFullYear();
        const yearsInData = new Set(App.data.allFireIncidents.map(inc => new Date(inc.dateTime).getFullYear()));
        yearsInData.add(currentYear);
        App.els.statisticsYearFilter.innerHTML = '<option value="all">All Years</option>';
        Array.from(yearsInData).sort((a, b) => b - a).forEach(year => { App.els.statisticsYearFilter.innerHTML += `<option value="${year}">${year}</option>`; });
        App.els.statisticsMonthFilter.value = (new Date().getMonth() + 1).toString();
        App.els.statisticsYearFilter.value = currentYear.toString();
    }

    async function renderActiveIncidentsTable() {
        if (!App.els.activeIncidentsTbody || !App.els.activeIncidentsTable) return;
        const allActiveIncidents = await getActiveIncidents();
        const statusFilter = App.els.activeStatusFilter.value;
        const severityFilter = App.els.activeSeverityFilter.value;
        const searchInput = App.els.activeSearch.value.toLowerCase();
        const filteredIncidents = allActiveIncidents.filter(inc => {
            const matchesStatus = statusFilter === 'all' || inc.status === statusFilter;
            const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
            const matchesSearch = searchInput === '' || inc.location.toLowerCase().includes(searchInput) || inc.id.toLowerCase().includes(searchInput);
            return matchesStatus && matchesSeverity && matchesSearch;
        });
        App.els.activeIncidentsTable.classList.remove('hidden');
        App.els.activeIncidentsTbody.innerHTML = '';
        if (filteredIncidents.length === 0) {
            App.els.activeIncidentsTbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500 text-sm">No active incidents found.</td></tr>`;
            return;
        }
        filteredIncidents.forEach(incident => {
            const severityClass = incident.severity === 'High' ? 'text-red-500' : (incident.severity === 'Medium' ? 'text-orange-500' : 'text-green-500');
            const currentStatusBadgeClass = `status-${incident.status.toLowerCase()}`;
            const row = `<tr><td class="px-4 py-3 text-sm text-white">${incident.id}</td><td class="px-4 py-3 text-sm text-white">${incident.location}</td><td class="px-4 py-3 text-sm font-semibold ${severityClass}">${incident.severity}</td><td class="px-4 py-3"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${currentStatusBadgeClass}">${incident.status}</span></td></tr>`;
            App.els.activeIncidentsTbody.insertAdjacentHTML('beforeend', row);
        });
    }
    
    function populateCategoryDropdown() {
        if (!App.els.videoCategorySelect) return;
        App.els.videoCategorySelect.innerHTML = '<option value="">Select Category</option>';
        const categories = new Set();
        App.data.youtubeVideos.forEach(video => {
            if (video.category) categories.add(video.category);
        });
        Array.from(categories).sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            App.els.videoCategorySelect.appendChild(option);
        });
    }

    function renderExistingVideos(searchTerm = '') {
        if (!App.els.existingVideosList) return;
        App.els.existingVideosList.innerHTML = '';
        const normalizedSearchTerm = searchTerm.toLowerCase().trim();
        const filteredVideos = App.data.youtubeVideos.filter(video => {
            if (normalizedSearchTerm === '') return true;
            const titleMatch = video.title.toLowerCase().includes(normalizedSearchTerm);
            const descriptionMatch = video.description.toLowerCase().includes(normalizedSearchTerm);
            const categoryMatch = video.category ? video.category.toLowerCase().includes(normalizedSearchTerm) : false;
            return titleMatch || descriptionMatch || categoryMatch;
        });
        if (filteredVideos.length === 0) {
            App.els.existingVideosList.innerHTML = `<div class="text-center text-gray-500 py-8 col-span-full">No videos found.</div>`;
            return;
        }
        filteredVideos.forEach((video, index) => {
            const videoCardId = `video-card-${video.id || index}`;
            const videoHtml = `<div class="video-card" id="${videoCardId}"><iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen title="${video.title}"></iframe><div class="video-info"><div class="video-title">${video.title}</div><div class="video-description">${video.description}</div></div><div class="video-card-actions"><button class="edit-btn" data-video-id="${video.id}" title="Edit"><i class="fas fa-edit"></i></button><button class="delete-btn" data-video-id="${video.id}" title="Delete"><i class="fas fa-trash-alt"></i></button></div></div>`;
            App.els.existingVideosList.insertAdjacentHTML('beforeend', videoHtml);
        });
        App.els.existingVideosList.querySelectorAll('.edit-btn').forEach(b => b.addEventListener('click', e => editVideo(e.currentTarget.dataset.videoId)));
        App.els.existingVideosList.querySelectorAll('.delete-btn').forEach(b => b.addEventListener('click', e => confirmDeleteVideo(e.currentTarget.dataset.videoId)));
    }

    function editVideo(videoId) {
        const videoToEdit = App.data.youtubeVideos.find(video => video.id === videoId);
        if (!videoToEdit) return;
        if (!App.els.formTitle || !App.els.submitVideoButton || !App.els.cancelEditButton || !App.els.youtubeEmbedCodeInput || !App.els.videoTitleInput || !App.els.videoDescriptionInput || !App.els.videoCategorySelect) return;
        App.els.formTitle.textContent = 'Edit Video';
        App.els.submitVideoButton.innerHTML = '<i class="fas fa-save mr-2"></i> Save Changes';
        App.els.cancelEditButton.classList.remove('hidden');
        App.els.youtubeEmbedCodeInput.value = videoToEdit.id;
        App.els.videoTitleInput.value = videoToEdit.title;
        App.els.videoDescriptionInput.value = videoToEdit.description;
        App.els.videoCategorySelect.value = videoToEdit.category || '';
        App.els.youtubeEmbedCodeInput.setAttribute('readonly', 'true');
        editingVideoId = videoId;
    }

    function resetVideoForm() {
        if (!App.els.formTitle || !App.els.submitVideoButton || !App.els.cancelEditButton || !App.els.youtubeEmbedCodeInput || !App.els.videoTitleInput || !App.els.videoDescriptionInput || !App.els.videoCategorySelect || !App.els.addVideoMessage || !App.els.videoSearchInput) return;
        App.els.formTitle.textContent = 'Add New Video';
        App.els.submitVideoButton.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> Add Video';
        App.els.cancelEditButton.classList.add('hidden');
        App.els.youtubeEmbedCodeInput.value = '';
        App.els.videoTitleInput.value = '';
        App.els.videoDescriptionInput.value = '';
        App.els.videoCategorySelect.value = '';
        App.els.youtubeEmbedCodeInput.removeAttribute('readonly');
        editingVideoId = null;
        App.els.addVideoMessage.classList.add('hidden');
        App.els.videoSearchInput.value = '';
        populateCategoryDropdown();
    }

    async function handleAddUpdateVideo(event) {
        event.preventDefault();
        if (!App.els.youtubeEmbedCodeInput || !App.els.videoTitleInput || !App.els.videoDescriptionInput || !App.els.videoCategorySelect || !App.els.addVideoMessage) return;
        const embedCode = App.els.youtubeEmbedCodeInput.value.trim();
        const title = App.els.videoTitleInput.value.trim();
        const description = App.els.videoDescriptionInput.value.trim();
        const category = App.els.videoCategorySelect.value.trim() || 'General';
        if (!embedCode || !title || !description) {
            App.els.addVideoMessage.classList.remove('hidden', 'success');
            App.els.addVideoMessage.classList.add('error');
            App.els.addVideoMessage.textContent = 'Please fill all required fields.';
            return;
        }
        if (!editingVideoId) {
            const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
            if (!youtubeIdRegex.test(embedCode)) {
                App.els.addVideoMessage.classList.remove('hidden', 'success');
                App.els.addVideoMessage.classList.add('error');
                App.els.addVideoMessage.textContent = 'Invalid YouTube Embed Code.';
                return;
            }
        }
        const videoData = { id: embedCode, title: title, description: description, category: category };
        let successMessage = '';
        let isError = false;
        if (editingVideoId) {
            const index = App.data.youtubeVideos.findIndex(video => video.id === editingVideoId);
            if (index !== -1) {
                App.data.youtubeVideos[index] = { ...App.data.youtubeVideos[index], ...videoData };
                successMessage = 'Video updated successfully!';
            } else {
                isError = true;
                successMessage = 'Error: Video not found.';
            }
        } else {
            App.data.youtubeVideos.push(videoData);
            successMessage = 'Video added successfully!';
        }
        await new Promise(resolve => setTimeout(resolve, App.data.SIMULATED_DELAY / 2));
        if (isError) {
            App.els.addVideoMessage.classList.remove('hidden', 'success');
            App.els.addVideoMessage.classList.add('error');
            App.els.addVideoMessage.textContent = successMessage;
        } else {
            App.els.addVideoMessage.classList.remove('hidden', 'error');
            App.els.addVideoMessage.classList.add('success');
            App.els.addVideoMessage.textContent = successMessage;
        }
        resetVideoForm();
        renderExistingVideos(App.els.videoSearchInput?.value || '');
        setTimeout(() => App.els.addVideoMessage.classList.add('hidden'), 3000);
    }
    
    function confirmDeleteVideo(videoIdToDelete) {
        const videoToDelete = App.data.youtubeVideos.find(v => v.id === videoIdToDelete);
        if (!videoToDelete) return;
        if (!App.els.confirmationModalTitle || !App.els.confirmationModalMessage || !App.els.confirmationModal || !App.els.confirmActionButton || !App.els.cancelActionButton) return;
        App.els.confirmationModalTitle.textContent = 'Delete Video';
        App.els.confirmationModalMessage.innerHTML = `Delete: <span class="font-bold text-white">"${videoToDelete.title}"</span>?`;
        App.els.confirmationModal.classList.remove('hidden');
        const newConfirmBtn = App.els.confirmActionButton.cloneNode(true);
        const newCancelBtn = App.els.cancelActionButton.cloneNode(true);
        App.els.confirmActionButton.replaceWith(newConfirmBtn);
        App.els.cancelActionButton.replaceWith(newCancelBtn);
        App.els.confirmActionButton = newConfirmBtn;
        App.els.cancelActionButton = newCancelBtn;
        App.els.confirmActionButton.addEventListener('click', () => {
            deleteVideo(videoIdToDelete);
            App.els.confirmationModal.classList.add('hidden');
        });
        App.els.cancelActionButton.addEventListener('click', () => {
            App.els.confirmationModal.classList.add('hidden');
        });
    }

    async function deleteVideo(videoId) {
        const initialLength = App.data.youtubeVideos.length;
        const videoTitle = App.data.youtubeVideos.find(v => v.id === videoId)?.title || 'Unknown';
        const filteredVideos = App.data.youtubeVideos.filter(video => video.id !== videoId);
        if (!App.els.addVideoMessage || !App.els.videoSearchInput) return;
        await new Promise(resolve => setTimeout(resolve, App.data.SIMULATED_DELAY / 2));
        if (filteredVideos.length < initialLength) {
            App.data.youtubeVideos.length = 0;
            Array.prototype.push.apply(App.data.youtubeVideos, filteredVideos);
            App.els.addVideoMessage.classList.remove('hidden', 'error');
            App.els.addVideoMessage.classList.add('success');
            App.els.addVideoMessage.textContent = `Video "${videoTitle}" deleted!`;
        } else {
            App.els.addVideoMessage.classList.remove('hidden', 'success');
            App.els.addVideoMessage.classList.add('error');
            App.els.addVideoMessage.textContent = `Error deleting "${videoTitle}".`;
        }
        renderExistingVideos(App.els.videoSearchInput.value);
        populateCategoryDropdown();
        setTimeout(() => App.els.addVideoMessage.classList.add('hidden'), 3000);
    }

    function initDashboardEventListeners() {
        if (App.els.activeStatusFilter) App.els.activeStatusFilter.addEventListener('change', renderActiveIncidentsTable);
        if (App.els.activeSeverityFilter) App.els.activeSeverityFilter.addEventListener('change', renderActiveIncidentsTable);
        if (App.els.activeSearch) App.els.activeSearch.addEventListener('input', renderActiveIncidentsTable);
        
        if (App.els.manageVideosButton) App.els.manageVideosButton.addEventListener('click', (event) => {
            event.stopPropagation();
            App.closeAllPopups(App.els.videoManagementModal?.id);
            resetVideoForm();
            populateCategoryDropdown();
            renderExistingVideos();
            if (App.els.videoManagementModal) App.els.videoManagementModal.classList.remove('hidden');
        });
        if (App.els.closeVideoManagementModal) App.els.closeVideoManagementModal.addEventListener('click', () => {
            if (App.els.videoManagementModal) App.els.videoManagementModal.classList.add('hidden');
            resetVideoForm();
        });
        if (App.els.addVideoForm) App.els.addVideoForm.addEventListener('submit', handleAddUpdateVideo);
        if (App.els.cancelEditButton) App.els.cancelEditButton.addEventListener('click', resetVideoForm);
        if (App.els.videoSearchInput) App.els.videoSearchInput.addEventListener('input', (event) => renderExistingVideos(event.target.value));

        if (App.els.statisticsMonthFilter) App.els.statisticsMonthFilter.addEventListener('change', () => renderStatisticsChart(App.els.statisticsMonthFilter.value, App.els.statisticsYearFilter.value));
        if (App.els.statisticsYearFilter) App.els.statisticsYearFilter.addEventListener('change', () => renderStatisticsChart(App.els.statisticsYearFilter.value, App.els.statisticsMonthFilter.value));
    }

    document.addEventListener('DOMContentLoaded', () => {
        initDashboardEventListeners();
        loadDashboardStats();
        renderActiveIncidentsTable();
        populateStatisticsFilters();
    });

    window.onload = () => {
        initMonthlyChart();
        if (App.els.statisticsMonthFilter && App.els.statisticsYearFilter) {
            renderStatisticsChart(App.els.statisticsMonthFilter.value, App.els.statisticsYearFilter.value);
        }
    };
})();

