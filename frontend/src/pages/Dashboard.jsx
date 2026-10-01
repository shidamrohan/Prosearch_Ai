import React, { useState } from 'react';
import { Search, Camera, Link as LinkIcon, ShoppingCart, Star } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('text'); // text, image, link
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query && activeTab !== 'image') return;
    
    setLoading(true);
    setResults([]);
    setShowAll(false);
    
    try {
      let endpoint = 'http://localhost:5000/api/search/text';
      let payload = { query };

      if (activeTab === 'link') {
        endpoint = 'http://localhost:5000/api/search/link';
        payload = { url: query };
      } else if (activeTab === 'image') {
        endpoint = 'http://localhost:5000/api/search/image';
        payload = { imageData: 'mock-base64-image-data' }; // Normally from file input
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.results) {
        setResults(data.results);
      } else {
        throw new Error('Backend failed');
      }
    } catch (error) {
      console.error(error);
      alert('Search failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const displayedResults = showAll ? results : results.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="glass-card rounded-3xl p-8 mb-12 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Find the Best Deals Across the Web
        </h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          <button 
            onClick={() => { setActiveTab('text'); setQuery(''); }}
            className={`flex items-center px-6 py-3 rounded-full transition-all ${activeTab === 'text' ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Search className="w-5 h-5 mr-2" /> Text Search
          </button>
          <button 
            onClick={() => { setActiveTab('image'); setQuery(''); }}
            className={`flex items-center px-6 py-3 rounded-full transition-all ${activeTab === 'image' ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Camera className="w-5 h-5 mr-2" /> Camera / Image
          </button>
          <button 
            onClick={() => { setActiveTab('link'); setQuery(''); }}
            className={`flex items-center px-6 py-3 rounded-full transition-all ${activeTab === 'link' ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <LinkIcon className="w-5 h-5 mr-2" /> Paste Link
          </button>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          {activeTab === 'text' && (
            <input 
              type="text" 
              placeholder="What product are you looking for?" 
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-lg shadow-sm transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {activeTab === 'image' && (
            <div 
              onClick={handleSearch}
              className="w-full px-6 py-12 rounded-2xl border-2 border-dashed border-secondary/50 flex flex-col items-center justify-center text-gray-500 hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer bg-white">
              <Camera className="w-12 h-12 mb-4 text-secondary" />
              <p className="font-medium text-lg text-dark">Click to simulate snapping a photo</p>
              <p className="text-sm mt-2">In production, this opens device camera or file picker.</p>
            </div>
          )}
          {activeTab === 'link' && (
            <input 
              type="url" 
              placeholder="Paste a product URL from Instagram, TikTok, etc..." 
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-lg shadow-sm transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          
          {activeTab !== 'image' && (
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-dark hover:bg-gray-800 text-white px-8 rounded-full font-bold transition-all shadow-md flex items-center justify-center min-w-[120px]">
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Wait...
                </span>
              ) : 'Search'}
            </button>
          )}
        </form>
      </div>

      {/* Results Area */}
      {results.length > 0 && (
        <div className="animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-6 flex items-center text-dark">
            <ShoppingCart className="w-6 h-6 mr-2 text-primary" /> Top Recommended Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedResults.map((product, index) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2 relative group">
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-lg shadow-orange-500/30">
                    BEST VALUE
                  </div>
                )}
                <div className="h-48 bg-gray-50 border-b border-gray-100 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.imageUrl || `https://via.placeholder.com/300x300?text=${product.platform}`} 
                    alt={product.platform}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-secondary font-bold tracking-wide uppercase mb-2">{product.platform}</div>
                  <h4 className="font-bold text-lg mb-3 text-dark line-clamp-2 leading-tight">{product.title}</h4>
                  <div className="flex items-center mb-6">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1.5 font-bold text-dark">{product.rating}</span>
                    <span className="text-gray-400 text-sm ml-2">({product.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-3xl font-black text-dark tracking-tight">${product.price.toFixed(2)}</span>
                    <a href={product.url} className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 hover:shadow-lg">
                      View Deal
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {results.length > 3 && !showAll && (
            <div className="mt-10 text-center">
              <button 
                onClick={() => setShowAll(true)}
                className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm">
                View 7 More Alternatives
              </button>
            </div>
          )}
          {showAll && (
            <div className="mt-10 text-center">
              <button 
                onClick={() => setShowAll(false)}
                className="text-gray-500 hover:text-dark font-medium transition-colors">
                Show less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
