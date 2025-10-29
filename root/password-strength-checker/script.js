function checkStrength() {
    const passwordInput = document.getElementById('passwordInput'); 
    const password = passwordInput.value; 
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    let score = 0;
    
    // Check for password length
    if (password.length >= 8) {
        score++;
    }
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
        score++;
    }
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        score++;
    }
    // Check for numbers
    if (/[0-9]/.test(password)) {
        score++;
    }
    // Check for special symbols
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        score++;
    }

    // --- Update UI based on score ---

    if (password.length === 0) {
        strengthBar.className = '';
        strengthText.className = '';
        passwordInput.className = ''; 
        strengthText.textContent = 'weak'; // Reset to default
        strengthBar.style.width = '0%';
    } else if (score <= 2) {
        // Weak
        strengthBar.className = 'weak';
        strengthText.className = 'weak';
        passwordInput.className = 'weak'; 
        strengthText.textContent = 'weak';
    } else if (score <= 4) {
        // Medium
        strengthBar.className = 'medium';
        strengthText.className = 'medium';
        passwordInput.className = 'medium'; 
        strengthText.textContent = 'medium';
    } else {
        // Strong
        strengthBar.className = 'strong';
        strengthText.className = 'strong';
        passwordInput.className = 'strong'; 
        strengthText.textContent = 'strong';
    }
}
