import { Request, Response } from 'express';
import Order from '../models/Order';

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid order data' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/:userId
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated to ${status}', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
