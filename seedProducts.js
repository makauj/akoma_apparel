const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema (adjust based on your actual schema)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String },
  images: [String],
  colors: [String],
  sizes: [String],
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 100 },
  features: [String],
  material: String,
  gender: { type: String, enum: ['Men', 'Women', 'Unisex', 'Kids'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Sample Products Data
const sampleProducts = [
  // Women's Clothing
  {
    name: "Classic Black Dress",
    description: "Elegant black dress perfect for any occasion. Made from premium cotton blend with a flattering silhouette.",
    price: 89.99,
    category: "Women",
    subcategory: "Dresses",
    brand: "Akoma Essentials",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
      "https://images.unsplash.com/photo-1566479179817-0043e8c26ed4?w=500",
      "https://images.unsplash.com/photo-1609709795097-4c3b2f0b6e11?w=500"
    ],
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Breathable fabric", "Machine washable", "Wrinkle resistant"],
    material: "Cotton blend",
    gender: "Women"
  },
  {
    name: "Silk Blouse",
    description: "Luxurious silk blouse with delicate button details. Perfect for professional and casual wear.",
    price: 125.00,
    category: "Women",
    subcategory: "Tops",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
    ],
    colors: ["White", "Cream", "Blush Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["100% Silk", "Dry clean only", "Imported"],
    material: "Silk",
    gender: "Women"
  },
  {
    name: "High-Waisted Jeans",
    description: "Premium denim jeans with a flattering high-waisted fit. Comfortable stretch fabric for all-day wear.",
    price: 79.99,
    category: "Women",
    subcategory: "Bottoms",
    brand: "Akoma Denim",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500"
    ],
    colors: ["Dark Blue", "Light Blue", "Black"],
    sizes: ["24", "26", "28", "30", "32", "34"],
    features: ["Stretch denim", "High-waisted", "Skinny fit"],
    material: "Denim",
    gender: "Women"
  },
  {
    name: "Cashmere Sweater",
    description: "Ultra-soft cashmere sweater with a relaxed fit. Perfect for layering or wearing alone.",
    price: 189.99,
    category: "Women",
    subcategory: "Sweaters",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    ],
    colors: ["Beige", "Gray", "Cream", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["100% Cashmere", "Hand wash only", "Luxurious feel"],
    material: "Cashmere",
    gender: "Women"
  },

  // Men's Clothing
  {
    name: "Classic Oxford Shirt",
    description: "Timeless Oxford shirt crafted from premium cotton. Perfect for business or casual occasions.",
    price: 65.00,
    category: "Men",
    subcategory: "Shirts",
    brand: "Akoma Essentials",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
    ],
    colors: ["White", "Light Blue", "Navy", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["100% Cotton", "Machine washable", "Wrinkle resistant"],
    material: "Cotton",
    gender: "Men"
  },
  {
    name: "Slim Fit Chinos",
    description: "Modern slim-fit chinos in versatile colors. Comfortable and stylish for any occasion.",
    price: 59.99,
    category: "Men",
    subcategory: "Pants",
    brand: "Akoma Essentials",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"
    ],
    colors: ["Khaki", "Navy", "Olive", "Gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    features: ["Slim fit", "Stretch fabric", "Wrinkle resistant"],
    material: "Cotton blend",
    gender: "Men"
  },
  {
    name: "Wool Blazer",
    description: "Sophisticated wool blazer with a tailored fit. Essential for professional wardrobe.",
    price: 249.99,
    category: "Men",
    subcategory: "Blazers",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
    ],
    colors: ["Navy", "Charcoal", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["100% Wool", "Dry clean only", "Tailored fit"],
    material: "Wool",
    gender: "Men"
  },
  {
    name: "Merino Wool Sweater",
    description: "Premium merino wool sweater with exceptional softness and warmth. Perfect for cooler weather.",
    price: 149.99,
    category: "Men",
    subcategory: "Sweaters",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500"
    ],
    colors: ["Charcoal", "Navy", "Forest Green", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Merino wool", "Temperature regulating", "Odor resistant"],
    material: "Merino wool",
    gender: "Men"
  },

  // Kids' Clothing
  {
    name: "Rainbow Striped T-Shirt",
    description: "Fun and colorful striped t-shirt made from soft organic cotton. Perfect for active kids.",
    price: 24.99,
    category: "Kids",
    subcategory: "Tops",
    brand: "Akoma Kids",
    images: [
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
    ],
    colors: ["Rainbow", "Blue Stripes", "Pink Stripes"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Organic cotton", "Hypoallergenic", "Easy care"],
    material: "Organic cotton",
    gender: "Kids"
  },
  {
    name: "Dinosaur Print Hoodie",
    description: "Cozy hoodie with fun dinosaur print. Perfect for keeping little ones warm and stylish.",
    price: 39.99,
    category: "Kids",
    subcategory: "Hoodies",
    brand: "Akoma Kids",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500",
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500"
    ],
    colors: ["Green", "Blue", "Gray"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Cotton blend", "Kangaroo pocket", "Soft fleece lining"],
    material: "Cotton blend",
    gender: "Kids"
  },
  {
    name: "Denim Overalls",
    description: "Classic denim overalls with adjustable straps. Durable and comfortable for play time.",
    price: 44.99,
    category: "Kids",
    subcategory: "Overalls",
    brand: "Akoma Kids",
    images: [
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
    ],
    colors: ["Light Blue", "Dark Blue"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Durable denim", "Adjustable straps", "Multiple pockets"],
    material: "Denim",
    gender: "Kids"
  },

  // Accessories
  {
    name: "Leather Crossbody Bag",
    description: "Elegant leather crossbody bag with adjustable strap. Perfect for everyday use.",
    price: 129.99,
    category: "Accessories",
    subcategory: "Bags",
    brand: "Akoma Leather",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500"
    ],
    colors: ["Brown", "Black", "Cognac"],
    sizes: ["One Size"],
    features: ["Genuine leather", "Adjustable strap", "Multiple compartments"],
    material: "Leather",
    gender: "Unisex"
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with elegant patterns. Versatile accessory for any outfit.",
    price: 85.00,
    category: "Accessories",
    subcategory: "Scarves",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1591348123637-3b09d2a17465?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    colors: ["Floral", "Geometric", "Abstract"],
    sizes: ["One Size"],
    features: ["100% Silk", "Hand-rolled edges", "Versatile styling"],
    material: "Silk",
    gender: "Unisex"
  },
  {
    name: "Knitted Beanie",
    description: "Cozy knitted beanie perfect for cold weather. Soft and comfortable fit.",
    price: 29.99,
    category: "Accessories",
    subcategory: "Hats",
    brand: "Akoma Essentials",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=500"
    ],
    colors: ["Gray", "Black", "Navy", "Cream"],
    sizes: ["One Size"],
    features: ["Soft knit", "Warm", "Unisex"],
    material: "Acrylic blend",
    gender: "Unisex"
  },

  // Athletic Wear
  {
    name: "Performance Leggings",
    description: "High-performance leggings with moisture-wicking technology. Perfect for workouts and active lifestyle.",
    price: 69.99,
    category: "Athletic",
    subcategory: "Activewear",
    brand: "Akoma Sport",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    colors: ["Black", "Navy", "Charcoal", "Purple"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Moisture-wicking", "Four-way stretch", "High waistband"],
    material: "Polyester blend",
    gender: "Women"
  },
  {
    name: "Athletic Shorts",
    description: "Comfortable athletic shorts with built-in liner. Perfect for running and gym workouts.",
    price: 45.00,
    category: "Athletic",
    subcategory: "Activewear",
    brand: "Akoma Sport",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    colors: ["Black", "Navy", "Gray", "Royal Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Built-in liner", "Moisture-wicking", "Lightweight"],
    material: "Polyester",
    gender: "Men"
  },

  // Formal Wear
  {
    name: "Evening Gown",
    description: "Stunning evening gown with elegant draping. Perfect for formal events and special occasions.",
    price: 299.99,
    category: "Formal",
    subcategory: "Dresses",
    brand: "Akoma Couture",
    images: [
      "https://images.unsplash.com/photo-1566479179817-0043e8c26ed4?w=500",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
    ],
    colors: ["Black", "Navy", "Burgundy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Elegant draping", "Hidden zipper", "Dry clean only"],
    material: "Polyester blend",
    gender: "Women"
  },
  {
    name: "Tuxedo Jacket",
    description: "Classic tuxedo jacket with satin lapels. Essential for formal events and black-tie occasions.",
    price: 399.99,
    category: "Formal",
    subcategory: "Suits",
    brand: "Akoma Couture",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
    ],
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Satin lapels", "Tailored fit", "Dry clean only"],
    material: "Wool blend",
    gender: "Men"
  }
];

// Database connection and seeding function
async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/akoma_apparel');
    console.log('Connected to MongoDB');

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display summary
    const categories = [...new Set(sampleProducts.map(p => p.category))];
    console.log('\nProduct Categories:');
    for (const category of categories) {
      const count = sampleProducts.filter(p => p.category === category).length;
      console.log(`  ${category}: ${count} products`);
    }

    console.log('\nProducts seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedProducts();
