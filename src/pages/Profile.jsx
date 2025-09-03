import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faStore } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isVendor } = useContext(AppContext);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center mb-4 border-4 border-white/30 shadow-lg">
            <FontAwesomeIcon icon={isVendor ? faStore : faUser} className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-1">{user?.name || 'Guest'}</h2>
          <p className="text-lg text-[var(--text)] opacity-80 mb-6">{isVendor ? user?.store : `@${user?.username}`}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
            <div className="bg-black/10 p-4 rounded-lg">
              <p className="text-sm opacity-70">Role</p>
              <p className="text-xl font-semibold">{isVendor ? 'Vendor' : 'Customer'}</p>
            </div>
            <div className="bg-black/10 p-4 rounded-lg">
              <p className="text-sm opacity-70">Total Orders</p>
              <p className="text-xl font-semibold">{isVendor ? '10' : '2'}</p>
            </div>
          </div>

          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => toast('Edit profile coming soon!')}
          >
            <FontAwesomeIcon icon={faUser} /> Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;