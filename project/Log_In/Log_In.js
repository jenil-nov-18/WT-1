function togglePasswordVisibility() {
    const password = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (password.type === 'password') {
        password.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        password.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    let hasError = false;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }

    // Validate password
    if (password.length === 0) {
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
    }

    if (!hasError) {
        // Retrieve existing login data from localStorage (if any)
        let storedLogins = JSON.parse(localStorage.getItem('loginData')) || [];
        
        // Create a new login object
        const newLogin = { email, password, remember, date: new Date().toISOString() };

        // Add the new login to the array
        storedLogins.push(newLogin);
        
        // Save the updated array back to localStorage
        localStorage.setItem('loginData', JSON.stringify(storedLogins));

        // Here you would typically send the data to your server
        console.log('Form submitted:', { email, password, remember });
        alert('Login successful!');
        event.target.reset();
    }
}

// Retrieve and autofill user data if available in localStorage
window.onload = () => {
    const storedData = JSON.parse(localStorage.getItem('loginData'));
    if (storedData && storedData.length > 0) {
        const lastLogin = storedData[storedData.length - 1]; // Get the most recent login
        document.getElementById('email').value = lastLogin.email;
        document.getElementById('password').value = lastLogin.password;
        document.getElementById('remember').checked = lastLogin.remember;
    }
};
