import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

const VendorRegistrationForm = () => {
  const { loginAsVendor } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    pan: '',
    gst: '',
    address: '',
    description: '',
    category: 'Groceries',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
    'Furniture', 'Decor', 'Clothing', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid.';
    }
    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Business Description is required.';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would be a registration call.
      // For now, we'll just log the vendor in.
      toast.success('Registration successful! Logging you in.');
      if (loginAsVendor(formData.fullName, formData.businessName)) {
        navigate('/dashboard');
      }
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const inputClasses = "w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleRegistration}
      className="flex flex-col text-left gap-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClasses} />
          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Business Name</label>
          <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className={inputClasses} />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">PAN</label>
          <input type="text" name="pan" value={formData.pan} onChange={handleChange} className={inputClasses} />
          {errors.pan && <p className="text-red-400 text-xs mt-1">{errors.pan}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">GST (optional)</label>
          <input type="text" name="gst" value={formData.gst} onChange={handleChange} className={inputClasses} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} />
        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
      </div>
      <div>
        <label className="text-sm font-medium">Business Description</label>
        <textarea name="description" rows="2" value={formData.description} onChange={handleChange} className={inputClasses}></textarea>
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
      </div>
      <div className="relative">
        <label className="text-sm font-medium">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className={`${inputClasses} appearance-none pr-8`}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-2 text-[var(--text)]"><ChevronDown size={20} /></div>
        {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClasses} />
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </div>
      <button type="submit" className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4">
        Register Business
      </button>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-[var(--accent)] font-semibold">Login here.</Link>
      </p>
    </motion.form>
  );
};

export default VendorRegistrationForm;