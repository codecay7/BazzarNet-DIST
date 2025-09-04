import User from '../models/User.js';
import Store from '../models/Store.js';
import { generateToken } from '../utils/jwt.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { sendEmail } from '../services/emailService.js';

// @desc    Register a new customer user
// @route   POST /api/auth/register/customer
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role: 'customer',
  });

  if (user) {
    // In a real app, you might send a welcome email here
    // await sendEmail(user.email, 'Welcome to BazzarNet!', 'Thank you for registering!');

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register a new vendor user and their store
// @route   POST /api/auth/register/vendor
// @access  Public
const registerVendor = asyncHandler(async (req, res) => {
  const { name, email, password, storeName, businessDescription, category, phone, pan, gst, address } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const storeExists = await Store.findOne({ name: storeName });
  if (storeExists) {
    res.status(400);
    throw new Error('Store with this name already exists');
  }

  // Create the vendor user first
  const vendorUser = await User.create({
    name,
    email,
    password,
    phone,
    pan,
    gst,
    address,
    role: 'vendor',
  });

  if (vendorUser) {
    // Create the store and link it to the vendor user
    const store = await Store.create({
      name: storeName,
      description: businessDescription,
      owner: vendorUser._id,
      category,
      address,
      phone,
      email,
    });

    // Update the vendor user with store details
    vendorUser.storeId = store._id;
    vendorUser.store = store.name;
    await vendorUser.save();

    // In a real app, you might send a welcome email here
    // await sendEmail(vendorUser.email, 'Welcome to BazzarNet Vendor!', 'Your store is now live!');

    res.status(201).json({
      _id: vendorUser._id,
      name: vendorUser.name,
      email: vendorUser.email,
      role: vendorUser.role,
      storeId: store._id,
      storeName: store.name,
      token: generateToken(vendorUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid vendor registration data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isActive) {
      res.status(401);
      throw new Error('Account is inactive. Please contact support.');
    }

    let responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };

    // If vendor, include store details
    if (user.role === 'vendor' && user.storeId) {
      const store = await Store.findById(user.storeId);
      responseData.storeId = store?._id;
      responseData.storeName = store?.name;
    }

    res.json(responseData);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user / clear token (client-side)
// @route   POST /api/auth/logout
// @access  Public (or Private if token invalidation is needed)
const logout = asyncHandler(async (req, res) => {
  // For JWTs stored client-side (e.g., localStorage), logout is primarily client-driven.
  // If using HTTP-only cookies, you would clear the cookie here.
  // For this setup, we simply confirm logout.
  res.status(200).json({ message: 'Logged out successfully' });
});

export { registerUser, registerVendor, login, logout };