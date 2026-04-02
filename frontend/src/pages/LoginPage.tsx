import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Zap } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Super Admin', email: 'superadmin@gmail.com', role: 'superadmin', path: '/admin' },
  { label: 'Manager',     email: 'manager@gmail.com',    role: 'manager',    path: '/manager' },
  { label: 'Employee',    email: 'employee@gmail.com',   role: 'employee',   path: '/employee' },
];

const LoginPage = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const doLogin = async (emailVal: string, passwordVal: string) => {
    setLoading(true);
    const success = await login(emailVal, passwordVal);
    setLoading(false);

    if (success) {
      toast.success('Login successful!');
      const stored = localStorage.getItem('hrm_user');
      const user   = stored ? JSON.parse(stored) : null;
      const paths: Record<string, string> = {
        superadmin: '/admin',
        manager:    '/manager',
        employee:   '/employee',
      };
      navigate(paths[user?.role] || '/');
    } else {
      toast.error('Invalid credentials. Please check your email and password.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    await doLogin(email, password);
  };

  // One-click demo login — fills fields AND submits
  const handleDemoLogin = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword('demo1234');
    await doLogin(account.email, 'demo1234');
  };

  return (
    <div className="flex min-h-screen">
      {/* ── Form side ── */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="mb-8 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">SI</div>
              <span className="font-bold text-foreground">SHNOOR INTERNATIONAL</span>
            </Link>
            <h1 className="mt-8 text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg border bg-card px-4 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* ── Quick Demo Login ── */}
          <div className="mt-6 rounded-xl border bg-accent/40 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-warning" />
              <p className="text-xs font-semibold text-foreground">Quick Demo Login</p>
              <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                Works offline
              </span>
            </div>
            <div className="grid gap-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  type="button"
                  disabled={loading}
                  onClick={() => handleDemoLogin(acc)}
                  className="flex items-center justify-between rounded-lg border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:border-primary/30 disabled:opacity-50"
                >
                  <div>
                    <p className="font-medium text-foreground">{acc.label}</p>
                    <p className="text-xs text-muted-foreground">{acc.email}</p>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Login →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
          </p>
        </div>
      </div>

      {/* ── Hero side ── */}
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-primary to-primary/70 lg:flex">
        <div className="max-w-md text-center text-primary-foreground p-8">
          <h2 className="mb-4 text-3xl font-bold">Manage Your Workforce</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            One platform to manage employees, attendance, payroll, and everything HR.
            Join hundreds of companies already using our solution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
