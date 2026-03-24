import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from "react-redux";

import Navbar from '../component/Navbar';


import { 
  ShoppingBag, 
  User, 
  Home, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Truck,
  Zap
} from 'lucide-react';

// --- Components ---





const MobileBottomNav = ({ activePage, setActivePage }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'products', icon: ShoppingBag, label: 'Shop' },
    { id: 'login', icon: User, label: 'Profile' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50 flex justify-between items-center rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activePage === item.id ? 'text-gray-900 scale-110' : 'text-gray-400'
          }`}
        >
          <item.icon size={22} strokeWidth={activePage === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Pages ---

const ProductsPage = () => {
   const products = useSelector(
    (state) => state.productReducer.products
  );

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
          <p className="text-gray-600 mt-2">Discover our curated selection of essentials.</p>
        </div>
        <button className="hidden sm:block text-gray-900 font-semibold text-sm hover:underline">View All Products</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product, idx) => (
          <motion.div
          
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={product.id}
            className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
          >
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
               <img src={product.image} alt="" />
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{product.title}</h3>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xl font-bold text-gray-900">{product.price}</span>
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">{product.rating}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition-all">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};



// --- Main App / Landing Page ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#B0BEC6' }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="pt-20 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={containerVariants}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              {/* Hero Section */}
              <section className="py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-8 text-center md:text-left">
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                    <span className="flex h-2 w-2 rounded-full bg-gray-900"></span>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">New Season Arrival</span>
                  </motion.div>
                  
                  <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                    Elegance in <br /> 
                    <span className="text-white drop-shadow-sm">Simplicity.</span>
                  </motion.h1>
                  
                  <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
                    Experience the future of minimalist lifestyle with our meticulously crafted premium essentials designed for modern living.
                  </motion.p>
                  
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => setActivePage('products')}
                      className="group bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl"
                    >
                      Shop Collection
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md text-gray-900 border border-white/50 px-8 py-4 rounded-2xl font-bold hover:bg-white/40 transition-all">
                      Watch Story
                    </button>
                  </motion.div>
                </div>

                <motion.div 
                  variants={itemVariants} 
                  className="flex-1 relative w-full max-w-md md:max-w-none"
                >
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-tr from-gray-300 to-gray-100 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img src="image.png" alt="" />
                    {/* Decorative Elements */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-lg p-6 rounded-3xl border border-white/50 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Limited Edition</p>
                          <p className="text-xs text-gray-500">Only 50 pieces available</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
                  >
                    <div className="flex flex-col items-center">
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-900">Top Rated</span>
                    </div>
                  </motion.div>
                </motion.div>
              </section>

              {/* Stats/Features Section */}
              <section className="py-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { label: "Free Shipping", icon: Truck, desc: "On all orders" },
                  { label: "Secure Pay", icon: ShieldCheck, desc: "SSL Protected" },
                  { label: "Fast Delivery", icon: Zap, desc: "Within 48 hours" },
                  { label: "24/7 Support", icon: User, desc: "Instant help" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center"
                  >
                    <div className="inline-flex p-3 bg-gray-900 rounded-xl mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{stat.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{stat.desc}</p>
                  </motion.div>
                ))}
              </section>

              {/* Quick Preview Section */}
              <section className="py-20">
                 <ProductsPage />
              </section>
            </motion.div>
          )}

          {activePage === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProductsPage />
            </motion.div>
          )}

          {activePage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LoginPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

     

      <MobileBottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}