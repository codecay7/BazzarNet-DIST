import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: true, // One payment per order
  },
  vendor: { // The vendor who receives the payment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'UPI', 'Cash on Delivery', 'UPI QR Payment'], // NEW: Added 'UPI QR Payment'
    required: true,
  },
  transactionId: { // Unique ID from payment gateway or internal for COD
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  // Reference to the customer who made the payment (via order)
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;