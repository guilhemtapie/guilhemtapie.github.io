(function() {
    'use strict';

    function applyThemeImmediately() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (document.body) {
            document.body.setAttribute('data-theme', savedTheme);
        }
        
        return savedTheme;
    }

    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) {
            console.warn('Theme toggle button not found on this page.');
            return;
        }

        const newToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);

        const body = document.body;
        const currentTheme = localStorage.getItem('theme') || 'light';

        document.documentElement.setAttribute('data-theme', currentTheme);
        body.setAttribute('data-theme', currentTheme);

        function updateThemeButton(theme) {
            newToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            newToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            );
        }

        updateThemeButton(currentTheme);

        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            body.setAttribute('data-theme', newTheme);

            localStorage.setItem('theme', newTheme);

            updateThemeButton(newTheme);
            
            console.log('Theme switched to:', newTheme);
        });

        console.log('Theme toggle initialized with theme:', currentTheme);
    }
	
    applyThemeImmediately();

    function initialize() {
        
        if (window.themeToggleTimeout) {
            clearTimeout(window.themeToggleTimeout);
        }
		
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initThemeToggle();
        } else {
			
            document.addEventListener('DOMContentLoaded', function() {
                window.themeToggleTimeout = setTimeout(initThemeToggle, 50);
            });
        }
    }

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(function() {
                const toggle = document.getElementById('themeToggle');
                if (toggle && !toggle.hasAttribute('data-initialized')) {
                    initThemeToggle();
                    toggle.setAttribute('data-initialized', 'true');
                }
            }, 100);
        }
    });

    initialize();

    window.reinitializeThemeToggle = function() {
        console.log('Manually reinitializing theme toggle...');
        initThemeToggle();
    };

})();