import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.get('/user/:userId', protect, getUserOrders);

export default router;
