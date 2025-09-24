// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Services Tab Functionality
    initServicesTabs();
    
    // Smooth Scrolling Navigation
    initSmoothScrolling();
    
    // Contact Form Handling
    initContactForm();
    
    // Navigation Active State
    initNavigationActiveState();
    
    // Animation on Scroll (simple reveal effects)
    initScrollAnimations();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Services Tab Functionality
function initServicesTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Also handle hero buttons
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // If it's services section, show appropriate tab
                    if (targetId === 'services') {
                        const buttonText = this.textContent.trim();
                        if (buttonText === 'Human Diagnostics') {
                            switchToTab('diagnostics');
                        } else if (buttonText === 'Aquaculture Solutions') {
                            switchToTab('biotechnology');
                        }
                    }
                }
            }
        });
    });
}

// Helper function to switch tabs
function switchToTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active to target
    const targetButton = document.querySelector(`[data-tab="${tabId}"]`);
    const targetPanel = document.getElementById(tabId);
    
    if (targetButton && targetPanel) {
        targetButton.classList.add('active');
        targetPanel.classList.add('active');
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Basic validation
            if (validateForm(formValues)) {
                // Simulate form submission
                handleFormSubmission(formValues);
            }
        });
        
        // Real-time validation for form fields
        const formFields = contactForm.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Clear error state on input
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
}

// Form validation
function validateForm(values) {
    let isValid = true;
    const errors = {};
    
    // Name validation
    if (!values.name || values.name.trim().length < 2) {
        errors.name = 'Please enter a valid name (at least 2 characters)';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email || !emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation (optional but should be valid if provided)
    if (values.phone && values.phone.trim().length > 0) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(values.phone.replace(/\s/g, ''))) {
            errors.phone = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // Message validation
    if (!values.message || values.message.trim().length < 10) {
        errors.message = 'Please enter a message (at least 10 characters)';
        isValid = false;
    }
    
    // Display errors
    displayFormErrors(errors);
    
    return isValid;
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let error = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                error = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (value.length > 0) {
                const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    error = 'Please enter a valid phone number';
                }
            }
            break;
        case 'message':
            if (value.length < 10) {
                error = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (error) {
        showFieldError(field, error);
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#800000';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    
    field.parentNode.appendChild(errorElement);
}

// Display form errors
function displayFormErrors(errors) {
    // Clear existing errors
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    document.querySelectorAll('.form-control.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Add new errors
    Object.keys(errors).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            showFieldError(field, errors[fieldName]);
        }
    });
}

// Handle form submission
function handleFormSubmission(values) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Form submitted with data:', values);
    }, 1500);
}

// Show success message
function showSuccessMessage() {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <p style="color: #28a745; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
            Thank you for your message! We'll get back to you within 24 hours.
        </p>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);
    
    // Auto-remove success message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Navigation Active State based on scroll position
function initNavigationActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for fixed header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    // Update on load
    updateActiveNavigation();
}

// Simple scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .research-card, .cert-card, .article-item');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on scroll
    window.addEventListener('scroll', throttle(checkVisibility, 100));
    
    // Check on load
    checkVisibility();
}

// Utility function: Throttle
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for mobile navigation
window.addEventListener('resize', debounce(function() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Add error styles dynamically
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: #800000 !important;
        box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.1) !important;
    }
    
    .error-message {
        color: #800000;
        font-size: 12px;
        margin-top: 4px;
    }
`;
document.head.appendChild(style);