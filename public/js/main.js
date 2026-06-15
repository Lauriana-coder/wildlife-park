document.addEventListener('DOMContentLoaded', () => { // Wait for page to fully load before running
    const form = document.querySelector('form'); // Get the contact form
    const errorDiv = document.getElementById('error-message'); // Get the error message div
    const successDiv = document.getElementById('success-message'); // Get the success message div

    if (form) { // Only run if a form exists on the page
        form.addEventListener('submit', (e) => { // Listen for form submission
            e.preventDefault(); // Prevent the default form submission so the page does not reload

            const name = document.querySelector('input[name="name"]').value.trim(); // Get name field value
            const email = document.querySelector('input[name="email"]').value.trim(); // Get email field value
            const message = document.querySelector('textarea[name="message"]').value.trim(); // Get message field value

            errorDiv.style.display = 'none'; // Hide any previous error messages
            errorDiv.textContent = ''; // Clear previous error text
            successDiv.style.display = 'none'; // Hide any previous success message

            if (name === '' || message === '') { // Check if name or message is empty
                errorDiv.textContent = 'Please fill in all fields.'; // Show error message
                errorDiv.style.display = 'block'; // Make error visible
                return; // Exit the function
            }

            if (!email.includes('@') || email === '') { // Check if email is valid
                errorDiv.textContent = 'Please enter a valid email address.'; // Show error message
                errorDiv.style.display = 'block'; // Make error visible
                return; // Exit the function
            }

            // AJAX request - sends form data to the server as JSON without reloading the page
            fetch('/contact', {
                method: 'POST', // Send as POST request
                headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
                body: JSON.stringify({ name, email, message }) // Convert form data to JSON
            })
            .then(response => response.json()) // Parse the JSON response from the server
            .then(data => {
                if (data.success) { // If the server confirms success
                    successDiv.style.display = 'block'; // Show success message
                    form.reset(); // Clear the form fields
                } else {
                    errorDiv.textContent = data.error || 'Something went wrong.'; // Show error from server
                    errorDiv.style.display = 'block'; // Make error visible
                }
            })
            .catch(err => {
                errorDiv.textContent = 'Could not connect to the server. Please try again.'; // Show connection error
                errorDiv.style.display = 'block'; // Make error visible
                console.error('Contact form error:', err); // Log error to console
            });
        });
    }
});