import { holidays } from '@/utils/dummyData';
import { Calendar } from 'lucide-react';

const EmployeeHolidays = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Holidays</h1>
      <p className="text-sm text-muted-foreground">Company holiday calendar</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {holidays.map(h => (
        <div key={h.id} className="glass-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">{h.name}</h3>
          <p className="text-sm text-muted-foreground">{h.date}</p>
          <span className="mt-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground">{h.type}</span>
        </div>
      ))}
    </div>
  </div>
);

export default EmployeeHolidays;
