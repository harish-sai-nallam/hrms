import { useState } from 'react';
import { attendanceRecords } from '@/utils/dummyData';
import { Search } from 'lucide-react';

const ManagerAttendance = () => {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = attendanceRecords.filter(a => {
    const matchName = a.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = !dateFilter || a.date === dateFilter;
    return matchName && matchDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-sm text-muted-foreground">Team attendance records</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="rounded-lg border bg-card pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Search..." />
        </div>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="rounded-lg border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Employee</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Date</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Clock In</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Clock Out</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Hours</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.clockIn || '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.clockOut || '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.hours}h</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      a.status === 'present' ? 'bg-success/10 text-success' : a.status === 'late' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerAttendance;
