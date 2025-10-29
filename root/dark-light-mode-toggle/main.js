const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        const savedTheme = window.savedTheme || 'light-mode';
        body.className = savedTheme;

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                window.savedTheme = 'dark-mode';
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                window.savedTheme = 'light-mode';
            }
        });

        themeToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                themeToggle.click();
            }
        });

        themeToggle.setAttribute('tabindex', '0');
        themeToggle.setAttribute('role', 'switch');
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');