/**
 * ================================================================================
 * --- Page-Specific JS (To be placed in the Django content block for this page) ---
 * This file contains JS that is only needed for the accident dashboard.
 * It defines the page-specific data and orchestrates all initialization.
 * ================================================================================
 */
(function () {


	
	// Ensure the global App object exists
	window.App = window.App || {};

	// --- Page-Specific Data ---
	// In a real Django app, this would be fetched via an API call or rendered into the template.
	

	// Cache Dashboard-specific UI Elements
	App.els = {
		...App.els,
		activeStatusFilter: document.getElementById("activeStatusFilter"),
		activeImpactFilter: document.getElementById("activeImpactFilter"),
		activeSearch: document.getElementById("activeSearch"),
		manageVideosButton: document.getElementById("manageVideosButton"),
		videoManagementModal: document.getElementById("videoManagementModal"),
		closeVideoManagementModal: document.getElementById(
			"closeVideoManagementModal"
		),
		addVideoForm: document.getElementById("addVideoForm"),
		cancelEditButton: document.getElementById("cancelEditButton"),
		videoSearchInput: document.getElementById("videoSearchInput"),
		statisticsMonthFilter: document.getElementById("statisticsMonthFilter"),
		statisticsYearFilter: document.getElementById("statisticsYearFilter"),
		confirmationModal: document.getElementById("confirmationModal"),
		confirmationModalTitle: document.getElementById("confirmationModalTitle"),
		confirmationModalMessage: document.getElementById(
			"confirmationModalMessage"
		),
		confirmActionButton: document.getElementById("confirmActionButton"),
		cancelActionButton: document.getElementById("cancelActionButton"),
		resolvedReportsEl: document.getElementById("resolved-reports"),
		pendingReportsEl: document.getElementById("pending-reports"),
		totalIncidentsThisMonthEl: document.getElementById(
			"total-incidents-this-month"
		),
		responseRateProgress: document.getElementById("response-rate-progress"),
		responseRatePercentage: document.getElementById("response-rate-percentage"),
		responseRateCurrent: document.getElementById("response-rate-current"),
		responseRateLastMonth: document.getElementById("response-rate-last-month"),
		responseRateMessage1: document.getElementById("response-rate-message1"),
		responseRateMessage2: document.getElementById("response-rate-message2"),
		monthlyChartContainer: document.getElementById("monthly-chart-container"),
		monthlyIncidentsChart: document.getElementById("monthlyIncidentsChart"),
		statisticsChartContainer: document.getElementById(
			"statistics-chart-container"
		),
		statisticsChart: document.getElementById("statisticsChart"),
		noDataStatisticsMessage: document.getElementById("noDataStatisticsMessage"),
		activeIncidentsTbody: document.getElementById("active-incidents-tbody"),
		activeIncidentsTable: document
			.getElementById("active-incidents-table-container")
			?.querySelector("table"),
		addVideoMessage: document.getElementById("addVideoMessage"),
		youtubeEmbedCodeInput: document.getElementById("youtubeEmbedCode"),
		videoTitleInput: document.getElementById("videoTitle"),
		videoDescriptionInput: document.getElementById("videoDescription"),
		videoCategorySelect: document.getElementById("videoCategory"),
		formTitle: document.getElementById("formTitle"),
		submitVideoButton: document.getElementById("submitVideoButton"),
		existingVideosList: document.getElementById("existingVideosList"),
	};

	let editingVideoId = null;
	let monthlyChartInstance = null;
	let statisticsChartInstance = null;

	async function getDashboardStats() {
		// ... (rest of the functions remain the same as in the single-file version)
		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();
		const incidentsThisMonth = App.data.allAccidentIncidents.filter((inc) => {
			const incidentDate = new Date(inc.dateTime);
			return (
				incidentDate.getMonth() === currentMonth &&
				incidentDate.getFullYear() === currentYear
			);
		}).length;
		const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
		const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
		const incidentsLastMonth = App.data.allAccidentIncidents.filter((inc) => {
			const incidentDate = new Date(inc.dateTime);
			return (
				incidentDate.getMonth() === prevMonth &&
				incidentDate.getFullYear() === prevMonthYear
			);
		}).length;
		let incidentsTrend = 0;
		let incidentsTrendDirection = "neutral";
		if (incidentsLastMonth > 0) {
			incidentsTrend =
				((incidentsThisMonth - incidentsLastMonth) / incidentsLastMonth) * 100;
			incidentsTrendDirection = incidentsTrend >= 0 ? "up" : "down";
		} else if (incidentsThisMonth > 0) {
			incidentsTrend = 100;
			incidentsTrendDirection = "up";
		}
		return new Promise((r) =>
			setTimeout(
				() =>
					r({
						resolvedReports: { value: 550, trend: 12, trendDirection: "up" },
						pendingReports: { value: 85, trend: 5, trendDirection: "down" },
						totalIncidentsThisMonth: {
							value: incidentsThisMonth,
							trend: Math.abs(incidentsTrend),
							trendDirection: incidentsTrendDirection,
						},
						responseRate: { current: 78.5, lastMonth: 72.0, target: 90 },
					}),
				App.data.SIMULATED_DELAY
			)
		);
	}

	async function getMonthlyIncidentsData() {
		return new Promise((r) =>
			setTimeout(
				() =>
					r({
						labels: [
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec",
						],
						datasets: [
							{
								label: "Accident Incidents",
								data: [18, 15, 22, 19, 23, 20, 14, 28, 30, 25, 20, 35],
								backgroundColor: "rgba(59, 130, 246, 0.6)",
								borderColor: "rgba(59, 130, 246, 1)",
								borderWidth: 1,
								borderRadius: 4,
							},
						],
					}),
				App.data.SIMULATED_DELAY
			)
		);
	}

	async function getActiveIncidents() {
		return new Promise((r) =>
			setTimeout(
				() =>
					r(
						App.data.allAccidentIncidents.filter(
							(inc) => inc.status !== "Resolved"
						)
					),
				App.data.SIMULATED_DELAY
			)
		);
	}

	function updateProgressBar(percentage, progressBarEl, percentageTextEl) {
		if (!progressBarEl || !percentageTextEl) return;
		const radius = progressBarEl.r.baseVal.value;
		const circumference = 2 * Math.PI * radius;
		progressBarEl.style.strokeDasharray = circumference;
		const offset = circumference - (percentage / 100) * circumference;
		progressBarEl.style.strokeDashoffset = offset;
		percentageTextEl.textContent = `${percentage.toFixed(2)}%`;
		percentageTextEl.classList.remove("loading-placeholder");
	}

	function renderTrend(element, trendValue, trendDirection) {
		if (!element) return;
		let iconClass = "fa-minus text-gray-400";
		if (trendDirection === "up") iconClass = "fa-arrow-up text-green-400";
		else if (trendDirection === "down")
			iconClass = "fa-arrow-down text-red-400";
		element.innerHTML = `<i class="fas ${iconClass}"></i> ${trendValue.toFixed(
			0
		)}% from last month`;
	}

	async function loadDashboardStats() {
		const stats = await getDashboardStats();
		if (App.els.resolvedReportsEl) {
			App.els.resolvedReportsEl.textContent = stats.resolvedReports.value;
			App.els.resolvedReportsEl.classList.remove("loading-placeholder");
			renderTrend(
				App.els.resolvedReportsEl.nextElementSibling,
				stats.resolvedReports.trend,
				stats.resolvedReports.trendDirection
			);
		}
		if (App.els.pendingReportsEl) {
			App.els.pendingReportsEl.textContent = stats.pendingReports.value;
			App.els.pendingReportsEl.classList.remove("loading-placeholder");
			renderTrend(
				App.els.pendingReportsEl.nextElementSibling,
				stats.pendingReports.trend,
				stats.pendingReports.trendDirection
			);
		}
		if (App.els.totalIncidentsThisMonthEl) {
			App.els.totalIncidentsThisMonthEl.textContent =
				stats.totalIncidentsThisMonth.value;
			App.els.totalIncidentsThisMonthEl.classList.remove("loading-placeholder");
			renderTrend(
				App.els.totalIncidentsThisMonthEl.nextElementSibling,
				stats.totalIncidentsThisMonth.trend,
				stats.totalIncidentsThisMonth.trendDirection
			);
		}
		updateProgressBar(
			stats.responseRate.current,
			App.els.responseRateProgress,
			App.els.responseRatePercentage
		);
		if (App.els.responseRateCurrent) {
			const trendIcon =
				stats.responseRate.current > stats.responseRate.lastMonth
					? "fa-arrow-up text-green-400"
					: "fa-arrow-down text-red-400";
			App.els.responseRateCurrent.innerHTML = `${stats.responseRate.current.toFixed(
				2
			)}% <i class="fas ${trendIcon} text-xs"></i>`;
		}
		if (App.els.responseRateLastMonth)
			App.els.responseRateLastMonth.innerHTML = `${stats.responseRate.lastMonth.toFixed(
				2
			)}% <i class="fas fa-plus text-green-400 text-xs"></i>`;
		if (App.els.responseRateMessage1 && App.els.responseRateMessage2) {
			if (stats.responseRate.current >= stats.responseRate.target) {
				App.els.responseRateMessage1.textContent =
					"Excellent response rate! Target achieved.";
				App.els.responseRateMessage2.textContent =
					"Maintain this high standard.";
			} else if (stats.responseRate.current >= 70) {
				App.els.responseRateMessage1.textContent =
					"Current accident response rate is good, keep it up!";
				App.els.responseRateMessage2.textContent = `Aim for ${stats.responseRate.target}% and above.`;
			} else {
				App.els.responseRateMessage1.textContent =
					"Response rate needs improvement.";
				App.els.responseRateMessage2.textContent = `Focus on reaching the ${stats.responseRate.target}% target.`;
			}
		}
	}

	async function initMonthlyChart() {
		if (
			!App.els.monthlyChartContainer ||
			!App.els.monthlyIncidentsChart ||
			typeof Chart === "undefined"
		)
			return;
		const data = await getMonthlyIncidentsData();
		App.els.monthlyChartContainer.classList.remove("loading-placeholder");
		if (monthlyChartInstance) monthlyChartInstance.destroy();
		monthlyChartInstance = new Chart(
			App.els.monthlyIncidentsChart.getContext("2d"),
			{
				type: "bar",
				data: data,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
							labels: { color: "#e2e8f0", font: { size: 12 } },
						},
						tooltip: {
							callbacks: {
								label: (c) => `${c.dataset.label}: ${c.parsed.y} incidents`,
							},
						},
					},
					scales: {
						x: {
							grid: { display: false },
							ticks: { color: "#a0aec0", font: { size: 12 } },
						},
						y: {
							beginAtZero: true,
							grid: { color: "#2d3748" },
							ticks: { color: "#a0aec0", font: { size: 12 } },
						},
					},
				},
			}
		);
	}

	function getStatisticsCounts(incidents) {
		let fatal = 0,
			severe = 0,
			minor = 0,
			duplicateReports = 0;
		incidents.forEach((inc) => {
			if (inc.impact === "Fatal") fatal++;
			else if (inc.impact === "Severe") severe++;
			else if (inc.impact === "Minor") minor++;
			if (inc.isDuplicate) duplicateReports++;
		});
		return { fatal, severe, minor, duplicateReports };
	}

	async function renderStatisticsChart(selectedMonth, selectedYear) {
		if (
			!App.els.statisticsChartContainer ||
			!App.els.statisticsChart ||
			!App.els.noDataStatisticsMessage ||
			typeof Chart === "undefined"
		)
			return;
		App.els.statisticsChartContainer.classList.add("loading-placeholder");
		App.els.statisticsChart.style.display = "none";
		App.els.noDataStatisticsMessage.classList.add("hidden");
		const filteredIncidents = App.data.allAccidentIncidents.filter((inc) => {
			const incidentDate = new Date(inc.dateTime);
			const monthMatch =
				selectedMonth === "all" ||
				incidentDate.getMonth() + 1 === parseInt(selectedMonth);
			const yearMatch =
				selectedYear === "all" ||
				incidentDate.getFullYear() === parseInt(selectedYear);
			return monthMatch && yearMatch;
		});
		const { fatal, severe, minor, duplicateReports } =
			getStatisticsCounts(filteredIncidents);
		await new Promise((resolve) =>
			setTimeout(resolve, App.data.SIMULATED_DELAY)
		);
		const hasData = fatal + severe + minor + duplicateReports > 0;
		if (!hasData) {
			if (statisticsChartInstance) statisticsChartInstance.destroy();
			App.els.noDataStatisticsMessage.classList.remove("hidden");
			App.els.statisticsChart.style.display = "none";
		} else {
			App.els.noDataStatisticsMessage.classList.add("hidden");
			App.els.statisticsChart.style.display = "block";
			const chartData = {
				labels: ["Fatal", "Severe", "Minor", "Duplicate Reports"],
				datasets: [
					{
						label: "Accident Impact",
						data: [fatal, severe, minor, duplicateReports],
						backgroundColor: [
							"rgba(239, 68, 68, 0.8)",
							"rgba(245, 158, 11, 0.8)",
							"rgba(52, 211, 153, 0.8)",
							"rgba(107, 114, 128, 0.8)",
						],
						borderColor: "#1a202c",
						borderWidth: 2,
					},
				],
			};
			if (statisticsChartInstance) statisticsChartInstance.destroy();
			statisticsChartInstance = new Chart(
				App.els.statisticsChart.getContext("2d"),
				{
					type: "doughnut",
					data: chartData,
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								position: "right",
								labels: {
									color: "#e2e8f0",
									boxWidth: 14,
									padding: 20,
									font: { size: 12 },
								},
							},
							tooltip: {
								callbacks: {
									label: (c) =>
										`${c.label || ""}: ${
											c.parsed !== null ? c.parsed + " incidents" : ""
										}`,
								},
							},
						},
					},
				}
			);
		}
		App.els.statisticsChartContainer.classList.remove("loading-placeholder");
	}

	function populateStatisticsFilters() {
		if (!App.els.statisticsMonthFilter || !App.els.statisticsYearFilter) return;
		App.els.statisticsMonthFilter.innerHTML =
			'<option value="all">All Months</option>';
		[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		].forEach((name, index) => {
			App.els.statisticsMonthFilter.innerHTML += `<option value="${
				index + 1
			}">${name}</option>`;
		});
		const currentYear = new Date().getFullYear();
		const yearsInData = new Set(
			App.data.allAccidentIncidents.map((inc) =>
				new Date(inc.dateTime).getFullYear()
			)
		);
		yearsInData.add(currentYear);
		App.els.statisticsYearFilter.innerHTML =
			'<option value="all">All Years</option>';
		Array.from(yearsInData)
			.sort((a, b) => b - a)
			.forEach((year) => {
				App.els.statisticsYearFilter.innerHTML += `<option value="${year}">${year}</option>`;
			});
		App.els.statisticsMonthFilter.value = (
			new Date().getMonth() + 1
		).toString();
		App.els.statisticsYearFilter.value = currentYear.toString();
	}

	async function renderActiveIncidentsTable() {
		if (!App.els.activeIncidentsTbody || !App.els.activeIncidentsTable) return;
		const allActiveIncidents = await getActiveIncidents();
		const statusFilter = App.els.activeStatusFilter.value;
		const impactFilter = App.els.activeImpactFilter.value;
		const searchInput = App.els.activeSearch.value.toLowerCase();
		const filteredIncidents = allActiveIncidents.filter((inc) => {
			const matchesStatus =
				statusFilter === "all" || inc.status === statusFilter;
			const matchesImpact =
				impactFilter === "all" || inc.impact === impactFilter;
			const matchesSearch =
				searchInput === "" ||
				inc.location.toLowerCase().includes(searchInput) ||
				inc.id.toLowerCase().includes(searchInput);
			return matchesStatus && matchesImpact && matchesSearch;
		});
		App.els.activeIncidentsTable.classList.remove("hidden");
		App.els.activeIncidentsTbody.innerHTML = "";
		if (filteredIncidents.length === 0) {
			App.els.activeIncidentsTbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500 text-sm">No active accidents found.</td></tr>`;
			return;
		}
		filteredIncidents.forEach((incident) => {
			const impactClass =
				incident.impact === "Fatal"
					? "text-red-500"
					: incident.impact === "Severe"
					? "text-orange-500"
					: "text-green-500";
			const row = `<tr><td class="px-4 py-3 text-sm text-white">${
				incident.id
			}</td><td class="px-4 py-3 text-sm text-white">${
				incident.location
			}</td><td class="px-4 py-3 text-sm font-semibold ${impactClass}">${
				incident.impact
			}</td><td class="px-4 py-3"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full status-${incident.status.toLowerCase()}">${
				incident.status
			}</span></td></tr>`;
			App.els.activeIncidentsTbody.insertAdjacentHTML("beforeend", row);
		});
	}

	function populateCategoryDropdown() {
		if (!App.els.videoCategorySelect) return;
		App.els.videoCategorySelect.innerHTML =
			'<option value="">Select Category</option>';
		const categories = new Set(
			App.data.youtubeVideos.map((v) => v.category).filter(Boolean)
		);
		Array.from(categories)
			.sort()
			.forEach((category) => {
				App.els.videoCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
			});
	}

	function renderExistingVideos(searchTerm = "") {
		if (!App.els.existingVideosList) return;
		const normalizedSearchTerm = searchTerm.toLowerCase().trim();
		const filteredVideos = App.data.youtubeVideos.filter(
			(v) =>
				normalizedSearchTerm === "" ||
				v.title.toLowerCase().includes(normalizedSearchTerm) ||
				v.description.toLowerCase().includes(normalizedSearchTerm) ||
				v.category?.toLowerCase().includes(normalizedSearchTerm)
		);
		App.els.existingVideosList.innerHTML =
			filteredVideos.length === 0
				? `<div class="text-center text-gray-500 py-8 col-span-full">No videos found.</div>`
				: filteredVideos
						.map(
							(video) => `
                <div class="video-card">
                    <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen title="${video.title}"></iframe>
                    <div class="video-info">
                        <div class="video-title">${video.title}</div>
                        <div class="video-description">${video.description}</div>
                    </div>
                    <div class="video-card-actions">
                        <button class="edit-btn" data-video-id="${video.id}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-video-id="${video.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>`
						)
						.join("");

		App.els.existingVideosList
			.querySelectorAll(".edit-btn")
			.forEach((b) =>
				b.addEventListener("click", (e) =>
					editVideo(e.currentTarget.dataset.videoId)
				)
			);
		App.els.existingVideosList
			.querySelectorAll(".delete-btn")
			.forEach((b) =>
				b.addEventListener("click", (e) =>
					confirmDeleteVideo(e.currentTarget.dataset.videoId)
				)
			);
	}

	function editVideo(videoId) {
		const videoToEdit = App.data.youtubeVideos.find(
			(video) => video.id === videoId
		);
		if (!videoToEdit || !App.els.formTitle) return;
		App.els.formTitle.textContent = "Edit Video";
		App.els.submitVideoButton.innerHTML =
			'<i class="fas fa-save mr-2"></i> Save Changes';
		App.els.cancelEditButton.classList.remove("hidden");
		App.els.youtubeEmbedCodeInput.value = videoToEdit.id;
		App.els.videoTitleInput.value = videoToEdit.title;
		App.els.videoDescriptionInput.value = videoToEdit.description;
		App.els.videoCategorySelect.value = videoToEdit.category || "";
		App.els.youtubeEmbedCodeInput.setAttribute("readonly", "true");
		editingVideoId = videoId;
	}

	function resetVideoForm() {
		if (!App.els.addVideoForm) return;
		App.els.addVideoForm.reset();
		App.els.formTitle.textContent = "Add New Video";
		App.els.submitVideoButton.innerHTML =
			'<i class="fas fa-plus-circle mr-2"></i> Add Video';
		App.els.cancelEditButton.classList.add("hidden");
		App.els.youtubeEmbedCodeInput.removeAttribute("readonly");
		editingVideoId = null;
		App.els.addVideoMessage.classList.add("hidden");
		populateCategoryDropdown();
	}

	async function handleAddUpdateVideo(event) {
		event.preventDefault();
		const embedCode = App.els.youtubeEmbedCodeInput.value.trim();
		const title = App.els.videoTitleInput.value.trim();
		const description = App.els.videoDescriptionInput.value.trim();
		const category = App.els.videoCategorySelect.value.trim() || "General";
		if (!embedCode || !title || !description) {
			App.els.addVideoMessage.textContent = "Please fill all required fields.";
			App.els.addVideoMessage.className = "video-message error";
			return;
		}
		if (!editingVideoId && !/^[a-zA-Z0-9_-]{11}$/.test(embedCode)) {
			App.els.addVideoMessage.textContent = "Invalid YouTube Video ID.";
			App.els.addVideoMessage.className = "video-message error";
			return;
		}

		const videoData = { id: embedCode, title, description, category };
		let successMessage = "";

		if (editingVideoId) {
			const index = App.data.youtubeVideos.findIndex(
				(v) => v.id === editingVideoId
			);
			if (index !== -1) {
				App.data.youtubeVideos[index] = {
					...App.data.youtubeVideos[index],
					...videoData,
				};
				successMessage = "Video updated successfully!";
			}
		} else {
			App.data.youtubeVideos.push(videoData);
			successMessage = "Video added successfully!";
		}

		if (successMessage) {
			App.els.addVideoMessage.textContent = successMessage;
			App.els.addVideoMessage.className = "video-message success";
			resetVideoForm();
			renderExistingVideos(App.els.videoSearchInput.value);
			setTimeout(() => App.els.addVideoMessage.classList.add("hidden"), 3000);
		}
	}

	function confirmDeleteVideo(videoId) {
		const video = App.data.youtubeVideos.find((v) => v.id === videoId);
		if (!video || !App.els.confirmationModal) return;
		App.els.confirmationModalTitle.textContent = "Delete Video";
		App.els.confirmationModalMessage.innerHTML = `Delete: <span class="font-bold text-white">"${video.title}"</span>?`;
		App.els.confirmationModal.classList.remove("hidden");

		const newConfirmBtn = App.els.confirmActionButton.cloneNode(true);
		App.els.confirmActionButton.replaceWith(newConfirmBtn);
		App.els.confirmActionButton = newConfirmBtn;

		newConfirmBtn.onclick = () => {
			deleteVideo(videoId);
			App.els.confirmationModal.classList.add("hidden");
		};

		const newCancelBtn = App.els.cancelActionButton.cloneNode(true);
		App.els.cancelActionButton.replaceWith(newCancelBtn);
		App.els.cancelActionButton = newCancelBtn;
		newCancelBtn.onclick = () =>
			App.els.confirmationModal.classList.add("hidden");
	}

	async function deleteVideo(videoId) {
		const videoTitle =
			App.data.youtubeVideos.find((v) => v.id === videoId)?.title || "Unknown";
		App.data.youtubeVideos = App.data.youtubeVideos.filter(
			(v) => v.id !== videoId
		);
		App.els.addVideoMessage.textContent = `Video "${videoTitle}" deleted!`;
		App.els.addVideoMessage.className = "video-message success";
		renderExistingVideos(App.els.videoSearchInput.value);
		populateCategoryDropdown();
		setTimeout(() => App.els.addVideoMessage.classList.add("hidden"), 3000);
	}

	// --- Page-Specific Event Listeners ---
	function initDashboardEventListeners() {
		App.els.activeStatusFilter?.addEventListener(
			"change",
			renderActiveIncidentsTable
		);
		App.els.activeImpactFilter?.addEventListener(
			"change",
			renderActiveIncidentsTable
		);
		App.els.activeSearch?.addEventListener("input", renderActiveIncidentsTable);

		App.els.manageVideosButton?.addEventListener("click", (event) => {
			event.stopPropagation();
			App.closeAllPopups(App.els.videoManagementModal?.id);
			resetVideoForm();
			renderExistingVideos();
			App.els.videoManagementModal?.classList.remove("hidden");
		});
		App.els.closeVideoManagementModal?.addEventListener("click", () => {
			App.els.videoManagementModal?.classList.add("hidden");
			resetVideoForm();
		});
		App.els.addVideoForm?.addEventListener("submit", handleAddUpdateVideo);
		App.els.cancelEditButton?.addEventListener("click", resetVideoForm);
		App.els.videoSearchInput?.addEventListener("input", (e) =>
			renderExistingVideos(e.target.value)
		);

		const handleStatsFilterChange = () =>
			renderStatisticsChart(
				App.els.statisticsMonthFilter.value,
				App.els.statisticsYearFilter.value
			);
		App.els.statisticsMonthFilter?.addEventListener(
			"change",
			handleStatsFilterChange
		);
		App.els.statisticsYearFilter?.addEventListener(
			"change",
			handleStatsFilterChange
		);
	}

	// --- Main Initialization Orchestrator ---
	document.addEventListener("DOMContentLoaded", () => {
		// Initialize page-specific functionality
		initDashboardEventListeners();
		loadDashboardStats();
		renderActiveIncidentsTable();
		populateStatisticsFilters();

		// Call general functions that depend on this page's data
		if (typeof App.loadNotifications === "function") {
			App.loadNotifications();
		} else {
			console.error(
				"loadNotifications function not found on App object. Is base.js loaded?"
			);
		}
	});

	window.onload = () => {
		// Initialize charts after everything (including images) is loaded
		initMonthlyChart();
		if (App.els.statisticsMonthFilter && App.els.statisticsYearFilter) {
			renderStatisticsChart(
				App.els.statisticsMonthFilter.value,
				App.els.statisticsYearFilter.value
			);
		}
	};
})();
