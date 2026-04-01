import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal information</p>
      </div>

      <div className="glass-card max-w-2xl p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary capitalize">{user.role}</span>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: user.email },
            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, label: 'Location', value: 'New York, NY' },
            { icon: Calendar, label: 'Joined', value: 'January 2024' },
            { icon: User, label: 'Department', value: 'Operations' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-accent/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
