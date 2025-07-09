import mongoose from 'mongoose';

export type OrderSatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: String,
  },
  {
    timestamps: true,
  }
);

export interface OrderDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  items: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderSatus;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const Order = mongoose.model('Order', orderSchema);

export default Order;
