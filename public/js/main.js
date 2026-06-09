document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorDiv = document.getElementById('error-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            const name = document.querySelector('input[name="name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const message = document.querySelector('textarea[name="message"]').value.trim();

            errorDiv.style.display = 'none';
            errorDiv.textContent = '';

            if (name === '' || message === '') {
                errorDiv.textContent = 'Please fill in all fields.';
                errorDiv.style.display = 'block';
                e.preventDefault();
                return;
            }

            if (!email.includes('@') || email === '') {
                errorDiv.textContent = 'Please enter a valid email address.';
                errorDiv.style.display = 'block';
                e.preventDefault();
                return;
            }
        });
    }
});