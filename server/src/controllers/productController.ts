import { Request, Response } from 'express';
import Product from '../models/Product';
import { uploadFile } from '../utils/uploadFile';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new product (Admin only)
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "Image/Video file is required" });
      return;
    }

    // destination in s3 bucket
    const s3key = `products/${category}/${Date.now()}-${file.originalname}}`;
    // upload file (image or video) to s3
    const fileUrl = await uploadFile(file, s3key)
    req.body.imageUrl = fileUrl

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
