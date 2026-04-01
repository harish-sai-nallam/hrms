import { useState } from 'react';
import { employees } from '@/utils/dummyData';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { toast } from 'sonner';

const EmployeeManagement = () => {
  const [data, setData] = useState(employees);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', department: '', position: '', phone: '', salary: 0 });

  const filtered = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error('Name and email required'); return; }
    if (editId) {
      setData(data.map(e => e.id === editId ? { ...e, ...form } : e));
      toast.success('Employee updated');
    } else {
      setData([...data, { id: Date.now().toString(), ...form, status: 'active', joinDate: new Date().toISOString().split('T')[0] }]);
      toast.success('Employee added');
    }
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', email: '', department: '', position: '', phone: '', salary: 0 });
  };

  const openEdit = (e: typeof employees[0]) => {
    setEditId(e.id);
    setForm({ name: e.name, email: e.email, department: e.department, position: e.position, phone: e.phone, salary: e.salary });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employee Management</h1>
          <p className="text-sm text-muted-foreground">{data.length} employees</p>
        </div>
        <button onClick={() => { setEditId(null); setForm({ name: '', email: '', department: '', position: '', phone: '', salary: 0 }); setShowModal(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-card pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Search employees..." />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Employee</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Department</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Position</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{e.name.charAt(0)}</div>
                      <div><p className="font-medium text-foreground">{e.name}</p><p className="text-xs text-muted-foreground">{e.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.department}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.position}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      e.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(e)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { setData(data.filter(x => x.id !== e.id)); toast.success('Employee removed'); }}
                        className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
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
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{editId ? 'Edit' : 'Add'} Employee</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Full name" />
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Email" />
              <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Department" />
              <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Position" />
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Phone" />
              <input type="number" value={form.salary} onChange={e => setForm({ ...form, salary: +e.target.value })}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Salary" />
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

export default EmployeeManagement;
