import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'superadmin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'manager' | 'employee') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const mockUsers: Record<string, User> = {
  'superadmin@gmail.com': { id: '1', name: 'Super Admin', email: 'superadmin@gmail.com', role: 'superadmin' },
  'manager@gmail.com': { id: '2', name: 'John Manager', email: 'manager@gmail.com', role: 'manager' },
  'employee@gmail.com': { id: '3', name: 'Jane Employee', email: 'employee@gmail.com', role: 'employee' },
};

const registeredUsers: Record<string, User> = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hrm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const found = mockUsers[email] || registeredUsers[email];
    if (found) {
      setUser(found);
      localStorage.setItem('hrm_user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: 'manager' | 'employee'): Promise<boolean> => {
    if (mockUsers[email] || registeredUsers[email]) return false;
    const newUser: User = { id: Date.now().toString(), name, email, role };
    registeredUsers[email] = newUser;
    setUser(newUser);
    localStorage.setItem('hrm_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hrm_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
