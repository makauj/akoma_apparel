import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { uploadMiddleware } from '../middleware/uploadMiddleware';

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, uploadMiddleware, createProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
