import { useState } from 'react';
import { companies } from '@/utils/dummyData';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

const CompanyManagement = () => {
  const [data, setData] = useState(companies);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', plan: 'free', employees: 0 });

  const filtered = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    if (!form.name) { toast.error('Name is required'); return; }
    if (editId) {
      setData(data.map(c => c.id === editId ? { ...c, ...form } : c));
      toast.success('Company updated');
    } else {
      setData([...data, { id: Date.now().toString(), ...form, status: 'active', expiry: 'N/A' }]);
      toast.success('Company added');
    }
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', plan: 'free', employees: 0 });
  };

  const handleEdit = (c: typeof companies[0]) => {
    setEditId(c.id);
    setForm({ name: c.name, plan: c.plan, employees: c.employees });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(c => c.id !== id));
    toast.success('Company removed');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Company Management</h1>
          <p className="text-sm text-muted-foreground">Manage registered companies</p>
        </div>
        <button onClick={() => { setEditId(null); setForm({ name: '', plan: 'free', employees: 0 }); setShowModal(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Company
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-card pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Search companies..." />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Company</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Plan</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Employees</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">{c.plan}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{c.employees}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === 'active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>{c.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(c)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(c.id)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
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
            <h3 className="mb-4 text-lg font-semibold text-foreground">{editId ? 'Edit' : 'Add'} Company</h3>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Company name" />
              <select value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring bg-card">
                <option value="free">Free</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option>
              </select>
              <input type="number" value={form.employees} onChange={e => setForm({ ...form, employees: +e.target.value })}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Employees" />
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent">Cancel</button>
              <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
