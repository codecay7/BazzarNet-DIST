import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ChevronDown, Eye, EyeOff } from 'lucide-react'; // Import Lucide icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const VendorRegistrationForm = () => {
  const { registerVendor } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    pan: '',
    gst: '',
    address: {
      houseNo: '',
      landmark: '',
      city: '',
      state: '',
      pinCode: '',
    },
    description: '',
    category: 'Groceries',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state

  const categories = [
    'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
    'Furniture', 'Decor', 'Clothing', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters long.';
    } else if (formData.fullName.trim().length > 50) {
      newErrors.fullName = 'Full Name cannot exceed 50 characters.';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required.';
    } else if (formData.businessName.trim().length < 3) {
      newErrors.businessName = 'Business Name must be at least 3 characters long.';
    } else if (formData.businessName.trim().length > 100) {
      newErrors.businessName = 'Business Name cannot exceed 100 characters.';
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
    
    // Address validation
    let addressErrors = {};
    if (!formData.address.houseNo.trim()) {
      addressErrors.houseNo = 'House No. is required.';
    }
    if (!formData.address.city.trim()) {
      addressErrors.city = 'City is required.';
    }
    if (!formData.address.state.trim()) {
      addressErrors.state = 'State is required.';
    }
    if (!formData.address.pinCode.trim()) {
      addressErrors.pinCode = 'Pin Code is required.';
    } else if (!/^\d{6}$/.test(formData.address.pinCode)) {
      addressErrors.pinCode = 'Pin Code must be 6 digits.';
    }
    if (Object.keys(addressErrors).length > 0) {
      newErrors.address = addressErrors;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Business Description is required.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Business Description must be at least 10 characters long.';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Business Description cannot exceed 500 characters.';
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

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const vendorData = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          storeName: formData.businessName,
          businessDescription: formData.description,
          category: formData.category,
          phone: formData.phone,
          pan: formData.pan,
          gst: formData.gst || '',
          address: formData.address,
        };
        if (await registerVendor(vendorData)) {
          navigate('/dashboard');
        }
      } finally {
        setIsLoading(false);
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
      aria-label="Vendor Registration Form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vendorFullName" className="text-sm font-medium">Full Name</label>
          <input 
            type="text" 
            id="vendorFullName"
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "vendorFullName-error" : undefined}
            disabled={isLoading}
          />
          {errors.fullName && <p id="vendorFullName-error" className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="businessName" className="text-sm font-medium">Business Name</label>
          <input 
            type="text" 
            id="businessName"
            name="businessName" 
            value={formData.businessName} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.businessName}
            aria-describedby={errors.businessName ? "businessName-error" : undefined}
            disabled={isLoading}
          />
          {errors.businessName && <p id="businessName-error" className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
        </div>
        <div>
          <label htmlFor="vendorEmail" className="text-sm font-medium">Email</label>
          <input 
            type="email" 
            id="vendorEmail"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "vendorEmail-error" : undefined}
            disabled={isLoading}
          />
          {errors.email && <p id="vendorEmail-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="vendorPhone" className="text-sm font-medium">Phone</label>
          <input 
            type="tel" 
            id="vendorPhone"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "vendorPhone-error" : undefined}
            disabled={isLoading}
          />
          {errors.phone && <p id="vendorPhone-error" className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="vendorPan" className="text-sm font-medium">PAN</label>
          <input 
            type="text" 
            id="vendorPan"
            name="pan" 
            value={formData.pan} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.pan}
            aria-describedby={errors.pan ? "vendorPan-error" : undefined}
            disabled={isLoading}
          />
          {errors.pan && <p id="vendorPan-error" className="text-red-400 text-xs mt-1">{errors.pan}</p>}
        </div>
        <div>
          <label htmlFor="vendorGst" className="text-sm font-medium">GST (optional)</label>
          <input 
            type="text" 
            id="vendorGst"
            name="gst" 
            value={formData.gst} 
            onChange={handleChange} 
            className={inputClasses} 
            disabled={isLoading}
          />
        </div>
      </div>
      <div>
        <label htmlFor="vendorAddressHouseNo" className="text-sm font-medium">House No., Street</label>
        <input 
          type="text" 
          id="vendorAddressHouseNo"
          name="address.houseNo" 
          value={formData.address.houseNo} 
          onChange={handleChange} 
          className={inputClasses} 
          aria-invalid={!!errors.address?.houseNo}
          aria-describedby={errors.address?.houseNo ? "vendorAddressHouseNo-error" : undefined}
          disabled={isLoading}
        />
        {errors.address?.houseNo && <p id="vendorAddressHouseNo-error" className="text-red-400 text-xs mt-1">{errors.address.houseNo}</p>}
      </div>
      <div>
        <label htmlFor="vendorAddressLandmark" className="text-sm font-medium">Landmark (optional)</label>
        <input 
          type="text" 
          id="vendorAddressLandmark"
          name="address.landmark" 
          value={formData.address.landmark} 
          onChange={handleChange} 
          className={inputClasses} 
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vendorAddressCity" className="text-sm font-medium">City</label>
          <input 
            type="text" 
            id="vendorAddressCity"
            name="address.city" 
            value={formData.address.city} 
            onChange={handleChange} 
            className={inputClasses} 
            aria-invalid={!!errors.address?.city}
            aria-describedby={errors.address?.city ? "vendorAddressCity-error" : undefined}
            disabled={isLoading}
          />
          {errors.address?.city && <p id="vendorAddressCity-error" className="text-red-400 text-xs mt-1">{errors.address.city}</p>}
        </div>
        <div className="relative">
          <label htmlFor="vendorAddressState" className="text-sm font-medium">State</label>
          <select 
            name="address.state" 
            id="vendorAddressState"
            value={formData.address.state} 
            onChange={handleChange} 
            className={`${inputClasses} appearance-none pr-8`}
            aria-invalid={!!errors.address?.state}
            aria-describedby={errors.address?.state ? "vendorAddressState-error" : undefined}
            disabled={isLoading}
          >
            <option value="" disabled>Select State</option>
            {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
          {errors.address?.state && <p id="vendorAddressState-error" className="text-red-400 text-xs mt-1">{errors.address.state}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="vendorAddressPinCode" className="text-sm font-medium">Pin Code</label>
        <input 
          type="text" 
          id="vendorAddressPinCode"
          name="address.pinCode" 
          value={formData.address.pinCode} 
          onChange={handleChange} 
          className={inputClasses} 
          aria-invalid={!!errors.address?.pinCode}
          aria-describedby={errors.address?.pinCode ? "vendorAddressPinCode-error" : undefined}
          disabled={isLoading}
        />
        {errors.address?.pinCode && <p id="vendorAddressPinCode-error" className="text-red-400 text-xs mt-1">{errors.address.pinCode}</p>}
      </div>
      <div>
        <label htmlFor="vendorDescription" className="text-sm font-medium">Business Description</label>
        <textarea 
          name="description" 
          id="vendorDescription"
          rows="2" 
          value={formData.description} 
          onChange={handleChange} 
          className={inputClasses}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "vendorDescription-error" : undefined}
          disabled={isLoading}
        ></textarea>
        {errors.description && <p id="vendorDescription-error" className="text-red-400 text-xs mt-1">{errors.description}</p>}
      </div>
      <div className="relative">
        <label htmlFor="vendorCategory" className="text-sm font-medium">Category</label>
        <select 
          name="category" 
          id="vendorCategory"
          value={formData.category} 
          onChange={handleChange} 
          className={`${inputClasses} appearance-none pr-8`}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? "vendorCategory-error" : undefined}
          disabled={isLoading}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
        {errors.category && <p id="vendorCategory-error" className="text-red-400 text-xs mt-1">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="vendorPassword" className="text-sm font-medium">Password</label>
        <div className="relative w-full">
          <input 
            type={showPassword ? 'text' : 'password'}
            id="vendorPassword"
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className={`${inputClasses} pr-10`} 
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "vendorPassword-error" : undefined}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-70 hover:opacity-100"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p id="vendorPassword-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </div>
      <button 
        type="submit" 
        className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
        disabled={isLoading}
      >
        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : 'Register Business'}
      </button>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-[var(--accent)] font-semibold">Login here.</Link>
      </p>
    </motion.form>
  );
};

export default VendorRegistrationForm;