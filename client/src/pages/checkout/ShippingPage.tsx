import type { JSX } from "react";
import type { CartItem  } from "../../types/cartItem";
import { apiUrl } from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
  return (
    
    <div>
      <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', gap: '16px', top: "40px", left: "30px"}}>
          <span style={{textDecoration: 'underline', textDecorationThickness: '3px', marginRight: '10px', fontWeight: 'bold'}}>Cart</span>
        <span style={{textDecoration: 'underline', textDecorationThickness: '3px', marginRight: '10px', fontWeight: 'bold'}}>Shipping</span>
        <div style={{width: '30px', height: '2px', backgroundColor: 'black', margin: '0 6px'}}/>
      </div>
      <div style={{ marginTop: '60px', paddingLeft: '20px' }}>
     <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {/* ← Back arrow */}
      <div
        onClick={() => navigate("/checkout/cart")}
        style={{ cursor: 'pointer', marginBottom: '20px', color: '#007bff', fontWeight: 'bold' }}
      >
        ← Back to Cart
      </div>

      <form>
        <label style={{ display: 'block', marginBottom: '6px' }}>Full Name</label>
        <input
          type="text"
          name="name"
          style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <label style={{ display: 'block', marginBottom: '6px' }}>Shipping Address</label>
        <input
          type="text"
          name="address"
          style={{ width: '100%', padding: '8px', marginBottom: '24px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            makepayment();
          }}
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          Continue to Payment
        </button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default ShippingPage