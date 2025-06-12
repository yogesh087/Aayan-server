import express from "express"
const router = express.Router()
import { body } from 'express-validator'

import { register, login, refreshToken } from "../controllers/auth.js"

router.post('/register',  [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be 6+ chars'),
  body('phone').notEmpty().withMessage('Phone is required'),
], register)
router.put('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
],login)
router.get('/refresh-token', refreshToken);

export default router