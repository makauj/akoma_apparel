import { ObjectId } from 'mongoose'
import Cart from '../models/cart'

export default async function getCartByUserId(userId: any) {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product')
    return cart || { user: userId, items: [] }
  } catch(err) {
    throw new Error('Failed to get cart')
  }
}
