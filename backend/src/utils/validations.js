const { body } = require('express-validator');

const validateSignup = [
    body('name')
        .matches(/^[A-Za-z\s]{20,60}$/)
        .withMessage('Name must be between 20 and 60 characters and contain only letters and spaces.'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)
        .withMessage('Password must be 8-16 characters long, include at least one uppercase letter and one special character.'),
    body('address')
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters.')
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required.')
];

module.exports = {
    validateName: (name) => {
        const nameRegex = /^[A-Za-z\s]{20,60}$/;
        return nameRegex.test(name);
    },
    validateAddress: (address) => {
        return address.length <= 400;
    },
    validatePassword: (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        return passwordRegex.test(password);
    },
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    validateRating: (rating) => {
        return rating >= 1 && rating <= 5;
    },
    validateSignup, // Add validateSignup
    validateLogin   // Add validateLogin
};