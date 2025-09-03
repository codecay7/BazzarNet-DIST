import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isVendor } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Guest',
    identifier: isVendor ? user?.store : user?.username,
    email: isVendor ? `${user?.store?.toLowerCase().replace(' ', '')}@bazzar.net` : `${user?.username}@email.com`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    // In a real app, you'd call an API here.
    // For now, we'll just simulate it.
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center mb-4 border-4 border-white/30 shadow-lg">
            <FontAwesomeIcon icon={isVendor ? faStore : faUser} className="text-white text-4xl" />
          </div>
          
          {isEditing ? (
            <div className="w-full flex flex-col gap-4 mb-6">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full p-3 text-center text-3xl font-bold rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
              />
              <input
                type="text"
                name="identifier"
                value={profileData.identifier}
                onChange={handleInputChange}
                className="w-full p-2 text-center text-lg rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] opacity-80"
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-1">{profileData.name}</h2>
              <p className="text-lg text-[var(--text)] opacity-80 mb-6">{isVendor ? profileData.identifier : `@${profileData.identifier}`}</p>
            </>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
            <div className="bg-black/10 p-4 rounded-lg">
              <p className="text-sm opacity-70">Role</p>
              <p className="text-xl font-semibold">{isVendor ? 'Vendor' : 'Customer'}</p>
            </div>
            <div className="bg-black/10 p-4 rounded-lg">
              <p className="text-sm opacity-70">Email</p>
              <p className="text-xl font-semibold truncate">{profileData.email}</p>
            </div>
          </div>

          {isEditing ? (
            <button
              className="bg-green-500 w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-green-600 transition-all duration-300"
              onClick={handleSaveChanges}
            >
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          ) : (
            <button
              className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faPen} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;