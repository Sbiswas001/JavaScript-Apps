function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-btn');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show Password';
    }
}

document.getElementById('toggle-btn').addEventListener('click', togglePasswordVisibility);