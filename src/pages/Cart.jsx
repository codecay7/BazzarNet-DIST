import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(AppContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <FontAwesomeIcon icon={faShoppingBag} className="text-6xl text-[var(--accent)] mb-4" />
            <p className="text-base md:text-lg mb-4">Your cart is empty.</p>
            <Link to="/products" className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item) => (
                <div key={item.name} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-base">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQuantity(item.name, item.quantity - 1)} className="w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.name, item.quantity + 1)} className="w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold">+</button>
                    </div>
                    <button
                      className="bg-red-500 text-white border-none py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-white/20 pt-5 flex flex-col md:flex-row justify-between items-center">
              <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
              <button
                className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4 md:mt-0"
                onClick={() => navigate('/checkout')}
              >
                <FontAwesomeIcon icon={faCreditCard} /> Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;