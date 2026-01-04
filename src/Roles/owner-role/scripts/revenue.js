document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('releaseDate').value = today;
    
    initRevenueChart();
});

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const chevron = document.getElementById(dropdownId.replace('Dropdown', 'Chevron'));
    
    dropdown.classList.toggle('hidden');
    chevron.classList.toggle('rotate-180');
}

// Revenue Chart (di ko ma-imagine paano gawin to with db haha)
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFill.addColorStop(0, 'rgba(142, 22, 22, 0.5)');
    gradientFill.addColorStop(1, 'rgba(142, 22, 22, 0)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oct 1', 'Oct 5', 'Oct 10', 'Oct 15', 'Oct 20', 'Oct 25', 'Oct 27'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 18500],
                borderColor: '#8E1616',
                backgroundColor: gradientFill,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8E1616',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Confirm Release
function confirmRelease() {
    const amount = document.getElementById('releaseAmount').value;
    const method = document.getElementById('releaseMethod').value;
    const date = document.getElementById('releaseDate').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Calculate remaining revenue (simplified for this example)
    const totalRevenue = 185750;
    const remaining = totalRevenue - parseFloat(amount);
    
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById('confirmAmount').textContent = '₱ ' + parseFloat(amount).toLocaleString();
    document.getElementById('confirmMethod').textContent = method.charAt(0).toUpperCase() + method.slice(1);
    document.getElementById('confirmDate').textContent = formattedDate;
    document.getElementById('confirmRemaining').textContent = '₱ ' + remaining.toLocaleString();
    

    document.getElementById('releaseModal').classList.add('active');
}

// Release Cash
function releaseCash() {
    const amount = document.getElementById('releaseAmount').value;
    const method = document.getElementById('releaseMethod').value;
    const date = document.getElementById('releaseDate').value;
    
    alert(`Successfully released ₱${amount} via ${method} on ${date}`);
    
    document.getElementById('releaseAmount').value = '';
    document.getElementById('releaseMethod').value = 'cash';
    closeReleaseModal();
    
    location.reload();
}

// View Revenue Details
function viewRevenueDetails(revenueId) {
    const revenueData = {
        'REV001': {
            date: 'October 27, 2023',
            total: '₱ 12,450',
            cash: '₱ 6,200',
            gcash: '₱ 6,250',
            releasedBy: 'John Doe',
            status: 'Released'
        },
        'REV002': {
            date: 'October 26, 2023',
            total: '₱ 10,300',
            cash: '₱ 5,100',
            gcash: '₱ 5,200',
            releasedBy: 'Jane Smith',
            status: 'Released'
        },
        'REV003': {
            date: 'October 25, 2023',
            total: '₱ 15,700',
            cash: '₱ 8,300',
            gcash: '₱ 7,400',
            releasedBy: '-',
            status: 'Pending'
        },
        'REV004': {
            date: 'October 24, 2023',
            total: '₱ 9,850',
            cash: '₱ 4,500',
            gcash: '₱ 5,350',
            releasedBy: 'John Doe',
            status: 'Released'
        },
        'REV005': {
            date: 'October 23, 2023',
            total: '₱ 13,200',
            cash: '₱ 6,800',
            gcash: '₱ 6,400',
            releasedBy: '-',
            status: 'Pending'
        }
    };
    
    const data = revenueData[revenueId] || revenueData['REV001'];
    
    document.getElementById('detailsRevenueId').textContent = '#' + revenueId;
    document.getElementById('detailsDate').textContent = data.date;
    document.getElementById('detailsTotal').textContent = data.total;
    document.getElementById('detailsCash').textContent = data.cash;
    document.getElementById('detailsGCash').textContent = data.gcash;
    document.getElementById('detailsReleasedBy').textContent = data.releasedBy;
    document.getElementById('detailsStatus').textContent = data.status;
    
    // Update status color
    const statusElement = document.getElementById('detailsStatus');
    statusElement.className = 'px-2 py-1 text-xs rounded-full ';
    if (data.status === 'Released') {
        statusElement.className += 'bg-green-900 text-green-300';
    } else {
        statusElement.className += 'bg-yellow-900 text-yellow-300';
    }
    
    document.getElementById('revenueDetailsModal').classList.add('active');
}

// Close Release Modal
function closeReleaseModal() {
    document.getElementById('releaseModal').classList.remove('active');
}

// Close Details Modal
function closeDetailsModal() {
    document.getElementById('revenueDetailsModal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const releaseModal = document.getElementById('releaseModal');
    const detailsModal = document.getElementById('revenueDetailsModal');
    
    if (event.target == releaseModal) {
        closeReleaseModal();
    }
    
    if (event.target == detailsModal) {
        closeDetailsModal();
    }
}