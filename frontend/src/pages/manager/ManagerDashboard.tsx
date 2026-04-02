import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Gift, Calendar, Briefcase, DollarSign, LogIn, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAllData from '@/utils/dummyData';

const TOTAL_ANNUAL_LEAVES = 20;

const ManagerDashboard = () => {
  const { employees, attendance, holidays, leaves, payslip } = useAllData();
  const today = new Date().toISOString().split('T')[0];

  // ── My Self: today's clock-in status ──────────────────────────────────────
  const [myClockedIn, setMyClockedIn] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/api/attendance/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        const todayRec = data.find((a: any) => a.date === today);
        setMyClockedIn(!!(todayRec?.clockIn || todayRec?.checkIn));
      })
      .catch(() => {});
  }, [today]);

  // ── My Self: leave stats ──────────────────────────────────────────────────
  const myUsedLeaves = useMemo(
    () => leaves.filter((l: any) => l.status === 'approved' || l.status === 'Approved').length,
    [leaves]
  );
  const myLeaveBalance = TOTAL_ANNUAL_LEAVES - myUsedLeaves;

  // ── Team stats ────────────────────────────────────────────────────────────
  const presentToday = useMemo(
    () => attendance.filter((a: any) => a.date === today &&
      (a.status === 'present' || a.status === 'Present')).length,
    [attendance, today]
  );

  const upcomingBirthdays = useMemo(() => {
    const now = new Date();
    const in30 = new Date(now); in30.setDate(in30.getDate() + 30);
    return employees
      .filter((e: any) => {
        const dobStr = e.dateOfBirth || e.dob;
        if (!dobStr) return false;
        const dob = new Date(dobStr);
        const thisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
        return thisYear >= now && thisYear <= in30;
      })
      .map((e: any) => {
        const dob = new Date(e.dateOfBirth || e.dob);
        return {
          name: e.name,
          date: new Date(new Date().getFullYear(), dob.getMonth(), dob.getDate())
            .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };
      });
  }, [employees]);

  const holidaysThisMonth = useMemo(() => {
    const now = new Date();
    return holidays.filter((h: any) => {
      const d = new Date(h.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [holidays]);

  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const now = new Date();
    const mondayOffset = now.getDay() === 0 ? -6 : 1 - now.getDay();
    return days.map((day, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + mondayOffset + i);
      const dateStr = d.toISOString().split('T')[0];
      const recs = attendance.filter((a: any) => a.date === dateStr);
      return {
        day,
        present: recs.filter((a: any) => a.status === 'present' || a.status === 'Present').length,
        absent:  recs.filter((a: any) => a.status === 'absent'  || a.status === 'Absent').length,
      };
    });
  }, [attendance]);

  // ── Stat cards ────────────────────────────────────────────────────────────
  const teamStats = [
    { label: 'Total Employees',     value: employees.length.toString(),       icon: Users,    color: 'text-primary' },
    { label: 'Present Today',       value: presentToday.toString(),           icon: Clock,    color: 'text-success' },
    { label: 'Upcoming Birthdays',  value: upcomingBirthdays.length.toString(), icon: Gift,  color: 'text-warning' },
    { label: 'Holidays This Month', value: holidaysThisMonth.toString(),      icon: Calendar, color: 'text-info' },
  ];

  const selfStats = [
    {
      label: 'My Attendance',
      value: myClockedIn ? 'Checked In' : 'Not Checked In',
      icon: LogIn,
      color: myClockedIn ? 'text-success' : 'text-muted-foreground',
      to: '/manager/my-attendance',
      sub: "Today's status",
    },
    {
      label: 'Leave Balance',
      value: `${myLeaveBalance} days`,
      icon: Briefcase,
      color: 'text-primary',
      to: '/manager/my-leaves',
      sub: `${myUsedLeaves} used of ${TOTAL_ANNUAL_LEAVES}`,
    },
    {
      label: 'My Salary',
      value: payslip ? `$${payslip.netSalary ?? 0}` : '—',
      icon: DollarSign,
      color: 'text-success',
      to: '/manager/my-salary',
      sub: 'Net pay this month',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your team and your personal stats</p>
      </div>

      {/* ══════════════ SECTION 1 — TEAM OVERVIEW ══════════════ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h2 className="text-base font-semibold text-foreground">Team Overview</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamStats.map((s, i) => (
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
            <h3 className="mb-4 text-base font-semibold text-foreground">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                <XAxis dataKey="day" stroke="hsl(215,16%,47%)" fontSize={12} />
                <YAxis stroke="hsl(215,16%,47%)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214,32%,91%)' }} />
                <Bar dataKey="present" fill="hsl(142,76%,36%)" radius={[4,4,0,0]} name="Present" />
                <Bar dataKey="absent"  fill="hsl(0,84%,60%)"   radius={[4,4,0,0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">Upcoming Birthdays 🎂</h3>
            {upcomingBirthdays.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No upcoming birthdays in the next 30 days.</p>
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
      </section>

      {/* ══════════════ SECTION 2 — MY PERSONAL STATS ══════════════ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-warning" />
          <h2 className="text-base font-semibold text-foreground">My Personal Stats</h2>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">You as an employee</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {selfStats.map((s, i) => (
            <Link key={i} to={s.to} className="stat-card group flex flex-col gap-0 hover:border-primary/40 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-3 text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ManagerDashboard;
