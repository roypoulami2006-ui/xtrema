
import React from 'react';
import { View, User } from '../types';
import { Leaf, User as UserIcon, Award, Home as HomeIcon, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onLogout, user }) => {
  const navItems = [
    { label: 'Home', view: View.HOME, icon: HomeIcon },
    { label: 'Profile', view: View.PROFILE, icon: UserIcon },
    { label: 'Points', view: View.POINTS, icon: Award },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(View.HOME)}
        >
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-100">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-green-700 tracking-tight">Xtrema</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentView === item.view 
                ? 'text-green-600' 
                : 'text-slate-500 hover:text-green-600'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-500 overflow-hidden cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
             <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff`} alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
