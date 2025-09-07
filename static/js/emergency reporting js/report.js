document.addEventListener("DOMContentLoaded", () => {
  // --- State Variables ---
  let currentMode = "fire"; // 'fire' or 'accident'
  let selectedIncidentType = "";
  let incidentSeverity = ""; // Will now store the selected severity string
  let numInjured = 0;
  let uploadedFiles = [];
  let currentLocationLat = null; // New: To store latitude
  let currentLocationLon = null; // New: To store longitude
  let messageBoxTimeout; // For clearing the message box

  // --- DOM Elements ---
  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNavButton = document.getElementById("close-nav-button");
  const fireModeButton = document.getElementById("fire-mode-button");
  const accidentModeButton = document.getElementById("accident-mode-button");
  const sosContainer = document.getElementById("sos-container");
  const sosButton = document.getElementById("sos-button");
  const modeText = document.getElementById("mode-text");
  const reportModal = document.getElementById("report-modal");
  const closeReportModalButton = document.getElementById(
    "close-report-modal-button"
  ); // Renamed for clarity
  const incidentTypeButtonsContainer = document.getElementById(
    "incident-type-buttons"
  );
  const severityButtonsContainer = document.getElementById("severity-buttons");
  const photoUploadInput = document.getElementById("photo-upload");
  const uploadedFilesPreview = document.getElementById(
    "uploaded-files-preview"
  );
  const incidentAddressInput = document.getElementById("incident-address");
  const explanationTextarea = document.getElementById("explanation");
  const sendReportButton = document.getElementById("send-report-button");
  const useCurrentLocationButton = document.getElementById(
    "use-current-location-button"
  );
  const locationStatusParagraph = document.getElementById("location-status");
  const numInjuredInput = document.getElementById("num-injured");
  const messageBox = document.getElementById("message-box");
  const incidentTypeError = document.getElementById("incident-type-error");
  const severityError = document.getElementById("severity-error");
  const locationSpinner = document.getElementById("location-spinner");
  const viewContactsButton = document.getElementById("view-contacts-button"); // Renamed
  const contactsModal = document.getElementById("contacts-modal"); // New
  const closeContactsModalButton = document.getElementById(
    "close-contacts-modal-button"
  ); // New
  const footerMessage = document.getElementById("footer-message"); // New: for dynamic footer text

  const incidentTypes = {
    fire: [
      {
        name: "Tanker On Fire",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"></path><path d="M18 8h2c.5 0 1 .2 1.4.6L22 10v4c0 .6-.4 1-1 1h-1"></path><circle cx="7" cy="17" r="2"></circle><circle cx="15" cy="17" r="2"></circle></svg>`,
      },
      {
        name: "Market On Fire",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.41 2h9.18a2 2 0 0 1 1.41.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M12 7v15"></path></svg>`,
      },
      {
        name: "Building On Fire",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M8 10h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 14h.01"></path></svg>`,
      },
      {
        name: "+ Others",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>`,
      },
    ],
    accident: [
      {
        name: "Vehicle Collision",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-crash"><path d="M19 1.7L15.3 4.4C14.7 4.9 14 5.3 13.2 5.5L8.8 6.7C7.6 7.1 6.4 6.7 5.5 5.8L1.7 2"></path><path d="M19 17v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3"></path><path d="M10 17c0-1.7 1.3-3 3-3h1.8c.7 0 1.3.4 1.6 1L18 17"></path><circle cx="17" cy="17" r="2"></circle><circle cx="7" cy="17" r="2"></circle><path d="M14 11h.01"></path></svg>`,
      },
      {
        name: "Motorbike Accident",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"></circle><circle cx="5.5" cy="17.5" r="3.5"></circle><path d="M12 17.5V14L15 6H9L7.5 10.5"></path></svg>`,
      },
      {
        name: "Truck Overturn",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"></path><path d="M18 8h2c.5 0 1 .2 1.4.6L22 10v4c0 .6-.4 1-1 1h-1"></path><circle cx="7" cy="17" r="2"></circle><circle cx="15" cy="17" r="2"></circle></svg>`,
      },
      {
        name: "+ Others",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>`,
      },
    ],
  };

  const severityTypes = [
    {
      name: "High Severity",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      colorClass: "bg-red-600 border-red-600",
    },
    {
      name: "Medium Severity",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`,
      colorClass: "bg-orange-500 border-orange-500",
    },
    {
      name: "Low Severity",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      colorClass: "bg-green-600 border-green-600",
    },
  ];

  // --- Helper Functions ---

  // Function to update the UI based on the current mode
  function updateModeUI() {
    if (
      fireModeButton &&
      accidentModeButton &&
      sosContainer &&
      sosButton &&
      modeText &&
      sendReportButton &&
      footerMessage
    ) {
      sosButton.classList.remove(
        "bg-red-600",
        "shadow-red-500/50",
        "bg-blue-600",
        "shadow-blue-500/50"
      );
      sosContainer.classList.remove("border-red-600", "border-blue-600");
      sendReportButton.classList.remove(
        "bg-red-600",
        "hover:bg-red-700",
        "bg-blue-600",
        "hover:bg-blue-700"
      );

      if (currentMode === "fire") {
        fireModeButton.classList.add("bg-red-600", "text-white", "shadow-lg");
        fireModeButton.classList.remove("text-gray-600", "hover:text-gray-900");
        accidentModeButton.classList.remove(
          "bg-blue-600",
          "text-white",
          "shadow-lg"
        );
        accidentModeButton.classList.add(
          "text-gray-600",
          "hover:text-gray-900"
        );

        sosContainer.classList.add("border-red-600");
        sosButton.classList.add("bg-red-600", "shadow-red-500/50");
        modeText.textContent = "FIRE MODE";
        sendReportButton.classList.add("bg-red-600", "hover:bg-red-700");
        footerMessage.textContent =
          "When you report, the fire service will be dispatched immediately.";
      } else {
        // currentMode === 'accident'
        accidentModeButton.classList.add(
          "bg-blue-600",
          "text-white",
          "shadow-lg"
        );
        accidentModeButton.classList.remove(
          "text-gray-600",
          "hover:text-gray-900"
        );
        fireModeButton.classList.remove(
          "bg-red-600",
          "text-white",
          "shadow-lg"
        );
        fireModeButton.classList.add("text-gray-600", "hover:text-gray-900");

        sosContainer.classList.add("border-blue-600");
        sosButton.classList.add("bg-blue-600", "shadow-blue-500/50");
        modeText.textContent = "ACCIDENT MODE";
        sendReportButton.classList.add("bg-blue-600", "hover:bg-blue-700");
        footerMessage.textContent =
          "When you report, the FRSC will be dispatched immediately.";
      }
    }
  }

  // Function to populate incident type buttons in the modal
  function populateIncidentTypes() {
    if (incidentTypeButtonsContainer) {
      incidentTypeButtonsContainer.innerHTML = ""; // Clear existing buttons
      incidentTypes[currentMode].forEach((type) => {
        const button = document.createElement("button");
        button.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "p-1.5",
          "rounded-lg",
          "border",
          "border-gray-600",
          "bg-gray-600",
          "text-gray-300",
          "text-sm",
          "font-medium",
          "transition-colors",
          "duration-200",
          "hover:bg-gray-500",
          "hover:text-white"
        );
        button.innerHTML = `${type.icon}<span>${type.name}</span>`;

        button.addEventListener("click", () => {
          selectedIncidentType = type.name;
          incidentTypeButtonsContainer
            .querySelectorAll("button")
            .forEach((btn) => {
              btn.classList.remove(
                "bg-red-600",
                "border-red-600",
                "bg-blue-600",
                "border-blue-600",
                "text-white"
              );
              btn.classList.add(
                "border-gray-600",
                "bg-gray-600",
                "text-gray-300"
              );
            });
          if (currentMode === "fire") {
            button.classList.add("bg-red-600", "border-red-600", "text-white");
          } else {
            button.classList.add(
              "bg-blue-600",
              "border-blue-600",
              "text-white"
            );
          }
          button.classList.remove(
            "border-gray-600",
            "bg-gray-600",
            "text-gray-300"
          );
          validateForm(); // Validate form after selection
        });
        incidentTypeButtonsContainer.appendChild(button);
      });
    }
  }

  // Function to populate severity buttons in the modal
  function populateSeverityTypes() {
    if (severityButtonsContainer) {
      severityButtonsContainer.innerHTML = ""; // Clear existing buttons
      severityTypes.forEach((severity) => {
        const button = document.createElement("button");
        button.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "p-1.5",
          "rounded-lg",
          "border",
          "border-gray-600",
          "bg-gray-600",
          "text-gray-300",
          "text-xs",
          "font-medium",
          "transition-colors",
          "duration-200",
          "hover:bg-gray-500",
          "hover:text-white"
        );
        button.innerHTML = `${severity.icon}<span>${severity.name}</span>`;

        button.addEventListener("click", () => {
          incidentSeverity = severity.name;
          severityButtonsContainer.querySelectorAll("button").forEach((btn) => {
            btn.classList.remove(
              "bg-red-600",
              "border-red-600",
              "bg-orange-500",
              "border-orange-500",
              "bg-green-600",
              "border-green-600",
              "text-white"
            );
            btn.classList.add(
              "border-gray-600",
              "bg-gray-600",
              "text-gray-300"
            );
          });
          const classesToAdd = severity.colorClass.split(" ");
          button.classList.add(...classesToAdd, "text-white");
          button.classList.remove(
            "border-gray-600",
            "bg-gray-600",
            "text-gray-300"
          );
          validateForm(); // Validate form after selection
        });
        severityButtonsContainer.appendChild(button);
      });
    }
  }

  // Function to show a modal
  function showModal(modalElement) {
    if (modalElement) {
      modalElement.classList.add("show");
    }
  }

  // Function to hide a modal
  function hideModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove("show");
    }
  }

  // Function to get current location
  function getCurrentLocation() {
    if (!navigator.geolocation) {
      showMessage("Geolocation is not supported by your browser.", "error");
      locationStatusParagraph.textContent = "Geolocation not supported.";
      locationStatusParagraph.classList.remove("hidden");
      return;
    }

    locationSpinner.classList.remove("hidden"); // Show spinner
    locationStatusParagraph.textContent = "Fetching location...";
    locationStatusParagraph.classList.remove(
      "hidden",
      "text-red-400",
      "text-green-500",
      "text-yellow-500"
    );
    locationStatusParagraph.classList.add("text-blue-400");
    incidentAddressInput.value = "";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        currentLocationLat = latitude;
        currentLocationLon = longitude;

        locationStatusParagraph.textContent =
          "Location found. Getting address...";

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.display_name) {
            incidentAddressInput.value = data.display_name;
            locationStatusParagraph.textContent = "Address auto-filled.";
            locationStatusParagraph.classList.remove("text-blue-400");
            locationStatusParagraph.classList.add("text-green-500");
            showMessage(
              "Location successfully retrieved and address filled.",
              "success"
            );
          } else {
            incidentAddressInput.value = `Lat: ${latitude}, Lon: ${longitude}`;
            locationStatusParagraph.textContent =
              "Address not found, coordinates filled.";
            locationStatusParagraph.classList.remove("text-blue-400");
            locationStatusParagraph.classList.add("text-yellow-500");
            showMessage(
              "Location retrieved, but address could not be found.",
              "warning"
            );
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          locationStatusParagraph.textContent =
            "Error getting address. Please enter manually.";
          locationStatusParagraph.classList.remove("text-blue-400");
          locationStatusParagraph.classList.add("text-red-400");
          showMessage(
            "Error fetching address. Please enter manually.",
            "error"
          );
        } finally {
          locationSpinner.classList.add("hidden"); // Hide spinner
        }
      },
      (error) => {
        locationSpinner.classList.add("hidden"); // Hide spinner
        let errorMessage = "Error getting location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable it in browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
        }
        locationStatusParagraph.textContent = errorMessage;
        locationStatusParagraph.classList.remove("text-blue-400");
        locationStatusParagraph.classList.add("text-red-400");
        showMessage(errorMessage, "error");
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  // Function to update uploaded files preview
  function updateUploadedFilesPreview() {
    if (uploadedFilesPreview) {
      uploadedFilesPreview.innerHTML = "";
      if (uploadedFiles.length === 0) {
        // uploadedFilesPreview.textContent = 'No files selected.'; // Optional: display if no files
      } else {
        uploadedFiles.forEach((file, index) => {
          const fileDiv = document.createElement("div");
          fileDiv.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "bg-gray-600",
            "rounded-md",
            "px-3",
            "py-1.5"
          );
          fileDiv.innerHTML = `
                                <span class="truncate pr-2">${file.name}</span>
                                <button data-index="${index}" class="remove-file-button text-red-400 hover:text-red-500 focus:outline-none" aria-label="Remove file ${file.name}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                                        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            `;
          uploadedFilesPreview.appendChild(fileDiv);
        });
        // Add event listeners for remove buttons
        uploadedFilesPreview
          .querySelectorAll(".remove-file-button")
          .forEach((button) => {
            button.addEventListener("click", (e) => {
              const indexToRemove = parseInt(
                e.target.closest("button").dataset.index
              );
              uploadedFiles.splice(indexToRemove, 1);
              updateUploadedFilesPreview();
            });
          });
      }
    }
  }

  // Function to display temporary messages
  function showMessage(message, type = "info", duration = 3000) {
    clearTimeout(messageBoxTimeout); // Clear any previous timeout
    messageBox.textContent = message;
    messageBox.className = `message-box show ${type}`; // Reset classes and add new ones

    // Set timeout to hide the message after 'duration'
    messageBoxTimeout = setTimeout(() => {
      messageBox.classList.add("hide"); // Add hide class for exit animation
      // After the animation, clear the text and remove classes
      messageBox.addEventListener("transitionend", function handler() {
        messageBox.classList.remove(
          "show",
          "hide",
          "success",
          "error",
          "warning"
        );
        messageBox.textContent = "";
        messageBox.removeEventListener("transitionend", handler); // Remove listener to prevent multiple calls
      });
    }, duration);
  }

  // Function to validate form fields
  function validateForm() {
    let isValid = true;

    if (!selectedIncidentType) {
      incidentTypeError.classList.remove("hidden");
      isValid = false;
    } else {
      incidentTypeError.classList.add("hidden");
    }

    if (!incidentSeverity) {
      severityError.classList.remove("hidden");
      isValid = false;
    } else {
      severityError.classList.add("hidden");
    }

    sendReportButton.disabled = !isValid;
    return isValid;
  }

  // Function to copy text to clipboard
  function copyToClipboard(text, targetElement) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      if (targetElement) {
        const copiedMessage = targetElement.querySelector(".copied-message");
        if (copiedMessage) {
          copiedMessage.classList.add("show");
          setTimeout(() => {
            copiedMessage.classList.remove("show");
          }, 1000); // Show "Copied!" for 1 second
        }
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showMessage("Failed to copy number. Please try manually.", "error");
    }
    document.body.removeChild(textarea);
  }

  // --- Event Listeners ---

  // Mobile Navigation Toggle
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      mobileNav.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
    });
  }

  if (closeNavButton && mobileNav) {
    closeNavButton.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  // Mode Toggle Buttons
  if (fireModeButton) {
    fireModeButton.addEventListener("click", () => {
      currentMode = "fire";
      updateModeUI();
      populateIncidentTypes(); // Re-populate incident types when mode changes
      selectedIncidentType = ""; // Reset selection
      validateForm(); // Re-validate form
    });
  }

  if (accidentModeButton) {
    accidentModeButton.addEventListener("click", () => {
      currentMode = "accident";
      updateModeUI();
      populateIncidentTypes(); // Re-populate incident types when mode changes
      selectedIncidentType = ""; // Reset selection
      validateForm(); // Re-validate form
    });
  }

  // SOS Button click to trigger report modal
  if (sosButton) {
    sosButton.addEventListener("click", () => {
      showModal(reportModal);
    });
    sosButton.classList.add("pulsing");
    const sosTriggerText = sosButton.querySelector(".text-xs, .text-sm");
    if (sosTriggerText) {
      sosTriggerText.textContent = "Click to trigger report";
    }
  }

  // Close Report Modal Button
  if (closeReportModalButton) {
    closeReportModalButton.addEventListener("click", () =>
      hideModal(reportModal)
    );
  }

  // Number of Injured Input
  if (numInjuredInput) {
    numInjuredInput.addEventListener("input", (e) => {
      numInjured = parseInt(e.target.value) || 0;
    });
  }

  // Multiple Photo/Video Uploads
  if (photoUploadInput) {
    photoUploadInput.addEventListener("change", (event) => {
      const files = Array.from(event.target.files);
      const newFiles = files.filter((file) => {
        return uploadedFiles.length < 5; // Max 5 files
      });

      uploadedFiles = [...uploadedFiles, ...newFiles].slice(0, 5);
      updateUploadedFilesPreview();
      photoUploadInput.value = ""; // Clear input for re-selection
    });
  }

  // Use Current Location Button
  if (useCurrentLocationButton) {
    useCurrentLocationButton.addEventListener("click", getCurrentLocation);
  }

  // // Send Report Button
  // if (sendReportButton) {
  //   sendReportButton.addEventListener("click", () => {
  //     if (validateForm()) {
  //       // Only proceed if form is valid
  //       const reportData = {
  //         mode: currentMode,
  //         severity: incidentSeverity,
  //         numInjured: numInjured,
  //         incidentType: selectedIncidentType,
  //         uploadedFiles: uploadedFiles.map((file) => ({
  //           name: file.name,
  //           type: file.type,
  //           size: file.size,
  //         })),
  //         address: incidentAddressInput.value,
  //         explanation: explanationTextarea.value,
  //         latitude: currentLocationLat,
  //         longitude: currentLocationLon,
  //       };
  //       console.log("Report Sent:", reportData);

  //       showMessage("Report sent successfully!", "success");
  //       // Delay hiding the modal to allow the success message to be seen
  //       setTimeout(() => {
  //         hideModal(reportModal);
  //       }, 1000); // Adjust delay as needed (e.g., 1000ms = 1 second)
  //     } else {
  //       showMessage("Please fill in all required fields.", "error");
  //     }
  //   });
  // }

  // Send Report Button
  if (sendReportButton) {
    sendReportButton.addEventListener("click", async () => {
      // Collect all data from the form
      const incidentType = document.querySelector(
        "#incident-type-buttons .selected"
      )?.dataset.incidentType;
      const severity = document.querySelector("#severity-buttons .selected")
        ?.dataset.severity;
      const numInjured = document.getElementById("num-injured").value;
      const explanation = explanationTextarea.value;
      const incidentAddressInput = document.getElementById("incident-address");
      const address = incidentAddressInput.value;

      // Validate the form before proceeding
      if (validateForm()) {
        sendReportButton.disabled = true;
        sendReportButton.textContent = "Sending...";

        // 1. Package the data into a FormData object
        const formData = new FormData();
        formData.append("mode", currentMode);
        formData.append("incident_type", incidentType);
        formData.append("severity", severity);
        formData.append("num_injured", numInjured);
        formData.append("explanation", explanation);
        formData.append("address", address);

        // Append coordinates if available
        if (currentLocationLat && currentLocationLon) {
          formData.append("latitude", currentLocationLat);
          formData.append("longitude", currentLocationLon);
        }

        // Append all uploaded files to the FormData object
        const photoUploadInput = document.getElementById("photo-upload");
        if (photoUploadInput && photoUploadInput.files.length > 0) {
          for (const file of photoUploadInput.files) {
            formData.append("incident_images", file);
          }
        }

        // 2. Send the request with fetch()
        try {
          const response = await fetch("/submit-report/", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();

          if (response.ok) {
            showMessage(result.message, "success");
            console.log("Report Sent:", result);
            setTimeout(() => {
              hideModal(reportModal);
              // You might want to clear form fields here
            }, 1000);
          } else {
            showMessage(result.message, "error");
          }
        } catch (error) {
          console.error("Error sending report:", error);
          showMessage("Failed to send report. Please try again.", "error");
        } finally {
          sendReportButton.disabled = false;
          sendReportButton.textContent = "Send Report";
        }
      } else {
        showMessage("Please fill in all required fields.", "error");
        console.log("Form validation failed.");
      }
    });
  }

  // View Contacts Button (now opens a modal)
  if (viewContactsButton && contactsModal) {
    viewContactsButton.addEventListener("click", () => {
      showModal(contactsModal);
    });
  }

  // Close Contacts Modal Button
  if (closeContactsModalButton && contactsModal) {
    closeContactsModalButton.addEventListener("click", () =>
      hideModal(contactsModal)
    );
  }

  // Add event listeners for copying numbers
  document
    .querySelectorAll(".contact-card .number")
    .forEach((numberElement) => {
      numberElement.addEventListener("click", (event) => {
        const numberToCopy = numberElement.dataset.number;
        if (numberToCopy) {
          copyToClipboard(numberToCopy, numberElement);
        }
      });
    });

  // Initial UI update and validation
  updateModeUI();
  populateSeverityTypes();
  validateForm(); // Set initial state of send button
});
