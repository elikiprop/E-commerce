document.addEventListener('DOMContentLoaded', () => {
    // Handle Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            formMessage.style.display = 'block';
            formMessage.textContent = 'Thank you! Your message has been sent Sucessfully.';
            contactForm.reset();
        });
    }

    // Handle Register Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            formMessage.style.display = 'block';
            formMessage.textContent = 'Thank you! Your registration has been received Successfully.';
            registerForm.reset();
        });
    }

    // Handle Add to Cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            alert(`${product} ($${price}) has been added to your cart Successfully!`);
            // Add actual cart functionality here (e.g., localStorage or backend API)
        });
    });
});