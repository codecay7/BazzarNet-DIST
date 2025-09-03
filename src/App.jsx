import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faShoppingBag,
  faStore,
  faTruck,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCartPlus,
  faMapMarkerAlt,
  faQuestionCircle,
  faInfoCircle,
  faBriefcase,
  faHeart,
  faCreditCard,
  faTimes,
  faShoppingCart,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter as faTwitterBrands,
  faFacebook as faFacebookBrands,
  faInstagram as faInstagramBrands,
} from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(30);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Sidebar Toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  // Login Functions
  const loginAsUser = () => {
    const nameInput = document.getElementById('user-name-input')?.value.trim();
    const usernameInput = document.getElementById('user-username-input')?.value.trim();

    if (!nameInput || !usernameInput) {
      alert('Please enter both your name and username.');
      return;
    }

    const userData = { name: nameInput, username: usernameInput, role: 'user' };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(false);
    localStorage.setItem('user', JSON.stringify(userData));
    alert(`Welcome to BazzarNet, ${nameInput}! Start shopping now.`);
  };

  const loginAsVendor = () => {
    const nameInput = document.getElementById('vendor-name-input')?.value.trim();
    const storeInput = document.getElementById('vendor-store-input')?.value.trim();

    if (!nameInput || !storeInput) {
      alert('Please enter both your name and store name.');
      return;
    }

    const userData = { name: nameInput, store: storeInput, role: 'vendor' };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(true);
    localStorage.setItem('user', JSON.stringify(userData));
    alert(`Welcome to BazzarNet, ${nameInput}! Manage your store now.`);
  };

  const showLogoutPage = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsVendor(false);
    setCurrentPage('home');
  };

  // Cart and Wishlist Functions
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    alert(`${product.name} added to wishlist!`);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const removeFromWishlist = (index) => {
    const newWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(newWishlist);
  };

  const moveToCart = (index) => {
    const item = wishlist[index];
    addToCart(item);
    removeFromWishlist(index);
  };

  const checkout = () => {
    alert('Proceeding to checkout! (Implementation pending)');
    setCart([]);
    navigateTo('home');
  };

  // Vendor Functions
  const addVendorProduct = () => {
    const name = document.getElementById('product-name')?.value.trim();
    const price = parseFloat(document.getElementById('product-price')?.value.trim());
    const description = document.getElementById('product-description')?.value.trim();
    if (!name || isNaN(price)) {
      alert('Please enter valid product name and price.');
      return;
    }
    const newProduct = { name, price, description };
    setVendorProducts([...vendorProducts, newProduct]);
    alert(`${name} added to your store!`);
    // Clear inputs
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-description').value = '';
  };

  const editVendorProduct = (index, updatedProduct) => {
    const newProducts = vendorProducts.map((product, i) => i === index ? updatedProduct : product);
    setVendorProducts(newProducts);
  };

  const deleteVendorProduct = (index) => {
    const newProducts = vendorProducts.filter((_, i) => i !== index);
    setVendorProducts(newProducts);
  };

  // Delivery Time Update
  const updateDeliveryTime = (e) => {
    setDeliveryTime(parseInt(e.target.value));
  };

  // Exit-Intent Popup with 30sec interval
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!popupShown) {
        setPopupShown(true);
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [popupShown]);

  // Auto-login
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setIsVendor(storedUser.role === 'vendor');
    }
  }, []);

  // Modular Page Components
  const Home = () => (
    <section className="w-full max-w-[1200px] my-10">
      {/* Hero Section */}
      <div className="text-center py-16 px-5 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white rounded-2xl mx-4 md:py-20 md:px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight md:leading-snug mb-4 text-gray-900 tracking-tight">
          Shop Locally, Delivered Fast with
          <span className="inline-block ml-2 px-2 py-1 bg-black text-[#4CAF50] rounded-md shadow-md text-[1.2em]">
            BazzarNet
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-5">Support your favorite local stores with quick doorstep delivery.</p>
        <div className="flex flex-wrap justify-center gap-5">
          <button
            className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
            onClick={() => navigateTo('stores')}
          >
            <FontAwesomeIcon icon={faShoppingBag} /> Start Shopping
          </button>
          <button
            className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
            onClick={() => navigateTo('vendor')}
          >
            <FontAwesomeIcon icon={faStore} /> Become a Vendor
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-5 my-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Browse Stores</h3>
                <p className="text-[var(--text)] text-base">Discover local shops and their products.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faCartPlus} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Add to Cart</h3>
                <p className="text-[var(--text)] text-base">Select items and place your order easily.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your order delivered in under an hour.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why BazzarNet Section */}
      <div className="container mx-auto px-5 my-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Why BazzarNet?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Digitize Your Store</h3>
                <p className="text-[var(--text)] text-base">Bring your local store online with ease.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Local Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your goods delivered quickly.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Trusted & Secure</h3>
                <p className="text-[var(--text)] text-base">Shop with confidence and security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Time Estimator */}
      <div className="bg-[var(--card-bg)] w-full max-w-[1170px] my-10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_var(--shadow)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 ease-in-out mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[var(--accent)]">
          Delivery Time Estimator
        </h2>
        <div className="space-y-8">
          <div>
            <label htmlFor="delivery-slider" className="block text-base md:text-lg font-medium mb-2 text-[var(--text)]">
              Distance to Store (km): <span className="font-semibold">{(deliveryTime / 10).toFixed(1)}</span>
            </label>
            <input
              id="delivery-slider"
              type="range"
              min="10"
              max="50"
              value={deliveryTime}
              onChange={updateDeliveryTime}
              className="w-full h-2 rounded-lg appearance-none bg-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <div
            className="w-[150px] h-[150px] rounded-full flex items-center justify-center shadow-[0_4px_30px_var(--accent)] relative transition-all duration-500"
            style={{
              background: `conic-gradient(var(--accent) ${deliveryTime}%, rgba(255,255,255,0.08) ${deliveryTime}% 100%)`,
            }}
            role="img"
            aria-label={`Estimated Delivery Time: ${deliveryTime} minutes`}
          >
            <div className="w-[115px] h-[115px] bg-[var(--bg)] rounded-full flex items-center justify-center shadow-inner">
              <span className="text-2xl font-bold text-[var(--accent)]">{deliveryTime} min</span>
            </div>
          </div>
          <p className="text-base md:text-lg font-medium text-[var(--text)]">
            Estimated delivery in <span className="font-semibold">{deliveryTime} minutes</span>
          </p>
        </div>
      </div>
    </section>
  );

  const Stores = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Local Stores</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
            <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
            <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Fresh Groceries</h3>
            <p className="text-base md:text-lg">Organic fruits, vegetables, and daily essentials.</p>
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
              onClick={() => navigateTo('products')}
            >
              View Products
            </button>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
            <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
            <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Local Bakery</h3>
            <p className="text-base md:text-lg">Freshly baked bread, cakes, and pastries.</p>
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
              onClick={() => navigateTo('products')}
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const Products = () => {
    const products = [
      { name: 'Fresh Apples', price: 2.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
      { name: 'Sourdough Bread', price: 4.50, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=200&h=200&fit=crop' },
      { name: 'Organic Milk', price: 3.99, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf18f86f6?w=200&h=200&fit=crop' },
    ];

    return (
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
          <h2 className="text-3xl font-bold mb-5 md:text-4xl">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-base">${product.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => addToCart(product)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Cart
                  </button>
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => addToWishlist(product)}
                  >
                    <FontAwesomeIcon icon={faHeart} /> Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Cart = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-base md:text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-base">$ {item.price.toFixed(2)}</p>
                  <button
                    className="bg-red-500 text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-red-600 transition-all duration-300 w-fit"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-lg font-bold">Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
              <button
                className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
                onClick={() => navigateTo('checkout')}
              >
                <FontAwesomeIcon icon={faCreditCard} /> Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );

  const Checkout = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Checkout</h2>
        <form className="flex flex-col gap-4 max-w-[500px] mx-auto">
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Shipping Address"
            required
          />
          <input
            type="text"
            placeholder="Credit Card Number"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Credit Card Number"
            required
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Expiration Date"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="CVV"
            required
          />
          <button
            type="button"
            className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={checkout}
          >
            <FontAwesomeIcon icon={faCreditCard} /> Pay Now
          </button>
        </form>
      </div>
    </section>
  );

  const Wishlist = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-base md:text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wishlist.map((item, index) => (
              <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-base">${item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => moveToCart(index)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Move to Cart
                  </button>
                  <button
                    className="bg-red-500 text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-red-600 transition-all duration-300"
                    onClick={() => removeFromWishlist(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const Vendor = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Manage Your Store</h2>
        <div className="flex flex-col gap-4 max-w-[500px] mx-auto">
          <h3 className="text-2xl font-semibold mb-3">Add New Product</h3>
          <input
            type="text"
            id="product-name"
            placeholder="Product Name"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Name"
          />
          <input
            type="number"
            id="product-price"
            placeholder="Price"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Price"
          />
          <input
            type="text"
            id="product-description"
            placeholder="Description"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Product Description"
          />
          <button
            className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={addVendorProduct}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add Product
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Your Products</h3>
          {vendorProducts.length === 0 ? (
            <p className="text-base md:text-lg">No products added yet.</p>
          ) : (
            vendorProducts.map((product, index) => (
              <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 flex flex-col gap-2">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-base">$ {product.price.toFixed(2)} | Description: {product.description}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => {
                      const updatedName = prompt('Edit Name', product.name);
                      const updatedPrice = parseFloat(prompt('Edit Price', product.price));
                      const updatedDescription = prompt('Edit Description', product.description);
                      if (updatedName && !isNaN(updatedPrice)) {
                        editVendorProduct(index, { name: updatedName, price: updatedPrice, description: updatedDescription });
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-red-600 transition-all duration-300"
                    onClick={() => deleteVendorProduct(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );

  const Orders = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">{isVendor ? 'Store Orders' : 'Your Orders'}</h2>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Order #1234</h3>
          <p className="text-base md:text-lg">Items: Apples, Bread | Total: $7.49 | Status: Out for Delivery</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => alert('Tracking details coming soon!')}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {isVendor ? 'Update Status' : 'Track Order'}
          </button>
        </div>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Order #1235</h3>
          <p className="text-base md:text-lg">Items: Milk | Total: $3.99 | Status: Delivered</p>
          <button
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={() => alert(isVendor ? 'Order details updated!' : 'Order already delivered!')}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> View Details
          </button>
        </div>
      </div>
    </section>
  );

  const FAQ = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Frequently Asked Questions</h2>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">What is BazzarNet?</h3>
          <p className="text-base md:text-lg">BazzarNet is a platform connecting local stores with customers for fast and reliable delivery.</p>
        </div>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">How fast is delivery?</h3>
          <p className="text-base md:text-lg">Most orders are delivered within 30-60 minutes, depending on your location.</p>
        </div>
      </div>
    </section>
  );

  const About = () => (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">About Us</h2>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Our Story</h3>
          <p className="text-base md:text-lg">BazzarNet was founded to empower local businesses and make shopping convenient for customers.</p>
        </div>
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">Careers</h3>
          <p className="text-base md:text-lg">Join our team to build the future of local commerce.</p>
          <a
            href="#"
            className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 no-underline"
            onClick={() => alert('Careers page coming soon!')}
          >
            <FontAwesomeIcon icon={faBriefcase} /> View Openings
          </a>
        </div>
      </div>
    </section>
  );

  const Profile = () => (
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
            onClick={() => alert('Edit profile coming soon!')}
          >
            <FontAwesomeIcon icon={faUser} /> Edit Profile
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      {!isLoggedIn ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-[1003] bg-[var(--accent)] bg-opacity-30 transition-opacity duration-300">
          <div className="bg-[black] backdrop-blur-[5px] border border-white/30 rounded-2xl flex flex-col p-8 shadow-[0_8px_40px_var(--shadow)] w-full max-w-[400px] mx-4 text-center text-[var(--auth-text)]">
            <h2 className="text-3xl font-bold mb-5 text-[var(--accent)]">Welcome to BazzarNet</h2>
            <h3 className="text-xl font-semibold mb-3">Login as User</h3>
            <input
              type="text"
              id="user-name-input"
              placeholder="Name"
              className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="User Name"
            />
            <input
              type="text"
              id="user-username-input"
              placeholder="Username"
              className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="User Username"
            />
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center w-fit gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mx-auto mb-4"
              onClick={loginAsUser}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Sign in as User
            </button>
            <h3 className="text-xl font-semibold mb-3">Login as Vendor</h3>
            <input
              type="text"
              id="vendor-name-input"
              placeholder="Vendor Name"
              className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Vendor Name"
            />
            <input
              type="text"
              id="vendor-store-input"
              placeholder="Store Name"
              className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Store Name"
            />
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center w-fit gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mx-auto"
              onClick={loginAsVendor}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Sign in as Vendor
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="flex items-center py-4 bg-[var(--card-bg)] backdrop-blur-[5px] sticky top-0 z-[1000] rounded-b-2xl shadow-[0_4px_20px_var(--shadow)] overflow-x-hidden">
            <div className="container mx-auto px-5 flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-5 flex-shrink-0">
                <button
                  className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  onClick={toggleSidebar}
                  aria-label="Toggle navigation menu"
                >
                  <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[var(--accent)] md:text-3xl">BazzarNet</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!isVendor && <span className="text-sm font-medium">Cart: {cart.length}</span>}
                <button
                  className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 hover:border-2 hover:border-[var(--accent)] transition-all duration-200"
                  onClick={toggleTheme}
                  aria-label="Toggle between light and dark mode"
                >
                  <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Sidebar with Close Option */}
          <div
            className={`fixed top-[60px] left-0 w-64 h-[calc(100%-60px)] bg-gradient-to-br from-[var(--card-bg)] to-white/20 backdrop-blur-[5px] p-5 transition-transform duration-300 z-[1001] shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col justify-between md:w-48 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex justify-between items-center mb-5">
              <span className="text-xl font-bold text-[var(--accent)]">Menu</span>
              <button
                className="bg-transparent text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <nav className="flex flex-col">
              {isVendor
                ? ['home', 'vendor', 'orders', 'profile'].map((page) => (
                    <a
                      key={page}
                      href="#"
                      className="relative flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[black] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(page);
                      }}
                      aria-label={page.charAt(0).toUpperCase() + page.slice(1)}
                    >
                      <FontAwesomeIcon
                        icon={
                          page === 'home'
                            ? faHome
                            : page === 'vendor'
                            ? faStore
                            : page === 'orders'
                            ? faTruck
                            : faUser
                        }
                        className="mr-2 text-lg hover:scale-110 transition-transform duration-200"
                      />
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                      <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></span>
                    </a>
                  ))
                : ['home', 'stores', 'products', 'cart', 'wishlist', 'orders', 'faq', 'about', 'profile'].map((page) => (
                    <a
                      key={page}
                      href="#"
                      className="relative flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[black] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(page);
                      }}
                      aria-label={page.charAt(0).toUpperCase() + page.slice(1)}
                    >
                      <FontAwesomeIcon
                        icon={
                          page === 'home'
                            ? faHome
                            : page === 'stores'
                            ? faStore
                            : page === 'products'
                            ? faShoppingBag
                            : page === 'cart'
                            ? faShoppingCart
                            : page === 'wishlist'
                            ? faHeart
                            : page === 'orders'
                            ? faTruck
                            : page === 'faq'
                            ? faQuestionCircle
                            : page === 'about'
                            ? faInfoCircle
                            : faUser
                        }
                        className="mr-2 text-lg hover:scale-110 transition-transform duration-200"
                      />
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                      <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></span>
                    </a>
                  ))}
              <a
                href="#"
                className="flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[var(--accent)] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  showLogoutPage();
                }}
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg hover:scale-110 transition-transform duration-200" />
                Logout
              </a>
            </nav>
            <div className="flex items-center gap-2 p-2 border-t border-white/20 mt-5">
              <img
                src={user ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' : 'https://via.placeholder.com/40'}
                alt={user ? `${user.username || user.store}'s profile image` : 'User image'}
                className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
              />
              <span className="text-sm font-medium">{user ? `Welcome, ${user.username || user.store}` : 'Guest'}</span>
            </div>
          </div>
          <div
            className={`fixed inset-0 bg-black/50 z-[1000] ${sidebarOpen ? 'block' : 'hidden'}`}
            onClick={toggleSidebar}
          ></div>

          <main className="flex-1 flex flex-col items-center">
            {currentPage === 'home' && <Home />}
            {currentPage === 'stores' && !isVendor && <Stores />}
            {currentPage === 'products' && !isVendor && <Products />}
            {currentPage === 'cart' && !isVendor && <Cart />}
            {currentPage === 'checkout' && !isVendor && <Checkout />}
            {currentPage === 'wishlist' && !isVendor && <Wishlist />}
            {currentPage === 'vendor' && isVendor && <Vendor />}
            {currentPage === 'orders' && <Orders />}
            {currentPage === 'faq' && !isVendor && <FAQ />}
            {currentPage === 'about' && !isVendor && <About />}
            {currentPage === 'profile' && <Profile />}
            {/* Don’t Leave Yet! Popup */}
            {popupShown && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] backdrop-blur-[5px] p-8 rounded-2xl shadow-[0_8px_40px_var(--shadow)] z-[1002] text-center max-w-[400px] w-[90%]">
                <h2 className="text-3xl font-bold mb-5 md:text-4xl">Don’t Leave Yet!</h2>
                <p className="text-base md:text-lg">Explore local stores or start selling with BazzarNet!</p>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4 mx-auto"
                  onClick={() => navigateTo('stores')}
                >
                  <FontAwesomeIcon icon={faStore} /> Browse Stores
                </button>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-2 mx-auto"
                  onClick={() => setPopupShown(false)}
                >
                  Stay and Explore
                </button>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full mt-10 text-[var(--text)]">
            <div className="flex flex-col md:flex-row justify-between gap-8 max-w-[1200px] mx-auto px-5">
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">About BazzarNet</h4>
                <p className="text-sm md:text-base">Connecting local stores with customers for fast and reliable delivery.</p>
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Quick Links</h4>
                {['home', 'stores', 'products', 'faq', 'about'].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-200 md:hover:translate-x-0 md:text-base"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(page);
                    }}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Support</h4>
                <a
                  href="#"
                  className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-200 md:hover:translate-x-0 md:text-base"
                  onClick={() => alert('Help Center coming soon!')}
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-200 md:hover:translate-x-0 md:text-base"
                  onClick={() => alert('Contact Us coming soon!')}
                >
                  Contact Us
                </a>
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Connect With Us</h4>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="https://twitter.com/bazzarnet"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitterBrands} />
                  </a>
                  <a
                    href="https://facebook.com/bazzarnet"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookBrands} />
                  </a>
                  <a
                    href="https://instagram.com/bazzarnet"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagramBrands} />
                  </a>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Newsletter</h4>
                <div className="flex flex-col gap-4 max-w-[500px] mx-auto">
                  <input
                    type="email"
                    placeholder="Get updates in your inbox"
                    className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="button"
                    className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                    onClick={() => alert('Subscribed to newsletter!')}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-8 pt-5 border-t border-white/20">
              <div className="text-2xl font-bold text-[var(--accent)] mb-2 md:text-3xl">BazzarNet</div>
              <p className="text-sm opacity-80 md:text-base">© 2025 BazzarNet. All rights reserved.</p>
              <div className="flex justify-center gap-4 mt-2">
                <a
                  href="#"
                  className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200"
                  onClick={() => alert('Privacy Policy coming soon!')}
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200"
                  onClick={() => alert('Terms of Service coming soon!')}
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>

          {/* Custom CSS */}
          <style>{`
            :root {
              --bg: #E0E0E0;
              --bg-body: #E0E0E0;
              --card-bg: rgba(245, 245, 245, 0.7);
              --shadow: rgba(209, 209, 209, 0.5);
              --accent: #00D1B2;
              --accent-dark: #00A895;
              --text: #333;
              --blur: blur(5px);
              --tooltip-bg: #333;
              --tooltip-text: #fff;
              --auth-text: #1A1A1A;
              --table-border: rgba(0, 0, 0, 0.2);
            }

            [data-theme="dark"] {
              --bg: #0F111A;
              --bg-body: #0F111A;
              --card-bg: rgba(23, 28, 40, 0.6);
              --shadow: rgba(0, 0, 0, 0.6);
              --accent: #22D3EE;
              --accent-dark: #0EA5E9;
              --text: #F1F5F9;
              --tooltip-bg: #1E293B;
              --tooltip-text: #E2E8F0;
              --auth-text: #F8FAFC;
              --table-border: rgba(255, 255, 255, 0.1);
            }

            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 25px;
              height: 25px;
              background: var(--accent);
              border-radius: 50%;
              box-shadow: 0 2px 10px var(--shadow);
              transition: transform 0.2s ease, background 0.3s ease;
            }

            input[type="range"]::-webkit-slider-thumb:hover,
            input[type="range"]::-webkit-slider-thumb:active {
              transform: scale(1.2);
              background: var(--accent-dark);
            }

            @media (max-width: 768px) {
              h1 { font-size: 2.2rem; }
              h2 { font-size: 1.8rem; }
              h3 { font-size: 1.4rem; }
              p, label, span { font-size: 0.9rem; }
              .bg-[var(--card-bg)] { padding: 20px; }
              .w-10 { width: 35px; height: 35px; }
              .text-xl { font-size: 1.2rem; }
              .text-2xl { font-size: 1.6rem; }
              .py-2 { padding-top: 8px; padding-bottom: 8px; }
              .px-6 { padding-left: 20px; padding-right: 20px; }
              .text-lg { font-size: 0.9rem; }
              .w-64 { width: 200px; }
              .-left-64 { left: -200px; }
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default App;