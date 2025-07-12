import { useEffect, useState } from "react";
import type { JSX } from "react";
import { apiUrl } from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import type { CartItem  } from "../../types/cartItem";

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjkyMWVmODc0YjE4MjkxN2ZhMzg3NSIsImlhdCI6MTc1MjA1NDUzNCwiZXhwIjoxNzU0NjQ2NTM0fQ.uy9f4CfGVk3LdrarSZDF_qJGZ-4YgAXS1LEpZTacl4s"


const CheckoutCartPage = (): JSX.Element => {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCart() {
      const url = `${apiUrl}/cart`;
      const cartResponse = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      const cartItems = await cartResponse.json();
      setItems(cartItems.items); 
    }

    fetchCart();
  }, []);
const handleRemove = async (productId: string) => {
  try {
    await fetch(`${apiUrl}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${JWT_TOKEN}`}
    });
    setItems(prev => prev.filter(item => item.product._id !== productId));
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
};

  return (
<div style={{ padding: '40px 20px' }}>
      {/* Page step indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '40px',
        marginLeft: '10px'
      }}>
        <span style={{
          textDecoration: 'underline',
          textDecorationThickness: '3px',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          Cart
        </span>
        <div style={{ width: '30px', height: '2px', backgroundColor: 'black' }}></div>
        <div style={{ width: '30px', height: '2px', backgroundColor: 'black' }}></div>
      </div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Cart Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          borderCollapse: 'collapse',
          width: '70%',
          minWidth: '600px',
          marginBottom: '24px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Product</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Price</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index: number) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <span>{item.product.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'red',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                    >
                      X
                    </button>
                  </div>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>KES {item.product.price}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>KES {item.quantity * item.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Continue Button */}
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  width: '30%'
}}>
  {/* Back Button (Left) */}
  <button
    onClick={() => navigate("/")}
    style={{
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    ← Back
  </button>

  {/* Continue Button (Right) */}
  <button
    onClick={() => navigate("/checkout/shipping")}
    style={{
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    Continue to Shipping→
  </button>
</div>

    </div>
    </div>
  );
};

export default CheckoutCartPage