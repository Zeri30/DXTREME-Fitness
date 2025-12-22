// Get elements
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');

// Add click event
toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Show password
    eyeIcon.classList.add('hidden'); // Hide eye
    eyeOffIcon.classList.remove('hidden'); // Show eye-off
  } else {
    passwordInput.type = 'password'; // Hide password
    eyeIcon.classList.remove('hidden'); // Show eye
    eyeOffIcon.classList.add('hidden'); // Hide eye-off
  }
});
