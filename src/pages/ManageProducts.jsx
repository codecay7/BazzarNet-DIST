import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';

const ManageProducts = () => {
  const { vendorProducts, addVendorProduct, editVendorProduct, deleteVendorProduct } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      const productIndex = vendorProducts.findIndex(p => p.id === editingProduct.id);
      if (productIndex !== -1) {
        editVendorProduct(productIndex, productData);
      }
    } else {
      addVendorProduct(productData);
    }
    handleCloseModal();
  };

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <>
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold md:text-4xl">Your Products</h2>
            <button onClick={() => handleOpenModal()} className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button>
          </div>

          {vendorProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vendorProducts.map((product, index) => {
                const discount = calculateDiscount(product.price, product.originalPrice);
                return (
                  <div key={product.id || index} className="bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
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
                        <button onClick={() => handleOpenModal(product)} className="flex-1 bg-white/10 text-[var(--text)] py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button onClick={() => deleteVendorProduct(index)} className="bg-red-500/20 text-red-400 py-2 px-4 rounded-lg font-medium hover:bg-red-500/40 transition-colors flex items-center justify-center gap-2">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faBoxOpen} className="text-6xl text-[var(--accent)] mb-4" />
              <h3 className="text-2xl font-bold mb-2">No products yet</h3>
              <p className="text-lg opacity-80 mb-6">Click "Add Product" to get started.</p>
              <button onClick={() => handleOpenModal()} className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
                <FontAwesomeIcon icon={faPlus} /> Add Your First Product
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <ProductForm onSubmit={handleFormSubmit} initialData={editingProduct} />
      </Modal>
    </>
  );
};

export default ManageProducts;