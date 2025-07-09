export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface PaginatedProducts {
  products: Product[];
  page: number;
  pages: number;
}
