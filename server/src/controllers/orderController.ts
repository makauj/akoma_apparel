import { Request, Response } from 'express';
import Order from '../models/Order';
import { AuthenticatedRequest } from '../types/express';

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
  const { name, email, address, paymentIntentId } = req.body;

  if (!name || !email || !address || !paymentIntentId) {
    return res.status(400).json({ message: 'Missing required order fields' });
  }

  try {
    const order = await Order.create({
      user: req.user?._id,
      name,
      email,
      shippingAddress: address,
      paymentIntentId,
      status: 'paid',
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/user/:userId
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
export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.body;
    
    // Validate status values
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: `Order updated successfully to ${status}`, order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
