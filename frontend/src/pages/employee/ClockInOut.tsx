import { useState } from 'react';
import { Clock, Play, Square } from 'lucide-react';
import { toast } from 'sonner';

const ClockInOut = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);

  const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleClockIn = () => {
    const time = now();
    setClockInTime(time);
    setClockOutTime(null);
    setClockedIn(true);
    toast.success(`Clocked in at ${time}`);
  };

  const handleClockOut = () => {
    const time = now();
    setClockOutTime(time);
    setClockedIn(false);
    toast.success(`Clocked out at ${time}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Clock In / Out</h1>
        <p className="text-sm text-muted-foreground">Track your working hours</p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="glass-card p-8 text-center">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-10 w-10 text-primary" />
          </div>

          <p className="text-3xl font-bold text-foreground mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-accent/50 p-4">
              <p className="text-xs text-muted-foreground">Clock In</p>
              <p className="text-lg font-semibold text-foreground">{clockInTime || '--:--'}</p>
            </div>
            <div className="rounded-lg bg-accent/50 p-4">
              <p className="text-xs text-muted-foreground">Clock Out</p>
              <p className="text-lg font-semibold text-foreground">{clockOutTime || '--:--'}</p>
            </div>
          </div>

          {!clockedIn ? (
            <button onClick={handleClockIn}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-success py-3 text-sm font-semibold text-success-foreground hover:bg-success/90 transition-colors">
              <Play className="h-4 w-4" /> Clock In
            </button>
          ) : (
            <button onClick={handleClockOut}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-destructive py-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors">
              <Square className="h-4 w-4" /> Clock Out
            </button>
          )}

          {clockedIn && (
            <p className="mt-4 text-sm text-success font-medium">● Currently working</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
