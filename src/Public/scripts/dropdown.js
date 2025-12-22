document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginDropdown = document.getElementById("loginDropdown");

  // Toggle dropdown visibility
  loginBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent closing immediately
    loginDropdown.classList.toggle("hidden");
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!loginDropdown.contains(e.target) && !loginBtn.contains(e.target)) {
      loginDropdown.classList.add("hidden");
    }
  });
});
