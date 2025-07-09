import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.post('/checkout', protect, asyncHandler(createCheckoutSession));

export default router;
