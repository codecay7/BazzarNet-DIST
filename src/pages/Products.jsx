import React, { useState, useMemo, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { stores, allProducts } from '../data/mockData';

const Products = () => {
  const { addToCart, addToWishlist } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts;

    // Filter by store
    if (selectedStore !== 'all') {
      const storeId = parseInt(selectedStore);
      const store = stores.find(s => s.id === storeId);
      if (store) {
        const productIds = new Set(store.products.map(p => p.id));
        products = products.filter(p => productIds.has(p.id));
      }
    }

    // Filter by search term
    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
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

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">All Products</h2>
        
        {/* Filtering and Sorting Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          />
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          >
            <option value="all">All Stores</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="bg-black/10 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col shadow-lg">
                <Link to={`/products/${product.id}`} className="flex-grow">
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
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Cart
                  </button>
                  <button
                    className="bg-white/10 text-[var(--text)] border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300"
                    onClick={() => addToWishlist(product)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No products found matching your criteria.</p>
        )}
      </div>
    </section>
  );
};

export default Products;