import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../services/api';

const useWishlist = (isLoggedIn, user, isVendor, isAdmin, addToCart, fetchCart) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = useCallback(async () => {
    if (!isLoggedIn || !user?._id || isVendor || isAdmin) {
      setWishlist([]); // Clear wishlist if not logged in or not a customer
      return;
    }
    try {
      const userWishlist = await api.customer.getWishlist();
      setWishlist(userWishlist);
    } catch (error) {
      toast.error(`Failed to load wishlist: ${error.message}`);
      setWishlist([]);
    }
  }, [isLoggedIn, user?._id, isVendor, isAdmin]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (product) => {
    if (!isLoggedIn || !user?._id) {
      toast.error('Please log in to add items to your wishlist.');
      return;
    }
    try {
      const response = await api.customer.addToWishlist(product._id, product.unit);
      setWishlist(response);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      toast.error(`Error adding to wishlist: ${error.message}`);
    }
  }, [isLoggedIn, user?._id]);

  const removeFromWishlist = useCallback(async (productId) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      const response = await api.customer.removeFromWishlist(productId);
      setWishlist(response);
      toast.error(`Item removed from wishlist.`);
    } catch (error) {
      toast.error(`Error removing from wishlist: ${error.message}`);
    }
  }, [isLoggedIn, user?._id]);

  const moveToCart = useCallback(async (product) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      await addToCart(product);
      // When moving from wishlist, 'product' is actually the wishlist 'item' object
      // So, we need to access the nested product._id for removal
      await removeFromWishlist(product.product._id); 
      fetchWishlist(); // Re-fetch wishlist to ensure UI is updated
    } catch (error) {
      toast.error(`Error moving to cart: ${error.message}`);
    }
  }, [isLoggedIn, user?._id, addToCart, removeFromWishlist, fetchWishlist]);

  const moveToWishlist = useCallback(async (product) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      await addToWishlist(product);
      // Assuming product has _id, remove from cart
      if (product._id) {
        await api.customer.removeFromCart(product._id);
        fetchCart(); // Re-fetch cart to ensure UI is updated
      }
    } catch (error) {
      toast.error(`Error moving to wishlist: ${error.message}`);
    }
  }, [isLoggedIn, user?._id, addToWishlist, fetchCart]);

  return {
    wishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    moveToWishlist,
    setWishlist // Expose setWishlist for external updates if needed
  };
};

export default useWishlist;