document.addEventListener('DOMContentLoaded', function() {
    // Check which form is present on the page
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    function handleLogin(e) {
        e.preventDefault();
        console.log("Login form submitted!");
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Login successful! Redirecting...', 'success');
                // Redirect to dashboard or home page after login
                setTimeout(() => {
                    window.location.href = '../index.html'; // Change this to your actual dashboard page
                }, 1500);
            } else {
                showMessage(data.message || 'Login failed', 'error');
            }
        })
        .catch(error => {
            showMessage('An error occurred. Please try again.', 'error');
            console.error('Error:', error);
        });
    }
    
    function handleSignup(e) {
        e.preventDefault();
        console.log("Signup form submitted!");
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Registration successful! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 1500);
            } else {
                showMessage(data.message || 'Registration failed', 'error');
            }
        })
        .catch(error => {
            showMessage('An error occurred. Please try again.', 'error');
            console.error('Error:', error);
        });
    }
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = 'message ' + type;
    }
});