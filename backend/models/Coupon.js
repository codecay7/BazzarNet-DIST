import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  minOrderAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxDiscountAmount: { // For percentage discounts, limit the max amount
    type: Number,
    default: null, // null means no max limit
    min: 0,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  usageLimit: { // Total number of times this coupon can be used
    type: Number,
    default: null, // null means unlimited
    min: 1,
  },
  usedCount: { // How many times it has been used
    type: Number,
    default: 0,
    min: 0,
  },
  usedBy: [ // Array of user IDs who have used this coupon
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  isNewUserOnly: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;