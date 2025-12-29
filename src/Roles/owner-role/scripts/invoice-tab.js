        // Tab switching function
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(`${tabName}-content`).classList.add('active');
            
            // Add active class to clicked tab button
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }
        
        // Show salary details modal
        function showSalaryDetails(employeeId, employeeName) {
            document.getElementById('modalEmployeeId').textContent = employeeId;
            document.getElementById('modalEmployeeName').textContent = employeeName;
            document.getElementById('salaryModal').classList.add('active');
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('salaryModal').classList.remove('active');
        }
        
        // Release salary function
        function releaseSalary(employeeId, employeeName, month) {
            if (confirm(`Are you sure you want to release the salary for ${employeeName} for ${month}?`)) {
                // In a real application, this would make an API call to update the database
                alert(`Salary for ${employeeName} for ${month} has been released successfully.`);
                // Reload the page to show the updated status
                location.reload();
            }
        }
        
        // Dropdown toggle function
        function toggleDropdown(id) {
            const dropdown = document.getElementById(id);
            const chevron = document.getElementById(id.replace('Dropdown', 'Chevron'));

            dropdown.classList.toggle('hidden');
            chevron.classList.toggle('rotate-180');
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('salaryModal');
            if (event.target == modal) {
                closeModal();
            }
        }