import express from 'express';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import { AuthenticatedRequest } from '../types/express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

// Helper function to create type-safe authenticated route handlers
const authHandler = (
  handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    return handler(req as AuthenticatedRequest, res, next);
  };
};

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authHandler(adminOnly), uploadMiddleware, authHandler(createProduct as any));
router.delete('/:id', protect, authHandler(adminOnly), deleteProduct);

export default router;
