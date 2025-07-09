import { useEffect, useState } from "react";
import type { JSX } from "react";
import { apiUrl } from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import type { CartItem  } from "../../types/cartItem";

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjkyMWVmODc0YjE4MjkxN2ZhMzg3NSIsImlhdCI6MTc1MjA1NDUzNCwiZXhwIjoxNzU0NjQ2NTM0fQ.uy9f4CfGVk3LdrarSZDF_qJGZ-4YgAXS1LEpZTacl4s"


const CartPage = (): JSX.Element => {
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

  return (
    <div>
      <p>Cart</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.product.name} - {item.quantity} x KES {item.product.price}
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => navigate("/checkout/shipping")}>
        Continue to Shipping
      </button>
    </div>
  );
};

export default CartPage