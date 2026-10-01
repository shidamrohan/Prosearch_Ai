import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-dark">ProSearch</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium px-3 py-2 transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center text-sm font-semibold text-dark">
                    <User className="w-4 h-4 mr-1 text-primary" />
                    {user ? user.name : 'Demo User'}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium px-3 py-2 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-dark hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
