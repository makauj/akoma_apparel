import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get('/profile', protect, asyncHandler(getUserProfile));
router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;
