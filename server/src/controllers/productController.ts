import { Request, Response } from 'express';
import Product from '../models/Product';
import { convertCurrency } from '../utils/convertCurrency';
import { uploadFile } from '../utils/uploadFile';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    // Build filter based on query parameters
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const group = req.query.group ? { group: req.query.group } : {};
    const inStock =
      req.query.inStock === 'true'
        ? { inStock: true }
        : req.query.inStock === 'false'
        ? { inStock: false }
        : {};

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (req.query.sort === 'price_asc') sort = { price: 1 };
    else if (req.query.sort === 'price_desc') sort = { price: -1 };
    else if (req.query.sort === 'name_asc') sort = { name: 1 };
    else if (req.query.sort === 'name_desc') sort = { name: -1 };

    const currency = (req.query.currency as string)?.toUpperCase() || 'KES';

    const filter = { ...keyword, ...category, ...inStock, ...group };
    const count = await Product.countDocuments(filter);
    const pages = Math.max(Math.ceil(count / pageSize), 1);

    const products = await Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const convertedProducts = products.map((product) => {
      const obj = product.toObject();
      return {
        ...obj,
        price: convertCurrency(obj.price, currency as any),
        currency,
      };
    });

    res.json({
      products: convertedProducts,
      page,
      pages, // always at least 1
      total: count,
      hasMore: count > 0 && (page === 1),
      totalProducts: count,
    });
  } catch (err) {
    console.error('Error in getProducts:', err);
    res.status(500).json({ message: 'Server Error' });
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
    const s3key = `products/${category}/${Date.now()}-${file.originalname}`;
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

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
export const getTopProducts = async (req: Request, res: Response): Promise<void>  => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category })
      .sort({ createdAt: -1 })
      .limit(10);
    if (products.length === 0) {
      res.status(404).json({ message: 'No products found in this category' });
      return;
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search products by keyword
// @route   GET /api/products/search
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword = req.query.keyword as string;
    if (!keyword) {
      res.status(400).json({ message: 'Keyword is required' });
      return;
    }

    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    }).sort({ createdAt: -1 });

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found' });
      return;
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get products by price range
// @route   GET /api/products/price
export const getProductsByPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).sort({ price: 1 });

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found in this price range' });
      return;
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get products by rating
// @route   GET /api/products/rating
export const getProductsByRating = async (req: Request, res: Response): Promise<void> => {
  try {
    const minRating = Number(req.query.minRating) || 0;
    const maxRating = Number(req.query.maxRating) || 5;

    const products = await Product.find({
      rating: { $gte: minRating, $lte: maxRating },
    }).sort({ rating: -1 });

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found in this rating range' });
      return;
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
