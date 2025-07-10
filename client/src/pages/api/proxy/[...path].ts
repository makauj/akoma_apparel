import type { APIRoute } from 'astro';

// Proxy API calls to your external backend
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const ALL: APIRoute = async ({ request }) => {
  try {
    // Extract the path after /api/proxy/
    const url = new URL(request.url);
    const proxyPath = url.pathname.replace('/api/proxy', '');
    
    // Forward to your backend
    const backendUrl = `${BACKEND_URL}${proxyPath}${url.search}`;
    
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward auth headers if needed
        ...(request.headers.get('Authorization') && {
          'Authorization': request.headers.get('Authorization')!
        })
      },
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Proxy request failed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
