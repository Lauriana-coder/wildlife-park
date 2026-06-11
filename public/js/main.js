document.addEventListener('DOMContentLoaded', () => { // Wait for page to fully load before running
    const form = document.querySelector('form'); // Get the contact form
    const errorDiv = document.getElementById('error-message'); // Get the error message div

    if (form) { // Only run if a form exists on the page
        form.addEventListener('submit', (e) => { // Listen for form submission
            const name = document.querySelector('input[name="name"]').value.trim(); // Get name field value
            const email = document.querySelector('input[name="email"]').value.trim(); // Get email field value
            const message = document.querySelector('textarea[name="message"]').value.trim(); // Get message field value

            errorDiv.style.display = 'none'; // Hide any previous error messages
            errorDiv.textContent = ''; // Clear previous error text

            if (name === '' || message === '') { // Check if name or message is empty
                errorDiv.textContent = 'Please fill in all fields.'; // Show error message
                errorDiv.style.display = 'block'; // Make error visible
                e.preventDefault(); // Stop form from submitting
                return; // Exit the function
            }

            if (!email.includes('@') || email === '') { // Check if email is valid
                errorDiv.textContent = 'Please enter a valid email address.'; // Show error message
                errorDiv.style.display = 'block'; // Make error visible
                e.preventDefault(); // Stop form from submitting
                return; // Exit the function
            }
        });
    }
});