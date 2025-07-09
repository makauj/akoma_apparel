const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/akoma_apparel');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    category: String,
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Create sample products
    const products = [
      {
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 25.99,
        imageUrl: "https://example.com/tshirt.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Denim Shirt",
        description: "Classic denim shirt",
        price: 45.99,
        imageUrl: "https://example.com/denimshirt.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Polo Shirt",
        description: "Classic polo shirt",
        price: 35.99,
        imageUrl: "https://example.com/polo.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Dress Shirt",
        description: "Formal dress shirt",
        price: 55.99,
        imageUrl: "https://example.com/dress.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Hoodie",
        description: "Warm hoodie",
        price: 65.99,
        imageUrl: "https://example.com/hoodie.jpg",
        category: "outerwear",
        inStock: true
      },
      {
        name: "Jeans",
        description: "Classic blue jeans",
        price: 75.99,
        imageUrl: "https://example.com/jeans.jpg",
        category: "pants",
        inStock: true
      },
      {
        name: "Khaki Pants",
        description: "Casual khaki pants",
        price: 45.99,
        imageUrl: "https://example.com/khaki.jpg",
        category: "pants",
        inStock: true
      },
      {
        name: "Sneakers",
        description: "Comfortable sneakers",
        price: 85.99,
        imageUrl: "https://example.com/sneakers.jpg",
        category: "shoes",
        inStock: true
      },
      {
        name: "Graphic T-Shirt",
        description: "T-shirt with cool graphics",
        price: 29.99,
        imageUrl: "https://example.com/graphic.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Long Sleeve Shirt",
        description: "Casual long sleeve shirt",
        price: 39.99,
        imageUrl: "https://example.com/longsleeve.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Button-up Shirt",
        description: "Classic button-up shirt",
        price: 49.99,
        imageUrl: "https://example.com/buttonup.jpg",
        category: "shirts",
        inStock: true
      },
      {
        name: "Tank Top",
        description: "Summer tank top",
        price: 19.99,
        imageUrl: "https://example.com/tank.jpg",
        category: "shirts",
        inStock: true
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Sample products added successfully!');
    console.log(`📦 Added ${products.length} products to the database`);
    
    // Test the search functionality
    const shirtCount = await Product.countDocuments({ name: { $regex: 'shirt', $options: 'i' } });
    console.log(`🔍 Found ${shirtCount} products matching 'shirt'`);
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedProducts();
