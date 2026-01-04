
    document.addEventListener('DOMContentLoaded', function() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('attendanceDate').value = today;
        document.getElementById('datePicker').value = today;
    });

    // toggle add atendance
    function toggleAddAttendanceForm() {
        const form = document.getElementById('addAttendanceForm');
        form.classList.toggle('hidden');
    }

    // toggle calendar
    function toggleCalendar() {
        const calendar = document.getElementById('calendar');
        calendar.classList.toggle('hidden');
    }

    // select date 
    function selectDate() {
        const datePicker = document.getElementById('datePicker');
        const selectedDate = document.getElementById('selectedDate');
        
        if (datePicker.value) {
            const date = new Date(datePicker.value);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            selectedDate.textContent = date.toLocaleDateString('en-US', options);
            toggleCalendar();
        }
    }

    // add Attendance
    function addAttendance() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const memberType = document.getElementById('memberType').value;
        const membershipType = document.getElementById('membershipType').value;
        const waterIncluded = document.getElementById('waterIncluded').value;
        const attendanceDate = document.getElementById('attendanceDate').value;
        
        if (!firstName || !lastName) {
            alert('Please fill in all required fields');
            return;
        }
        
        // new row
        const tableBody = document.getElementById('attendanceTableBody');
        const newRow = document.createElement('tr');
        newRow.className = 'table-row border-b border-gray-800';
        
        // get current time for check-in
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const timeString = `${displayHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        
        // sample ids
        const rows = tableBody.getElementsByTagName('tr');
        const newId = `#${String(rows.length + 1).padStart(3, '0')}`;
        
        newRow.innerHTML = `
            <td class="py-3">${newId}</td>
            <td class="py-3">${firstName} ${lastName}</td>
            <td class="py-3">${memberType.charAt(0).toUpperCase() + memberType.slice(1)}</td>
            <td class="py-3">${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)}</td>
            <td class="py-3">${waterIncluded.charAt(0).toUpperCase() + waterIncluded.slice(1)}</td>
            <td class="py-3">${timeString}</td>
            <td class="py-3 text-center">
                <button class="text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>
            </td>
        `;
        
        tableBody.appendChild(newRow);
        
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        toggleAddAttendanceForm();
    }

    // dropdown
    function toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const chevron = document.getElementById(dropdownId.replace('Dropdown', 'Chevron'));
        
        dropdown.classList.toggle('hidden');
        chevron.classList.toggle('rotate-180');
    }