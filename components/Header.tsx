
import React from 'react';
import { View, User } from '../types';
import { User as UserIcon, Award, Home as HomeIcon, LogOut, MessageSquare } from 'lucide-react';
import Logo from './Logo';

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
    { label: 'Contact', view: View.CONTACT, icon: MessageSquare },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(View.HOME)}
        >
          <Logo className="w-10 h-10" showText={false} />
          <span className="text-xl font-bold text-[#84CC16] tracking-tight">Xtrema</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentView === item.view 
                ? 'text-[#84CC16]' 
                : 'text-slate-500 hover:text-[#84CC16]'
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
          <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-[#84CC16] overflow-hidden cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
             <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=84cc16&color=fff`} alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
