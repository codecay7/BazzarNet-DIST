import React, { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faStore } from '@fortawesome/free-solid-svg-icons';
import { Building2, Mail, Phone, Landmark, ChevronDown, FileText, UploadCloud } from 'lucide-react';
import useFormValidation from '../../hooks/useFormValidation';
import * as api from '../../services/api';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const categories = [
  'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
  'Furniture', 'Decor', 'Clothing', 'Other'
];

const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]";

const VendorProfileForm = ({ profileData, setProfileData, isEditing, handleImageChange, handleSaveChanges, errors, handleInputChange }) => {
  const fileInputRef = useRef(null);

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-6">
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
                  <p className="font-medium">{profileData.address ? `${profileData.address.houseNo}, ${profileData.address.landmark ? profileData.address.landmark + ', ' : ''}${profileData.address.city}, ${profileData.address.state} - ${profileData.address.pinCode}` : 'N/A'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VendorProfileForm;