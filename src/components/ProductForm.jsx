import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

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
  const [errors, setErrors] = useState({});

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
    setErrors({}); // Clear errors on initialData change
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    const priceValue = parseFloat(product.price);
    const originalPriceValue = product.originalPrice ? parseFloat(product.originalPrice) : null;
    const stockValue = parseInt(product.stock);

    if (!product.name.trim()) {
      newErrors.name = 'Product Name is required.';
    }
    if (!product.category) {
      newErrors.category = 'Category is required.';
    }
    if (isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }
    if (originalPriceValue !== null && (isNaN(originalPriceValue) || originalPriceValue <= 0)) {
      newErrors.originalPrice = 'Original Price must be a positive number.';
    }
    if (originalPriceValue !== null && originalPriceValue <= priceValue) {
      newErrors.originalPrice = 'Original price must be greater than the current price.';
    }
    if (isNaN(stockValue) || stockValue < 0) {
      newErrors.stock = 'Stock must be a non-negative number.';
    }
    if (!product.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    // Image URL validation (optional, can be more robust with regex)
    if (product.image && !/^https?:\/\/\S+\.(png|jpe?g|gif|svg)$/i.test(product.image)) {
      newErrors.image = 'Please enter a valid image URL (png, jpg, gif, svg).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submittedProduct = {
        ...product,
        id: initialData?.id || Date.now(),
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
        stock: parseInt(product.stock),
        image: product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', // Default image if none provided
      };
      onSubmit(submittedProduct);
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className={inputClasses} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className={`${inputClasses} appearance-none pr-8`}>
            <option value="" disabled>Select a category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-[var(--text)]"><ChevronDown size={20} /></div>
          {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input type="url" name="image" value={product.image} onChange={handleChange} placeholder="https://example.com/image.png" className={inputClasses} />
        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className={inputClasses} />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Price (Optional)</label>
          <input type="number" name="originalPrice" value={product.originalPrice} onChange={handleChange} className={inputClasses} />
          {errors.originalPrice && <p className="text-red-400 text-xs mt-1">{errors.originalPrice}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} className={inputClasses} />
          {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows="3" value={product.description} onChange={handleChange} className={inputClasses}></textarea>
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
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