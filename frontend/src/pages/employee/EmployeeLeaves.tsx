import { useState } from 'react';
import { leaveRequests } from '@/utils/dummyData';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const EmployeeLeaves = () => {
  const [data, setData] = useState(leaveRequests);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'Sick Leave', from: '', to: '', reason: '' });

  const handleApply = () => {
    if (!form.from || !form.to || !form.reason) { toast.error('Fill all fields'); return; }
    const from = new Date(form.from);
    const to = new Date(form.to);
    const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setData([...data, { id: Date.now().toString(), employeeId: '3', name: 'You', ...form, days, status: 'pending' }]);
    setShowModal(false);
    setForm({ type: 'Sick Leave', from: '', to: '', reason: '' });
    toast.success('Leave request submitted');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaves</h1>
          <p className="text-sm text-muted-foreground">Apply and track your leaves</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Apply Leave
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stat-card"><p className="text-2xl font-bold text-foreground">20</p><p className="text-sm text-muted-foreground">Total</p></div>
        <div className="stat-card"><p className="text-2xl font-bold text-warning">5</p><p className="text-sm text-muted-foreground">Used</p></div>
        <div className="stat-card"><p className="text-2xl font-bold text-success">15</p><p className="text-sm text-muted-foreground">Remaining</p></div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">From</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">To</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Days</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Reason</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
            </tr></thead>
            <tbody>
              {data.map(l => (
                <tr key={l.id} className="border-b last:border-0 hover:bg-accent/30">
                  <td className="px-4 py-3 text-foreground">{l.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.from}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.to}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.days}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[150px] truncate">{l.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      l.status === 'approved' ? 'bg-success/10 text-success' : l.status === 'rejected' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                    }`}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Apply for Leave</h3>
            <div className="space-y-3">
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>Sick Leave</option><option>Annual Leave</option><option>Personal Leave</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })}
                  className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
                <input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })}
                  className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" rows={3} placeholder="Reason" />
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent">Cancel</button>
              <button onClick={handleApply} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeaves;
