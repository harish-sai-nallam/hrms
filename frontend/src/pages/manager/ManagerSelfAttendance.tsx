import { useState } from 'react';
import { Clock, LogIn, LogOut, Timer, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceEntry {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent';
}

const pastRecords: AttendanceEntry[] = [
  { id: '1', date: '2026-03-31', checkIn: '09:02', checkOut: '17:35', status: 'Present' },
  { id: '2', date: '2026-03-28', checkIn: '09:45', checkOut: '17:10', status: 'Late' },
  { id: '3', date: '2026-03-27', checkIn: '08:55', checkOut: '17:30', status: 'Present' },
  { id: '4', date: '2026-03-26', checkIn: '09:00', checkOut: '17:00', status: 'Present' },
  { id: '5', date: '2026-03-25', checkIn: '09:10', checkOut: '17:20', status: 'Present' },
];

const ManagerSelfAttendance = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [totalHours, setTotalHours] = useState<string | null>(null);

  const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleClockIn = () => {
    const t = now();
    setClockedIn(true);
    setCheckInTime(t);
    setTotalHours(null);
    toast.success(`Clocked in at ${t}`);
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setTotalHours('8h 15m');
    toast.success(`Clocked out at ${now()}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
        <p className="text-sm text-muted-foreground">Clock in/out and view your attendance history</p>
      </div>

      {/* Clock In/Out Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className={`text-lg font-semibold ${clockedIn ? 'text-success' : 'text-muted-foreground'}`}>
              {clockedIn ? 'Checked In' : 'Checked Out'}
            </p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10">
            <LogIn className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Check-in</p>
            <p className="text-lg font-semibold text-foreground">{checkInTime || '—'}</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10">
            <Timer className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-lg font-semibold text-foreground">{totalHours || '—'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleClockIn} disabled={clockedIn}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <LogIn className="h-4 w-4" /> Clock In
        </button>
        <button onClick={handleClockOut} disabled={!clockedIn}
          className="inline-flex items-center gap-2 rounded-lg border border-input px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <LogOut className="h-4 w-4" /> Clock Out
        </button>
      </div>

      {/* Attendance History */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Attendance History</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-accent/50">
                  <th className="px-4 py-3 text-left font-medium text-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Check In</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Check Out</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {pastRecords.map(a => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.checkIn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.checkOut}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        a.status === 'Present' ? 'bg-success/10 text-success' :
                        a.status === 'Late' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSelfAttendance;
