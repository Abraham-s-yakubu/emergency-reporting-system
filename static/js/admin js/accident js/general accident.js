/**
 * ================================================================================
 * --- General Layout JS (To be placed in your base.html <script> tag) ---
 * This file contains JS for reusable components like the sidebar and top nav.
 * These functions are made available on the global `App` object and are called
 * by the page-specific script after the necessary data is defined.
 * ================================================================================
 */
(function () {
	// Ensure the global App object exists
	window.App = window.App || {};

	// Cache General UI Elements
	// These are elements expected to be in the base template.
	App.els = {
		...App.els,
		sidebar: document.getElementById("sidebar"),
		pinBtn: document.getElementById("sidebar-pin-btn"),
		pinIcon: document.getElementById("sidebar-pin-btn")?.querySelector("i"),
		mainContentWrapper: document.getElementById("main-content-wrapper"),
		notificationButton: document.getElementById("notificationButton"),
		notificationDropdown: document.getElementById("notificationDropdown"),
		notificationList: document.getElementById("notificationList"),
		closeNotificationBtn: document.getElementById("close-notification-btn"),
		viewAllIncidentsLink: document.getElementById("viewAllIncidentsLink"),
		allIncidentsModal: document.getElementById("allIncidentsModal"),
		closeAllIncidentsModal: document.getElementById("closeAllIncidentsModal"),
		modalStatusFilter: document.getElementById("modalStatusFilter"),
		modalImpactFilter: document.getElementById("modalImpactFilter"),
		modalTimeFilter: document.getElementById("modalTimeFilter"),
		modalYearFilter: document.getElementById("modalYearFilter"),
		modalMonthFilter: document.getElementById("modalMonthFilter"),
		modalDayFilter: document.getElementById("modalDayFilter"),
		modalSearchInput: document.getElementById("modalSearch"),
		allIncidentsTableBody: document.getElementById("allIncidentsTableBody"),
		totalIncidentsCount: document.getElementById("totalIncidentsCount"),
		notificationDot: document.getElementById("notification-dot"),
	};
	App.data = {
		simulatedNotifications: [
			{
				id: "NOTIF-ACC-001",
				messageTitle: "Fatal Accident",
				messageSubtitle: "Lagos-Ibadan Expressway",
				details: "Incident ACC-001 reported.",
				timestamp: new Date(Date.now() - 1 * 3600 * 1000),
				unread: true,
			},
			{
				id: "NOTIF-ACC-002",
				messageTitle: "New Incident",
				messageSubtitle: "Ojuelegba Bridge",
				details: "Incident ACC-004 requires attention.",
				timestamp: new Date(Date.now() - 3 * 3600 * 1000),
				unread: true,
			},
			{
				id: "NOTIF-ACC-003",
				messageTitle: "Incident Resolved",
				messageSubtitle: "Third Mainland Bridge",
				details: "Incident ACC-002 has been resolved.",
				timestamp: new Date(Date.now() - 26 * 3600 * 1000),
				unread: false,
			},
			{
				id: "NOTIF-ACC-004",
				messageTitle: "Duplicate Flagged",
				messageSubtitle: "Badagry Expressway",
				details: "Incident ACC-005 flagged as duplicate.",
				timestamp: new Date(Date.now() - 50 * 3600 * 1000),
				unread: false,
			},
		],
	};
	// --- Sidebar Logic ---
	const sidebar = {
		expandedWidth: "20rem",
		collapsedWidth: "5rem",
		setMainContentMargin() {
			if (App.els.sidebar && App.els.mainContentWrapper) {
				const margin = App.els.sidebar.classList.contains("collapsed")
					? this.collapsedWidth
					: this.expandedWidth;
				App.els.mainContentWrapper.style.marginLeft = margin;
			}
		},
		open() {
			if (App.els.sidebar?.classList.contains("collapsed")) {
				App.els.sidebar.classList.remove("collapsed");
				this.setMainContentMargin();
			}
		},
		close() {
			if (
				App.els.sidebar &&
				!isSidebarPinned &&
				!App.els.sidebar.classList.contains("collapsed")
			) {
				App.els.sidebar.classList.add("collapsed");
				this.setMainContentMargin();
			}
		},
		togglePin() {
			if (!App.els.pinBtn || !App.els.pinIcon) return;
			isSidebarPinned = !isSidebarPinned;
			App.els.pinBtn.classList.toggle("pinned", isSidebarPinned);
			App.els.pinIcon.classList.toggle("fa-unlock", !isSidebarPinned);
			App.els.pinIcon.classList.toggle("fa-lock", isSidebarPinned);
			if (isSidebarPinned) this.open();
			else this.close();
		},
		init() {
			if (App.els.sidebar) {
				App.els.sidebar.classList.add("collapsed");
				this.setMainContentMargin();
				App.els.sidebar.addEventListener(
					"mouseenter",
					() => !isSidebarPinned && this.open()
				);
				App.els.sidebar.addEventListener(
					"mouseleave",
					() => !isSidebarPinned && this.close()
				);
			}
			if (App.els.pinBtn) {
				App.els.pinBtn.addEventListener("click", () => this.togglePin());
			}
		},
	};

	// --- Global Popup Management ---
	App.closeAllPopups = function (exceptId = null) {
		// This includes page-specific modals which might not exist on every page, hence the checks.
		const popups = [
			App.els.notificationDropdown,
			App.els.allIncidentsModal,
			App.els.videoManagementModal,
			App.els.confirmationModal,
		];
		popups.forEach((element) => {
			if (
				element &&
				element.id !== exceptId &&
				!element.classList.contains("hidden")
			) {
				element.classList.add("hidden");
			}
		});
		if (App.els.notificationButton)
			App.els.notificationButton.classList.remove("active");
	};

	// --- Notification Rendering (Data-dependent) ---
	App.renderNotificationsToUI = function (notifications) {
		if (!App.els.notificationList || !App.els.notificationDot) return;
		App.els.notificationList.innerHTML = "";
		let hasUnread = false;
		if (notifications.length === 0) {
			App.els.notificationList.innerHTML = `<div class="text-center p-4 text-slate-400">No new notifications.</div>`;
		} else {
			notifications.forEach((notif) => {
				if (notif.unread) hasUnread = true;
				const timeString =
					notif.timestamp instanceof Date
						? notif.timestamp.toLocaleString()
						: "N/A";
				const itemHTML = `
                    <div class="notification-item" data-notification-id="${
											notif.id
										}">
                        <div class="icon-circle">${notif.messageTitle.substring(
													0,
													2
												)}</div>
                        <div class="content">
                            <p class="title">${notif.messageTitle}</p>
                            <p class="subtitle">${notif.messageSubtitle}</p>
                            <p class="time">${notif.details} • ${timeString}</p>
                        </div>
                    </div>`;
				App.els.notificationList.insertAdjacentHTML("beforeend", itemHTML);
			});
		}
		App.els.notificationDot.classList.toggle("hidden", !hasUnread);
	};

	// This function relies on page-specific data (App.data) being available
	App.loadNotifications = function () {
		if (!App.data || !App.data.simulatedNotifications) {
			console.error(
				"App.data.simulatedNotifications is not defined. Ensure page-specific JS is loaded and defines it."
			);
			return;
		}
		const sortedNotifications = [...App.data.simulatedNotifications].sort(
			(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
		);
		App.renderNotificationsToUI(sortedNotifications);
	};

	// --- "All Incidents" Modal Logic (Data-dependent) ---
	App.populateDateFilters = function () {
		if (
			!App.els.modalYearFilter ||
			!App.els.modalMonthFilter ||
			!App.els.modalDayFilter ||
			!App.data.allAccidentIncidents
		)
			return;
		const years = new Set(
			App.data.allAccidentIncidents.map((inc) =>
				new Date(inc.dateTime).getFullYear()
			)
		);
		App.els.modalYearFilter.innerHTML = '<option value="all">All</option>';
		Array.from(years)
			.sort((a, b) => b - a)
			.forEach((year) => {
				App.els.modalYearFilter.innerHTML += `<option value="${year}">${year}</option>`;
			});
		App.els.modalMonthFilter.innerHTML = '<option value="all">All</option>';
		for (let i = 1; i <= 12; i++)
			App.els.modalMonthFilter.innerHTML += `<option value="${i}">${new Date(
				0,
				i - 1
			).toLocaleString("default", { month: "long" })}</option>`;
		App.els.modalDayFilter.innerHTML = '<option value="all">All</option>';
		for (let i = 1; i <= 31; i++)
			App.els.modalDayFilter.innerHTML += `<option value="${i}">${i}</option>`;
	};

	App.populateIncidentsTable = function (incidents) {
		if (!App.els.allIncidentsTableBody || !App.els.totalIncidentsCount) return;
		App.els.allIncidentsTableBody.innerHTML = "";
		App.els.totalIncidentsCount.textContent = incidents.length;
		if (incidents.length === 0) {
			App.els.allIncidentsTableBody.innerHTML =
				'<tr><td colspan="6" class="text-center py-4 text-slate-400">No incidents found.</td></tr>';
			return;
		}
		incidents.forEach((incident) => {
			const row = `<tr><td>${incident.id}</td><td>${
				incident.location
			}</td><td><span class="impact-text-${incident.impact.toLowerCase()}">${
				incident.impact
			}</span></td><td><span class="status-badge status-${incident.status.toLowerCase()}">${
				incident.status
			}</span></td><td>${new Date(
				incident.dateTime
			).toLocaleString()}</td><td><button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg text-xs">View</button></td></tr>`;
			App.els.allIncidentsTableBody.insertAdjacentHTML("beforeend", row);
		});
	};

	App.applyFiltersToAllIncidents = function () {
		const status = App.els.modalStatusFilter.value;
		const impact = App.els.modalImpactFilter.value;
		const time = App.els.modalTimeFilter.value;
		const year = App.els.modalYearFilter.value;
		const month = App.els.modalMonthFilter.value;
		const day = App.els.modalDayFilter.value;
		const search = App.els.modalSearchInput.value.toLowerCase();
		const now = new Date();
		let filtered = App.data.allAccidentIncidents.filter((inc) => {
			const incidentDate = new Date(inc.dateTime);
			const matchesStatus = status === "all" || inc.status === status;
			const matchesImpact = impact === "all" || inc.impact === impact;
			const matchesSearch =
				search === "" ||
				inc.location.toLowerCase().includes(search) ||
				inc.id.toLowerCase().includes(search);
			let matchesDate = true;
			if (year !== "all" || month !== "all" || day !== "all") {
				if (year !== "all" && incidentDate.getFullYear() !== parseInt(year))
					matchesDate = false;
				if (month !== "all" && incidentDate.getMonth() + 1 !== parseInt(month))
					matchesDate = false;
				if (day !== "all" && incidentDate.getDate() !== parseInt(day))
					matchesDate = false;
			} else if (time !== "all") {
				if (time === "last_24_hours")
					matchesDate =
						incidentDate > new Date(now.getTime() - 24 * 60 * 60 * 1000);
				else if (time === "last_7_days")
					matchesDate =
						incidentDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
			}
			return matchesStatus && matchesImpact && matchesSearch && matchesDate;
		});
		App.populateIncidentsTable(filtered);
	};

	// --- General Event Listeners ---
	function initGeneralEventListeners() {
		sidebar.init();

		if (App.els.notificationButton) {
			App.els.notificationButton.addEventListener("click", (event) => {
				event.stopPropagation();
				App.closeAllPopups(App.els.notificationDropdown?.id);
				if (App.els.notificationDropdown) {
					const isHidden =
						App.els.notificationDropdown.classList.contains("hidden");
					App.els.notificationDropdown.classList.toggle("hidden");
					App.els.notificationButton.classList.toggle("active", !isHidden);
					if (!isHidden && App.els.notificationDot)
						App.els.notificationDot.classList.add("hidden");
				}
			});
		}

		if (App.els.closeNotificationBtn)
			App.els.closeNotificationBtn.addEventListener("click", () =>
				App.closeAllPopups()
			);

		if (App.els.viewAllIncidentsLink)
			App.els.viewAllIncidentsLink.addEventListener("click", (e) => {
				e.preventDefault();
				App.closeAllPopups();
				// These functions require data from the specific page
				if (
					typeof App.populateDateFilters === "function" &&
					App.data &&
					App.data.allAccidentIncidents
				) {
					App.populateDateFilters();
					App.populateIncidentsTable(App.data.allAccidentIncidents);
				}
				if (App.els.allIncidentsModal)
					App.els.allIncidentsModal.classList.remove("hidden");
			});

		if (App.els.closeAllIncidentsModal)
			App.els.closeAllIncidentsModal.addEventListener("click", () => {
				if (App.els.allIncidentsModal)
					App.els.allIncidentsModal.classList.add("hidden");
			});

		[
			App.els.modalStatusFilter,
			App.els.modalImpactFilter,
			App.els.modalTimeFilter,
			App.els.modalYearFilter,
			App.els.modalMonthFilter,
			App.els.modalDayFilter,
		].forEach((filter) =>
			filter?.addEventListener("change", App.applyFiltersToAllIncidents)
		);

		App.els.modalSearchInput?.addEventListener(
			"input",
			App.applyFiltersToAllIncidents
		);

		document.addEventListener("click", (event) => {
			const clickedInsideModal = event.target?.closest(
				".modal-overlay:not(.hidden)"
			);
			const clickedInsideHeader = event.target?.closest("#main-header");
			if (!clickedInsideHeader && !clickedInsideModal) {
				App.closeAllPopups();
			}
		});
	}

	// Initialize general, data-independent listeners once the DOM is ready.
	document.addEventListener("DOMContentLoaded", initGeneralEventListeners);
	if (typeof App.loadNotifications === "function") {
		App.loadNotifications();
	} else {
		console.error(
			"loadNotifications function not found on App object. Is base.js loaded?"
		);
	}
})();
