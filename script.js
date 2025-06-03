// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('screenshot-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe all feature cards, subject cards, and steps
document.querySelectorAll('.feature-card, .subject-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Special staggered animation for screenshot cards
document.querySelectorAll('.screenshot-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Download button click tracking
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');

        if (href && href.includes('indusapp.store')) {
            // Indus App Store download
            console.log('App download initiated via Indus App Store');
            showNotification('Redirecting to Indus App Store...', 'success');

            // Track Indus App Store download event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Indus App Store',
                    'event_label': 'UK Exam Pro - Indus App Store',
                    'value': 1
                });
            }
        } else {
            // Direct APK download
            console.log('APK Download initiated via Google Drive');
            showNotification('Redirecting to Google Drive for download...', 'success');

            // Track download event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'APK',
                    'event_label': 'UK Exam Pro APK - Google Drive',
                    'value': 1
                });
            }
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Subject card hover effects
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px) scale(1)';
    });
});

// Enhanced screenshot card effects
document.querySelectorAll('.screenshot-card').forEach(card => {
    const img = card.querySelector('.screenshot-img');

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        if (img) {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        if (img) {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = 'none';
        }
    });

    // Click effect for mobile
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || +counter.innerText.replace('+', '');
            const count = +counter.innerText.replace('+', '');

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Enhanced image loading with shimmer effect
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.classList.add('loaded');
    });

    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    // If image is already cached and loaded
    if (img.complete) {
        img.style.opacity = '1';
        img.classList.add('loaded');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Close any notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #2196F3';
        element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log(`
🎯 UK Exam Pro - UKSSSC & UKPSC Preparation App
👨‍💻 Developed by: SARVESH CHANDRA PUJARI
📱 Version: 1.0.0
🚀 Ready for download!

For technical support or queries, contact the developer.
`);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('UK Exam Pro landing page loaded successfully!');

    // Add any initialization code here
    showNotification('Welcome to UK Exam Pro! Download the app to start your preparation.', 'info');
});
