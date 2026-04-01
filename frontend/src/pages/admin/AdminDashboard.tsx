import { useEffect, useState } from 'react';
import { Building2, Users, CreditCard, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard = () => {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/api/companies", { credentials: "include" }),
          fetch("http://localhost:5000/api/employees", { credentials: "include" })
        ]);

        const companiesData = await companiesRes.json();
        const usersData = await usersRes.json();

        // ================= PIE DATA =================
        const planCounts = { free: 0, monthly: 0, yearly: 0 };

        companiesData.forEach(c => {
          const plan = c.plan?.toLowerCase();
          if (plan === "free") planCounts.free++;
          if (plan === "monthly") planCounts.monthly++;
          if (plan === "yearly") planCounts.yearly++;
        });

        setPieData([
          { name: 'Free', value: planCounts.free, color: 'hsl(215, 16%, 47%)' },
          { name: 'Monthly', value: planCounts.monthly, color: 'hsl(217, 91%, 60%)' },
          { name: 'Yearly', value: planCounts.yearly, color: 'hsl(142, 76%, 36%)' },
        ]);

        // ================= BAR DATA =================
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const counts = {};
        months.forEach(m => counts[m] = 0);

        companiesData.forEach(c => {
          if (!c.created_at) return;
          const date = new Date(c.created_at);
          if (isNaN(date)) return;

          const month = date.toLocaleString('default', { month: 'short' });
          if (counts[month] !== undefined) counts[month]++;
        });

        setBarData(months.map(m => ({
          month: m,
          companies: counts[m]
        })));

        // ================= STATS =================
        setStats([
          {
            label: 'Total Companies',
            value: companiesData.length,
            icon: Building2,
            change: ''
          },
          {
            label: 'Total Users',
            value: usersData.length,
            icon: Users,
            change: ''
          },
          {
            label: 'Active Subscriptions',
            value: companiesData.filter(c => c.status === "active").length,
            icon: CreditCard,
            change: ''
          },
          {
            label: 'Revenue',
            value: '$0',
            icon: TrendingUp,
            change: ''
          }
        ]);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your SaaS platform</p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              {s.change && (
                <span className="text-xs font-medium text-success">{s.change}</span>
              )}
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* BAR CHART */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Company Registrations
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
              <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="companies" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Plan Distribution
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;