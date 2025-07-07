// Emergency Reporting System - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize alerts auto-dismiss
    initializeAlerts();
    
    // Form validation
    initializeFormValidation();
    
    // Emergency report quick actions
    initializeEmergencyActions();
    
    // Real-time updates
    initializeRealTimeUpdates();
});

// Auto-dismiss alerts after 5 seconds
function initializeAlerts() {
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        if (!alert.classList.contains('alert-permanent')) {
            setTimeout(() => {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }, 5000);
        }
    });
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

// Emergency quick report functions
function initializeEmergencyActions() {
    // Quick emergency buttons
    const emergencyButtons = document.querySelectorAll('.emergency-quick-report');
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const emergencyType = this.dataset.type;
            showEmergencyModal(emergencyType);
        });
    });
}

// Show emergency reporting modal
function showEmergencyModal(type) {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        const modalTitle = modal.querySelector('.modal-title');
        const emergencyTypeInput = modal.querySelector('#emergencyType');
        
        modalTitle.textContent = `Report ${type} Emergency`;
        emergencyTypeInput.value = type;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }
}

// Real-time updates (placeholder for WebSocket implementation)
function initializeRealTimeUpdates() {
    // This would connect to WebSocket for real-time updates
    // For now, we'll simulate with periodic updates
    
    if (document.getElementById('reportsTable')) {
        setInterval(updateReportsStatus, 30000); // Update every 30 seconds
    }
}

// Update reports status (placeholder)
function updateReportsStatus() {
    // This would fetch latest status from server
    console.log('Checking for report updates...');
    
    // Add visual indicator for updates
    const updateIndicator = document.createElement('div');
    updateIndicator.className = 'alert alert-info alert-dismissible fade show position-fixed top-0 end-0 m-3';
    updateIndicator.style.zIndex = '9999';
    updateIndicator.innerHTML = `
        <i class="fas fa-sync-alt fa-spin"></i> Checking for updates...
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(updateIndicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (updateIndicator.parentNode) {
            updateIndicator.remove();
        }
    }, 3000);
}

// Geolocation for emergency reports
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            error => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    });
}

// Add location to emergency report
async function addLocationToReport() {
    try {
        const location = await getCurrentLocation();
        const latInput = document.getElementById('latitude');
        const lngInput = document.getElementById('longitude');
        
        if (latInput && lngInput) {
            latInput.value = location.latitude;
            lngInput.value = location.longitude;
            
            // Show success message
            showLocationSuccess();
        }
    } catch (error) {
        console.error('Error getting location:', error);
        showLocationError(error.message);
    }
}

// Show location success message
function showLocationSuccess() {
    const alert = createAlert('success', 'Location added successfully!', 'fas fa-map-marker-alt');
    document.body.appendChild(alert);
}

// Show location error message
function showLocationError(message) {
    const alert = createAlert('warning', `Location error: ${message}`, 'fas fa-exclamation-triangle');
    document.body.appendChild(alert);
}

// Create alert element
function createAlert(type, message, icon = '') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    
    const iconHtml = icon ? `<i class="${icon}"></i> ` : '';
    alertDiv.innerHTML = `
        ${iconHtml}${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
    
    return alertDiv;
}

// Confirm emergency submission
function confirmEmergencySubmission(form) {
    const emergencyType = form.querySelector('#emergencyType').value;
    const location = form.querySelector('#location').value;
    
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal fade';
    confirmModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        Confirm Emergency Report
                    </h5>
                </div>
                <div class="modal-body">
                    <p><strong>Emergency Type:</strong> ${emergencyType}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p class="text-warning">
                        <i class="fas fa-info-circle"></i>
                        This will immediately notify emergency services.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" onclick="submitEmergencyReport()">
                        <i class="fas fa-paper-plane"></i> Submit Report
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    const bsModal = new bootstrap.Modal(confirmModal);
    bsModal.show();
    
    // Remove modal from DOM when hidden
    confirmModal.addEventListener('hidden.bs.modal', () => {
        confirmModal.remove();
    });
}

// Submit emergency report
function submitEmergencyReport() {
    // Show loading spinner
    const loadingAlert = createAlert('info', 'Submitting emergency report...', 'fas fa-spinner fa-spin');
    document.body.appendChild(loadingAlert);
    
    // Simulate API call (replace with actual form submission)
    setTimeout(() => {
        loadingAlert.remove();
        const successAlert = createAlert('success', 'Emergency report submitted successfully! Help is on the way.', 'fas fa-check-circle');
        document.body.appendChild(successAlert);
        
        // Close any open modals
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }, 2000);
}

// Export functions for global access
window.emergencySystem = {
    getCurrentLocation,
    addLocationToReport,
    showEmergencyModal,
    confirmEmergencySubmission,
    submitEmergencyReport
};
