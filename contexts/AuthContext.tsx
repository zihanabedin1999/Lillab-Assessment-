import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password?: string, dob?: string, gender?: string) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    const storedUser = localStorage.getItem('social-feed-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password?: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('social-feed-user', JSON.stringify(foundUser));
          resolve(foundUser);
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('social-feed-user');
  };

  const signup = (name: string, email: string, password?: string, dob?: string, gender?: string): Promise<User> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          reject(new Error('Email already exists'));
          return;
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          username: email.split('@')[0],
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        setUser(newUser);
        localStorage.setItem('social-feed-user', JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};