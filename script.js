// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading spinner
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';
        submitButton.disabled = true;

        // Get form values
        const templateParams = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_name: 'Duogadi Indo Utama',
            reply_to: document.getElementById('from_email').value
        };

        // Send email
        emailjs.send('service_bvcvp6l', 'template_ydru2cy', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showNotification('Oops! Something went wrong. Please try again later.', 'error');
            })
            .finally(function() {
                buttonText.style.display = 'inline-block';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;
            });
    });
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
} 