// Initialize cart count
let cartCount = 0;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeCart();
    initializeForms();
    initializeAuth();
});

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Cart functionality
function initializeCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBadge = document.getElementById('cart-badge');
    
    if (addToCartButtons.length > 0 && cartBadge) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const product = button.getAttribute('data-product');
                const price = button.getAttribute('data-price');
                
                // Update cart count
                cartCount++;
                cartBadge.textContent = cartCount;
                
                // Animate cart badge
                cartBadge.style.animation = 'none';
                setTimeout(() => {
                    cartBadge.style.animation = 'pulse 0.3s ease';
                }, 10);
                
                // Update button
                const originalText = button.textContent;
                button.textContent = '✓ Added';
                button.style.background = '#10b981';
                button.disabled = true;
                
                // Show success notification
                showNotification(`${product} ($${price}) added to cart!`, 'success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 2000);
                
                // Save to localStorage (optional)
                saveCartToLocalStorage(product, price);
            });
        });
        
        // Load cart count from localStorage
        loadCartFromLocalStorage();
    }
}

// Save cart to localStorage
function saveCartToLocalStorage(product, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ product, price, timestamp: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = cart.length;
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Form handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('form-message');
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message') ? document.getElementById('message').value : '';
    
    // Simulate form submission
    setTimeout(() => {
        if (formMessage) {
            formMessage.className = 'success';
            formMessage.style.display = 'block';
            formMessage.textContent = `✓ Thank you, ${firstname}! Your message has been sent successfully.`;
        }
        
        // Show notification
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            if (formMessage) {
                formMessage.style.display = 'none';
            }
        }, 5000);
    }, 500);
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login
    setTimeout(() => {
        showNotification('Login successful! Welcome back.', 'success');
        
        // Save login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 500);
}

// Handle register form submission
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const firstname = document.getElementById('register-firstname').value;
    const lastname = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Simulate registration
    setTimeout(() => {
        showNotification(`Welcome, ${firstname}! Your account has been created.`, 'success');
        
        // Save registration data
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', `${firstname} ${lastname}`);
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 500);
}

// Auth panel sliding functionality
function initializeAuth() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const signUpLink = document.getElementById('sign-up-link');
    const signInLink = document.getElementById('sign-in-link');
    const container = document.getElementById('auth-container');
    
    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });
        
        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
    
    // Mobile responsive links
    if (signUpLink && container) {
        signUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add('right-panel-active');
        });
    }
    
    if (signInLink && container) {
        signInLink.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.remove('right-panel-active');
        });
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { 
            transform: scale(1); 
        }
        50% { 
            transform: scale(1.2); 
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
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

// Check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    const registerLink = document.querySelector('.register');
    
    if (isLoggedIn === 'true' && registerLink && userName) {
        registerLink.textContent = userName.split(' ')[0];
        registerLink.href = '#';
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                window.location.reload();
            }
        });
    }
}

// Initialize login status check
checkLoginStatus();

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-box, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
