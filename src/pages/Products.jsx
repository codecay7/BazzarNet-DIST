import React, { useState, useMemo, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { stores, allProducts } from '../data/mockData';
import { ChevronDown } from 'lucide-react';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination'; // Import Pagination

const Products = () => {
  const { addToCart, addToWishlist, simulateLoading } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of products per page

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateLoading(800);
      setLoading(false);
    };
    loadData();
  }, [searchTerm, selectedStore, sortBy, simulateLoading]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts;

    if (selectedStore !== 'all') {
      const storeId = parseInt(selectedStore);
      const store = stores.find(s => s.id === storeId);
      if (store) {
        const productIds = new Set(store.products.map(p => p.id));
        products = products.filter(p => productIds.has(p.id));
      }
    }

    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name-asc':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return products;
  }, [searchTerm, selectedStore, sortBy]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the product list when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStore, sortBy]);

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
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
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
        ) : currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-black/10 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col shadow-lg" role="listitem">
                <Link to={`/products/${product.id}`} className="flex-grow" aria-label={`View details for ${product.name}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-[var(--accent)]">₹{product.price.toFixed(2)}</p>
                </Link>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
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
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No products found matching your criteria.</p>
        )}

        {!loading && filteredAndSortedProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Products;