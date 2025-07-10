import type { APIRoute } from 'astro';

// In a real app, you'd use a database. For demo, we'll use in-memory storage
let cart: Array<{ productId: string; quantity: number; addedAt: string }> = [];

export const GET: APIRoute = async ({ request }) => {
  try {
    // In a real app, you'd get the user's cart from the database
    return new Response(JSON.stringify({
      success: true,
      data: {
        items: cart,
        total: cart.reduce((sum, item) => sum + item.quantity, 0)
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch cart'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { productId, quantity = 1 } = await request.json();
    
    if (!productId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Product ID is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        message: 'Product added to cart',
        cart: {
          items: cart,
          total: cart.reduce((sum, item) => sum + item.quantity, 0)
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to add product to cart'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    // Clear entire cart
    cart = [];
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        message: 'Cart cleared',
        cart: {
          items: [],
          total: 0
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear cart'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
