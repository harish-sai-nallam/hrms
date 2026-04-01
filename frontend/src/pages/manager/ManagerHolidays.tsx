import { useState } from 'react';
import { holidays as initialHolidays } from '@/utils/dummyData';
import { Plus, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ManagerHolidays = () => {
  const [data, setData] = useState(initialHolidays);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', type: 'Public' });

  const handleAdd = () => {
    if (!form.name || !form.date) { toast.error('Fill all fields'); return; }
    setData([...data, { id: Date.now().toString(), ...form }]);
    setShowModal(false);
    setForm({ name: '', date: '', type: 'Public' });
    toast.success('Holiday added');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Holidays</h1>
          <p className="text-sm text-muted-foreground">Company holiday calendar</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Holiday
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map(h => (
          <div key={h.id} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{h.type}</span>
            </div>
            <h3 className="font-medium text-foreground">{h.name}</h3>
            <p className="text-sm text-muted-foreground">{h.date}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Add Holiday</h3>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Holiday name" />
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>Public</option><option>Company</option><option>Optional</option>
              </select>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent">Cancel</button>
              <button onClick={handleAdd} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerHolidays;
