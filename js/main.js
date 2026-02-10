// EcoPure Cleaning Services - Main JavaScript File
// Common functionality for all pages

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu logic is handled in navigation.js to avoid conflicts

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'var(--white)';
            }

            lastScrollTop = scrollTop;
        });
    }

    // Form validation helper
    window.validateForm = function (formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        return isValid;
    };

    // Email validation helper
    window.validateEmail = function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Phone number formatting helper
    window.formatPhoneNumber = function (input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        input.value = value;
    };

    // Show success message helper
    window.showSuccessMessage = function (messageId, duration = 5000) {
        const message = document.getElementById(messageId);
        if (message) {
            message.classList.add('show');
            message.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                message.classList.remove('show');
            }, duration);
        }
    };

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and service cards for animation
    document.querySelectorAll('.feature-card, .service-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];

    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // Add loading state to buttons
    document.querySelectorAll('.cta-button, .secondary-button').forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.tagName === 'BUTTON' && this.type === 'submit') {
                // Don't add loading to submit buttons as they handle form submission
                return;
            }

            const originalText = this.textContent;
            this.style.opacity = '0.7';
            this.style.cursor = 'not-allowed';

            setTimeout(() => {
                this.style.opacity = '1';
                this.style.cursor = 'pointer';
            }, 1000);
        });
    });

    // Initialize tooltips (if any)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--dark-gray);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

            this.tooltip = tooltip;
        });

        element.addEventListener('mouseleave', function () {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });

    // Add CSS for tooltips
    const tooltipStyles = document.createElement('style');
    tooltipStyles.textContent = `
        .tooltip {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(tooltipStyles);

    // Print functionality
    window.printPage = function () {
        window.print();
    };

    // Copy to clipboard functionality
    window.copyToClipboard = function (text, buttonElement) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                if (buttonElement) {
                    const originalText = buttonElement.textContent;
                    buttonElement.textContent = 'Copied!';
                    buttonElement.style.background = 'var(--accent-green)';

                    setTimeout(() => {
                        buttonElement.textContent = originalText;
                        buttonElement.style.background = '';
                    }, 2000);
                }
            });
        }
    };

    // Lazy loading for images (if any)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });

    // Add CSS for lazy loading
    const lazyStyles = document.createElement('style');
    lazyStyles.textContent = `
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(lazyStyles);

    // Handle image loading
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    });

    // Console welcome message
    console.log('%c🌱 Welcome to EcoPure Cleaning Services!', 'color: #2d7a2d; font-size: 16px; font-weight: bold;');
    console.log('%cSustainable Cleaning. Healthier Living.', 'color: #4caf50; font-size: 14px;');
    console.log('%cBuilt with eco-friendly code! 🌿', 'color: #8bc34a; font-size: 12px;');
});

// Utility functions
window.EcoPure = {
    // Debounce function for performance
    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get URL parameters
    getUrlParameter: function (name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // Set URL parameter
    setUrlParameter: function (name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.replaceState({}, '', url);
    },

    // Local storage helpers
    setLocalStorage: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage is full or not available');
        }
    },

    getLocalStorage: function (key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Error reading from local storage');
            return null;
        }
    },

    // Remove local storage item
    removeLocalStorage: function (key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Error removing from local storage');
        }
    },

    // Check if element is in viewport
    isInViewport: function (element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Generate random ID
    generateId: function () {
        return 'ecopure_' + Math.random().toString(36).substr(2, 9);
    },

    // Format currency
    formatCurrency: function (amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Format date
    formatDate: function (date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
    }
};

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Loading state */
    .loading {
        opacity: 0.7;
        cursor: not-allowed !important;
        pointer-events: none;
    }
    
    /* Focus styles for accessibility */
    button:focus,
    input:focus,
    select:focus,
    textarea:focus,
    a:focus {
        outline: 2px solid var(--primary-green);
        outline-offset: 2px;
    }
    
    /* Skip to main content for accessibility */
    .skip-to-main {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-green);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    }
    
    .skip-to-main:focus {
        top: 0;
    }
`;
document.head.appendChild(additionalStyles);

// Add skip to main content link for accessibility
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

// Error handling for JavaScript errors
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function () {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});
