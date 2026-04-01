import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import {
  LayoutDashboard, Users, Calendar, Clock, DollarSign, FileText, Settings,
  Building2, CreditCard, Palette, ShieldCheck, LogOut, Menu, X, ChevronDown,
  Briefcase, Gift, UserMinus, Package, User
} from 'lucide-react';
import { toast } from 'sonner';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  children?: { to: string; label: string }[];
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  superadmin: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/companies', icon: Building2, label: 'Companies' },
    { to: '/admin/admins', icon: ShieldCheck, label: 'Admin Management' },
    { to: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { to: '/admin/customization', icon: Palette, label: 'UI Customization' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ],
  manager: [
    { to: '/manager', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/manager/employees', icon: Users, label: 'Employees' },
    { to: '/manager/attendance', icon: Clock, label: 'Attendance' },
    { to: '/manager/holidays', icon: Calendar, label: 'Holidays' },
    { to: '/manager/expenses', icon: DollarSign, label: 'Expenses' },
    { to: '/manager/policies', icon: FileText, label: 'Policies' },
    { to: '/manager/offboarding', icon: UserMinus, label: 'Offboarding' },
    {
      to: '#', icon: User, label: 'Self Service',
      children: [
        { to: '/manager/my-attendance', label: 'My Attendance' },
        { to: '/manager/my-leaves', label: 'My Leaves' },
        { to: '/manager/my-salary', label: 'My Salary' },
        { to: '/manager/profile', label: 'Profile' },
      ],
    },
  ],
  employee: [
    { to: '/employee', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employee/clock', icon: Clock, label: 'Clock In/Out' },
    { to: '/employee/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/employee/leaves', icon: Briefcase, label: 'Leaves' },
    { to: '/employee/salary', icon: DollarSign, label: 'Salary' },
    { to: '/employee/holidays', icon: Gift, label: 'Holidays' },
    { to: '/employee/policies', icon: FileText, label: 'Policies' },
    { to: '/employee/expenses', icon: Package, label: 'Expenses' },
    { to: '/employee/profile', icon: User, label: 'Profile' },
  ],
};

const roleTitles: Record<UserRole, string> = {
  superadmin: 'Super Admin',
  manager: 'Manager',
  employee: 'Employee',
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  if (!user) return null;
  const navItems = roleNavItems[user.role];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-card transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}`}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">SI</div>
              <span className="text-sm font-bold text-foreground">SHNOOR INTL</span>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden rounded-lg p-1.5 text-muted-foreground hover:bg-accent md:block">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                    className="sidebar-item sidebar-item-inactive w-full justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {sidebarOpen && item.label}
                    </span>
                    {sidebarOpen && <ChevronDown className={`h-3 w-3 transition-transform ${expandedMenu === item.label ? 'rotate-180' : ''}`} />}
                  </button>
                  {expandedMenu === item.label && sidebarOpen && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.to} to={child.to}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive(child.to) ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-muted-foreground hover:bg-accent'
                          }`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.to}
                  className={`sidebar-item ${isActive(item.to) ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  {sidebarOpen && item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t p-3">
          <button onClick={handleLogout}
            className="sidebar-item sidebar-item-inactive w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">{roleTitles[user.role]} Panel</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
