import React from 'react';
import { Trophy } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-6 w-6" />
              <span className="text-lg font-bold">TourneyPro</span>
            </div>
            <p className="text-gray-300 text-sm">
              The ultimate platform for managing soccer tournaments, teams, and players.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/tournaments" className="text-gray-300 hover:text-white text-sm">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="/stats" className="text-gray-300 hover:text-white text-sm">
                  Statistics
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <p className="text-gray-300 text-sm mb-2">
              Have questions or need assistance?
            </p>
            <a 
              href="mailto:support@tourneypro.com" 
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              support@tourneypro.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TourneyPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;