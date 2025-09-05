import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Store from './models/Store.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';
import env from './config/env.js'; // Import env for MONGO_URI

dotenv.config(); // Load environment variables

// Connect to DB
connectDB();

const sampleCustomers = [
  {
    name: 'Alice Customer',
    email: 'alice@example.com',
    password: 'password123',
    role: 'customer',
    phone: '9876543210',
    address: {
      houseNo: '101, Green Street',
      landmark: 'Near Park',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
    },
  },
  {
    name: 'Bob Customer',
    email: 'bob@example.com',
    password: 'password123',
    role: 'customer',
    phone: '9123456789',
    address: {
      houseNo: '202, Blue Avenue',
      landmark: 'Opposite Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
    },
  },
  {
    name: 'Charlie Customer',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'customer',
    phone: '9988776655',
    address: {
      houseNo: '303, Red Road',
      landmark: 'Near Temple',
      city: 'Delhi',
      state: 'Delhi',
      pinCode: '110001',
    },
  },
  {
    name: 'Diana Customer',
    email: 'diana@example.com',
    password: 'password123',
    role: 'customer',
    phone: '9001122334',
    address: {
      houseNo: '404, Yellow Lane',
      landmark: 'Beside School',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600001',
    },
  },
  {
    name: 'Eve Customer',
    email: 'eve@example.com',
    password: 'password123',
    role: 'customer',
    phone: '9554433221',
    address: {
      houseNo: '505, Purple Path',
      landmark: 'Near Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pinCode: '700001',
    },
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    phone: '9998887770',
    address: {
      houseNo: '999, Admin Tower',
      landmark: 'Central Office',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
    },
  },
];

const sampleVendors = [
  {
    name: 'Vendor A (Groceries)',
    email: 'vendorA@example.com',
    password: 'password123',
    role: 'vendor',
    storeName: 'FreshMart Groceries',
    businessDescription: 'Your daily dose of fresh fruits, vegetables, and pantry staples.',
    category: 'Groceries',
    phone: '8001112223',
    pan: 'ABCDE1234F',
    gst: '27ABCDE1234F1Z5',
    address: {
      houseNo: '1, Market Road',
      landmark: 'Opposite Bus Stand',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
    },
    profileImage: 'https://via.placeholder.com/150?text=FreshMart',
  },
  {
    name: 'Vendor B (Bakery)',
    email: 'vendorB@example.com',
    password: 'password123',
    role: 'vendor',
    storeName: 'Sweet Delights Bakery',
    businessDescription: 'Artisan breads, delicious pastries, and custom cakes for every occasion.',
    category: 'Bakery',
    phone: '8002223334',
    pan: 'FGHIJ5678K',
    gst: '27FGHIJ5678K1Z6',
    address: {
      houseNo: '15, Bakery Lane',
      landmark: 'Next to Cafe',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
    },
    profileImage: 'https://via.placeholder.com/150?text=SweetDelights',
  },
  {
    name: 'Vendor C (Electronics)',
    email: 'vendorC@example.com',
    password: 'password123',
    role: 'vendor',
    storeName: 'TechGadget Hub',
    businessDescription: 'Latest electronics, gadgets, and accessories with expert advice.',
    category: 'Electronics',
    phone: '8003334445',
    pan: 'LMNOP9012Q',
    gst: '27LMNOP9012Q1Z7',
    address: {
      houseNo: '20, Tech Park',
      landmark: 'Near IT Tower',
      city: 'Delhi',
      state: 'Delhi',
      pinCode: '110001',
    },
    profileImage: 'https://via.placeholder.com/150?text=TechGadget',
  },
  {
    name: 'Vendor D (Clothing)',
    email: 'vendorD@example.com',
    password: 'password123',
    role: 'vendor',
    storeName: 'Fashion Trends Boutique',
    businessDescription: 'Trendy apparel for men and women, from casual wear to ethnic outfits.',
    category: 'Clothing',
    phone: '8004445556',
    pan: 'RSTUV3456W',
    gst: '27RSTUV3456W1Z8',
    address: {
      houseNo: '5, Fashion Street',
      landmark: 'Opposite Cinema',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600001',
    },
    profileImage: 'https://via.placeholder.com/150?text=FashionTrends',
  },
  {
    name: 'Vendor E (Decor)',
    email: 'vendorE@example.com',
    password: 'password123',
    role: 'vendor',
    storeName: 'Home Decor Haven',
    businessDescription: 'Unique and stylish home decor items to beautify your living space.',
    category: 'Decor',
    phone: '8005556667',
    pan: 'XYZAB7890C',
    gst: '27XYZAB7890C1Z9',
    address: {
      houseNo: '12, Decor Avenue',
      landmark: 'Near Art Gallery',
      city: 'Kolkata',
      state: 'West Bengal',
      pinCode: '700001',
    },
    profileImage: 'https://via.placeholder.com/150?text=HomeDecor',
  },
];

