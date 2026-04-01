import { Clock, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', hours: 8.5 }, { day: 'Tue', hours: 8 }, { day: 'Wed', hours: 9 },
  { day: 'Thu', hours: 7.5 }, { day: 'Fri', hours: 8 },
];

const stats = [
  { label: 'Days Present', value: '22', icon: CheckCircle2, sub: 'This month' },
  { label: 'Leaves Used', value: '2', icon: Calendar, sub: 'Of 20 total' },
  { label: 'Net Salary', value: '$7,760', icon: DollarSign, sub: 'March 2026' },
  { label: 'Hours Today', value: '6.5h', icon: Clock, sub: 'In progress' },
];

const EmployeeDashboard = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Welcome back! Here's your summary.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground/70">{s.sub}</p>
        </div>
      ))}
    </div>

    <div className="glass-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">This Week's Hours</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weekData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
          <XAxis dataKey="day" stroke="hsl(215, 16%, 47%)" fontSize={12} />
          <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214, 32%, 91%)' }} />
          <Bar dataKey="hours" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default EmployeeDashboard;
