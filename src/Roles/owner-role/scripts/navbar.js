function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const chevron = document.getElementById(id.replace('Dropdown', 'Chevron'));

    if (dropdown) dropdown.classList.toggle('hidden');
    if (chevron) chevron.classList.toggle('rotate-180');
}
