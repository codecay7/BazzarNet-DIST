import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useContext(AppContext);
  const order = orders.find(o => o.id === `#${orderId}`);
  const [status, setStatus] = useState(order?.status || '');

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!order) {
    return (
      <section className="w-full max-w-[1200px] my-10 text-center">
        <h2 className="text-2xl font-bold">Order not found.</h2>
        <Link to="/orders" className="text-[var(--accent)] hover:underline">Back to Orders</Link>
      </section>
    );
  }

  const handleStatusUpdate = () => {
    updateOrderStatus(order.id, status);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-6 md:text-4xl">Order Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Info & Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Order Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customer.name}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> <span className="font-semibold text-[var(--accent)]">{order.status}</span></p>
              </div>
            </div>
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Items</h3>
              <ul className="space-y-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} (Qty: {item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
              <p><strong>Tracking Number:</strong> {order.shipping.trackingNumber}</p>
              <p><strong>Carrier:</strong> {order.shipping.carrier}</p>
            </div>
          </div>

          {/* Actions & Contact */}
          <div className="space-y-6">
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Update Status</h3>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-black/30">
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <button onClick={handleStatusUpdate} className="w-full bg-[var(--accent)] text-white py-2 px-4 rounded-lg font-medium">Save Changes</button>
            </div>
            <div className="bg-black/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Customer Contact</h3>
              <p className="mb-4"><strong>Email:</strong> {order.customer.email}</p>
              <button onClick={() => toast.info('Contacting customer...')} className="w-full bg-white/10 text-[var(--text)] py-2 px-4 rounded-lg font-medium">Contact Customer</button>
            </div>
            <div className="bg-black/10 p-6 rounded-xl space-y-3">
              <button onClick={() => toast.error('Refund issued!')} className="w-full bg-red-500/20 text-red-400 py-2 px-4 rounded-lg font-medium">Issue Refund</button>
              <button onClick={() => toast.success('Invoice downloaded!')} className="w-full bg-white/10 text-[var(--text)] py-2 px-4 rounded-lg font-medium">Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;