import React from 'react';
import type { User } from '../types';
import { Button } from './ui/Button';
import { LogOut } from './icons/LogOutIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto max-w-xl px-4">
        <div className="flex items-center justify-between h-16">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="relative flex-1 mx-4">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input 
                type="text"
                placeholder="Search for something here..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <Button onClick={onLogout} variant="ghost" size="icon" className="rounded-full">
            <LogOut className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;