import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isVendor } = useContext(AppContext);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Your Profile</h2>
        <div className="flex flex-col gap-4 max-w-[500px] mx-auto">
          <p className="text-base md:text-lg">Name: {user?.name || 'Guest'}</p>
          <p className="text-base md:text-lg">{isVendor ? 'Store' : 'Username'}: {user?.username || user?.store || 'N/A'}</p>
          <p className="text-base md:text-lg">Role: {isVendor ? 'Vendor' : 'Customer'}</p>
          <p className="text-base md:text-lg">Total Orders: {isVendor ? '10' : '2'}</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => toast.info('Edit profile coming soon!')}
          >
            <FontAwesomeIcon icon={faUser} /> Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;