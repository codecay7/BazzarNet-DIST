import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/Order.js';
import { generateOtp } from '../utils/helpers.js'; // Assuming a helper for OTP generation

// @desc    Place a new order (Customer)
// @route   POST /api/orders
// @access  Private/Customer
const placeOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

  // In a real app, you'd validate items, check stock, process payment, etc.
  // For now, we'll create a simplified order.

  // Assuming all items in the cart belong to a single store for simplicity
  // You might need more complex logic if a single order can span multiple stores
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No items in order.');
  }

  // Find the store ID from the first item (assuming single store per order)
  const firstItemProduct = await Product.findById(items[0].product);
  if (!firstItemProduct) {
    res.status(400);
    throw new Error('Product not found for the first item.');
  }
  const storeId = firstItemProduct.store;
  const store = await Store.findById(storeId);

  if (!store) {
    res.status(400);
    throw new Error('Store not found for the order.');
  }

  const orderItems = items.map(item => ({
    product: item.product,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const order = new Order({
    user: req.user._id,
    customerName: req.user.name,
    customerEmail: req.user.email,
    store: storeId,
    storeName: store.name,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    deliveryOtp: generateOtp(), // Generate OTP for delivery confirmation
    transactionId: paymentMethod !== 'Cash on Delivery' ? `TXN-${Date.now()}` : undefined, // Mock transaction ID
  });

  const createdOrder = await order.save();

  // In a real app, you'd also:
  // - Clear the user's cart
  // - Send order confirmation email to customer
  // - Notify the vendor of a new order
  // - Create a Payment record (if not COD)

  res.status(201).json(createdOrder);
});

// @desc    Get orders for a specific customer
// @route   GET /api/orders/user/:userId
// @access  Private/Customer
const getCustomerOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  // Ensure the logged-in user is the customer they are requesting orders for
  if (req.user._id.toString() !== userId) {
    res.status(403);
    throw new Error('Not authorized to view these orders.');
  }

  let query = { user: userId };

  if (req.query.status && req.query.status !== 'all') {
    query.orderStatus = req.query.status;
  }
  if (req.query.search) {
    query.$or = [
      { _id: { $regex: req.query.search, $options: 'i' } },
      { 'items.name': { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const count = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('store', 'name')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get orders for a specific vendor's store
// @route   GET /api/orders/store/:storeId
// @access  Private/Vendor
const getVendorOrders = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  // Ensure the logged-in user is the owner of this store
  if (req.user.storeId.toString() !== storeId) {
    res.status(403);
    throw new Error('Not authorized to view orders for this store.');
  }

  let query = { store: storeId };

  if (req.query.status && req.query.status !== 'all') {
    query.orderStatus = req.query.status;
  }
  if (req.query.search) {
    query.$or = [
      { _id: { $regex: req.query.search, $options: 'i' } },
      { customerName: { $regex: req.query.search, $options: 'i' } },
      { customerEmail: { $regex: req.query.search, $options: 'i' } },
      { 'items.name': { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const count = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'name email') // Populate customer info
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Update order status (Vendor/Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Vendor, Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Authorization: Only vendor owning the store or admin can update status
  if (req.user.role === 'vendor' && order.store.toString() !== req.user.storeId.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this order status.');
  }
  if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update order status.');
  }

  order.orderStatus = status;
  if (status === 'Delivered' && !order.deliveredAt) {
    order.deliveredAt = Date.now();
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Confirm delivery with OTP (Vendor)
// @route   POST /api/orders/:id/confirm-delivery
// @access  Private/Vendor
const confirmDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { otp } = req.body;

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Authorization: Only vendor owning the store can confirm delivery
  if (req.user.storeId.toString() !== order.store.toString()) {
    res.status(403);
    throw new Error('Not authorized to confirm delivery for this order.');
  }

  if (order.deliveryOtp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP for delivery confirmation.');
  }

  order.orderStatus = 'Delivered';
  order.deliveredAt = Date.now();
  order.deliveryOtp = undefined; // Clear OTP after successful delivery

  const updatedOrder = await order.save();
  res.json({ message: 'Order delivered successfully!', order: updatedOrder });
});

export {
  placeOrder,
  getCustomerOrders,
  getVendorOrders,
  updateOrderStatus,
  confirmDelivery,
};