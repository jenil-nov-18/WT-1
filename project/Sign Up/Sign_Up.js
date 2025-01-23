const form = document.getElementById('signupForm');
const flashMessage = document.getElementById('flashMessage');

function handleSubmit(event) {
    event.preventDefault();

    // Reset errors
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let hasError = false;

    // Validate name
    if (name.trim().length < 2) {
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }

    // Validate password
    if (password.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        hasError = true;
    }

    if (!hasError) {
        // Store the form data in an object
        const formData = {
            name: name.trim(),
            email: email.trim(),
            password: password, // In a real application, passwords should be hashed
        };

        // Save the form data to local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));

        // Show flash message
        flashMessage.style.display = 'block';
        setTimeout(() => {
            flashMessage.style.display = 'none';

            // Redirect to user profile page (example URL)
            window.location.href = '../User_Profile/User_Profile.html';
        }, 2000);

        // Reset the form
        event.target.reset();
    }
}

form.addEventListener('submit', handleSubmit);