import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type UserRole = 'superadmin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'manager' | 'employee') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapRole = (role: string): UserRole => {
  if (role === "super_admin") return "superadmin";
  if (role === "admin") return "manager";
  if (role === "employee") return "employee";
  throw new Error("Invalid role from backend");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ================= LOGIN =================
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) return false;

      const newUser: User = {
        id: String(data.id),
        name: data.name,
        email,
        role: mapRole(data.role)
      };

      setUser(newUser);
      localStorage.setItem("hrm_user", JSON.stringify(newUser));
      return true;

    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  }, []);

  // ================= REGISTER =================
  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
    role: 'manager' | 'employee'
  ): Promise<void> => {
    const backendRole = role === "manager" ? "admin" : "employee";

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password, role: backendRole })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    await login(email, password);
  }, [login]);

  // ================= LOGOUT =================
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("hrm_user");
  }, []);

  // ================= RESTORE FROM SESSION =================
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include"
        });

        if (!res.ok) { setUser(null); return; }

        const data = await res.json();
        setUser({
          id: String(data.id),
          name: data.name,
          email: data.email,
          role: mapRole(data.role)
        });

      } catch {
        setUser(null);
      }
    };

    checkSession();
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