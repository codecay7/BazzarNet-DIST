import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const { vendorProducts, deleteVendorProduct } = useContext(AppContext);

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Your Products</h2>
          <button onClick={() => toast.error('Add product functionality coming soon!')} className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, index) => { // Using allProducts for demo
            const discount = calculateDiscount(product.price, product.originalPrice);
            return (
              <div key={product.id} className="bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-lg font-bold text-[var(--accent)]">₹{product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                  <p className="text-sm opacity-80 mb-1">Stock: {product.stock}</p>
                  <p className="text-sm opacity-80 mb-4">Category: {product.category}</p>
                  <div className="mt-auto flex gap-2">
                    <button className="flex-1 bg-white/10 text-[var(--text)] py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button onClick={() => toast.error(`${product.name} deleted.`)} className="bg-red-500/20 text-red-400 py-2 px-4 rounded-lg font-medium hover:bg-red-500/40 transition-colors flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Using allProducts from mockData for demonstration purposes
import { allProducts } from '../data/mockData';
export default ManageProducts;