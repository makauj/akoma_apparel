#!/usr/bin/env node

/**
 * Product Seeding Script for Akoma Apparel
 * Run this script to populate your MongoDB with sample clothing products
 * 
 * Usage: node seedProducts.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Enhanced Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String, default: 'Akoma' },
  images: [String],
  colors: [String],
  sizes: [String],
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 100 },
  features: [String],
  material: String,
  gender: { type: String, enum: ['Men', 'Women', 'Unisex', 'Kids'] },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  isNew: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Comprehensive Product Catalog
const productCatalog = [
  // WOMEN'S COLLECTION
  {
    name: "Elegant Wrap Dress",
    description: "Sophisticated wrap dress with a flattering silhouette. Perfect for office or dinner dates. Features a self-tie belt and three-quarter sleeves.",
    price: 95.99,
    category: "Women",
    subcategory: "Dresses",
    brand: "Akoma Elegance",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
      "https://images.unsplash.com/photo-1566479179817-0043e8c26ed4?w=500"
    ],
    colors: ["Black", "Navy", "Burgundy", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Wrap style", "Self-tie belt", "Three-quarter sleeves", "Midi length"],
    material: "Polyester blend",
    gender: "Women",
    rating: 4.7,
    reviews: 156,
    isFeatured: true
  },
  {
    name: "Silk Camisole",
    description: "Luxurious silk camisole with delicate lace trim. Versatile piece that can be dressed up or down.",
    price: 79.99,
    category: "Women",
    subcategory: "Tops",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
    ],
    colors: ["Ivory", "Blush", "Champagne", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["100% Silk", "Lace trim", "Adjustable straps", "Dry clean only"],
    material: "Silk",
    gender: "Women",
    rating: 4.8,
    reviews: 89
  },
  {
    name: "High-Rise Skinny Jeans",
    description: "Premium stretch denim jeans with a flattering high-rise fit. Comfortable all-day wear with a modern silhouette.",
    price: 84.99,
    category: "Women",
    subcategory: "Bottoms",
    brand: "Akoma Denim",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500"
    ],
    colors: ["Dark Wash", "Medium Wash", "Black", "White"],
    sizes: ["24", "26", "28", "30", "32", "34", "36"],
    features: ["High-rise", "Stretch denim", "Skinny fit", "Five-pocket styling"],
    material: "Cotton blend with elastane",
    gender: "Women",
    rating: 4.6,
    reviews: 234
  },
  {
    name: "Cashmere Cardigan",
    description: "Ultra-soft cashmere cardigan with a relaxed fit. Perfect for layering over dresses or with jeans.",
    price: 199.99,
    category: "Women",
    subcategory: "Sweaters",
    brand: "Akoma Luxury",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    ],
    colors: ["Camel", "Gray", "Cream", "Navy", "Rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["100% Cashmere", "Button closure", "Ribbed cuffs", "Hand wash"],
    material: "Cashmere",
    gender: "Women",
    rating: 4.9,
    reviews: 67,
    isFeatured: true
  },
  {
    name: "Floral Midi Skirt",
    description: "Romantic floral midi skirt with a flowing silhouette. Perfect for spring and summer occasions.",
    price: 69.99,
    category: "Women",
    subcategory: "Skirts",
    brand: "Akoma Florals",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"
    ],
    colors: ["Pink Floral", "Blue Floral", "Yellow Floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Floral print", "Midi length", "Elastic waist", "Flowing silhouette"],
    material: "Viscose",
    gender: "Women",
    rating: 4.5,
    reviews: 123,
    isNew: true
  },

  // MEN'S COLLECTION
  {
    name: "Classic Oxford Shirt",
    description: "Timeless Oxford shirt crafted from premium cotton. Essential for business and casual wear.",
    price: 69.99,
    category: "Men",
    subcategory: "Shirts",
    brand: "Akoma Essentials",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
    ],
    colors: ["White", "Light Blue", "Navy", "Pink", "Striped"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["100% Cotton", "Button-down collar", "Chest pocket", "Machine washable"],
    material: "Cotton",
    gender: "Men",
    rating: 4.6,
    reviews: 189,
    isFeatured: true
  },
  {
    name: "Tailored Chinos",
    description: "Modern tailored chinos with a comfortable fit. Versatile pants that work for both casual and semi-formal occasions.",
    price: 79.99,
    category: "Men",
    subcategory: "Pants",
    brand: "Akoma Tailored",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"
    ],
    colors: ["Khaki", "Navy", "Olive", "Charcoal", "Stone"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    features: ["Tailored fit", "Stretch fabric", "Flat front", "Side pockets"],
    material: "Cotton blend",
    gender: "Men",
    rating: 4.7,
    reviews: 156
  },
  {
    name: "Wool Blazer",
    description: "Sophisticated wool blazer with a modern cut. Perfect for business meetings and formal events.",
    price: 279.99,
    category: "Men",
    subcategory: "Blazers",
    brand: "Akoma Formal",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
    ],
    colors: ["Navy", "Charcoal", "Brown", "Black"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    features: ["100% Wool", "Two-button closure", "Notch lapels", "Dry clean only"],
    material: "Wool",
    gender: "Men",
    rating: 4.8,
    reviews: 94
  },
  {
    name: "Merino Wool Sweater",
    description: "Premium merino wool sweater with exceptional softness. Perfect for layering or wearing alone.",
    price: 159.99,
    category: "Men",
    subcategory: "Sweaters",
    brand: "Akoma Wool",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500"
    ],
    colors: ["Charcoal", "Navy", "Forest Green", "Burgundy", "Cream"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Merino wool", "Crew neck", "Ribbed cuffs", "Temperature regulating"],
    material: "Merino wool",
    gender: "Men",
    rating: 4.9,
    reviews: 78,
    isFeatured: true
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with vintage-inspired details. Perfect for casual layering.",
    price: 89.99,
    category: "Men",
    subcategory: "Jackets",
    brand: "Akoma Denim",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"
    ],
    colors: ["Classic Blue", "Dark Wash", "Light Wash", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Classic cut", "Button closure", "Chest pockets", "Vintage details"],
    material: "Cotton denim",
    gender: "Men",
    rating: 4.5,
    reviews: 134
  },

  // KIDS' COLLECTION
  {
    name: "Rainbow Stripe Dress",
    description: "Cheerful rainbow stripe dress made from soft organic cotton. Perfect for playtime and special occasions.",
    price: 34.99,
    category: "Kids",
    subcategory: "Dresses",
    brand: "Akoma Kids",
    images: [
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
    ],
    colors: ["Rainbow", "Pink Stripes", "Blue Stripes"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Organic cotton", "Machine washable", "Comfortable fit", "Colorfast"],
    material: "Organic cotton",
    gender: "Kids",
    rating: 4.7,
    reviews: 89,
    isNew: true
  },
  {
    name: "Superhero Cape T-Shirt",
    description: "Fun superhero-themed t-shirt with detachable cape. Encourages imaginative play.",
    price: 29.99,
    category: "Kids",
    subcategory: "Tops",
    brand: "Akoma Heroes",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500",
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500"
    ],
    colors: ["Blue", "Red", "Green", "Purple"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Detachable cape", "Soft cotton", "Screen print", "Machine washable"],
    material: "Cotton",
    gender: "Kids",
    rating: 4.8,
    reviews: 156
  },
  {
    name: "Cozy Pajama Set",
    description: "Soft and cozy pajama set with fun prints. Perfect for bedtime and lazy mornings.",
    price: 39.99,
    category: "Kids",
    subcategory: "Sleepwear",
    brand: "Akoma Dreams",
    images: [
      "https://images.unsplash.com/photo-1503944168605-ac03aaec1579?w=500",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
    ],
    colors: ["Space Print", "Animal Print", "Star Print"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    features: ["Two-piece set", "Soft flannel", "Elastic waist", "Machine washable"],
    material: "Cotton flannel",
    gender: "Kids",
    rating: 4.6,
    reviews: 112
  },

  // ACCESSORIES
  {
    name: "Leather Tote Bag",
    description: "Spacious leather tote bag perfect for work or weekend. Features multiple compartments and sturdy handles.",
    price: 149.99,
    category: "Accessories",
    subcategory: "Bags",
    brand: "Akoma Leather",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500"
    ],
    colors: ["Black", "Brown", "Tan", "Navy"],
    sizes: ["One Size"],
    features: ["Genuine leather", "Multiple compartments", "Sturdy handles", "Magnetic closure"],
    material: "Leather",
    gender: "Unisex",
    rating: 4.7,
    reviews: 203,
    isFeatured: true
  },
  {
    name: "Silk Square Scarf",
    description: "Elegant silk square scarf with artistic prints. Versatile accessory for multiple styling options.",
    price: 89.99,
    category: "Accessories",
    subcategory: "Scarves",
    brand: "Akoma Silk",
    images: [
      "https://images.unsplash.com/photo-1591348123637-3b09d2a17465?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    colors: ["Floral Blue", "Geometric Gold", "Abstract Red", "Paisley Green"],
    sizes: ["One Size"],
    features: ["100% Silk", "Hand-rolled edges", "Artistic prints", "Dry clean only"],
    material: "Silk",
    gender: "Unisex",
    rating: 4.8,
    reviews: 67
  },
  {
    name: "Wool Fedora Hat",
    description: "Classic wool fedora hat with a modern twist. Perfect for adding sophistication to any outfit.",
    price: 79.99,
    category: "Accessories",
    subcategory: "Hats",
    brand: "Akoma Hats",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=500"
    ],
    colors: ["Black", "Gray", "Navy", "Camel"],
    sizes: ["S", "M", "L"],
    features: ["Wool felt", "Adjustable band", "Classic shape", "Water resistant"],
    material: "Wool felt",
    gender: "Unisex",
    rating: 4.6,
    reviews: 89
  },

  // ACTIVEWEAR
  {
    name: "High-Performance Leggings",
    description: "Advanced athletic leggings with compression technology. Perfect for yoga, running, and gym workouts.",
    price: 79.99,
    category: "Activewear",
    subcategory: "Bottoms",
    brand: "Akoma Sport",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    colors: ["Black", "Navy", "Charcoal", "Purple", "Teal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Compression fit", "Moisture-wicking", "Four-way stretch", "High waistband"],
    material: "Polyester blend",
    gender: "Women",
    rating: 4.8,
    reviews: 234,
    isFeatured: true
  },
  {
    name: "Training Shorts",
    description: "Lightweight training shorts with built-in compression liner. Ideal for intense workouts and running.",
    price: 49.99,
    category: "Activewear",
    subcategory: "Bottoms",
    brand: "Akoma Sport",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    colors: ["Black", "Navy", "Gray", "Royal Blue", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Built-in liner", "Moisture-wicking", "Lightweight", "Side pockets"],
    material: "Polyester",
    gender: "Men",
    rating: 4.7,
    reviews: 178
  },
  {
    name: "Sports Bra",
    description: "Supportive sports bra with seamless construction. Perfect for medium to high-impact activities.",
    price: 59.99,
    category: "Activewear",
    subcategory: "Tops",
    brand: "Akoma Sport",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405c5fd4d4f?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    colors: ["Black", "White", "Gray", "Pink", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Medium support", "Seamless", "Moisture-wicking", "Removable padding"],
    material: "Nylon blend",
    gender: "Women",
    rating: 4.6,
    reviews: 145
  },

  // FORMAL WEAR
  {
    name: "Cocktail Dress",
    description: "Stunning cocktail dress with intricate beading. Perfect for evening events and celebrations.",
    price: 199.99,
    category: "Formal",
    subcategory: "Dresses",
    brand: "Akoma Evening",
    images: [
      "https://images.unsplash.com/photo-1566479179817-0043e8c26ed4?w=500",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
    ],
    colors: ["Black", "Navy", "Burgundy", "Emerald", "Gold"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Beaded details", "Cocktail length", "Side zipper", "Lined"],
    material: "Polyester with beading",
    gender: "Women",
    rating: 4.9,
    reviews: 89,
    isFeatured: true
  },
  {
    name: "Three-Piece Suit",
    description: "Classic three-piece suit with modern tailoring. Includes jacket, vest, and trousers.",
    price: 449.99,
    category: "Formal",
    subcategory: "Suits",
    brand: "Akoma Formal",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
    ],
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    features: ["Three-piece set", "Modern fit", "Wool blend", "Dry clean only"],
    material: "Wool blend",
    gender: "Men",
    rating: 4.8,
    reviews: 67
  },

  // OUTERWEAR
  {
    name: "Wool Coat",
    description: "Elegant wool coat with classic silhouette. Perfect for cold weather and formal occasions.",
    price: 299.99,
    category: "Outerwear",
    subcategory: "Coats",
    brand: "Akoma Outerwear",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    ],
    colors: ["Black", "Camel", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Wool blend", "Double-breasted", "Lined", "Dry clean only"],
    material: "Wool blend",
    gender: "Women",
    rating: 4.7,
    reviews: 112
  },
  {
    name: "Puffer Jacket",
    description: "Warm puffer jacket with water-resistant exterior. Perfect for outdoor activities and winter wear.",
    price: 149.99,
    category: "Outerwear",
    subcategory: "Jackets",
    brand: "Akoma Outdoor",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    ],
    colors: ["Black", "Navy", "Olive", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Water-resistant", "Insulated", "Hood", "Zip pockets"],
    material: "Nylon with down fill",
    gender: "Unisex",
    rating: 4.6,
    reviews: 156
  }
];

// Seeding function
async function seedDatabase() {
  try {
    console.log('🌱 Starting product seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/akoma_apparel';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`🧹 Cleared ${deleteResult.deletedCount} existing products`);

    // Insert new products
    const insertedProducts = await Product.insertMany(productCatalog);
    console.log(`📦 Successfully inserted ${insertedProducts.length} products`);

    // Generate summary statistics
    const categoryStats = {};
    const brandStats = {};
    
    productCatalog.forEach(product => {
      categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
      brandStats[product.brand] = (brandStats[product.brand] || 0) + 1;
    });

    console.log('\n📊 Category Distribution:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

    console.log('\n🏷️  Brand Distribution:');
    Object.entries(brandStats).forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} products`);
    });

    console.log('\n🎯 Featured Products:', productCatalog.filter(p => p.isFeatured).length);
    console.log('🆕 New Products:', productCatalog.filter(p => p.isNew).length);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🚀 Your Akoma Apparel store is ready for testing!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, productCatalog };
