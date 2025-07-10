import mongoose from 'mongoose';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

interface ProductData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

const fashionProducts: ProductData[] = [
  {
    name: "Classic White Cotton T-Shirt",
    description: "Premium 100% organic cotton t-shirt with a comfortable regular fit. Perfect for everyday wear, this timeless piece features a crew neck design and soft, breathable fabric that gets better with every wash.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "T-Shirts",
    inStock: true
  },
  {
    name: "Vintage Blue Denim Jacket",
    description: "Authentic vintage-inspired denim jacket crafted from premium cotton denim. Features classic brass buttons, chest pockets, and a relaxed fit that pairs perfectly with any outfit.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Jackets",
    inStock: true
  },
  {
    name: "Elegant Black Dress",
    description: "Sophisticated little black dress perfect for both office and evening occasions. Made from high-quality polyester blend with a flattering A-line silhouette and three-quarter sleeves.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Dresses",
    inStock: true
  },
  {
    name: "Slim Fit Dark Jeans",
    description: "Modern slim-fit jeans in dark indigo wash. Constructed from premium stretch denim for comfort and durability. Features a mid-rise waist and tapered leg for a contemporary silhouette.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Jeans",
    inStock: true
  },
  {
    name: "Cozy Knit Sweater",
    description: "Luxuriously soft knit sweater in a relaxed fit. Made from premium wool blend with ribbed cuffs and hem. Perfect for layering during cooler months.",
    price: 55.99,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sweaters",
    inStock: true
  },
  {
    name: "Classic Oxford Shirt",
    description: "Timeless button-down Oxford shirt in crisp white cotton. Features a pointed collar, chest pocket, and regular fit that works for both casual and formal occasions.",
    price: 45.99,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Shirts",
    inStock: true
  },
  {
    name: "Floral Print Blouse",
    description: "Beautiful floral print blouse with delicate botanical patterns. Made from lightweight chiffon fabric with a relaxed fit and three-quarter sleeves. Perfect for spring and summer.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Blouses",
    inStock: true
  },
  {
    name: "Leather Ankle Boots",
    description: "Stylish leather ankle boots with a slight heel and side zip closure. Crafted from genuine leather with a comfortable cushioned sole. Perfect for transitioning from day to night.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Shoes",
    inStock: true
  },
  {
    name: "Stripe Pattern Polo Shirt",
    description: "Classic polo shirt with navy and white stripes. Made from soft cotton pique fabric with a comfortable fit. Features a three-button placket and ribbed collar.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Polo Shirts",
    inStock: true
  },
  {
    name: "High-Waisted Trousers",
    description: "Sophisticated high-waisted trousers in a tailored fit. Made from premium wool blend fabric with a pressed crease and belt loops. Perfect for professional settings.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Trousers",
    inStock: true
  },
  {
    name: "Casual Hoodie",
    description: "Comfortable cotton hoodie with a relaxed fit and kangaroo pocket. Features a drawstring hood and ribbed cuffs. Perfect for casual wear and layering.",
    price: 42.99,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a9fbc0cd86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Hoodies",
    inStock: true
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with an elegant paisley pattern. Made from 100% pure silk with hand-rolled edges. A versatile accessory that adds sophistication to any outfit.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1601924991330-2a8b6a5c5d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    inStock: true
  },
  {
    name: "Denim Shorts",
    description: "Classic denim shorts in a comfortable mid-rise fit. Made from premium cotton denim with a vintage wash and frayed hem. Perfect for summer casual wear.",
    price: 32.99,
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Shorts",
    inStock: true
  },
  {
    name: "Leather Belt",
    description: "Classic leather belt in rich brown leather. Features a polished brass buckle and genuine leather construction. A timeless accessory that complements any wardrobe.",
    price: 28.99,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    inStock: true
  },
  {
    name: "Pleated Midi Skirt",
    description: "Elegant pleated midi skirt with a sophisticated drape. Made from lightweight crepe fabric with an elastic waistband. Perfect for both office and evening wear.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Skirts",
    inStock: true
  },
  {
    name: "Casual Sneakers",
    description: "Comfortable canvas sneakers with a classic low-top design. Features a rubber sole and lace-up closure. Perfect for everyday casual wear and weekend activities.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Shoes",
    inStock: true
  },
  {
    name: "Wool Coat",
    description: "Sophisticated wool coat with a timeless double-breasted design. Made from premium wool blend with a tailored fit and classic lapels. Perfect for professional and formal occasions.",
    price: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Coats",
    inStock: true
  },
  {
    name: "Graphic T-Shirt",
    description: "Trendy graphic t-shirt with artistic print design. Made from soft cotton blend with a comfortable fit. Features a unique design that makes a statement.",
    price: 27.99,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f37f4ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "T-Shirts",
    inStock: true
  },
  {
    name: "Yoga Pants",
    description: "High-performance yoga pants with moisture-wicking fabric. Features a high waistband and four-way stretch for maximum comfort during workouts and daily activities.",
    price: 38.99,
    imageUrl: "https://images.unsplash.com/photo-1570464197285-9949814674a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Activewear",
    inStock: true
  },
  {
    name: "Cardigan Sweater",
    description: "Versatile cardigan sweater with button-front closure. Made from soft acrylic blend with ribbed trim. Perfect for layering and transitional weather.",
    price: 47.99,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sweaters",
    inStock: true
  }
];

async function seedProducts(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/akoma_apparel');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(fashionProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display some sample products
    console.log('\n=== Sample Products ===');
    insertedProducts.slice(0, 3).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   ID: ${product._id}`);
      console.log('');
    });

    console.log(`\n✅ Database seeded successfully with ${insertedProducts.length} products!`);
    console.log('🔗 You can now test the products at: http://localhost:4324/astro-ecommerce/api-products');
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedProducts();
