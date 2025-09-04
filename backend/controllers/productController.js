import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose'; // Import mongoose

// @desc    Fetch all products (public)
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  console.log('Backend: Received request for all products.');
  const pageSize = Number(req.query.limit) || 10; // Default limit 10
  const page = Number(req.query.page) || 1; // Default page 1

  const keyword = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {};

  const categoryFilter = req.query.category && req.query.category !== 'all'
    ? { category: req.query.category }
    : {};

  let storeFilter = {};
  if (req.query.store && req.query.store !== 'all') {
    console.log('Backend: getAllProducts - Value of req.query.store:', req.query.store);
    // Validate if req.query.store is a valid ObjectId before using it in the query
    if (!mongoose.Types.ObjectId.isValid(req.query.store)) {
      res.status(400);
      throw new Error('Invalid store ID format provided.'); // More specific error
    }
    storeFilter = { store: req.query.store };
  } else {
    console.log('Backend: getAllProducts - Not filtering by store. req.query.store is:', req.query.store);
  }

  const finalQuery = { ...keyword, ...categoryFilter, ...storeFilter };
  console.log('Backend: getAllProducts - Final Query:', finalQuery);

  const count = await Product.countDocuments(finalQuery);
  const products = await Product.find(finalQuery)
    .populate('store', 'name') // Populate store name
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single product by ID (public)
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('store', 'name logo');
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get recommended products (public)
// @route   GET /api/products/recommended
// @access  Public
const getRecommendedProducts = asyncHandler(async (req, res) => {
  // For demo purposes, return a random selection of products
  // In a real app, this would involve recommendation logic
  const products = await Product.aggregate([
    { $sample: { size: 6 } }, // Get 6 random products
    { $project: { name: 1, image: 1, price: 1, originalPrice: 1, store: 1 } } // Select relevant fields
  ]);
  res.json(products);
});

// @desc    Create a new product (vendor)
// @route   POST /api/products
// @access  Private/Vendor
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, originalPrice, stock, category, image } = req.body;

  if (!req.user.storeId) {
    res.status(403);
    throw new Error('User is not a vendor or does not have an associated store.');
  }

  const product = new Product({
    name,
    description,
    price,
    originalPrice,
    stock,
    category,
    image,
    store: req.user.storeId, // Link product to the logged-in vendor's store
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product (vendor)
// @route   PUT /api/products/:id
// @access  Private/Vendor
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Authorization check: Ensure the vendor owns this product
  if (product.store.toString() !== req.user.storeId.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this product.');
  }

  const { name, description, price, originalPrice, stock, category, image, isActive } = req.body;

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
  product.stock = stock !== undefined ? stock : product.stock;
  product.category = category || product.category;
  product.image = image || product.image;
  product.isActive = isActive !== undefined ? isActive : product.isActive;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product (vendor)
// @route   DELETE /api/products/:id
// @access  Private/Vendor
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Authorization check
  if (product.store.toString() !== req.user.storeId.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this product.');
  }

  await Product.deleteOne({ _id: product._id });
  res.json({ message: 'Product removed' });
});

export {
  getAllProducts,
  getProductById,
  getRecommendedProducts, // Export new function
  createProduct,
  updateProduct,
  deleteProduct,
};