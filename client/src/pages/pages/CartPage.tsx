import React, { useEffect, useState } from 'react';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/cart');
                if (!response.ok) throw new Error('Failed to fetch cart');
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const getTotal = () =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <h1>Your Cart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Product</th>
                            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Price</th>
                            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Quantity</th>
                            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td style={{ textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                <td style={{ textAlign: 'right' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${getTotal().toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
            <div style={{ marginTop: 24 }}>
                <button
                    style={{
                        padding: '12px 24px',
                        background: '#222',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                    disabled={cartItems.length === 0 || loading}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;