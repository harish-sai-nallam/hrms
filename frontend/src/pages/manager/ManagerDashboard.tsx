import { useMemo } from 'react';
import { Users, Clock, Gift, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAllData from '@/utils/dummyData';

const ManagerDashboard = () => {
  const { employees, attendance, holidays } = useAllData();

  // Today's date string e.g. "2026-04-02"
  const today = new Date().toISOString().split('T')[0];

  // Count employees present today
  const presentToday = useMemo(
    () => attendance.filter((a: any) => a.date === today && a.status === 'present').length,
    [attendance, today]
  );

  // Upcoming birthdays in next 30 days
  const upcomingBirthdays = useMemo(() => {
    const now = new Date();
    const in30 = new Date(now);
    in30.setDate(in30.getDate() + 30);
    return employees
      .filter((e: any) => {
        if (!e.dateOfBirth && !e.dob) return false;
        const dobStr = e.dateOfBirth || e.dob;
        const dob = new Date(dobStr);
        const thisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
        return thisYear >= now && thisYear <= in30;
      })
      .map((e: any) => {
        const dobStr = e.dateOfBirth || e.dob;
        const dob = new Date(dobStr);
        const thisYear = new Date(new Date().getFullYear(), dob.getMonth(), dob.getDate());
        return {
          name: e.name,
          date: thisYear.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };
      });
  }, [employees]);

  // Holidays this month
  const holidaysThisMonth = useMemo(() => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return holidays.filter((h: any) => {
      const d = new Date(h.date);
      return d.getMonth() === month && d.getFullYear() === year;
    }).length;
  }, [holidays]);

  // Build weekly attendance chart from attendance records
  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const now = new Date();
    // Get this week's Mon–Fri dates
    const dayOfWeek = now.getDay(); // 0=Sun
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    return days.map((day, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + mondayOffset + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayRecords = attendance.filter((a: any) => a.date === dateStr);
      const present = dayRecords.filter((a: any) => a.status === 'present' || a.status === 'Present').length;
      const absent = dayRecords.filter((a: any) => a.status === 'absent' || a.status === 'Absent').length;
      return { day, present, absent };
    });
  }, [attendance]);

  const stats = [
    { label: 'Total Employees', value: employees.length.toString(), icon: Users, color: 'text-primary' },
    { label: 'Present Today', value: presentToday.toString(), icon: Clock, color: 'text-success' },
    { label: 'Upcoming Birthdays', value: upcomingBirthdays.length.toString(), icon: Gift, color: 'text-warning' },
    { label: 'Holidays This Month', value: holidaysThisMonth.toString(), icon: Calendar, color: 'text-info' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your team</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
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
              <Bar dataKey="present" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Upcoming Birthdays 🎂</h3>
          {upcomingBirthdays.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming birthdays in the next 30 days.</p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
