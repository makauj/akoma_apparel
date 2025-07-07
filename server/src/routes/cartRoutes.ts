import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest } from '../types/express';

const router = express.Router();

// Helper function to create type-safe authenticated route handlers
const authHandler = (
  handler: (req: AuthenticatedRequest, res: Response, next?: NextFunction) => Promise<any>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    return handler(req as AuthenticatedRequest, res, next);
  };
};

router.use(protect); // all cart routes are protected

// Type-safe route handlers
router.get('/', authHandler(getCart));
router.post('/add', authHandler(addToCart));
router.put('/update', authHandler(updateCartItem));
router.delete('/remove/:productId', authHandler(removeFromCart));
router.delete('/clear', authHandler(clearCart));

export default router;
