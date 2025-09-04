import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema({
  user: { // Customer who placed the order
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  store: { // Store from which the order was placed (if single store order)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true, // Assuming orders are placed from a single store for simplicity
  },
  storeName: { type: String, required: true },
  items: [orderItemSchema], // Array of products in the order
  shippingAddress: {
    houseNo: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pinCode: { type: String, required: true, trim: true },
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'UPI', 'Cash on Delivery'],
    required: true,
  },
  transactionId: { // For payment gateway reference
    type: String,
    sparse: true, // Not required for COD
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveryOtp: { // OTP for delivery confirmation
    type: String,
    minlength: 6,
    maxlength: 6,
    sparse: true, // Only generated when order is ready for delivery
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;