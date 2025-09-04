import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';
import useFormValidation from '../hooks/useFormValidation'; // Import the custom hook

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

  // Define the validation logic for the product form
  const productValidationLogic = useCallback((data) => {
    let newErrors = {};
    const priceValue = parseFloat(data.price);
    const originalPriceValue = data.originalPrice ? parseFloat(data.originalPrice) : null;
    const stockValue = parseInt(data.stock);

    if (!data.name.trim()) {
      newErrors.name = 'Product Name is required.';
    }
    if (!data.category) {
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
    if (!data.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    // Image URL validation (optional, can be more robust with regex)
    if (data.image && !/^https?:\/\/\S+\.(png|jpe?g|gif|svg)$/i.test(data.image)) {
      newErrors.image = 'Please enter a valid image URL (png, jpg, gif, svg).';
    }
    return newErrors;
  }, []);

  // Use the custom validation hook
  const { errors, validate, resetErrors } = useFormValidation(product, productValidationLogic);

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
    resetErrors(); // Clear errors on initialData change
  }, [initialData, resetErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate(product)) { // Use the validate function from the hook
      const submittedProduct = {
        ...product,
        id: initialData?.id || Date.now(), // For mock data, generate ID
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
    <form onSubmit={handleSubmit} className="space-y-4" aria-label={initialData ? 'Edit Product Form' : 'Add New Product Form'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium mb-1">Product Name</label>
          <input 
            type="text" 
            id="productName"
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "productName-error" : undefined}
          />
          {errors.name && <p id="productName-error" className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="relative">
          <label htmlFor="productCategory" className="block text-sm font-medium mb-1">Category</label>
          <select 
            name="category" 
            id="productCategory"
            value={product.category} 
            onChange={handleChange} 
            className={`${inputClasses} appearance-none pr-8`}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "productCategory-error" : undefined}
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
          {errors.category && <p id="productCategory-error" className="text-red-400 text-xs mt-1">{errors.category}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="productImage" className="block text-sm font-medium mb-1">Image URL</label>
        <input 
          type="url" 
          id="productImage"
          name="image" 
          value={product.image} 
          onChange={handleChange} 
          placeholder="https://example.com/image.png" 
          className={inputClasses} 
          aria-invalid={!!errors.image}
          aria-describedby={errors.image ? "productImage-error" : undefined}
        />
        {errors.image && <p id="productImage-error" className="text-red-400 text-xs mt-1">{errors.image}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium mb-1">Price (₹)</label>
          <input 
            type="number" 
            id="productPrice"
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? "productPrice-error" : undefined}
          />
          {errors.price && <p id="productPrice-error" className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium mb-1">Original Price (Optional)</label>
          <input 
            type="number" 
            id="originalPrice"
            name="originalPrice" 
            value={product.originalPrice} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.originalPrice}
            aria-describedby={errors.originalPrice ? "originalPrice-error" : undefined}
          />
          {errors.originalPrice && <p id="originalPrice-error" className="text-red-400 text-xs mt-1">{errors.originalPrice}</p>}
        </div>
        <div>
          <label htmlFor="productStock" className="block text-sm font-medium mb-1">Stock</label>
          <input 
            type="number" 
            id="productStock"
            name="stock" 
            value={product.stock} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.stock}
            aria-describedby={errors.stock ? "productStock-error" : undefined}
          />
          {errors.stock && <p id="productStock-error" className="text-red-400 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium mb-1">Description</label>
        <textarea 
          name="description" 
          id="productDescription"
          rows="3" 
          value={product.description} 
          onChange={handleChange} 
          className={inputClasses}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "productDescription-error" : undefined}
        ></textarea>
        {errors.description && <p id="productDescription-error" className="text-red-400 text-xs mt-1">{errors.description}</p>}
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