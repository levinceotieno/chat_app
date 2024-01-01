// Validation Code For Inputs

var email = document.forms['form']['email'];
var password = document.forms['form']['password'];

var email_error = document.getElementById('email_error');
var pass_error = document.getElementById('pass_error');

function validated() {
    if (email.value.trim() === '') {
        displayError(email, email_error, "Please fill up your Email");
        return false;
    } else if (!isValidEmail(email.value)) {
        displayError(email, email_error, "Invalid email format");
        return false;
    }

    if (password.value.trim() === '') {
        displayError(password, pass_error, "Please fill up your Password");
        return false;
    } else if (!isValidPassword(password.value)) {
        displayError(password, pass_error, "Password must contain alphanumeric and special characters");
        return false;
    }

    return true;
}

function isValidEmail(email) {
    // Simple email format check (contains @)
    return /\S+@\S+\.\S+/.test(email);
}

function isValidPassword(password) {
    // Password contains at least one uppercase letter, one lowercase letter, one digit, and one special character
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password);
}

function displayError(input, errorElement, errorMessage) {
    input.style.border = "1px solid red";
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
    input.focus();
}

function email_Verify() {
    if (isValidEmail(email.value)) {
        clearError(email, email_error);
        return true;
    }
}

function pass_Verify() {
    if (isValidPassword(password.value)) {
        clearError(password, pass_error);
        return true;
    }
}

function clearError(input, errorElement) {
    input.style.border = "1px solid silver";
    errorElement.style.display = "none";
}

email.addEventListener('input', email_Verify);
password.addEventListener('input', pass_Verify);
