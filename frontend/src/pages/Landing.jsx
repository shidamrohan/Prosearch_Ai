import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Camera, ShieldCheck } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 relative z-10 pt-16 pb-24">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-8 animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          ProSearch v1.0 is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-dark mb-6 tracking-tight leading-tight">
          Find the Best Products.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            At the Lowest Prices.
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate smart shopping assistant. Search across top e-commerce platforms using text, images, or links to guarantee you get the best deal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
            Start Searching Free <Search className="w-5 h-5" />
          </Link>
          <Link to="/dashboard" className="bg-white hover:bg-gray-50 text-dark border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2">
            Try Demo
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32">
        <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-3">Compare Instantly</h3>
          <p className="text-gray-600">We check Amazon, Walmart, and BestBuy in seconds to find the best value product for you.</p>
        </div>
        
        <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-emerald-100 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-3">Smart Image Search</h3>
          <p className="text-gray-600">See something you like in the real world? Just snap a photo and we'll find where to buy it.</p>
        </div>
        
        <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-3">Authentic Reviews</h3>
          <p className="text-gray-600">Our algorithm factors in millions of authentic reviews to ensure you only buy quality products.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
