import { Request, Response } from 'express';
import Cart from '../models/cart';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  res.status(200).json(cart || { user: userId, items: [] });
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const index = cart.items.findIndex((item) => item.product.toString() === productId);

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Product not in cart' });

  item.quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();

  res.status(200).json(cart);
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const cart = await Cart.findOneAndDelete({ user: userId });
  res.status(200).json({ message: 'Cart cleared' });
};
