import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { stores } from '../data/mockData';

const Products = () => {
  const { addToCart, addToWishlist } = useContext(AppContext);
  const { storeName } = useParams();
  const navigate = useNavigate();
  
  const store = stores.find(s => s.name === decodeURIComponent(storeName));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    if (!store) {
        navigate('/stores');
        return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      let filteredProducts = store.products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filteredProducts.sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return a.name.localeCompare(b.name); // Default sort by name
      });

      setProducts(filteredProducts);
      setLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [searchTerm, sortBy, store, navigate]);

  if (!store) {
    return null; // or a loading/redirecting indicator
  }

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Products from {store.name}</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-1/4 p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[var(--accent)] animate-spin" />
            <p className="mt-4">Loading Products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <Link to={`/products/${product.id}`} className="flex-grow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-base">${product.price.toFixed(2)}</p>
                </Link>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => addToCart(product)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Cart
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-300 transition-all duration-300"
                    onClick={() => addToWishlist(product)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;