import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user has one wishlist
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;