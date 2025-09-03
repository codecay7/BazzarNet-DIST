import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const { isVendor } = useContext(AppContext);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">{isVendor ? 'Store Orders' : 'Your Orders'}</h2>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Order #1234</h3>
          <p className="text-base md:text-lg">Items: Apples, Bread | Total: $7.49 | Status: Out for Delivery</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => toast.success('Tracking details coming soon!')}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {isVendor ? 'Update Status' : 'Track Order'}
          </button>
        </div>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Order #1235</h3>
          <p className="text-base md:text-lg">Items: Milk | Total: $3.99 | Status: Delivered</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => toast.info(isVendor ? 'Order details updated!' : 'Order already delivered!')}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> View Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Orders;