// ===================================
// Navigation & Mobile Menu
// ===================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ===================================
// Scroll Effects
// ===================================
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    // Show/hide scroll-to-top button
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to top functionality
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handling with EmailJS
// ===================================

// ⚠️ IMPORTANT: Replace these values with your EmailJS credentials
// Sign up at https://www.emailjs.com/ to get your keys
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // e.g., 'user_ABC123xyz'

// Optional: Google Sheets integration (if you want both email and sheets)
const GOOGLE_SCRIPT_URL = ''; // Leave empty if not using Google Sheets

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        if (!validateEmail(emailInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        if (!validatePhone(phoneInput.value)) {
            showNotification('Please enter a valid phone number (at least 10 digits)', 'error');
            phoneInput.focus();
            return;
        }
        
        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address') ? document.getElementById('address').value : '',
            message: document.getElementById('message').value
        };
        
        // Log to console for debugging
        console.log('Form submitted:', formData);
        
        // Check if EmailJS is configured
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showNotification('⚠️ EmailJS not configured. Please set up EmailJS credentials in js/main.js', 'error');
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            console.error('EmailJS Configuration Missing:', {
                message: 'Please configure EmailJS credentials',
                instructions: 'See EMAILJS_SETUP.md for setup instructions'
            });
            return;
        }
        
        try {
            // Initialize EmailJS
            emailjs.init(EMAILJS_PUBLIC_KEY);
            
            // Prepare template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                from_phone: formData.phone,
                from_address: formData.address || 'Not provided',
                message: formData.message,
                to_email: 'floridabuildgroup@gmail.com',
                reply_to: formData.email
            };
            
            // Send email via EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            console.log('EmailJS Response:', response);
            
            // Show success message
            showNotification('✅ Thank you! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Track Facebook Pixel Lead event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Free Inspection Request',
                    content_category: 'Turnkey Painting',
                    value: 0,
                    currency: 'USD'
                });
                console.log('Facebook Pixel: Lead event tracked');
            }
            
            // Track conversion with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Lead',
                    'event_label': 'Free Inspection Request'
                });
                console.log('Google Analytics: Form submission tracked');
            }
            
            // Optional: Also send to Google Sheets if configured
            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== '') {
                try {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    console.log('Data also sent to Google Sheets');
                } catch (sheetError) {
                    console.warn('Google Sheets sync failed:', sheetError);
                }
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show user-friendly error message
            let errorMessage = 'Something went wrong. Please try again or call us directly.';
            
            if (error.text) {
                // EmailJS specific error
                errorMessage = `Failed to send: ${error.text}`;
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification__content i {
        font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 15px;
            left: 15px;
            top: 90px;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Form Validation
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation
if (contactForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
            showNotification('Please enter a valid email address', 'error');
        } else {
            emailInput.style.borderColor = '';
        }
    });
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#ef4444';
            showNotification('Please enter a valid phone number', 'error');
        } else {
            phoneInput.style.borderColor = '';
        }
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll(
    '.service-card, .process__step, .gallery__item, .testimonial-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// Gallery Lightbox (Simple Implementation)
// ===================================
const galleryItems = document.querySelectorAll('.gallery__item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = createLightbox(img.src, img.alt);
        document.body.appendChild(lightbox);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    });
});

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__backdrop"></div>
        <div class="lightbox__content">
            <button class="lightbox__close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Close on backdrop click or close button
    const backdrop = lightbox.querySelector('.lightbox__backdrop');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    
    [backdrop, closeBtn].forEach(el => {
        el.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    return lightbox;
}

// Lightbox styles
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox__backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        cursor: pointer;
    }
    
    .lightbox__content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        z-index: 1;
    }
    
    .lightbox__content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 12px;
    }
    
    .lightbox__close {
        position: absolute;
        top: -50px;
        right: -50px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .lightbox__close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @media (max-width: 768px) {
        .lightbox__close {
            top: 10px;
            right: 10px;
        }
        
        .lightbox__content {
            max-width: 95%;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// ===================================
// Performance Optimization
// ===================================
// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🎨 Florida Build Group - Turnkey Painting', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cWebsite built with modern web technologies', 'font-size: 14px; color: #5A6C7D;');
console.log('%cReady to transform your space? Contact us today!', 'font-size: 12px; color: #4ECDC4;');