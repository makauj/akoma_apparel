// src/pages/ProductDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-64" />
      <p>{product.description}</p>
      <p className="font-semibold">KES {product.price}</p>
      <button
        onClick={() =>
          addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
            _id: undefined
          })
        }
        className="btn-primary mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;