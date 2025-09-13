/**
 * ================================================================================
 * --- General Layout JS (To be placed in your base.html <script> tag) ---
 * This file contains JS for reusable components like the sidebar and top nav.
 * ================================================================================
 */
(function() {
    // Ensure the global App object exists
    window.App = window.App || {};

    // Cache General UI Elements
    App.els = {
        ...App.els, // Preserve any elements already defined
        sidebar: document.getElementById('sidebar'),
        pinBtn: document.getElementById('sidebar-pin-btn'),
        pinIcon: document.getElementById('sidebar-pin-btn')?.querySelector('i'),
        mainContentWrapper: document.getElementById('main-content-wrapper'),
        notificationButton: document.getElementById('notificationButton'),
        notificationDropdown: document.getElementById('notificationDropdown'),
        notificationList: document.getElementById('notificationList'),
        closeNotificationBtn: document.getElementById('close-notification-btn'),
        viewAllIncidentsLink: document.getElementById('viewAllIncidentsLink'),
        allIncidentsModal: document.getElementById('allIncidentsModal'),
        closeAllIncidentsModal: document.getElementById('closeAllIncidentsModal'),
        modalStatusFilter: document.getElementById('modalStatusFilter'),
        modalSeverityFilter: document.getElementById('modalSeverityFilter'),
        modalTimeFilter: document.getElementById('modalTimeFilter'),
        modalYearFilter: document.getElementById('modalYearFilter'),
        modalMonthFilter: document.getElementById('modalMonthFilter'),
        modalDayFilter: document.getElementById('modalDayFilter'),
        modalSearchInput: document.getElementById('modalSearch'),
        confirmationModal: document.getElementById('confirmationModal'),
        confirmationModalTitle: document.getElementById('confirmationModalTitle'),
        confirmationModalMessage: document.getElementById('confirmationModalMessage'),
        confirmActionButton: document.getElementById('confirmActionButton'),
        cancelActionButton: document.getElementById('cancelActionButton'),
        allIncidentsTableBody: document.getElementById('allIncidentsTableBody'),
        totalIncidentsCount: document.getElementById('totalIncidentsCount'),
        notificationDot: document.getElementById('notification-dot'),
        incidentDetailsModal: document.getElementById('incidentDetailsModal'),
        closeIncidentDetailsModal: document.getElementById('closeIncidentDetailsModal'),
        closeDetailsButton: document.getElementById('closeDetailsButton'),
        detailId: document.getElementById('detailId'),
        detailLocation: document.getElementById('detailLocation'),
        detailSeverity: document.getElementById('detailSeverity'),
        detailStatus: document.getElementById('detailStatus'),
        detailDateTime: document.getElementById('detailDateTime'),
        detailCause: document.getElementById('detailCause'),
        detailIsDuplicate: document.getElementById('detailIsDuplicate'),
    };

	window.App = {
            els: {}, // To be populated by the scripts
            data: {
                // Data needed by base.js on every page
                simulatedNotifications: [
                    { id: 'NOTIF-ACC-001', messageTitle: 'Fatal Accident', messageSubtitle: 'Lagos-Ibadan Expressway', details: 'Incident ACC-001 reported.', timestamp: new Date(Date.now() - 1 * 3600 * 1000), unread: true },
                    { id: 'NOTIF-ACC-002', messageTitle: 'New Incident', messageSubtitle: 'Ojuelegba Bridge', details: 'Incident ACC-004 requires attention.', timestamp: new Date(Date.now() - 3 * 3600 * 1000), unread: true },
                    { id: 'NOTIF-ACC-003', messageTitle: 'Incident Resolved', messageSubtitle: 'Third Mainland Bridge', details: 'Incident ACC-002 has been resolved.', timestamp: new Date(Date.now() - 26 * 3600 * 1000), unread: false },
                    { id: 'NOTIF-ACC-004', messageTitle: 'Duplicate Flagged', messageSubtitle: 'Badagry Expressway', details: 'Incident ACC-005 flagged as duplicate.', timestamp: new Date(Date.now() - 50 * 3600 * 1000), unread: false },
                ]
            }
        };
		
    let isSidebarPinned = false;

    const sidebar = {
        expandedWidth: "20rem",
        collapsedWidth: "5rem",
        setMainContentMargin() {
            if (App.els.sidebar && App.els.mainContentWrapper) {
                if (App.els.sidebar.classList.contains('collapsed')) {
                    App.els.mainContentWrapper.style.marginLeft = this.collapsedWidth;
                } else {
                    App.els.mainContentWrapper.style.marginLeft = this.expandedWidth;
                }
            }
        },
        open() {
            if (App.els.sidebar && App.els.sidebar.classList.contains('collapsed')) {
                App.els.sidebar.classList.remove('collapsed');
                this.setMainContentMargin();
            }
        },
        close() {
            if (App.els.sidebar && !isSidebarPinned && !App.els.sidebar.classList.contains('collapsed')) {
                App.els.sidebar.classList.add('collapsed');
                this.setMainContentMargin();
            }
        },
        togglePin() {
            if (!App.els.pinBtn || !App.els.pinIcon) return;
            isSidebarPinned = !isSidebarPinned;
            App.els.pinBtn.classList.toggle('pinned', isSidebarPinned);
            if (isSidebarPinned) {
                App.els.pinIcon.classList.remove('fa-unlock');
                App.els.pinIcon.classList.add('fa-lock');
                this.open();
            } else {
                App.els.pinIcon.classList.remove('fa-lock');
                App.els.pinIcon.classList.add('fa-unlock');
                this.close();
            }
        },
        init() {
            if (App.els.sidebar) {
                App.els.sidebar.classList.add('collapsed');
                this.setMainContentMargin();
                App.els.sidebar.addEventListener('mouseenter', () => {
                    if (!isSidebarPinned) this.open();
                });
                App.els.sidebar.addEventListener('mouseleave', () => {
                    if (!isSidebarPinned) this.close();
                });
            }
            if (App.els.pinBtn) {
                App.els.pinBtn.addEventListener('click', () => this.togglePin());
            }
        }
    };

    function closeAllPopups(exceptId = null) {
        const popups = [
            App.els.notificationDropdown, App.els.allIncidentsModal,
            App.els.videoManagementModal, App.els.confirmationModal,
            App.els.incidentDetailsModal
        ];
        popups.forEach(element => {
            if (element && element.id !== exceptId && !element.classList.contains('hidden')) {
                element.classList.add('hidden');
            }
        });
        if (App.els.notificationButton) App.els.notificationButton.classList.remove('active');
    }

    function loadNotifications() {
        const sortedNotifications = [...App.data.simulatedNotifications].sort((a, b) => b.timestamp - a.timestamp);
        renderNotificationsToUI(sortedNotifications);
    }

    function renderNotificationsToUI(notifications) {
        if (!App.els.notificationList || !App.els.notificationDot) {
            if (App.els.notificationList) App.els.notificationList.innerHTML = `<div class="text-center p-4 text-slate-400">Error loading notifications.</div>`;
            return;
        }
        App.els.notificationList.innerHTML = '';
        let hasUnread = false;
        if (notifications.length === 0) {
            App.els.notificationList.innerHTML = `<div class="text-center p-4 text-slate-400">No new notifications.</div>`;
        } else {
            notifications.forEach(notif => {
                if (notif.unread) hasUnread = true;
                const timeString = notif.timestamp instanceof Date ? notif.timestamp.toLocaleString() : 'N/A';
                const itemHTML = `
                    <div class="notification-item" data-notification-id="${notif.id}">
                        <div class="icon-circle">${notif.messageTitle.substring(0, 2)}</div>
                        <div class="content">
                            <p class="title">${notif.messageTitle}</p>
                            <p class="subtitle">${notif.messageSubtitle}</p>
                            <p class="time">${notif.details} • ${timeString}</p>
                        </div>
                    </div>
                `;
                App.els.notificationList.insertAdjacentHTML('beforeend', itemHTML);
            });
        }
        App.els.notificationDot.classList.toggle('hidden', !hasUnread);
    }
    
    // Make functions available globally within the App namespace
    App.closeAllPopups = closeAllPopups;
    App.populateDateFilters = function() {
        if (!App.els.modalYearFilter || !App.els.modalMonthFilter || !App.els.modalDayFilter) return;
        const years = new Set(App.data.allFireIncidents.map(inc => new Date(inc.dateTime).getFullYear()));
        App.els.modalYearFilter.innerHTML = '<option value="all">All</option>';
        Array.from(years).sort((a,b) => b - a).forEach(year => { App.els.modalYearFilter.innerHTML += `<option value="${year}">${year}</option>`; });
        App.els.modalMonthFilter.innerHTML = '<option value="all">All</option>';
        for(let i = 1; i <= 12; i++) App.els.modalMonthFilter.innerHTML += `<option value="${i}">${new Date(0, i-1).toLocaleString('default', { month: 'long' })}</option>`;
        App.els.modalDayFilter.innerHTML = '<option value="all">All</option>';
        for(let i = 1; i <= 31; i++) App.els.modalDayFilter.innerHTML += `<option value="${i}">${i}</option>`;
    };
    App.populateIncidentsTable = function(incidents) {
         if (!App.els.allIncidentsTableBody || !App.els.totalIncidentsCount) return;
        App.els.allIncidentsTableBody.innerHTML = '';
        App.els.totalIncidentsCount.textContent = incidents.length;
        if (incidents.length === 0) {
            App.els.allIncidentsTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">No incidents found.</td></tr>';
            return;
        }
        incidents.forEach(incident => {
            const row = `<tr><td>${incident.id}</td><td>${incident.location}</td><td><span class="severity-text-${incident.severity.toLowerCase()}">${incident.severity}</span></td><td><span class="status-badge status-${incident.status.toLowerCase()}">${incident.status}</span></td><td>${new Date(incident.dateTime).toLocaleString()}</td><td><button class="view-details-btn bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-xs" data-incident-id="${incident.id}">View</button></td></tr>`;
            App.els.allIncidentsTableBody.insertAdjacentHTML('beforeend', row);
        });
        App.els.allIncidentsTableBody.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                App.openIncidentDetailsModal(event.currentTarget.dataset.incidentId);
            });
        });
    };
    App.openIncidentDetailsModal = function(incidentId) {
        if (!App.els.incidentDetailsModal) return;
        const incident = App.data.allFireIncidents.find(inc => inc.id === incidentId);
        if (!incident) return;
        if(App.els.detailId) App.els.detailId.textContent = incident.id;
        if(App.els.detailLocation) App.els.detailLocation.textContent = incident.location;
        if(App.els.detailSeverity) App.els.detailSeverity.textContent = incident.severity;
        if(App.els.detailStatus) App.els.detailStatus.textContent = incident.status;
        if(App.els.detailDateTime) App.els.detailDateTime.textContent = new Date(incident.dateTime).toLocaleString();
        if(App.els.detailCause) App.els.detailCause.textContent = incident.cause;
        if(App.els.detailIsDuplicate) App.els.detailIsDuplicate.textContent = incident.isDuplicate ? 'Yes' : 'No';
        closeAllPopups(App.els.incidentDetailsModal.id);
        App.els.incidentDetailsModal.classList.remove('hidden');
    };
     App.applyFiltersToAllIncidents = function() {
        const status = App.els.modalStatusFilter.value;
        const severity = App.els.modalSeverityFilter.value;
        const time = App.els.modalTimeFilter.value;
        const year = App.els.modalYearFilter.value;
        const month = App.els.modalMonthFilter.value;
        const day = App.els.modalDayFilter.value;
        const search = App.els.modalSearchInput.value.toLowerCase();
        const now = new Date();
        let filtered = App.data.allFireIncidents.filter(inc => {
            const incidentDate = new Date(inc.dateTime);
            const matchesStatus = status === 'all' || inc.status === status;
            const matchesSeverity = severity === 'all' || inc.severity === severity;
            const matchesSearch = search === '' || inc.location.toLowerCase().includes(search) || inc.id.toLowerCase().includes(search);
            let matchesDate = true;
            if (year !== 'all' || month !== 'all' || day !== 'all') {
                if (year !== 'all' && incidentDate.getFullYear() !== parseInt(year)) matchesDate = false;
                if (month !== 'all' && (incidentDate.getMonth() + 1) !== parseInt(month)) matchesDate = false;
                if (day !== 'all' && incidentDate.getDate() !== parseInt(day)) matchesDate = false;
            } else if (time !== 'all') {
                if (time === 'last_24_hours') matchesDate = incidentDate > new Date(now.getTime() - (24 * 60 * 60 * 1000));
                else if (time === 'last_7_days') matchesDate = incidentDate > new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
            }
            return matchesStatus && matchesSeverity && matchesSearch && matchesDate;
        });
        App.populateIncidentsTable(filtered);
    };


    function initGeneralEventListeners() {
        sidebar.init();
        if (App.els.notificationButton) {
            App.els.notificationButton.addEventListener('click', (event) => {
                event.stopPropagation();
                closeAllPopups(App.els.notificationDropdown?.id);
                if (App.els.notificationDropdown) {
                    const isHidden = App.els.notificationDropdown.classList.contains('hidden');
                    App.els.notificationDropdown.classList.toggle('hidden');
                    App.els.notificationButton.classList.toggle('active', !isHidden);
                    if (!isHidden && App.els.notificationDot) App.els.notificationDot.classList.add('hidden');
                }
            });
        }
        if (App.els.closeNotificationBtn) App.els.closeNotificationBtn.addEventListener('click', () => {
            if (App.els.notificationDropdown) App.els.notificationDropdown.classList.add('hidden');
            if (App.els.notificationButton) App.els.notificationButton.classList.remove('active');
        });
        document.addEventListener('click', (event) => {
            const clickedInsideAnyModal = event.target?.closest('.modal-overlay:not(.hidden)');
            const clickedInsideHeader = event.target?.closest('#main-header');
            if (!clickedInsideHeader && !clickedInsideAnyModal) closeAllPopups();
        });

        if (App.els.viewAllIncidentsLink) App.els.viewAllIncidentsLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllPopups();
            App.populateDateFilters();
            App.populateIncidentsTable(App.data.allFireIncidents);
            if (App.els.allIncidentsModal) App.els.allIncidentsModal.classList.remove('hidden');
        });
        if (App.els.closeAllIncidentsModal) App.els.closeAllIncidentsModal.addEventListener('click', () => {
            if (App.els.allIncidentsModal) App.els.allIncidentsModal.classList.add('hidden');
        });
        [App.els.modalStatusFilter, App.els.modalSeverityFilter, App.els.modalTimeFilter, App.els.modalYearFilter, App.els.modalMonthFilter, App.els.modalDayFilter]
        .forEach(filter => {
            if (filter) filter.addEventListener('change', App.applyFiltersToAllIncidents);
        });
        if (App.els.modalSearchInput) App.els.modalSearchInput.addEventListener('input', App.applyFiltersToAllIncidents);
        if (App.els.closeIncidentDetailsModal) App.els.closeIncidentDetailsModal.addEventListener('click', () => { if (App.els.incidentDetailsModal) App.els.incidentDetailsModal.classList.add('hidden'); });
        if (App.els.closeDetailsButton) App.els.closeDetailsButton.addEventListener('click', () => { if (App.els.incidentDetailsModal) App.els.incidentDetailsModal.classList.add('hidden'); });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGeneralEventListeners();
        loadNotifications();
    });

})();
