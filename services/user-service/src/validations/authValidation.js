const { body } = require('express-validator');


exports.registerValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Invalid card number').isNumeric().withMessage('Card number must contain only numbers'),
  body('pin').isLength({ min: 4, max: 4 }).withMessage('PIN must be exactly 4 digits').isNumeric().withMessage('PIN must contain only numbers')
];

exports.loginValidation = [
  body('phoneNumber').notEmpty().withMessage('Invalid phone number'),
  body('password').notEmpty().withMessage('Password is required')
];