const productsData = {
  'FreshMart Groceries': [
    {
      name: 'Organic Apples',
      description: 'Fresh, crisp organic apples, perfect for a healthy snack.',
      price: 150,
      originalPrice: 180,
      stock: 100,
      unit: 'kg',
      category: 'Groceries',
      image: 'https://via.placeholder.com/200?text=Organic+Apples',
    },
    {
      name: 'Farm Fresh Milk',
      description: 'Pure and wholesome milk, delivered fresh from the farm.',
      price: 60,
      stock: 50,
      unit: 'L',
      category: 'Groceries',
      image: 'https://via.placeholder.com/200?text=Farm+Milk',
    },
    {
      name: 'Brown Bread',
      description: 'Healthy and delicious brown bread, baked fresh daily.',
      price: 40,
      stock: 70,
      unit: 'pc',
      category: 'Groceries',
      image: 'https://via.placeholder.com/200?text=Brown+Bread',
    },
  ],
  'Sweet Delights Bakery': [
    {
      name: 'Chocolate Croissant',
      description: 'Flaky croissant filled with rich dark chocolate.',
      price: 80,
      stock: 40,
      unit: 'pc',
      category: 'Bakery',
      image: 'https://via.placeholder.com/200?text=Chocolate+Croissant',
    },
    {
      name: 'Sourdough Loaf',
      description: 'Artisan sourdough bread, perfect with any meal.',
      price: 180,
      stock: 20,
      unit: 'pc',
      category: 'Bakery',
      image: 'https://via.placeholder.com/200?text=Sourdough+Loaf',
    },
  ],
  'TechGadget Hub': [
    {
      name: 'Wireless Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation.',
      price: 2500,
      originalPrice: 3000,
      stock: 30,
      unit: 'set',
      category: 'Electronics',
      image: 'https://via.placeholder.com/200?text=Earbuds',
    },
    {
      name: 'Smartwatch',
      description: 'Track your fitness and stay connected with this sleek smartwatch.',
      price: 7000,
      stock: 15,
      unit: 'pc',
      category: 'Electronics',
      image: 'https://via.placeholder.com/200?text=Smartwatch',
    },
  ],
  'Fashion Trends Boutique': [
    {
      name: 'Denim Jeans',
      description: 'Comfortable and stylish denim jeans for everyday wear.',
      price: 1200,
      originalPrice: 1500,
      stock: 80,
      unit: 'pc',
      category: 'Clothing',
      image: 'https://via.placeholder.com/200?text=Denim+Jeans',
    },
    {
      name: 'Cotton T-Shirt',
      description: 'Soft and breathable cotton t-shirt, available in various colors.',
      price: 450,
      stock: 150,
      unit: 'pc',
      category: 'Clothing',
      image: 'https://via.placeholder.com/200?text=T-Shirt',
    },
  ],
  'Home Decor Haven': [
    {
      name: 'Ceramic Vase',
      description: 'Hand-painted ceramic vase, perfect for your living room.',
      price: 800,
      stock: 25,
      unit: 'pc',
      category: 'Decor',
      image: 'https://via.placeholder.com/200?text=Ceramic+Vase',
    },
    {
      name: 'Scented Candles',
      description: 'A set of aromatic scented candles to create a relaxing ambiance.',
      price: 350,
      stock: 60,
      unit: 'set',
      category: 'Decor',
      image: 'https://via.placeholder.com/200?text=Scented+Candles',
    },
  ],
};

const importData = async () => {
  try {
    await User.deleteMany();
    await Store.deleteMany();
    await Product.deleteMany();

    console.log('Existing data cleared!');

    // Separate customers and admin for insertion
    const customersAndAdmin = sampleCustomers.filter(user => user.role !== 'vendor');
    const createdCustomersAndAdmin = await User.insertMany(customersAndAdmin);
    console.log(`${createdCustomersAndAdmin.length} customer and admin users created.`);

    const createdVendors = [];
    for (const vendorData of sampleVendors) {
      const user = await User.create({
        name: vendorData.name,
        email: vendorData.email,
        password: vendorData.password, // Password will be hashed by pre-save hook
        role: 'vendor',
        phone: vendorData.phone,
        address: vendorData.address,
        pan: vendorData.pan,
        gst: vendorData.gst,
        description: vendorData.businessDescription,
        category: vendorData.category,
        profileImage: vendorData.profileImage,
      });

      const store = await Store.create({
        name: vendorData.storeName,
        description: vendorData.businessDescription,
        owner: user._id,
        category: vendorData.category,
        address: vendorData.address,
        phone: vendorData.phone,
        email: vendorData.email,
        logo: vendorData.profileImage,
      });

      user.storeId = store._id;
      user.store = store.name;
      await user.save();
      createdVendors.push(user);

      // Add products for this store
      const storeProducts = productsData[vendorData.storeName];
      if (storeProducts) {
        const productsWithStore = storeProducts.map(p => ({ ...p, store: store._id }));
        await Product.insertMany(productsWithStore);
        console.log(`  ${productsWithStore.length} products added for ${store.name}.`);
      }
    }
    console.log(`${createdVendors.length} vendor users and stores created.`);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Store.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}