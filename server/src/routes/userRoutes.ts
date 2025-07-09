import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';
import { forgotPassword } from '../controllers/forgotPassword';
import { resetPassword } from '../controllers/resetPassword';

const router = express.Router();

router.get('/profile', protect, asyncHandler(getUserProfile));
router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

// Password reset routes
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/reset-password', asyncHandler(resetPassword));

export default router;
