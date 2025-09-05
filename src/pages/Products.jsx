import React, { useState, useMemo, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import placeholderImage from '../assets/placeholder.png'; // Import placeholder image
import { getFullImageUrl } from '../utils/imageUtils'; // Import utility

const Products = () => {
  const { addToCart, addToWishlist, simulateLoading, allAppProducts, allAppProductsMeta, fetchAllProducts, appStores } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of products per page

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Removed await simulateLoading(800); // Removed this line
      
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category: 'all', // Add category filter if needed
        store: selectedStore === 'all' ? undefined : selectedStore,
        // sortBy is handled client-side after fetching, or could be passed to backend
      };
      await fetchAllProducts(params);
      setLoading(false);
    };
    loadData();
  }, [searchTerm, selectedStore, currentPage, fetchAllProducts]); // Removed simulateLoading from dependencies

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return ((originalPrice - price) / originalPrice) * 100;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" aria-hidden="true" />);
    }
    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" aria-hidden="true" />);
    }
    return stars;
  };

  const sortedProducts = useMemo(() => {
    let products = [...allAppProducts]; // Use a copy to sort

    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'discount-desc':
          const discountA = calculateDiscount(a.price, a.originalPrice);
          const discountB = calculateDiscount(b.price, b.originalPrice);
          return discountB - discountA; // Sort by discount percentage, high to low
        default:
          return 0;
      }
    });
    return products;
  }, [allAppProducts, sortBy]); // Sort only when allAppProducts or sortBy changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStore]);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">All Products</h2>
        
        {/* Filtering and Sorting Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <label htmlFor="productSearch" className="sr-only">Search products</label>
          <input
            type="text"
            id="productSearch"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
            aria-label="Search products by name"
          />
          <div className="relative">
            <label htmlFor="storeFilter" className="sr-only">Filter by store</label>
            <select
              id="storeFilter"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full appearance-none p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] pr-8"
              aria-label="Filter products by store"
            >
              <option value="all">All Stores</option>
              {appStores.map(store => (
                <option key={store._id} value={store._id}>{store.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
          </div>
          <div className="relative">
            <label htmlFor="productSort" className="sr-only">Sort products by</label>
            <select
              id="productSort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] pr-8"
              aria-label="Sort products by criteria"
            >
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
              <option value="price-asc">Sort by Price (Low to High)</option>
              <option value="price-desc">Sort by Price (High to Low)</option>
              <option value="discount-desc">Sort by Discount (High to Low)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(itemsPerPage)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {sortedProducts.map((product) => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              const isOutOfStock = product.stock === 0;
              return (
                <div key={product._id} className={`bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col ${isOutOfStock ? 'grayscale' : ''}`} role="listitem" aria-label={`Product: ${product.name}`}>
                  <Link to={`/products/${product._id}`} className="flex-grow" aria-label={`View details for ${product.name}`}>
                    <div className="relative">
                      <img
                        src={getFullImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback image
                      />
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" aria-label={`${Math.round(discount)} percent off`}>{Math.round(discount)}% OFF</span>
                      )}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">OUT OF STOCK</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex-col">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-lg font-bold text-[var(--accent)]">₹{product.price.toFixed(2)} / {product.unit}</p> {/* Display unit */}
                        {product.originalPrice && discount > 0 && (
                          <p className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="opacity-80">({product.reviews})</span>
                      </div>
                      {/* Stock information */}
                      {product.stock > 0 ? (
                        <p className="text-sm opacity-80 text-green-400">In Stock: {product.stock}</p>
                      ) : (
                        <p className="text-sm opacity-80 text-red-400">Out of Stock</p>
                      )}
                    </div>
                  </Link>
                  <div className="flex gap-2 mt-4 p-4 pt-0">
                    <button
                      className="flex-1 bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      disabled={product.stock === 0} // Disable button if out of stock
                    >
                      <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Cart
                    </button>
                    <button
                      className="bg-white/10 text-[var(--text)] border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300"
                      onClick={() => addToWishlist(product)}
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No products found matching your criteria.</p>
        )}

        {!loading && sortedProducts.length > 0 && (
          <Pagination
            currentPage={allAppProductsMeta.page}
            totalPages={allAppProductsMeta.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Products;