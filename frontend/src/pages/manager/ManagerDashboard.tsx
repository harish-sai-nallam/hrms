import { Users, Clock, Gift, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { day: 'Mon', present: 42, absent: 3 },
  { day: 'Tue', present: 40, absent: 5 },
  { day: 'Wed', present: 43, absent: 2 },
  { day: 'Thu', present: 41, absent: 4 },
  { day: 'Fri', present: 38, absent: 7 },
];

const upcomingBirthdays = [
  { name: 'Alice Johnson', date: 'Apr 5' },
  { name: 'Frank Lee', date: 'Apr 12' },
  { name: 'Eva Martinez', date: 'Apr 18' },
];

const stats = [
  { label: 'Total Employees', value: '45', icon: Users, color: 'text-primary' },
  { label: 'Present Today', value: '40', icon: Clock, color: 'text-success' },
  { label: 'Upcoming Birthdays', value: '3', icon: Gift, color: 'text-warning' },
  { label: 'Holidays This Month', value: '1', icon: Calendar, color: 'text-info' },
];

const ManagerDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your team</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-accent`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 47%)" fontSize={12} />
              <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214, 32%, 91%)' }} />
              <Bar dataKey="present" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Upcoming Birthdays 🎂</h3>
          <div className="space-y-3">
            {upcomingBirthdays.map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-accent/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {b.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{b.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{b.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
