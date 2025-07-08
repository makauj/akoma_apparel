import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getUserOrders);
router.put('/:id/status', protect, asyncHandler(updateOrderStatus));

export default router;
