import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = null }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', // Default image
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        stock: initialData.stock || '',
        category: initialData.category || '',
        description: initialData.description || '',
        image: initialData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedProduct = {
      ...product,
      id: initialData?.id || Date.now(), // Keep existing ID or generate a new one
      price: parseFloat(product.price),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
      stock: parseInt(product.stock),
    };
    onSubmit(submittedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Price (Optional)</label>
          <input type="number" name="originalPrice" value={product.originalPrice} onChange={handleChange} className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows="3" value={product.description} onChange={handleChange} className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"></textarea>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-colors">
          {initialData ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;