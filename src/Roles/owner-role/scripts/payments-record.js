        // Toggle Dropdown
        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            const chevron = document.getElementById(dropdownId.replace('Dropdown', 'Chevron'));
            
            dropdown.classList.toggle('hidden');
            chevron.classList.toggle('rotate-180');
        }
        
        // Show Payment Details Modal
        function showPaymentDetails(paymentId) {
            // In a real application, you would fetch payment details based on paymentId
            // For this example, we'll use static data
            const paymentData = {
                'PAY001': {
                    customer: 'John Smith',
                    date: 'October 27, 2023',
                    amount: '₱ 1,300',
                    method: 'GCash',
                    status: 'Completed',
                    type: 'Monthly Premium Membership',
                    processedBy: 'Jane Smith (Employee)',
                    gcashNumber: '09123456789'
                },
                'PAY002': {
                    customer: 'Sarah Johnson',
                    date: 'October 27, 2023',
                    amount: '₱ 100',
                    method: 'Cash',
                    status: 'Completed',
                    type: 'Adult Walk-in Session',
                    processedBy: 'Mike Johnson (Employee)',
                    gcashNumber: null
                },
                'PAY003': {
                    customer: 'Mike Wilson',
                    date: 'October 27, 2023',
                    amount: '₱ 500',
                    method: 'Cash',
                    status: 'Completed',
                    type: 'Yearly Regular Adult Membership',
                    processedBy: 'Jane Smith (Employee)',
                    gcashNumber: null
                },
                'PAY004': {
                    customer: 'Emily Davis',
                    date: 'October 27, 2023',
                    amount: '₱ 1,000',
                    method: 'GCash',
                    status: 'Pending',
                    type: 'Monthly Student Premium',
                    processedBy: 'Mike Johnson (Employee)',
                    gcashNumber: '09876543210'
                },
                'PAY005': {
                    customer: 'David Brown',
                    date: 'October 26, 2023',
                    amount: '₱ 70',
                    method: 'GCash',
                    status: 'Completed',
                    type: 'Student Walk-in Session',
                    processedBy: 'Jane Smith (Employee)',
                    gcashNumber: '09112223344'
                }
            };
            
            const data = paymentData[paymentId] || paymentData['PAY001'];
            
            document.getElementById('modalPaymentId').textContent = '#' + paymentId;
            document.getElementById('modalCustomerName').textContent = data.customer;
            document.getElementById('modalPaymentDate').textContent = data.date;
            document.getElementById('modalAmount').textContent = data.amount;
            document.getElementById('modalPaymentMethod').textContent = data.method;
            document.getElementById('modalStatus').textContent = data.status;
            
            // Update status color
            const statusElement = document.getElementById('modalStatus');
            statusElement.className = 'px-2 py-1 text-xs rounded-full ';
            if (data.status === 'Completed') {
                statusElement.className += 'bg-green-900 text-green-300';
            } else if (data.status === 'Pending') {
                statusElement.className += 'bg-yellow-900 text-yellow-300';
            } else {
                statusElement.className += 'bg-red-900 text-red-300';
            }
            
            // Show/hide GCash details
            const gcashDetails = document.getElementById('modalGCashDetails');
            if (data.gcashNumber) {
                gcashDetails.classList.remove('hidden');
                gcashDetails.querySelector('p:last-child').textContent = data.gcashNumber;
            } else {
                gcashDetails.classList.add('hidden');
            }
            
            document.getElementById('paymentModal').classList.add('active');
        }
        
        // Print Receipt
        function printReceipt(paymentId) {
            // In a real application, this would generate and print a receipt
            alert(`Printing receipt for payment ${paymentId}...`);
            // You could also open a new window with a printable receipt format
            // window.open(`receipt.php?id=${paymentId}`, '_blank');
        }
        
        // Close Modal
        function closeModal() {
            document.getElementById('paymentModal').classList.remove('active');
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('paymentModal');
            if (event.target == modal) {
                closeModal();
            }
        }