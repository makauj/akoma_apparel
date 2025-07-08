import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';
import { forgotPassword, resetPassword } from '../controllers/userController';

const router = express.Router();

router.get('/profile', protect, asyncHandler(getUserProfile));
router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

// reset password route
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/reset-password', resetPassword);

export default router;
