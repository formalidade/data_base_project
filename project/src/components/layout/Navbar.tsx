import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8" />
              <span className="text-xl font-bold">TourneyPro</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/tournaments" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.includes('/tournaments') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              Tournaments
            </Link>
            
            <Link 
              to="/stats" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.includes('/stats') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              Stats
            </Link>
            
            {isAuthenticated && user ? (
              <>
                <Link 
                  to="/admin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname.includes('/admin') 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  Admin Dashboard
                </Link>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    <User className="h-4 w-4 inline mr-1" />
                    {user.username}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-300 text-blue-100 hover:bg-blue-800"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-100 hover:bg-blue-800">
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;