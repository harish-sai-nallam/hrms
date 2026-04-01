import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'manager' | 'employee'>('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill all fields'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    const success = await register(name, email, password, role);
    setLoading(false);
    if (success) {
      toast.success('Registration successful!');
      navigate(role === 'manager' ? '/manager' : '/employee');
    } else {
      toast.error('Email already exists. Try logging in instead.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-primary to-primary/70 lg:flex">
        <div className="max-w-md text-center text-primary-foreground p-8">
          <h2 className="mb-4 text-3xl font-bold">Join Our Platform</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Create an account and start managing your HR operations with ease. Get started in minutes.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="mb-8 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">SI</div>
              <span className="font-bold text-foreground">SHNOOR INTERNATIONAL</span>
            </Link>
            <h1 className="mt-8 text-2xl font-bold text-foreground">Create an account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Get started with your HR management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="John Doe" />
            </div>
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
                  placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setRole('employee')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    role === 'employee' ? 'border-primary bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-accent'
                  }`}>
                  Employee
                </button>
                <button type="button" onClick={() => setRole('manager')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    role === 'manager' ? 'border-primary bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-accent'
                  }`}>
                  Manager
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
