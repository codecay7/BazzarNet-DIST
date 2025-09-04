import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Building2, Mail, Phone, CreditCard, Landmark, ChevronDown, FileText, UploadCloud } from 'lucide-react';
import * as api from '../services/api';
import useFormValidation from '../hooks/useFormValidation'; // Import the custom hook

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Profile = () => {
  const { user, isVendor, loginAsUser, loginAsVendor } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    store: user?.store || '', // Only for vendors
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || { 
      houseNo: '',
      landmark: '',
      city: '',
      state: '',
      pinCode: ''
    },
    pan: user?.pan || '', // Only for vendors
    gst: user?.gst || '', // Only for vendors
    category: user?.category || '', // Only for vendors
    description: user?.description || '', // Only for vendors
    bankAccount: user?.bankAccount || '', // Only for vendors
    bankName: user?.bankName || '', // Only for vendors
    ifsc: user?.ifsc || '', // Only for vendors
    upiId: user?.upiId || '', // Added for customer
    cardDetails: user?.cardDetails || { // Mock card details for customer
      cardNumber: '',
      expiry: '',
      cardHolder: ''
    },
    profileImage: user?.profileImage || null,
  });

  const categories = [
    'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
    'Furniture', 'Decor', 'Clothing', 'Other'
  ];

  // Define validation logic based on user role
  const profileValidationLogic = useCallback((data) => {
    let newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    if (data.phone && !/^\+?\d{10,15}$/.test(data.phone)) {
      newErrors.phone = 'Phone number is invalid.';
    }

    // Address validation
    if (data.address) {
      if (!data.address.houseNo.trim()) {
        newErrors.address = { ...newErrors.address, houseNo: 'House No. is required.' };
      }
      if (!data.address.city.trim()) {
        newErrors.address = { ...newErrors.address, city: 'City is required.' };
      }
      if (!data.address.state.trim()) {
        newErrors.address = { ...newErrors.address, state: 'State is required.' };
      }
      if (!data.address.pinCode.trim()) {
        newErrors.address = { ...newErrors.address, pinCode: 'Pin Code is required.' };
      } else if (!/^\d{6}$/.test(data.address.pinCode)) {
        newErrors.address = { ...newErrors.address, pinCode: 'Pin Code must be 6 digits.' };
      }
    }

    if (isVendor) {
      if (!data.description.trim()) {
        newErrors.description = 'Business Description is required.';
      } else if (data.description.trim().length < 10) {
        newErrors.description = 'Description must be at least 10 characters long.';
      }
      if (!data.category) {
        newErrors.category = 'Category is required.';
      }
      if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan)) {
        newErrors.pan = 'Invalid PAN format.';
      }
      if (data.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gst)) {
        newErrors.gst = 'Invalid GST format.';
      }
      // Add more vendor-specific validations if needed (bank details, etc.)
    } else { // Customer specific validations
      if (data.cardDetails) {
        if (data.cardDetails.cardNumber && !/^\d{16}$/.test(data.cardDetails.cardNumber.replace(/\s/g, ''))) {
          newErrors.cardDetails = { ...newErrors.cardDetails, cardNumber: 'Card Number must be 16 digits.' };
        }
        if (data.cardDetails.expiry && !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.cardDetails.expiry)) {
          newErrors.cardDetails = { ...newErrors.cardDetails, expiry: 'Invalid Expiry Date (MM/YY).' };
        }
      }
      if (data.upiId && !/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/.test(data.upiId)) {
        newErrors.upiId = 'Invalid UPI ID format.';
      }
    }

    return newErrors;
  }, [isVendor]);

  const { errors, validate, resetErrors } = useFormValidation(profileData, profileValidationLogic);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const fetchedUser = await api.userProfile.getMe();
        setProfileData({
          name: fetchedUser.name || '',
          store: fetchedUser.store || '',
          email: fetchedUser.email || '',
          phone: fetchedUser.phone || '',
          address: fetchedUser.address || { houseNo: '', landmark: '', city: '', state: '', pinCode: '' },
          pan: fetchedUser.pan || '',
          gst: fetchedUser.gst || '',
          category: fetchedUser.category || '',
          description: fetchedUser.description || '',
          bankAccount: fetchedUser.bankAccount || '',
          bankName: fetchedUser.bankName || '',
          ifsc: fetchedUser.ifsc || '',
          upiId: fetchedUser.upiId || '',
          cardDetails: fetchedUser.cardDetails || { cardNumber: '', expiry: '', cardHolder: '' },
          profileImage: fetchedUser.profileImage || null,
        });
      } catch (error) {
        toast.error(`Failed to load profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name.startsWith('cardDetails.')) {
      const field = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        cardDetails: {
          ...prev.cardDetails,
          [field]: value
        }
      }));
    } else if (type === 'checkbox') {
      setProfileData(prev => ({ ...prev, [name]: checked }));
    }
    else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const uploadResponse = await api.upload.uploadImage(formData);
        const imageUrl = uploadResponse.filePath;
        setProfileData(prev => ({
          ...prev,
          profileImage: imageUrl
        }));
        toast.success('Image uploaded successfully! Click "Save Changes" to update your profile.');
      } catch (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}`);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!validate(profileData)) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    try {
      const updatedUser = await api.userProfile.updateProfile(profileData);
      // Re-login to update the context with the latest user data
      if (isVendor) {
        // For vendor, we need to ensure store details are also refreshed in context
        // The loginAsVendor function should handle fetching the full user object including store details
        await loginAsVendor(updatedUser.email, user.password); 
      } else {
        await loginAsUser(updatedUser.email, user.password);
      }
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      resetErrors(); // Clear errors after successful save
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]";

  const displayAddress = (address) => {
    if (!address) return 'N/A';
    const parts = [address.houseNo];
    if (address.landmark) parts.push(address.landmark);
    parts.push(address.city);
    parts.push(address.state);
    parts.push(address.pinCode);
    return parts.filter(Boolean).join(', ');
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4 animate-pulse">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div>
                <div className="h-8 bg-gray-700 rounded w-48 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-700 rounded-lg w-32 mt-4 md:mt-0"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black/10 p-6 rounded-xl h-48"></div>
              <div className="bg-black/10 p-6 rounded-xl h-32"></div>
              <div className="bg-black/10 p-6 rounded-xl h-48"></div>
            </div>
            <div className="bg-black/10 p-6 rounded-xl h-96"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isVendor) {
    return (
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                {profileData.profileImage ? (
                  <img src={profileData.profileImage} alt="Store Logo" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
                ) : (
                  <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg" role="img" aria-label="Default store logo">
                    <FontAwesomeIcon icon={faStore} className="text-white text-4xl" aria-hidden="true" />
                  </div>
                )}
                {isEditing && (
                  <>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" id="profile-image-upload" aria-label="Upload new store logo" />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1.5 text-gray-800 hover:bg-white shadow-md" aria-label="Change store logo">
                      <FontAwesomeIcon icon={faPen} size="sm" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{profileData.store}</h2>
                <p className="text-lg text-[var(--text)] opacity-80">{profileData.name}</p>
              </div>
            </div>
            <button
              className="bg-[var(--accent)] w-full md:w-fit mt-4 md:mt-0 text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
              onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
              aria-label={isEditing ? 'Save changes to profile' : 'Edit profile'}
            >
              <FontAwesomeIcon icon={isEditing ? faSave : faPen} aria-hidden="true" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Building2 size={20} aria-hidden="true" /> Business Details</h3>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Business Description</label>
                {isEditing ? (
                  <textarea 
                    name="description" 
                    id="description"
                    value={profileData.description} 
                    onChange={handleInputChange} 
                    className={`${inputClasses} mb-1`} 
                    rows="3" 
                    aria-label="Business Description"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  />
                ) : (
                  <p className="opacity-80">{profileData.description}</p>
                )}
                {errors.description && <p id="description-error" className="text-red-400 text-xs mt-1">{errors.description}</p>}

                <div className="mt-3 flex items-center gap-2">
                  <strong className="opacity-80 flex-shrink-0">Category:</strong>
                  {isEditing ? (
                    <div className="relative flex-grow">
                      <select 
                        name="category" 
                        id="category"
                        value={profileData.category} 
                        onChange={handleInputChange} 
                        className={`${inputClasses} appearance-none pr-8`} 
                        aria-label="Business Category"
                        aria-invalid={!!errors.category}
                        aria-describedby={errors.category ? "category-error" : undefined}
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
                    </div>
                  ) : (
                    <span>{profileData.category}</span>
                  )}
                </div>
                {errors.category && <p id="category-error" className="text-red-400 text-xs mt-1">{errors.category}</p>}
              </div>
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FileText size={20} aria-hidden="true" /> Legal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pan" className="block text-sm opacity-70 mb-1">PAN</label>
                    {isEditing ? 
                      <input 
                        type="text" 
                        name="pan" 
                        id="pan"
                        value={profileData.pan} 
                        onChange={handleInputChange} 
                        className={inputClasses} 
                        aria-label="PAN Number"
                        aria-invalid={!!errors.pan}
                        aria-describedby={errors.pan ? "pan-error" : undefined}
                      /> : 
                      <p className="font-medium">{profileData.pan}</p>
                    }
                    {errors.pan && <p id="pan-error" className="text-red-400 text-xs mt-1">{errors.pan}</p>}
                  </div>
                  <div>
                    <label htmlFor="gst" className="block text-sm opacity-70 mb-1">GSTIN</label>
                    {isEditing ? 
                      <input 
                        type="text" 
                        name="gst" 
                        id="gst"
                        value={profileData.gst} 
                        onChange={handleInputChange} 
                        className={inputClasses} 
                        aria-label="GSTIN Number"
                        aria-invalid={!!errors.gst}
                        aria-describedby={errors.gst ? "gst-error" : undefined}
                      /> : 
                      <p className="font-medium">{profileData.gst}</p>
                    }
                    {errors.gst && <p id="gst-error" className="text-red-400 text-xs mt-1">{errors.gst}</p>}
                  </div>
                </div>
              </div>
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Landmark size={20} aria-hidden="true" /> Payment Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bankName" className="block text-sm opacity-70 mb-1">Bank Name</label>
                    {isEditing ? <input type="text" name="bankName" id="bankName" value={profileData.bankName} onChange={handleInputChange} className={inputClasses} aria-label="Bank Name" /> : <p className="font-medium">{profileData.bankName}</p>}
                  </div>
                  <div>
                    <label htmlFor="bankAccount" className="block text-sm opacity-70 mb-1">Account Number</label>
                    {isEditing ? <input type="text" name="bankAccount" id="bankAccount" value={profileData.bankAccount} onChange={handleInputChange} className={inputClasses} aria-label="Bank Account Number" /> : <p className="font-medium">{profileData.bankAccount}</p>}
                  </div>
                  <div>
                    <label htmlFor="ifsc" className="block text-sm opacity-70 mb-1">IFSC Code</label>
                    {isEditing ? <input type="text" name="ifsc" id="ifsc" value={profileData.ifsc} onChange={handleInputChange} className={inputClasses} aria-label="IFSC Code" /> : <p className="font-medium">{profileData.ifsc}</p>}
                  </div>
                  <div>
                    <label htmlFor="upiId" className="block text-sm opacity-70 mb-1">UPI ID</label>
                    {isEditing ? 
                      <input 
                        type="text" 
                        name="upiId" 
                        id="upiId"
                        value={profileData.upiId} 
                        onChange={handleInputChange} 
                        className={inputClasses} 
                        aria-label="UPI ID"
                        aria-invalid={!!errors.upiId}
                        aria-describedby={errors.upiId ? "upiId-error" : undefined}
                      /> : 
                      <p className="font-medium">{profileData.upiId}</p>
                    }
                    {errors.upiId && <p id="upiId-error" className="text-red-400 text-xs mt-1">{errors.upiId}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Contact & Address</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm opacity-70">Email</p>
                    <p className="font-medium break-all">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm opacity-70">Phone</p>
                    {isEditing ? 
                      <input 
                        type="tel" 
                        name="phone" 
                        value={profileData.phone} 
                        onChange={handleInputChange} 
                        className={inputClasses} 
                        aria-label="Phone Number"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      /> : 
                      <p className="font-medium">{profileData.phone}</p>
                    }
                    {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm opacity-70">Address</p>
                    {isEditing ? (
                      <div className="space-y-2">
                        <label htmlFor="addressHouseNo" className="sr-only">House No., Street</label>
                        <input type="text" name="address.houseNo" id="addressHouseNo" value={profileData.address.houseNo} onChange={handleInputChange} className={inputClasses} placeholder="House No., Street" aria-label="House Number and Street" aria-invalid={!!errors.address?.houseNo} aria-describedby={errors.address?.houseNo ? "addressHouseNo-error" : undefined} />
                        {errors.address?.houseNo && <p id="addressHouseNo-error" className="text-red-400 text-xs mt-1">{errors.address.houseNo}</p>}
                        
                        <label htmlFor="addressLandmark" className="sr-only">Landmark (Optional)</label>
                        <input type="text" name="address.landmark" id="addressLandmark" value={profileData.address.landmark} onChange={handleInputChange} className={inputClasses} placeholder="Landmark (Optional)" aria-label="Landmark" />
                        
                        <label htmlFor="addressCity" className="sr-only">City</label>
                        <input type="text" name="address.city" id="addressCity" value={profileData.address.city} onChange={handleInputChange} className={inputClasses} placeholder="City" aria-label="City" aria-invalid={!!errors.address?.city} aria-describedby={errors.address?.city ? "addressCity-error" : undefined} />
                        {errors.address?.city && <p id="addressCity-error" className="text-red-400 text-xs mt-1">{errors.address.city}</p>}
                        
                        <div className="relative">
                          <label htmlFor="addressState" className="sr-only">State</label>
                          <select name="address.state" id="addressState" value={profileData.address.state} onChange={handleInputChange} className={`${inputClasses} appearance-none pr-8`} aria-label="State" aria-invalid={!!errors.address?.state} aria-describedby={errors.address?.state ? "addressState-error" : undefined}>
                            <option value="" disabled>Select State</option>
                            {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
                        </div>
                        {errors.address?.state && <p id="addressState-error" className="text-red-400 text-xs mt-1">{errors.address.state}</p>}
                        
                        <label htmlFor="addressPinCode" className="sr-only">Pin Code</label>
                        <input type="text" name="address.pinCode" id="addressPinCode" value={profileData.address.pinCode} onChange={handleInputChange} className={inputClasses} placeholder="Pin Code" maxLength="6" aria-label="Pin Code" aria-invalid={!!errors.address?.pinCode} aria-describedby={errors.address?.pinCode ? "addressPinCode-error" : undefined} />
                        {errors.address?.pinCode && <p id="addressPinCode-error" className="text-red-400 text-xs mt-1">{errors.address.pinCode}</p>}
                      </div>
                    ) : (
                      <p className="font-medium">{displayAddress(profileData.address)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Customer Profile
  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto mb-8">
          <div className="relative w-24 h-24 mb-4">
            {profileData.profileImage ? (
              <img src={profileData.profileImage} alt="User Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
            ) : (
              <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg" role="img" aria-label="Default user profile image">
                <FontAwesomeIcon icon={faUser} className="text-white text-4xl" aria-hidden="true" />
              </div>
            )}
            {isEditing && (
              <>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" id="profile-image-upload" aria-label="Upload new profile image" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1.5 text-gray-800 hover:bg-white shadow-md" aria-label="Change profile image">
                  <FontAwesomeIcon icon={faPen} size="sm" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-1">{profileData.name}</h2>
          <p className="text-lg text-[var(--text)] opacity-80 mb-6">{profileData.email}</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            aria-label={isEditing ? 'Save changes to profile' : 'Edit profile'}
          >
            <FontAwesomeIcon icon={isEditing ? faSave : faPen} aria-hidden="true" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Mail size={20} aria-hidden="true" /> Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-medium break-all">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm opacity-70">Phone</p>
                  {isEditing ? 
                    <input 
                      type="tel" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleInputChange} 
                      className={inputClasses} 
                      placeholder="Phone Number" 
                      aria-label="Phone Number"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    /> : 
                    <p className="font-medium">{profileData.phone}</p>
                  }
                  {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Building2 size={20} aria-hidden="true" /> Shipping Address</h3>
            <div className="flex items-start gap-3">
              <Landmark size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
              <div>
                <p className="text-sm opacity-70">Address</p>
                {isEditing ? (
                  <div className="space-y-2">
                    <label htmlFor="addressHouseNo" className="sr-only">House No., Street</label>
                    <input type="text" name="address.houseNo" id="addressHouseNo" value={profileData.address.houseNo} onChange={handleInputChange} className={inputClasses} placeholder="House No., Street" aria-label="House Number and Street" aria-invalid={!!errors.address?.houseNo} aria-describedby={errors.address?.houseNo ? "addressHouseNo-error" : undefined} />
                    {errors.address?.houseNo && <p id="addressHouseNo-error" className="text-red-400 text-xs mt-1">{errors.address.houseNo}</p>}
                    
                    <label htmlFor="addressLandmark" className="sr-only">Landmark (Optional)</label>
                    <input type="text" name="address.landmark" id="addressLandmark" value={profileData.address.landmark} onChange={handleInputChange} className={inputClasses} placeholder="Landmark (Optional)" aria-label="Landmark" />
                    
                    <label htmlFor="addressCity" className="sr-only">City</label>
                    <input type="text" name="address.city" id="addressCity" value={profileData.address.city} onChange={handleInputChange} className={inputClasses} placeholder="City" aria-label="City" aria-invalid={!!errors.address?.city} aria-describedby={errors.address?.city ? "addressCity-error" : undefined} />
                    {errors.address?.city && <p id="addressCity-error" className="text-red-400 text-xs mt-1">{errors.address.city}</p>}
                    
                    <div className="relative">
                      <label htmlFor="addressState" className="sr-only">State</label>
                      <select name="address.state" id="addressState" value={profileData.address.state} onChange={handleInputChange} className={`${inputClasses} appearance-none pr-8`} aria-label="State" aria-invalid={!!errors.address?.state} aria-describedby={errors.address?.state ? "addressState-error" : undefined}>
                        <option value="" disabled>Select State</option>
                        {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
                    </div>
                    {errors.address?.state && <p id="addressState-error" className="text-red-400 text-xs mt-1">{errors.address.state}</p>}
                    
                    <label htmlFor="addressPinCode" className="sr-only">Pin Code</label>
                    <input type="text" name="address.pinCode" id="addressPinCode" value={profileData.address.pinCode} onChange={handleInputChange} className={inputClasses} placeholder="Pin Code" maxLength="6" aria-label="Pin Code" aria-invalid={!!errors.address?.pinCode} aria-describedby={errors.address?.pinCode ? "addressPinCode-error" : undefined} />
                    {errors.address?.pinCode && <p id="addressPinCode-error" className="text-red-400 text-xs mt-1">{errors.address.pinCode}</p>}
                  </div>
                ) : (
                  <p className="font-medium">{displayAddress(profileData.address)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-black/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><CreditCard size={20} aria-hidden="true" /> Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm opacity-70">Card Details</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <label htmlFor="cardNumber" className="sr-only">Card Number</label>
                      <input type="text" name="cardDetails.cardNumber" id="cardNumber" value={profileData.cardDetails.cardNumber} onChange={handleInputChange} className={inputClasses} placeholder="Card Number" aria-label="Card Number" aria-invalid={!!errors.cardDetails?.cardNumber} aria-describedby={errors.cardDetails?.cardNumber ? "cardNumber-error" : undefined} />
                      {errors.cardDetails?.cardNumber && <p id="cardNumber-error" className="text-red-400 text-xs mt-1">{errors.cardDetails.cardNumber}</p>}
                      
                      <label htmlFor="expiry" className="sr-only">Expiry Date (MM/YY)</label>
                      <input type="text" name="cardDetails.expiry" id="expiry" value={profileData.cardDetails.expiry} onChange={handleInputChange} className={inputClasses} placeholder="MM/YY" aria-label="Card Expiry Date" aria-invalid={!!errors.cardDetails?.expiry} aria-describedby={errors.cardDetails?.expiry ? "expiry-error" : undefined} />
                      {errors.cardDetails?.expiry && <p id="expiry-error" className="text-red-400 text-xs mt-1">{errors.cardDetails.expiry}</p>}
                      
                      <label htmlFor="cardHolder" className="sr-only">Card Holder Name</label>
                      <input type="text" name="cardDetails.cardHolder" id="cardHolder" value={profileData.cardDetails.cardHolder} onChange={handleInputChange} className={inputClasses} placeholder="Card Holder Name" aria-label="Card Holder Name" />
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">{profileData.cardDetails.cardNumber}</p>
                      <p className="text-sm opacity-80">Expires: {profileData.cardDetails.expiry}</p>
                      <p className="text-sm opacity-80">Holder: {profileData.cardDetails.cardHolder}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Landmark size={20} className="mt-1 text-[var(--accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm opacity-70">UPI ID</p>
                  {isEditing ? 
                    <input 
                      type="text" 
                      name="upiId" 
                      value={profileData.upiId} 
                      onChange={handleInputChange} 
                      className={inputClasses} 
                      placeholder="UPI ID" 
                      aria-label="UPI ID"
                      aria-invalid={!!errors.upiId}
                      aria-describedby={errors.upiId ? "upiId-error" : undefined}
                    /> : 
                    <p className="font-medium">{profileData.upiId}</p>
                  }
                  {errors.upiId && <p id="upiId-error" className="text-red-400 text-xs mt-1">{errors.upiId}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;