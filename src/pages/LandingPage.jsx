import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStore, faCartPlus, faTruck, faUser, faQuoteLeft, faArrowRight, faTags, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import LoginButton from '../components/LoginButton';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loaderTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 90, transformOrigin: 'bottom center' },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader key="loader" />
      ) : (
        <motion.section
          key="landing-content"
          className="w-full min-h-screen bg-gray-900 text-white flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">BazzarNet</h1>
            <Link to="/login" className="bg-cyan-500 text-white py-2 px-4 rounded">Login</Link>
          </div>

          {/* Hero Section */}
          <motion.div
            className="text-center py-8 px-4 flex-1 flex flex-col justify-center"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 break-words"
            >
              <motion.span variants={textChildVariants} className="inline-block">Shop Locally, Delivered Fast with</motion.span>
              <motion.span variants={textChildVariants} className="inline-block ml-2 px-2 py-1 bg-cyan-500 text-white rounded-md text-xl sm:text-2xl font-bold">
                BazzarNet
              </motion.span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl font-medium mb-5" variants={textChildVariants}>
              Support your favorite local stores with quick doorstep delivery.
            </motion.p>
          </motion.div>

          {/* How It Works Section */}
          <div className="container mx-auto px-4 py-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-cyan-500">How It Works</h2>
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                className="bg-gray-800 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  <FontAwesomeIcon icon={faStore} className="text-4xl text-cyan-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-cyan-500 mb-2">Browse Stores</h3>
                <p className="text-gray-300 text-base">Discover local shops and their products.</p>
              </motion.div>
              {/* Add more cards as needed */}
            </div>
          </div>

          {/* Why BazzarNet Section */}
          <div className="container mx-auto px-5 py-20 relative z-10">
            <h2 className="text-3xl font-bold mb-10 md:text-4xl text-center">Why BazzarNet?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              <motion.div
                className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  <FontAwesomeIcon icon={faStore} className="text-5xl text-[var(--accent)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Digitize Your Store</h3>
                <p className="text-[var(--text)] text-lg">Bring your local store online with ease.</p>
              </motion.div>
              <motion.div
                className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  <FontAwesomeIcon icon={faTruck} className="text-5xl text-[var(--accent)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Fast Local Delivery</h3>
                <p className="text-[var(--text)] text-lg">Get your goods delivered quickly.</p>
              </motion.div>
              <motion.div
                className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  <FontAwesomeIcon icon={faUser} className="text-5xl text-[var(--accent)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Trusted & Secure</h3>
                <p className="text-[var(--text)] text-lg">Shop with confidence and security.</p>
              </motion.div>
              <motion.div
                className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  <FontAwesomeIcon icon={faTags} className="text-5xl text-[var(--accent)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Exclusive Deals</h3>
                <p className="text-[var(--text)] text-lg">Access special offers and discounts.</p>
              </motion.div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="container mx-auto px-5 py-20 relative z-10">
            <h2 className="text-3xl font-bold mb-10 md:text-4xl text-center">What Our Customers Say</h2>
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

          {/* Call to Action Section */}
          <motion.div
            className="bg-gray-800 text-white rounded-2xl p-6 text-center mx-4 shadow-md relative z-10 mb-6"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">Join the BazzarNet Community!</h2>
            <p className="text-base sm:text-lg mb-6 opacity-90">Whether you're a customer looking for convenience or a business ready to grow, BazzarNet is for you.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="bg-cyan-500 text-white py-2 px-6 rounded-full font-bold text-base hover:bg-cyan-600 transition-colors duration-300 shadow-md"
              >
                Log In
              </Link>
              <Link
                to="/products"
                className="bg-transparent border-2 border-cyan-500 text-cyan-500 py-2 px-6 rounded-full font-bold text-base hover:bg-cyan-500 hover:text-white transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                aria-label="Explore products"
              >
                Explore Products <FontAwesomeIcon icon={faShoppingBag} />
              </Link>
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="bg-cyan-500 text-white p-4 text-center">
            <p className="text-sm">BazzarNet</p>
            <p className="text-sm">Your one-stop solution for shopping from local stores with fast doorstep delivery.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/company" className="text-sm hover:underline">Company</Link>
              <Link to="/support" className="text-sm hover:underline">Support</Link>
            </div>
          </footer>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;