// Navigation and Header Management
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        this.setupDropdowns();
        this.setupMobileMenu();
        this.setActiveStates();
        this.setupClickOutside();
        this.setupHoverBehavior();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        // Handle index.html as Home 1
        if (filename === 'index.html' || filename === '') {
            return 'home';
        }
        
        // Remove .html extension for easier comparison
        return filename.replace('.html', '');
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (toggle) {
                // Click event for mobile and desktop
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                });

                // Touch events for mobile
                toggle.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                });
            }
        });
    }

    setupHoverBehavior() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (toggle && window.innerWidth > 768) {
                // Hover events for desktop only
                dropdown.addEventListener('mouseenter', () => {
                    this.openDropdown(dropdown);
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    this.closeDropdown(dropdown);
                });
            }
        });
    }

    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
        
        // Open clicked dropdown if it wasn't active
        if (!isActive) {
            this.openDropdown(dropdown);
        }
    }

    openDropdown(dropdown) {
        dropdown.classList.add('active');
    }

    closeDropdown(dropdown) {
        dropdown.classList.remove('active');
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    setActiveStates() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const pageName = this.getPageNameFromHref(href);
            
            // Check if this link should be active
            if (this.shouldBeActive(pageName)) {
                link.classList.add('active');
                
                // If this is a dropdown parent, keep it open on desktop
                const dropdown = link.closest('.dropdown');
                if (dropdown && window.innerWidth > 768) {
                    dropdown.classList.add('active');
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    getPageNameFromHref(href) {
        if (!href) return '';
        
        const filename = href.split('/').pop();
        
        // Handle index.html as home
        if (filename === 'index.html' || href === './' || href === '/') {
            return 'home';
        }
        
        return filename.replace('.html', '');
    }

    shouldBeActive(pageName) {
        // Home is active only when current page is home (index.html)
        if (pageName === 'home' && this.currentPage === 'home') {
            return true;
        }
        
        // Home2 is active only when current page is home2
        if (pageName === 'home2' && this.currentPage === 'home2') {
            return true;
        }
        
        // Other pages match directly
        return pageName === this.currentPage;
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            const dropdowns = document.querySelectorAll('.dropdown');
            
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    closeMobileMenu() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// Handle window resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
        
        // Reinitialize active states
        const navManager = new NavigationManager();
        navManager.setActiveStates();
        navManager.setupHoverBehavior();
    }, 250);
});

// Close mobile menu when clicking on links (for better UX)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const navLinks = document.getElementById('navLinks');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        
        if (e.target.closest('.nav-links a') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});
