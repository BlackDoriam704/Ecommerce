const { body, validationResult } = require('express-validator'); // Sintaxis CommonJS
const { Request, Response, NextFunction } = require('express');

export const validateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: any; }): any; new(): any; }; }; }, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];