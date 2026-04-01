import { useState } from 'react';
import { expenses as initialExpenses } from '@/utils/dummyData';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const ManagerExpenses = () => {
  const [data, setData] = useState(initialExpenses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', amount: 0, description: '' });

  const handleAdd = () => {
    if (!form.category || !form.amount) { toast.error('Fill required fields'); return; }
    setData([...data, { id: Date.now().toString(), employeeId: '0', name: form.name || 'Manager', ...form, date: new Date().toISOString().split('T')[0], status: 'pending' }]);
    setShowModal(false);
    setForm({ name: '', category: '', amount: 0, description: '' });
    toast.success('Expense added');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-sm text-muted-foreground">Team expense records</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Expense
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Employee</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Date</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
            </tr></thead>
            <tbody>
              {data.map(e => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{e.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.category}</td>
                  <td className="px-4 py-3 font-medium text-foreground">${e.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      e.status === 'approved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Add Expense</h3>
            <div className="space-y-3">
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Category" />
              <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: +e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Amount" />
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" rows={3} placeholder="Description" />
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

export default ManagerExpenses;
