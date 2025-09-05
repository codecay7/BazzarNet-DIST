import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStore, faCartPlus, faTruck, faUser, faQuoteLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [deliveryTime, setDeliveryTime] = useState(30);
  const [pageLoaded, setPageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a slight delay for initial page load animation
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 300); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const updateDeliveryTime = (e) => {
    setDeliveryTime(parseInt(e.target.value));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="w-full max-w-[1200px] mx-auto my-10 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={pageLoaded ? "visible" : "hidden"}
    >
      {/* Background Blobs / Premium Look */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 z-0"></div>

      {/* Hero Section */}
      <motion.div
        className="text-center py-16 px-5 text-[var(--text)] rounded-2xl mx-4 md:py-20 md:px-10 relative z-10"
        variants={containerVariants}
      >
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight md:leading-snug mb-4 tracking-tight"
          variants={itemVariants}
        >
          Shop Locally, Delivered Fast with
          <span className="inline-block ml-2 px-2 py-1 bg-[var(--accent)] text-white rounded-md shadow-md text-[1.2em]">
            BazzarNet
          </span>
        </motion.h1>
        <motion.p className="text-xl md:text-2xl lg:text-3xl font-medium mb-5" variants={itemVariants}>
          Support your favorite local stores with quick doorstep delivery.
        </motion.p>
      </motion.div>

      {/* How It Works Section */}
      <div className="container mx-auto px-5 my-10 relative z-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Browse Stores</h3>
                <p className="text-[var(--text)] text-base">Discover local shops and their products.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faCartPlus} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Add to Cart</h3>
                <p className="text-[var(--text)] text-base">Select items and place your order easily.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your order delivered in under an hour.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why BazzarNet Section */}
      <div className="container mx-auto px-5 my-10 relative z-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Why BazzarNet?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Digitize Your Store</h3>
                <p className="text-[var(--text)] text-base">Bring your local store online with ease.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Local Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your goods delivered quickly.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Trusted & Secure</h3>
                <p className="text-[var(--text)] text-base">Shop with confidence and security.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-5 my-10 relative z-10">
        <h2 className="text-3xl font-bold mb-8 md:text-4xl text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-[var(--accent)] mb-4" />
            <p className="text-[var(--text)] text-lg mb-4">"BazzarNet has revolutionized my local shopping! Fresh groceries delivered right to my door in minutes. Highly recommend!"</p>
            <p className="font-semibold text-lg">- Priya Sharma</p>
            <p className="text-sm opacity-80">Loyal Customer</p>
          </motion.div>
          <motion.div
            className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-[var(--accent)] mb-4" />
            <p className="text-[var(--text)] text-lg mb-4">"As a small business owner, BazzarNet helped me reach more customers than ever before. The platform is easy to use and the support is fantastic!"</p>
            <p className="font-semibold text-lg">- Rajesh Kumar</p>
            <p className="text-sm opacity-80">Owner, TechGadget Hub</p>
          </motion.div>
        </div>
      </div>

      {/* Delivery Time Estimator */}
      <motion.div
        className="bg-[var(--card-bg)] w-full max-w-6xl mx-auto my-10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_var(--shadow)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 ease-in-out relative z-10"
        variants={cardVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[var(--accent)] text-center">
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
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="bg-[var(--accent)] text-white rounded-3xl p-10 md:p-16 text-center my-10 mx-4 shadow-[0_8px_40px_var(--shadow)] relative z-10"
        variants={cardVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Join the BazzarNet Community!</h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Whether you're a customer looking for convenience or a business ready to grow, BazzarNet is for you.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-[var(--accent)] py-3 px-8 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
            aria-label="Sign up as a customer or vendor"
          >
            Get Started <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <Link
            to="/products"
            className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-white/20 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
            aria-label="Explore products"
          >
            Explore Products <FontAwesomeIcon icon={faShoppingBag} />
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LandingPage;