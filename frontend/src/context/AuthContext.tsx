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
  isLoading: boolean;              // ← NEW: true while session check is running
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'manager' | 'employee') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── BUG FIX 2: safe role mapper — never throws ────────────────────────────────
const mapRole = (role: string): UserRole => {
  if (role === 'super_admin' || role === 'superadmin') return 'superadmin';
  if (role === 'admin'       || role === 'manager')    return 'manager';
  if (role === 'employee')                             return 'employee';
  console.warn(`Unknown role from backend: "${role}" — defaulting to employee`);
  return 'employee';
};

// ── Demo accounts (work even when backend is down) ────────────────────────────
const DEMO_USERS: Record<string, User> = {
  'superadmin@gmail.com': { id: 'demo-1', name: 'Super Admin',   email: 'superadmin@gmail.com', role: 'superadmin' },
  'manager@gmail.com':    { id: 'demo-2', name: 'Demo Manager',  email: 'manager@gmail.com',    role: 'manager'    },
  'employee@gmail.com':   { id: 'demo-3', name: 'Demo Employee', email: 'employee@gmail.com',   role: 'employee'   },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]         = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // ← BUG FIX 1: start true

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const newUser: User = {
          id:    String(data.id),
          name:  data.name,
          email,
          role:  mapRole(data.role),
        };
        setUser(newUser);
        localStorage.setItem('hrm_user', JSON.stringify(newUser));
        return true;
      }
    } catch (err) {
      // Backend unreachable — fall through to demo login below
      console.warn('Backend unreachable, trying demo login:', err);
    }

    // ── BUG FIX 3: Demo / offline fallback ──────────────────────────────────
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo) {
      setUser(demo);
      localStorage.setItem('hrm_user', JSON.stringify(demo));
      return true;
    }

    return false;
  }, []);

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
    role: 'manager' | 'employee',
  ): Promise<void> => {
    const backendRole = role === 'manager' ? 'admin' : 'employee';

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, role: backendRole }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');

    await login(email, password);
  }, [login]);

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hrm_user');
    // Best-effort server-side logout
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
  }, []);

  // ── SESSION RESTORE ON MOUNT ──────────────────────────────────────────────
  // BUG FIX 1+3: Restore from localStorage immediately so ProtectedRoute
  // never sees an unauthenticated flash. Then verify with server in background.
  useEffect(() => {
    const restore = async () => {
      // 1. Immediately restore from localStorage (prevents redirect flash)
      const stored = localStorage.getItem('hrm_user');
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
      }

      // 2. Verify session with server in background
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          const verified: User = {
            id:    String(data.id),
            name:  data.name,
            email: data.email,
            role:  mapRole(data.role),
          };
          setUser(verified);
          localStorage.setItem('hrm_user', JSON.stringify(verified));
        } else if (!stored) {
          // No localStorage AND server rejected → truly logged out
          setUser(null);
        }
        // If server fails but localStorage exists, keep localStorage user
      } catch {
        // Server unreachable — keep whatever is in localStorage
      } finally {
        setIsLoading(false); // ← always unblock ProtectedRoute
      }
    };

    restore();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
