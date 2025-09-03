import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const VendorDashboard = () => {
  const { vendorProducts, addVendorProduct, editVendorProduct, deleteVendorProduct } = useContext(AppContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', price: '', description: '' });

  const handleAddProduct = () => {
    if (!name || isNaN(parseFloat(price))) {
      toast.error('Please enter valid product name and price.');
      return;
    }
    addVendorProduct({ name, price: parseFloat(price), description });
    setName('');
    setPrice('');
    setDescription('');
  };

  const handleEditClick = (product, index) => {
    setEditingIndex(index);
    setEditedProduct(product);
  };

  const handleSaveClick = (index) => {
    if (!editedProduct.name || isNaN(parseFloat(editedProduct.price))) {
      toast.error('Please enter a valid name and price.');
      return;
    }
    editVendorProduct(index, { ...editedProduct, price: parseFloat(editedProduct.price) });
    setEditingIndex(null);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Manage Your Store</h2>
        <div className="flex flex-col gap-4 max-w-[500px] mx-auto">
          <h3 className="text-2xl font-semibold mb-3">Add New Product</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Name"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Price"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Description"
          />
          <button
            className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={handleAddProduct}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add Product
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Your Products</h3>
          {vendorProducts.length === 0 ? (
            <p className="text-base md:text-lg">No products added yet.</p>
          ) : (
            vendorProducts.map((product, index) => (
              <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 flex flex-col gap-2">
                {editingIndex === index ? (
                  <>
                    <input type="text" value={editedProduct.name} onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-black/30" />
                    <input type="number" value={editedProduct.price} onChange={(e) => setEditedProduct({...editedProduct, price: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-black/30" />
                    <input type="text" value={editedProduct.description} onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-black/30" />
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveClick(index)} className="bg-green-500 text-white py-2 px-4 rounded-lg">Save</button>
                      <button onClick={() => setEditingIndex(null)} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-semibold">{product.name}</h4>
                    <p className="text-base">$ {product.price.toFixed(2)} | Description: {product.description}</p>
                    <div className="flex gap-2">
                      <button
                        className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                        onClick={() => handleEditClick(product, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-red-600 transition-all duration-300"
                        onClick={() => deleteVendorProduct(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorDashboard;