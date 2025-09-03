import React, { useState, useMemo } from 'react';
import { mockPayments } from '../data/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredPayments = useMemo(() => {
    if (activeTab === 'all') {
      return mockPayments;
    }
    return mockPayments.filter(
      (payment) => payment.status.toLowerCase() === activeTab
    );
  }, [activeTab]);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleResolveIssue = (paymentId) => {
    toast.success(`Issue reported for payment ${paymentId}. Admin will contact you shortly.`);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-6 md:text-4xl">Payments Overview</h2>

        <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-8 max-w-md mx-auto" role="tablist">
          <button
            onClick={() => setActiveTab('all')}
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'all' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'all'}
            aria-controls="all-payments-panel"
            id="all-payments-tab"
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'paid' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'paid'}
            aria-controls="paid-payments-panel"
            id="paid-payments-tab"
          >
            Paid
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'pending' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'pending'}
            aria-controls="pending-payments-panel"
            id="pending-payments-tab"
          >
            Pending
          </button>
        </div>

        <div className="space-y-4" role="tabpanel" id={`${activeTab}-payments-panel`} aria-labelledby={`${activeTab}-payments-tab`}>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-black/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4" role="listitem" aria-label={`Payment ${payment.id} for order ${payment.orderId}, amount ₹${payment.amount.toFixed(2)}, status ${payment.status}`}>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-bold text-lg">₹{payment.amount.toFixed(2)}</p>
                  <p className="text-sm opacity-70">Order: {payment.orderId}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-70">Date</p>
                  <p>{payment.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(payment.status)}`}>
                    {payment.status}
                  </span>
                  <button
                    onClick={() => handleResolveIssue(payment.id)}
                    className="bg-red-500/20 text-red-400 py-2 px-4 rounded-lg font-medium hover:bg-red-500/40 transition-colors flex items-center justify-center gap-2"
                    title="Resolve Issue"
                    aria-label={`Report issue for payment ${payment.id}`}
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg opacity-80 py-10">No {activeTab} payments found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payments;