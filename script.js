document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Theme switcher - now handles both base theme and dark mode
    const themeButtons = document.querySelectorAll('[data-theme]');
    let currentTheme = localStorage.getItem('theme') || 'default';
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            
            // Remove any existing theme attributes
            document.documentElement.removeAttribute('data-theme');
            
            // Store the base theme (without -dark suffix)
            currentTheme = selectedTheme.includes('-dark') ? 
                selectedTheme.replace('-dark', '') : selectedTheme;
            
            // Apply the selected theme
            if (selectedTheme !== 'default') {
                document.documentElement.setAttribute('data-theme', selectedTheme);
            }
            
            // Save preferences
            localStorage.setItem('theme', currentTheme);
            localStorage.setItem('darkMode', 'false'); // Reset dark mode when choosing specific theme
            isDarkMode = false;
            
            // Update dark mode toggle icon
            document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-moon"></i>';
        });
    });

    // Dark mode toggle - now works with all themes
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    darkModeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        // Remove any existing theme attributes
        document.documentElement.removeAttribute('data-theme');
        
        if (isDarkMode) {
            // Apply dark version of current theme
            const darkTheme = currentTheme === 'default' ? 'default-dark' : `${currentTheme}-dark`;
            document.documentElement.setAttribute('data-theme', darkTheme);
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Apply light version of current theme
            if (currentTheme !== 'default') {
                document.documentElement.setAttribute('data-theme', currentTheme);
            }
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preferences on load
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedTheme) {
        currentTheme = savedTheme;
        
        if (savedDarkMode) {
            // Apply dark version of saved theme
            const darkTheme = currentTheme === 'default' ? 'default-dark' : `${currentTheme}-dark`;
            document.documentElement.setAttribute('data-theme', darkTheme);
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            isDarkMode = true;
        } else if (currentTheme !== 'default') {
            // Apply light version of saved theme
            document.documentElement.setAttribute('data-theme', currentTheme);
        }
    } else if (savedDarkMode) {
        // Fallback to default dark if no theme saved but dark mode is on
        document.documentElement.setAttribute('data-theme', 'default-dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDarkMode = true;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fadeIn, .fadeInUp');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});