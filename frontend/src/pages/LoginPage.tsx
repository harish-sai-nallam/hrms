import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success('Login successful!');
      const user = JSON.parse(localStorage.getItem('hrm_user') || '{}');
      const paths: Record<string, string> = { superadmin: '/admin', manager: '/manager', employee: '/employee' };
      navigate(paths[user.role] || '/');
    } else {
      toast.error('Invalid credentials. Try superadmin@gmail.com, manager@gmail.com, or employee@gmail.com');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="mb-8 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">SI</div>
              <span className="font-bold text-foreground">SHNOOR INTERNATIONAL</span>
            </Link>
            <h1 className="mt-8 text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border bg-card px-4 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-accent/50 p-4">
            <p className="mb-2 text-xs font-medium text-foreground">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>superadmin@gmail.com (Super Admin)</p>
              <p>manager@gmail.com (Manager)</p>
              <p>employee@gmail.com (Employee)</p>
              <p className="text-muted-foreground/60">Password: any</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-primary to-primary/70 lg:flex">
        <div className="max-w-md text-center text-primary-foreground p-8">
          <h2 className="mb-4 text-3xl font-bold">Manage Your Workforce</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            One platform to manage employees, attendance, payroll, and everything HR. Join hundreds of companies already using our solution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
