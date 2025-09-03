import React, { useContext, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Building2, Mail, Phone, FileText, Landmark } from 'lucide-react';

const Profile = () => {
  const { user, isVendor } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Guest',
    store: user?.store || '',
    email: isVendor ? `${user?.store?.toLowerCase().replace(/\s/g, '')}@bazzar.net` : `${user?.username}@email.com`,
    phone: '+91 98765 43210',
    address: '123 Commerce House, Market Lane, Mumbai',
    pan: 'ABCDE1234F',
    gst: '27ABCDE1234F1Z5',
    category: 'Groceries',
    description: 'Your friendly neighborhood grocery store, bringing fresh produce and daily essentials right to your doorstep with BazzarNet.',
    bankAccount: '123456789012',
    bankName: 'BazzarNet Bank',
    ifsc: 'BAZZ0001234',
    upiId: 'vendor@bazzarnetupi',
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];
      setProfileData(prev => ({
        ...prev,
        profileImage: URL.createObjectURL(newImage)
      }));
    }
  };

  const handleSaveChanges = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]";

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
                  <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg">
                    <FontAwesomeIcon icon={faStore} className="text-white text-4xl" />
                  </div>
                )}
                {isEditing && (
                  <>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1.5 text-gray-800 hover:bg-white shadow-md">
                      <FontAwesomeIcon icon={faPen} size="sm" />
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
            >
              <FontAwesomeIcon icon={isEditing ? faSave : faPen} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Building2 size={20} /> Business Details</h3>
                <p className="opacity-80">{profileData.description}</p>
                <p className="mt-3"><strong className="opacity-80">Category:</strong> {profileData.category}</p>
              </div>
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FileText size={20} /> Legal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-70 mb-1">PAN</p>
                    <p className="font-medium">{profileData.pan}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">GSTIN</p>
                    <p className="font-medium">{profileData.gst}</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Landmark size={20} /> Payment Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-70 mb-1">Bank Name</p>
                    {isEditing ? <input type="text" name="bankName" value={profileData.bankName} onChange={handleInputChange} className={inputClasses} /> : <p className="font-medium">{profileData.bankName}</p>}
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">Account Number</p>
                    {isEditing ? <input type="text" name="bankAccount" value={profileData.bankAccount} onChange={handleInputChange} className={inputClasses} /> : <p className="font-medium">{profileData.bankAccount}</p>}
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">IFSC Code</p>
                    {isEditing ? <input type="text" name="ifsc" value={profileData.ifsc} onChange={handleInputChange} className={inputClasses} /> : <p className="font-medium">{profileData.ifsc}</p>}
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">UPI ID</p>
                    {isEditing ? <input type="text" name="upiId" value={profileData.upiId} onChange={handleInputChange} className={inputClasses} /> : <p className="font-medium">{profileData.upiId}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="mt-1 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm opacity-70">Email</p>
                    <p className="font-medium break-all">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="mt-1 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm opacity-70">Phone</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="mt-1 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm opacity-70">Address</p>
                    <p className="font-medium">{profileData.address}</p>
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
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="relative w-24 h-24 mb-4">
            {profileData.profileImage ? (
              <img src={profileData.profileImage} alt="User" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
            ) : (
              <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg">
                <FontAwesomeIcon icon={faUser} className="text-white text-4xl" />
              </div>
            )}
            {isEditing && (
              <>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1.5 text-gray-800 hover:bg-white shadow-md">
                  <FontAwesomeIcon icon={faPen} size="sm" />
                </button>
              </>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-1">{user?.name}</h2>
          <p className="text-lg text-[var(--text)] opacity-80 mb-6">@{user?.username}</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          >
            <FontAwesomeIcon icon={isEditing ? faSave : faPen} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;