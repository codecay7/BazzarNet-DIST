import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductForm = ({ onSubmit, initialData = null }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    description: '',
    image: '',
  });

  const categories = [
    'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
    'Furniture', 'Decor', 'Clothing', 'Other'
  ];

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        stock: initialData.stock || '',
        category: initialData.category || '',
        description: initialData.description || '',
        image: initialData.image || '',
      });
    } else {
      // Reset form for new product
      setProduct({
        name: '', price: '', originalPrice: '', stock: '',
        category: '', description: '', image: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const priceValue = parseFloat(product.price);
    const originalPriceValue = product.originalPrice ? parseFloat(product.originalPrice) : null;

    if (originalPriceValue !== null && originalPriceValue <= priceValue) {
      toast.error('Original price must be greater than the current price.');
      return;
    }

    const submittedProduct = {
      ...product,
      id: initialData?.id || Date.now(),
      price: priceValue,
      originalPrice: originalPriceValue,
      stock: parseInt(product.stock),
      image: product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', // Default image if none provided
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
          <select name="category" value={product.category} onChange={handleChange} required className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <option value="" disabled>Select a category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input type="url" name="image" value={product.image} onChange={handleChange} placeholder="https://example.com/image.png" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
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