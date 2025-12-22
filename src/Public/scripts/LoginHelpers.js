// Get elements
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');
const form = document.querySelector("form");

// Toggle password visibility (guarded)
if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      if (eyeIcon) eyeIcon.classList.add('hidden');
      if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
    } else {
      passwordInput.type = 'password';
      if (eyeIcon) eyeIcon.classList.remove('hidden');
      if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
    }
  });
}

// Form validation on submit (guarded)
if (form) {
  form.addEventListener('submit', (e) => {
    const username = document.getElementById('username');
    const password = passwordInput;

    if (!username || !password || !username.value.trim() || !password.value.trim()) {
      e.preventDefault(); // Stop form submission
      alert("Please enter both username and password");

      // Clear fields safely
      if (username) username.value = '';
      if (password) password.value = '';
    }
  });
}


