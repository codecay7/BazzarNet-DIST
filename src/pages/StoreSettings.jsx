import React from 'react';
import toast from 'react-hot-toast';

const StoreSettings = () => {
  const handleSaveChanges = (e) => {
    e.preventDefault();
    toast.success('Store settings saved successfully!');
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-6 md:text-4xl">Store Settings</h2>
        <form onSubmit={handleSaveChanges} className="flex flex-col gap-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input type="text" defaultValue="My BazzarNet Store" className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input type="email" defaultValue="vendor@example.com" className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Store Description</label>
            <textarea rows="3" defaultValue="Welcome to my store on BazzarNet!" className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Store Address</label>
            <input type="text" defaultValue="123 Market Street, City" className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="tel" defaultValue="+91-555-123-4567" className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]" />
          </div>
          <div>
            <button type="submit" className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StoreSettings;