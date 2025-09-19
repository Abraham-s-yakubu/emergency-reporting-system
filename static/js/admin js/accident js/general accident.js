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
		SIMULATED_DELAY: 800,
		allAccidentIncidents: [
			{
				id: "ACC-018",
				location: "Ibadan Ring Road",
				impact: "Minor",
				status: "Resolved",
				dateTime: "2025-05-01T09:00:00Z",
				cause: "Reckless Driving",
				isDuplicate: false,
			},
		],

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

		youtubeVideos: [
			{
				id: "S1-x1Fm-QJg",
				title: "Safe Driving Practices",
				description:
					"Tips for defensive driving and avoiding common road hazards.",
				category: "Driving Safety",
			},
			{
				id: "vA6z7o0_mXs",
				title: "Pedestrian Safety Awareness",
				description:
					"Important rules and tips for pedestrians to stay safe on the roads.",
				category: "Pedestrian Safety",
			},
			{
				id: "f5w0M45M_t8",
				title: "First Aid for Road Accidents",
				description:
					"Basic first aid steps to take when responding to a road accident victim.",
				category: "Emergency Response",
			},
			{
				id: "UfC08Krxr0g",
				title: "Motorcycle Safety Gear Guide",
				description:
					"A comprehensive guide to essential safety gear for motorcycle riders.",
				category: "Motorcycle Safety",
			},
		],
	};
	console.log();
	// Add this code block inside your main IIFE, for example, after the App.data definition.

	// App.connectToSupabase = function () {
	// 	// 1. Initialize the Supabase Client
	// 	const SUPABASE_URL = "https://joxvwdoogkqjmpwadqna.supabase.co";
	// 	const SUPABASE_ANON_KEY =
	// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveHZ3ZG9vZ2txam1wd2FkcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg3NzQsImV4cCI6MjA2NjE5NDc3NH0.zD5lyn0HrAUUye_sVuxAyJ77VWSkd9UasOXG3Cmo23Q";

	// 	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// 		console.error("Supabase URL or Key is not defined.");
	// 		return;
	// 	}

	// 	// --- FIX #1: Use the global 'supabase' to create a new client with a different name ---
	// 	const supabaseClient = supabase.createClient(
	// 		SUPABASE_URL,
	// 		SUPABASE_ANON_KEY
	// 	);
	// 	console.log("Supabase client initialized.");

	// 	// 2. This function is called when a new incident arrives
	// 	const handleNewIncident = (payload) => {
	// 		const newRecord = payload.new;
	// 		console.log("New incident received from Supabase:", newRecord);

	// 		const formattedNotification = {
	// 			id: `NOTIF-ACC-${newRecord.incident_id}`,
	// 			messageTitle: newRecord.incident_type,
	// 			messageSubtitle: newRecord.address,
	// 			details: `A ${newRecord.severity_level} incident was reported.`,
	// 			timestamp: new Date(
	// 				newRecord.reported_date + "T" + newRecord.reported_time
	// 			),
	// 			unread: true,
	// 		};
	// 		App.data.simulatedNotifications.unshift(formattedNotification);
	// 		App.loadNotifications();
	// 	};

	// 	// 3. Subscribe to the 'accident_incidents' table
	// 	// --- Use the new `supabaseClient` variable here ---
	// 	const channel = supabaseClient.channel("accident-incidents-realtime");

	// 	channel
	// 		.on(
	// 			"postgres_changes",
	// 			{
	// 				event: "INSERT",
	// 				schema: "public",
	// 				// --- FIX #2: Use the database table name (e.g., accident_incidents) ---
	// 				table: "accident_incidents",
	// 			},
	// 			handleNewIncident
	// 		)
	// 		.subscribe((status) => {
	// 			if (status === "SUBSCRIBED") {
	// 				console.log(
	// 					"✅ Successfully subscribed to real-time incident updates!"
	// 				);
	// 			} else {
	// 				console.error("Failed to subscribe to real-time updates.");
	// 			}
	// 		});
	// };
	App.connectToSupabase = function () {
		// This function now assumes the client already exists on the window object.
		if (!window.supabaseClient) {
			console.error(
				"Supabase client not found. Cannot connect for real-time updates."
			);
			return;
		}

		console.log("Setting up real-time subscription...");
		const channel = window.supabaseClient.channel(
			"accident-incidents-realtime"
		);

		channel
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "accident_incidents" },
				(payload) => {
					// This is the handleNewIncident logic, placed directly
					const newRecord = payload.new;
					const formattedNotification = {
						id: `NOTIF-ACC-${newRecord.incident_id}`,
						messageTitle: newRecord.incident_type,
						messageSubtitle: newRecord.address,
						details: `A ${newRecord.severity_level} incident was reported.`,
						timestamp: new Date(
							newRecord.reported_date + "T" + newRecord.reported_time
						),
						unread: true,
					};
					App.data.simulatedNotifications.unshift(formattedNotification);
					App.loadNotifications();
				}
			)
			.subscribe((status) => {
				if (status === "SUBSCRIBED") {
					console.log(
						"✅ Successfully subscribed to real-time incident updates!"
					);
				}
			});
	};
	let isSidebarPinned = false;
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

	// Add this new function to your general.js file

	App.fetchInitialIncidents = async function () {
		console.log("Fetching initial incidents from Supabase...");

		// 1. Fetch the data from the 'accident_incidents' table
		// We select all columns (*) and order by the most recent report first.
		const { data: rawIncidents, error } = await window.supabaseClient
			.from("accident_incidents")
			.select("*")
			.order("reported_date", { ascending: false });

		// 2. Handle any errors
		if (error) {
			console.error("Error fetching incidents:", error);
			return; // Stop the function if there's an error
		}

		// 3. Format the raw data to match your UI's expected structure
		const formattedIncidents = rawIncidents.map((incident) => {
			return {
				// IDs and Details
				id: `ACC-${String(incident.incident_id).padStart(3, "0")}`,
				incidentType: incident.incident_type,
				impact: incident.severity_level, // Maps 'severity_level' to 'impact'
				status: incident.status,
				isDuplicate: incident.is_duplicate,

				// Location and Time
				location: incident.address, // Maps 'address' to 'location'
				additionalInfo: incident.additional_info,
				latitude: incident.latitude,
				longitude: incident.longitude,
				dateTime: `${incident.reported_date}T${incident.reported_time}`, // Combines date and time

				// Casualties and Damage
				casualties: incident.casualties,
				numberOfInjured: incident.number_of_injured,
				areaAffected: incident.area_affected,
				estimatedDamage: incident.estimated_damage,

				// Property and Cause
				propertyAffected: incident.property_affected,
				cause: incident.accident_cause, // Maps 'accident_cause' to 'cause'
				vehiclesAffected: incident.number_of_vehicles_affected,

				// Response Details
				responseTimeMinutes: incident.response_time_minutes,
			};
		});

		// 4. Store the formatted data in your global App object
		App.data.allAccidentIncidents = formattedIncidents;
		console.log(
			"✅ Successfully fetched and formatted incidents.",
			App.data.allAccidentIncidents
		);
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
		console.log("--- Debugging populateIncidentsTable ---");
		console.log("Incidents received by function:", incidents);

		// Checkpoint A: Verify the elements exist
		if (!App.els.allIncidentsTableBody) {
			console.error(
				"❌ ABORT: Could not find HTML element with id 'allIncidentsTableBody'. Check your HTML file."
			);
			return;
		}
		if (!App.els.totalIncidentsCount) {
			console.error(
				"❌ ABORT: Could not find HTML element with id 'totalIncidentsCount'. Check your HTML file."
			);
			return;
		}
		console.log("✅ Checkpoint A: HTML elements found.");

		// Checkpoint B: Update count and clear table
		App.els.allIncidentsTableBody.innerHTML = "";
		App.els.totalIncidentsCount.textContent = incidents.length;
		console.log(
			`✅ Checkpoint B: Count updated to ${incidents.length}. Table cleared.`
		);

		if (incidents.length === 0) {
			console.log("Checkpoint C: No incidents to display. Exiting.");
			App.els.allIncidentsTableBody.innerHTML =
				'<tr><td colspan="6" class="text-center py-4 text-slate-400">No incidents found.</td></tr>';
			return;
		}

		// Checkpoint D: Start looping through incidents
		console.log("Checkpoint D: Starting to build and append table rows...");
		incidents.forEach((incident, index) => {
			try {
				// This will try to build the row for each incident
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
			} catch (error) {
				// If an error occurs on any single incident (e.g., incident.impact is null), this will catch it
				console.error(
					`❌ ERROR processing incident at index ${index}:`,
					incident
				);
				console.error("The specific error is:", error);
			}
		});
		console.log("--- Finished populating table ---");
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

	// // Initialize general, data-independent listeners once the DOM is ready.
	// document.addEventListener("DOMContentLoaded", initGeneralEventListeners);
	// if (typeof App.loadNotifications === "function") {
	// 	App.loadNotifications();
	// } else {
	// 	console.error(
	// 		"loadNotifications function not found on App object. Is base.js loaded?"
	// 	);
	// }

	// // At the very bottom of your general.js file, inside the IIFE

	// // ... your existing initGeneralEventListeners function ...

	// // Initialize general, data-independent listeners once the DOM is ready.
	// document.addEventListener("DOMContentLoaded", initGeneralEventListeners);

	// // This part loads your initial (simulated) notifications
	// if (typeof App.loadNotifications === "function") {
	// 	App.loadNotifications();
	// } else {
	// 	console.error("loadNotifications function not found on App object.");
	// }

	// // --- ADD THIS LINE ---
	// // Now, also connect to Supabase to listen for live updates
	// App.connectToSupabase();
	// At the very bottom of your general.js file
	// document.addEventListener("DOMContentLoaded", async function () {
	// 	console.log("DOM is ready. Initializing app...");

	// 	try {
	// 		// --- STEP 1: CREATE AND STORE THE CLIENT GLOBALLY ---
	// 		const SUPABASE_URL = "https://joxvwdoogkqjmpwadqna.supabase.co";
	// 		const SUPABASE_ANON_KEY =
	// 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveHZ3ZG9vZ2txam1wd2FkcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg3NzQsImV4cCI6MjA2NjE5NDc3NH0.zD5lyn0HrAUUye_sVuxAyJ77VWSkd9UasOXG3Cmo23Q";

	// 		if (typeof supabase !== "undefined") {
	// 			window.supabaseClient = supabase.createClient(
	// 				SUPABASE_URL,
	// 				SUPABASE_ANON_KEY
	// 			);
	// 			console.log("✅ Supabase client created and stored globally.");
	// 		} else {
	// 			// If the library isn't loaded, we can't continue.
	// 			throw new Error("Supabase library did not load.");
	// 		}

	// 		// --- STEP 2: NOW RUN ALL THE FUNCTIONS THAT USE THE CLIENT ---
	// 		initGeneralEventListeners();
	// 		App.connectToSupabase(); // Uses the global client
	// 		await App.fetchInitialIncidents(); // Also uses the global client
	// 		App.loadNotifications();
	// 		console.log("🚀 incident initialization getting data.");
	// 		console.log(App.data.allAccidentIncidents);
	// 		App.populateIncidentsTable(App.data.allAccidentIncidents);
	// 	} catch (error) {
	// 		console.error("❌ FATAL ERROR during app initialization:", error);
	// 	}
	// });
	// This is the closing of your main function wrapper
	// At the VERY BOTTOM of your general.js file
// This should be the ONLY startup block.

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM is ready. Initializing app...");

    try {
        // STEP 1: CREATE AND STORE THE CLIENT GLOBALLY
        const SUPABASE_URL = 'https://joxvwdoogkqjmpwadqna.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveHZ3ZG9vZ2txam1wd2FkcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg3NzQsImV4cCI6MjA2NjE5NDc3NH0.zD5lyn0HrAUUye_sVuxAyJ77VWSkd9UasOXG3Cmo23Q';
        
        if (typeof supabase !== 'undefined') {
            window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            throw new Error("Supabase library did not load.");
        }
        console.log("✅ Supabase client created and stored globally.");

        // --- STEP 2: RUN ALL YOUR STARTUP FUNCTIONS ---
        initGeneralEventListeners();
        App.connectToSupabase();
        await App.fetchInitialIncidents(); // 1. Wait for data to load from the database
        App.loadNotifications();

        // --- THIS IS THE CRITICAL LINE THAT IS LIKELY MISSING ---
        // 2. Immediately populate the table with the data you just fetched.
        App.populateIncidentsTable(App.data.allAccidentIncidents);
		 if (typeof App.initDashboardPage === 'function') {
            App.initDashboardPage();
        }

        console.log("🚀 App initialization complete.");

    } catch (error) {
        console.error("❌ FATAL ERROR during app initialization:", error);
    }
});
})();
