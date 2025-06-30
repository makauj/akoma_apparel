import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getUserOrders);

export default router;
