import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import * as api from '../services/api';
import useFormValidation from '../hooks/useFormValidation';

// Import modular components
import CustomerProfileForm from '../components/profile/CustomerProfileForm';
import VendorProfileForm from '../components/profile/VendorProfileForm';

const Profile = () => {
  const { user, isVendor, updateUserInContext } = useContext(AppContext); // Use updateUserInContext
  const [isEditing, setIsEditing] = useState(false);
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
        const uploadResponse = await api.userProfile.uploadProfileImage(formData); // Use the dedicated upload API
        const imageUrl = uploadResponse.profileImage; // Get the actual URL from the backend response
        setProfileData(prev => ({
          ...prev,
          profileImage: imageUrl
        }));
        updateUserInContext({ profileImage: imageUrl }); // Update context immediately
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
      updateUserInContext(updatedUser); // Use the new function to update context
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      resetErrors(); // Clear errors after successful save
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
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

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-4">
          <button
            className="bg-[var(--accent)] w-full md:w-fit text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            aria-label={isEditing ? 'Save changes to profile' : 'Edit profile'}
          >
            <FontAwesomeIcon icon={isEditing ? faSave : faPen} aria-hidden="true" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {isVendor ? (
          <VendorProfileForm
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
            handleSaveChanges={handleSaveChanges}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        ) : (
          <CustomerProfileForm
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
            handleSaveChanges={handleSaveChanges}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
    </section>
  );
};

export default Profile;