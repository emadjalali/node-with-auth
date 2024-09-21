import { body, validationResult } from 'express-validator';

const validateUserDetails = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUserDetails };
