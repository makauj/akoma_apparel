import express from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest } from '../types/express';

const router = express.Router();

// Admin middleware wrapper that works with type casting
const adminMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  return adminOnly(req as AuthenticatedRequest, res, next);
};

// Wrapper for updateOrderStatus to handle type casting
const updateOrderStatusWrapper = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateOrderStatus(req as AuthenticatedRequest, res);
  } catch (error) {
    next(error);
  }
};

router.post('/', protect, asyncHandler(createOrder));
router.get('/user/:userId', protect, asyncHandler(getUserOrders));
router.get('/:id', protect, asyncHandler(getOrderById));
router.put('/:id/status', protect, adminMiddleware, updateOrderStatusWrapper);

export default router;
