import type { JSX } from "react";
import type { CartItem  } from "../../types/cartItem";
import { apiUrl } from "../../utils/apiUrl";

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjkyMWVmODc0YjE4MjkxN2ZhMzg3NSIsImlhdCI6MTc1MjA1NDUzNCwiZXhwIjoxNzU0NjQ2NTM0fQ.uy9f4CfGVk3LdrarSZDF_qJGZ-4YgAXS1LEpZTacl4s"

async function makepayment() {
  let url = `${apiUrl}/cart`

  const getCart = await fetch(url, {
    method: "GET",
    headers: {
    Authorization: `Bearer ${JWT_TOKEN}`
    }
  })
  const cart = await getCart.json()

  const items = (cart.items as CartItem[]).map((item) => ({
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  }))

  url = `${apiUrl}/payments/checkout`
  try {
  const paymentUrl = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${JWT_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({items}),
  })

  const data = await paymentUrl.json()
  console.log(data)
    if (data.error) {
      throw new Error("Payment Failed. Please check your network connection")
    } else {
        window.location.href = data.url
    }
} catch(err) {
  return err
}
}
const ShippingPage = (): JSX.Element => {
  return (
    <div>
    <p>"Shipping page"</p>
    <form>
      Full Name <br/>
      <input type="text" name="name"/>
      <br/>
      <br/>Shipping Address 
      <br/><input type="text" name="address"/>
      <br/>
      <br/><button type="submit" onClick={
        (e) => { 
        e.preventDefault();
        makepayment()
      }}
      >
        Continue to Payment</button>
    </form>
    </div>
  )
}

export default ShippingPage