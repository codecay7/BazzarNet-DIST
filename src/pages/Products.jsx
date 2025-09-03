import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const Products = () => {
  const { addToCart, addToWishlist } = useContext(AppContext);

  const products = [
    { name: 'Fresh Apples', price: 2.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
    { name: 'Sourdough Bread', price: 4.50, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=200&h=200&fit=crop' },
    { name: 'Organic Milk', price: 3.99, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf18f86f6?w=200&h=200&fit=crop' },
  ];

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-base">${product.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                  onClick={() => addToCart(product)}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Cart
                </button>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                  onClick={() => addToWishlist(product)}
                >
                  <FontAwesomeIcon icon={faHeart} /> Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;