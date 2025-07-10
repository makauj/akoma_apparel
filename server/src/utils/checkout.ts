import Order from '../models/Order'

export async function makePayment(email: string, totalAmount: number) {
  const url = "https://api.paystack.co/transaction/initialize";
  try {
    const data = {
      amount: totalAmount * 100, //
      email: email
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PAYSTACK_TEST}`
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result.data.authorization_url

  } catch(err) {
    throw new Error("Payment failed: ")
  }
}

export async function cartToOrder(cart: any, totalAmount: number, shippingAddress: string) {
  try {
    const order = new Order({
      user: cart.user,
      items: cart.items.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress
    });
    const saved = await order.save();
    return saved
  } catch (err) {
    return { message: 'Invalid order data' };
  }
}