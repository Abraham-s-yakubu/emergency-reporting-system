 (function() {
            // Simulated User Data: In a real Django application, this data would be fetched from a backend API.
            // Example: Make an AJAX call to a Django REST Framework endpoint like `/api/users/`.
            // const users = []; // Initialize empty, then populate from fetch
            const users = [
                { id: 'usr-001', name: 'Abraham Syakubu', email: 'abrahams.syakubu@example.com', role: 'Admin' },
                { id: 'usr-002', name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Editor' },
                { id: 'usr-003', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer' },
            ];

            // Cache DOM elements for efficient access.
            const els = {
                userTableBody: document.getElementById('userTableBody'),
                noUsersMessage: document.getElementById('noUsersMessage'),
                userSearch: document.getElementById('userSearch'),
                roleFilter: document.getElementById('roleFilter'),
                addUserButton: document.getElementById('addUserButton'),
                userModal: document.getElementById('userModal'),
                closeUserModal: document.getElementById('closeUserModal'),
                modalTitle: document.getElementById('modalTitle'),
                userForm: document.getElementById('userForm'),
                userId: document.getElementById('userId'),
                userName: document.getElementById('userName'),
                userEmail: document.getElementById('userEmail'),
                userPassword: document.getElementById('userPassword'),
                passwordHint: document.getElementById('passwordHint'),
                userRole: document.getElementById('userRole'),
                cancelUserForm: document.getElementById('cancelUserForm'),
                saveUserButton: document.getElementById('saveUserButton'),
                confirmationModal: document.getElementById('confirmationModal'),
                confirmationModalTitle: document.getElementById('confirmationModalTitle'),
                confirmationModalMessage: document.getElementById('confirmationModalMessage'),
                confirmActionButton: document.getElementById('confirmActionButton'),
                cancelActionButton: document.getElementById('cancelActionButton'),
                actionMessage: document.getElementById('actionMessage'), // Element to display success/error messages
            };

            let editingUserId = null; // Variable to keep track of the ID of the user currently being edited.

            // --- Utility Functions ---

            /**
             * Shows a given modal element by removing the 'hidden' class.
             * @param {HTMLElement} modalElement - The modal DOM element to show.
             */
            function showModal(modalElement) {
                if (modalElement) modalElement.classList.remove('hidden');
            }

            /**
             * Hides a given modal element by adding the 'hidden' class.
             * @param {HTMLElement} modalElement - The modal DOM element to hide.
             */
            function hideModal(modalElement) {
                if (modalElement) modalElement.classList.add('hidden');
            }

            /**
             * Displays a temporary message (success or error) to the user.
             * @param {string} message - The text message to display.
             * @param {string} type - The type of message ('success' or 'error'). Used for styling.
             * @param {number} duration - How long the message should be displayed in milliseconds. Defaults to 3000ms.
             */
            function showMessage(message, type, duration = 3000) {
                if (!els.actionMessage) return; // Exit if message element is not found

                // Hide the message box first to ensure the animation re-triggers if a new message comes quickly.
                els.actionMessage.classList.add('hidden'); 
                // A small delay ensures the browser registers the 'hidden' state before removing it.
                setTimeout(() => {
                    els.actionMessage.textContent = message; // Set message text
                    els.actionMessage.classList.remove('success', 'error'); // Remove previous type classes
                    els.actionMessage.classList.add(type); // Add the new type class
                    els.actionMessage.classList.remove('hidden'); // Make the message box visible

                    // Set a timeout to hide the message after the specified duration.
                    setTimeout(() => {
                        els.actionMessage.classList.add('hidden');
                    }, duration);
                }, 50); 
            }

            // --- User Table Rendering ---

            /**
             * Renders the list of users in the table, applying search and role filters.
             * It clears the existing table rows and inserts new ones based on the filtered data.
             */
            function renderUsers() {
                // Ensure all necessary DOM elements are available before proceeding.
                if (!els.userTableBody || !els.noUsersMessage || !els.userSearch || !els.roleFilter) return;

                const searchTerm = els.userSearch.value.toLowerCase(); // Get search term and convert to lowercase for case-insensitive search.
                const selectedRole = els.roleFilter.value; // Get selected role filter.

                // Filter the `users` array based on search term and selected role.
                const filteredUsers = users.filter(user => {
                    const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
                    const matchesRole = selectedRole === 'all' || user.role === selectedRole; // 'all' means no role filter.
                    return matchesSearch && matchesRole; 
                });

                els.userTableBody.innerHTML = ''; // Clear all existing rows from the table body.

                // Display "No users found" message if the filtered list is empty.
                if (filteredUsers.length === 0) {
                    els.noUsersMessage.classList.remove('hidden');
                    return;
                } else {
                    els.noUsersMessage.classList.add('hidden'); // Hide the message if users are found.
                }

                // Iterate over the filtered users and create a table row for each.
                filteredUsers.forEach(user => {
                    const row = `
                        <tr data-user-id="${user.id}">
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td class="whitespace-nowrap">
                                <button class="action-button edit-btn mr-2" data-user-id="${user.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-button delete-btn" data-user-id="${user.id}"><i class="fas fa-trash-alt"></i> Delete</button>
                            </td>
                        </tr>
                    `;
                    els.userTableBody.insertAdjacentHTML('beforeend', row); // Add the new row to the table.
                });

                // Attach event listeners to the dynamically created Edit and Delete buttons.
                // This must be done after the rows are added to the DOM.
                els.userTableBody.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent the global click listener from closing the modal immediately.
                        editUser(e.currentTarget.dataset.userId); // Call editUser function with the user's ID.
                    });
                });

                els.userTableBody.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent the global click listener from closing the modal immediately.
                        confirmDeleteUser(e.currentTarget.dataset.userId); // Call confirmDeleteUser function.
                    });
                });
            }

            // --- User Form (Add/Edit) Management ---

            /**
             * Opens the user modal, either for adding a new user or editing an existing one.
             * @param {boolean} isEdit - True if opening for editing, false for adding.
             * @param {Object} [user={}] - The user object to pre-fill the form if in edit mode.
             */
            function openUserModal(isEdit = false, user = {}) {
                // Ensure all necessary form elements are available.
                if (!els.modalTitle || !els.userId || !els.userName || !els.userEmail || !els.userPassword || !els.passwordHint || !els.userRole) return;

                els.userForm.reset(); // Clear any previous form data.
                els.passwordHint.classList.add('hidden'); // Hide password hint by default.
                els.userPassword.required = true; // Password is required when adding a new user.

                if (isEdit) {
                    els.modalTitle.textContent = 'Edit User'; // Set modal title for editing.
                    els.userId.value = user.id; // Populate hidden user ID.
                    els.userName.value = user.name; // Pre-fill name.
                    els.userEmail.value = user.email; // Pre-fill email.
                    els.userRole.value = user.role; // Pre-fill role.
                    els.passwordHint.classList.remove('hidden'); // Show hint for password in edit mode.
                    els.userPassword.removeAttribute('required'); // Password is not required for editing (can leave blank).
                    editingUserId = user.id; // Store the ID of the user being edited.
                } else {
                    els.modalTitle.textContent = 'Add New User'; // Set modal title for adding.
                    els.userId.value = ''; // Clear hidden user ID.
                    editingUserId = null; // No user is being edited.
                }
                showModal(els.userModal); // Display the user modal.
            }

            /**
             * Closes the user add/edit modal and resets its state.
             */
            function closeUserModal() {
                hideModal(els.userModal); // Hide the modal.
                els.userForm.reset(); // Reset the form fields.
                editingUserId = null; // Clear the editing user ID.
            }

            /**
             * Handles the submission of the user form (for both adding and editing users).
             * @param {Event} event - The form submission event.
             */
            function handleUserSubmit(event) {
                event.preventDefault(); // Prevent the default form submission behavior (page reload).
                // Ensure all necessary form elements are available.
                if (!els.userId || !els.userName || !els.userEmail || !els.userPassword || !els.userRole) return;

                // Django Integration: Get the CSRF token from a hidden input or a cookie.
                // You would typically include a Django template tag like <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}">
                const csrftoken = getCookie('csrftoken'); 

                // Generate a new unique ID for new users, otherwise use existing ID for edits.
                const id = els.userId.value || `usr-${crypto.randomUUID().substring(0, 8)}`; 
                const name = els.userName.value.trim();
                const email = els.userEmail.value.trim();
                const role = els.userRole.value;
                const password = els.userPassword.value; // In a real Django app, this would be hashed on the backend.

                // Data to send to Django backend
                const userData = {
                    id: id, // Django might ignore this for new users if using auto-incrementing PK
                    name: name,
                    email: email,
                    role: role,
                    password: password // Send plain password, Django hashes it
                };

                // Determine the API endpoint and HTTP method based on whether it's an edit or add operation.
                let apiEndpoint = '/api/users/'; // Example Django REST Framework endpoint for users
                let httpMethod = 'POST';

                if (editingUserId) {
                    apiEndpoint = `/api/users/${editingUserId}/`; // Specific user endpoint for update (e.g., /api/users/usr-001/)
                    httpMethod = 'PUT'; // Or 'PATCH' for partial updates
                }

                // Django Integration: Example of a fetch request to a Django backend:
                fetch(apiEndpoint, {
                    method: httpMethod,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken // Important for Django POST/PUT/DELETE requests
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => {
                    if (!response.ok) {
                        // If the response is not OK, try to parse error details from JSON
                        return response.json().then(errorData => { 
                            throw new Error(errorData.detail || 'Failed to save user. Please check your input.'); 
                        });
                    }
                    // For successful responses, parse the JSON data (e.g., the saved/updated user object)
                    return response.json();
                })
                .then(data => {
                    // Assuming Django returns the saved/updated user object
                    if (editingUserId) {
                        const userIndex = users.findIndex(u => u.id === editingUserId);
                        if (userIndex !== -1) {
                            users[userIndex] = data; // Update local data with response from Django
                            showMessage(`User "${name}" updated successfully!`, 'success');
                        }
                    } else {
                        users.push(data); // Add new user returned from Django
                        showMessage(`User "${name}" added successfully!`, 'success');
                    }
                    renderUsers(); // Re-render the table to show updated data
                    closeUserModal(); // Close the modal
                })
                .catch(error => {
                    console.error('Error saving user:', error);
                    showMessage(`Error: ${error.message || 'Failed to save user.'}`, 'error');
                });
                
                // --- REMOVE THE FOLLOWING FALLBACK BLOCK IN A REAL DJANGO INTEGRATION ---
                /*
                if (editingUserId) {
                    const userIndex = users.findIndex(u => u.id === editingUserId);
                    if (userIndex !== -1) {
                        users[userIndex].name = name;
                        users[userIndex].email = email;
                        users[userIndex].role = role;
                        if (password) { 
                            // In a real application, hash and save password
                        }
                        showMessage(`User "${name}" updated successfully!`, 'success');
                    } else {
                        showMessage(`Error: User "${name}" not found for update.`, 'error');
                    }
                } else {
                    users.push({ id, name, email, role });
                    showMessage(`User "${name}" added successfully!`, 'success');
                }
                renderUsers();
                closeUserModal();
                */
                // --- END FALLBACK BLOCK ---
            }

            /**
             * Initiates the edit process for a specific user.
             * @param {string} userId - The ID of the user to edit.
             */
            function editUser(userId) {
                const user = users.find(u => u.id === userId); // Find the user object by ID.
                if (user) {
                    openUserModal(true, user); // Open the modal in edit mode with user data.
                }
            }

            // --- Delete Confirmation ---

            /**
             * Displays a confirmation modal before deleting a user.
             * @param {string} userId - The ID of the user to be deleted.
             */
            function confirmDeleteUser(userId) {
                const userToDelete = users.find(u => u.id === userId);
                if (!userToDelete) return; // Exit if user not found.

                // Ensure confirmation modal elements are available.
                if (!els.confirmationModalTitle || !els.confirmationModalMessage || !els.confirmActionButton || !els.cancelActionButton) return;

                els.confirmationModalTitle.textContent = 'Delete User'; // Set modal title.
                els.confirmationModalMessage.innerHTML = `Are you sure you want to delete user: <span class="font-bold text-white">"${userToDelete.name}" (${userToDelete.email})</span>? This action cannot be undone.`;
                showModal(els.confirmationModal); // Show the confirmation modal.

                // Clone and replace buttons to remove old event listeners and attach new ones specific to this action.
                // This is a common pattern to prevent multiple event listeners from accumulating on the same button.
                const newConfirmBtn = els.confirmActionButton.cloneNode(true);
                const newCancelBtn = els.cancelActionButton.cloneNode(true);
                els.confirmActionButton.replaceWith(newConfirmBtn);
                els.cancelActionButton.replaceWith(newCancelBtn);
                els.confirmActionButton = newConfirmBtn;
                els.cancelActionButton = newCancelBtn;

                // Attach event listeners for confirm and cancel actions.
                els.confirmActionButton.onclick = () => {
                    deleteUser(userId); // Call deleteUser if confirmed.
                    hideModal(els.confirmationModal); // Hide confirmation modal.
                };
                els.cancelActionButton.onclick = () => {
                    showMessage('User deletion cancelled.', 'error'); // Show cancellation message.
                    hideModal(els.confirmationModal); // Hide confirmation modal.
                };
            }

            /**
             * Deletes a user from the `users` array.
             * @param {string} userId - The ID of the user to delete.
             */
            function deleteUser(userId) {
                // Django Integration: Get the CSRF token.
                const csrftoken = getCookie('csrftoken');

                // Django Integration: Example of a fetch request to a Django backend for deletion:
                fetch(`/api/users/${userId}/`, { // Example endpoint for deleting a specific user
                    method: 'DELETE',
                    headers: {
                        'X-CSRFToken': csrftoken // Important for Django DELETE requests
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        // If deletion fails, try to get error details
                        return response.json().then(errorData => { throw new Error(errorData.detail || 'Failed to delete user.'); });
                    }
                    // If deletion is successful (Django typically returns 204 No Content for successful DELETE)
                    const userIndex = users.findIndex(u => u.id === userId);
                    if (userIndex !== -1) {
                        const deletedUser = users.splice(userIndex, 1); // Remove user from local array.
                        showMessage(`User "${deletedUser[0].name}" deleted successfully!`, 'error'); 
                        renderUsers(); // Re-render the table.
                    } else {
                        showMessage('Error: User not found for deletion locally.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    showMessage(`Error: ${error.message || 'Failed to delete user.'}`, 'error');
                });

                // --- REMOVE THE FOLLOWING FALLBACK BLOCK IN A REAL DJANGO INTEGRATION ---
                /*
                const userIndex = users.findIndex(u => u.id === userId);
                if (userIndex !== -1) {
                    const deletedUser = users.splice(userIndex, 1); // Remove user from array.
                    showMessage(`User "${deletedUser[0].name}" deleted successfully!`, 'error'); // Show success message.
                    renderUsers(); // Re-render the table.
                } else {
                    showMessage('Error: User not found for deletion.', 'error');
                }
                */
                // --- END FALLBACK BLOCK ---
            }

            // Django Integration: Helper function to get CSRF token from cookies (Django's default CSRF protection)
            function getCookie(name) {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            // --- Event Listeners Initialization ---

            /**
             * Initializes all event listeners for user interactions on the page.
             */
            function initEventListeners() {
                // Event listener for user search input.
                if (els.userSearch) els.userSearch.addEventListener('input', renderUsers);
                // Event listener for role filter dropdown.
                if (els.roleFilter) els.roleFilter.addEventListener('change', renderUsers);
                // Event listener for "Add New User" button.
                if (els.addUserButton) els.addUserButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling to the global click listener.
                    openUserModal(false); // Open modal in add mode.
                });
                // Event listener for closing the user modal (X button).
                if (els.closeUserModal) els.closeUserModal.addEventListener('click', closeUserModal);
                // Event listener for "Cancel" button in user form.
                if (els.cancelUserForm) els.cancelUserForm.addEventListener('click', () => {
                    closeUserModal();
                    showMessage('User addition/edit cancelled.', 'error'); 
                });
                // Event listener for submitting the user form.
                if (els.userForm) els.userForm.addEventListener('submit', handleUserSubmit);

                // Global click listener to close modals when clicking outside them.
                document.addEventListener('click', (event) => {
                    // Check if the click originated from a button that opens a modal.
                    const clickedModalTrigger = event.target.closest('.action-button') || event.target.closest('#addUserButton');
                    
                    // If user modal is open, and the click is outside it and not on a trigger button, hide it.
                    if (els.userModal && !els.userModal.classList.contains('hidden') && !els.userModal.contains(event.target) && !clickedModalTrigger) {
                        hideModal(els.userModal);
                        showMessage('User addition/edit cancelled.', 'error'); 
                    }
                    // If confirmation modal is open, and the click is outside it and not on a trigger button, hide it.
                    if (els.confirmationModal && !els.confirmationModal.classList.contains('hidden') && !els.confirmationModal.contains(event.target) && !clickedModalTrigger) {
                        hideModal(els.confirmationModal);
                        showMessage('Action cancelled.', 'error'); 
                    }
                });
            }

            // --- Initialization ---

            // Execute functions when the DOM is fully loaded.
            document.addEventListener('DOMContentLoaded', () => {
                initEventListeners(); // Initialize all event listeners.
                renderUsers(); // Render the initial list of users in the table.

                // Django Integration: Fetch initial user data from your Django API on page load.
                /*
                fetch('/api/users/') // Replace with your actual Django API endpoint for listing users
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Assuming data is an array of user objects
                        users.splice(0, users.length, ...data); // Replace local data with fetched data
                        renderUsers(); // Re-render the table with fetched data
                    })
                    .catch(error => console.error('Error fetching users:', error));
                */
            });

        })(); // Immediately Invoked Function Expression (IIFE) to encapsulate code