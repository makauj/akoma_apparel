// API utility functions for frontend-backend communication

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
  page?: number;
  pages?: number;
  total?: number;
}

// Specific response for products list
export interface ProductsResponse {
  products: BackendProduct[];
  page?: number;
  pages?: number;
  total?: number;
}

// Backend Product interface (matching the server response)
export interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
  currency?: string;
}

// Frontend Product interface (matching current frontend expectations)
export interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  colors?: string[];
  images?: Array<{ src: string; alt: string }>;
  rating?: number;
  reviews?: number;
  stock?: boolean;
  size?: string;
  sizes?: Record<string, number>;
  createdAt?: string;
  updatedAt?: string;
}

// User interface
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  token?: string;
}

// Auth response interface  
export interface AuthResponse {
  user?: User;
  token?: string;
  _id?: string;
  name?: string;
  email?: string;
}

// Combined auth response that includes both the data and token at root level
export interface AuthApiResponse extends ApiResponse<AuthResponse> {
  token?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl || import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:5000';
    // Try to get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      // Add auth token if available
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        headers,
        ...options,
      });

      let data: any;
      try {
        data = await response.json();
      } catch (e) {
        // Handle non-JSON responses
        data = { message: await response.text() };
      }
      
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          this.clearToken();
        }
        
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`
        };
      }

      // Backend doesn't always return success field, so we assume success if response is ok
      return {
        success: true,
        ...data
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  // Transform backend product to frontend format
  private transformProduct(backendProduct: BackendProduct): Product {
    return {
      id: backendProduct._id,
      title: backendProduct.name,
      price: backendProduct.price,
      description: backendProduct.description || '',
      thumb_src: backendProduct.imageUrl || '/images/placeholder.jpg',
      thumb_alt: backendProduct.name,
      color: '',
      colors: [],
      images: backendProduct.imageUrl ? [{ src: backendProduct.imageUrl, alt: backendProduct.name }] : [],
      rating: 0,
      reviews: 0,
      stock: backendProduct.inStock,
      createdAt: backendProduct.createdAt,
      updatedAt: backendProduct.updatedAt,
    };
  }

  // Authentication methods
  async register(userData: { name: string; email: string; password: string }): Promise<AuthApiResponse> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Set token if registration successful - check both response.token and response.data?.token
    const token = (response as any).token || response.data?.token;
    if (response.success && token) {
      this.setToken(token);
    }

    return response as AuthApiResponse;
  }

  async login(credentials: { email: string; password: string }): Promise<AuthApiResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Set token if login successful - check both response.token and response.data?.token
    const token = (response as any).token || response.data?.token;
    if (response.success && token) {
      this.setToken(token);
    }

    return response as AuthApiResponse;
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/users/profile');
  }

  async logout(): Promise<void> {
    this.clearToken();
    // You could also call a logout endpoint if your backend has one
  }

  // Product API methods
  async getProducts(params?: {
    keyword?: string;
    category?: string;
    inStock?: boolean;
    sort?: string;
    page?: number;
    currency?: string;
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.keyword) searchParams.append('keyword', params.keyword);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.inStock !== undefined) searchParams.append('inStock', params.inStock.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.currency) searchParams.append('currency', params.currency);
    
    const query = searchParams.toString();
    const response = await this.request<ProductsResponse>(`/api/products${query ? `?${query}` : ''}`);
    
    if (response.success && response.data?.products) {
      // Transform backend products to frontend format
      const transformedProducts = response.data.products.map((p: BackendProduct) => this.transformProduct(p));
      return {
        success: response.success,
        data: transformedProducts,
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
        message: response.message,
        error: response.error
      };
    }
    
    return {
      success: false,
      error: response.error || 'Failed to fetch products',
      data: []
    };
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const response = await this.request<BackendProduct>(`/api/products/${id}`);
    
    if (response.success && response.data) {
      return {
        success: response.success,
        data: this.transformProduct(response.data),
        message: response.message,
        error: response.error
      };
    }
    
    return {
      success: false,
      error: response.error || 'Failed to fetch product'
    };
  }

  async createProduct(product: Omit<BackendProduct, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    const response = await this.request<BackendProduct>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    
    if (response.success && response.data) {
      return {
        success: response.success,
        data: this.transformProduct(response.data),
        message: response.message,
        error: response.error
      };
    }
    
    return {
      success: false,
      error: response.error || 'Failed to create product'
    };
  }

  async updateProduct(id: string, product: Partial<BackendProduct>): Promise<ApiResponse<Product>> {
    const response = await this.request<BackendProduct>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    
    if (response.success && response.data) {
      return {
        success: response.success,
        data: this.transformProduct(response.data),
        message: response.message,
        error: response.error
      };
    }
    
    return {
      success: false,
      error: response.error || 'Failed to update product'
    };
  }

  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Cart API methods
  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse<any>> {
    return this.request('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async getCart(): Promise<ApiResponse<any>> {
    return this.request('/api/cart');
  }

  async updateCartItem(productId: string, quantity: number): Promise<ApiResponse<any>> {
    return this.request('/api/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<ApiResponse<any>> {
    return this.request('/api/cart/clear', {
      method: 'DELETE',
    });
  }

  async getCartCount(): Promise<ApiResponse<{ count: number }>> {
    return this.request('/api/cart/count');
  }

  // Order API methods
  async createOrder(orderData: any): Promise<ApiResponse<any>> {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getUserOrders(): Promise<ApiResponse<any[]>> {
    return this.request('/api/orders/my');
  }

  async getOrder(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/orders/${id}`);
  }

  // Payment methods
  async createCheckoutSession(items: any[]): Promise<ApiResponse<{ url: string }>> {
    return this.request('/api/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Hook for React components (if you want to use React hooks)
export function useApi() {
  return apiClient;
}

// Utility function for handling API errors in components
export function handleApiError(error: string | undefined): string {
  if (!error) return 'An unknown error occurred';
  
  // You can customize error messages here
  if (error.includes('404')) return 'Resource not found';
  if (error.includes('401')) return 'Authentication required';
  if (error.includes('403')) return 'Access denied';
  if (error.includes('500')) return 'Server error occurred';
  
  return error;
}
