import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Cart from '../models/cart';
import { AuthenticatedRequest } from '../types/express';

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.status(200).json(cart || { user: userId, items: [] });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const index = cart.items.findIndex((item) => item.product.toString() === productId);

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity });
    }

    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const updateCartItem = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Product not in cart' });

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
export const removeFromCart = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
