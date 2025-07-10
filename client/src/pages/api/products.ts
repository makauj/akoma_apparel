import type { APIRoute } from 'astro';
import data from '../../data.json';

export const GET: APIRoute = async ({ request }) => {
  try {
    // You can add filtering, pagination, etc. here
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const limit = url.searchParams.get('limit');
    
    let products = data.products;
    
    // Filter by category if provided
    if (category) {
      products = products.filter(product => 
        product.title.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Limit results if provided
    if (limit) {
      products = products.slice(0, parseInt(limit));
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: products,
      total: products.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch products'
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
    const body = await request.json();
    
    // Here you would typically save to a database
    // For now, we'll just validate and return the data
    
    if (!body.title || !body.price) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Title and price are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({
      success: true,
      data: newProduct
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create product'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
