import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../services/api';

const useProducts = () => {
  const [allAppProducts, setAllAppProducts] = useState([]);
  const [allAppProductsMeta, setAllAppProductsMeta] = useState({ page: 1, pages: 1, count: 0 });
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  const fetchAllProducts = useCallback(async (params = {}) => {
    try {
      const { products, page, pages, count } = await api.products.getAll(params);
      setAllAppProducts(products);
      setAllAppProductsMeta({ page, pages, count });
    } catch (error) {
      toast.error(`Failed to load products: ${error.message}`);
      setAllAppProducts([]);
      setAllAppProductsMeta({ page: 1, pages: 1, count: 0 });
    }
  }, []);

  const fetchRecommendedProducts = useCallback(async () => {
    setRecommendedLoading(true);
    try {
      const products = await api.products.getRecommended();
      setRecommendedProducts(products);
    } catch (error) {
      console.error('Failed to fetch recommended products:', error);
      setRecommendedProducts([]);
    } finally {
      setRecommendedLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  return {
    allAppProducts,
    allAppProductsMeta,
    fetchAllProducts,
    recommendedProducts,
    recommendedLoading,
    fetchRecommendedProducts,
    setAllAppProducts // Expose for admin/vendor product updates
  };
};

export default useProducts;