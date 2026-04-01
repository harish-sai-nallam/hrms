import { useState } from 'react';
import { offboardingRecords as initialRecords } from '@/utils/dummyData';
import { UserMinus, Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

type ExitType = 'Resignation' | 'Termination' | 'Retirement';
type SettlementStatus = 'Pending' | 'Completed';

interface OffboardingRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  exitDate: string;
  exitType: ExitType;
  reason: string;
  noticePeriod: string;
  settlementStatus: SettlementStatus;
  exitInterviewNotes: string;
}

const emptyRecord: Omit<OffboardingRecord, 'id'> = {
  employeeId: '', name: '', department: '', exitDate: '', exitType: 'Resignation',
  reason: '', noticePeriod: '30 days', settlementStatus: 'Pending', exitInterviewNotes: '',
};

const ManagerOffboarding = () => {
  const [records, setRecords] = useState<OffboardingRecord[]>(initialRecords as OffboardingRecord[]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyRecord);

  const openAdd = () => { setForm(emptyRecord); setEditingId(null); setModalOpen(true); };
  const openEdit = (r: OffboardingRecord) => { setForm(r); setEditingId(r.id); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingId(null); };

  const handleSave = () => {
    if (!form.name || !form.employeeId || !form.exitDate) { toast.error('Please fill required fields'); return; }
    if (editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
      toast.success('Record updated');
    } else {
      setRecords(prev => [...prev, { ...form, id: Date.now().toString() }]);
      toast.success('Record added');
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    toast.success('Record deleted');
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Offboarding</h1>
          <p className="text-sm text-muted-foreground">Manage employee exit records</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Offboarding
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-accent/50">
                {['Employee', 'ID', 'Department', 'Exit Date', 'Exit Type', 'Reason', 'Notice', 'Settlement', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                        <UserMinus className="h-4 w-4 text-destructive" />
                      </div>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.employeeId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.department}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.exitDate}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      r.exitType === 'Resignation' ? 'bg-warning/10 text-warning' :
                      r.exitType === 'Termination' ? 'bg-destructive/10 text-destructive' :
                      'bg-accent text-muted-foreground'
                    }`}>{r.exitType}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">{r.reason}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.noticePeriod}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      r.settlementStatus === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>{r.settlementStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(r)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(r.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">No offboarding records</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-background border shadow-lg p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">{editingId ? 'Edit' : 'Add'} Offboarding Record</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 hover:bg-accent transition-colors"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                ['name', 'Employee Name *', 'text'],
                ['employeeId', 'Employee ID *', 'text'],
                ['department', 'Department', 'text'],
                ['exitDate', 'Exit Date *', 'date'],
                ['noticePeriod', 'Notice Period', 'text'],
              ] as const).map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                  <input type={type} value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Exit Type</label>
                <select value={form.exitType} onChange={e => set('exitType', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Resignation</option><option>Termination</option><option>Retirement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Settlement Status</label>
                <select value={form.settlementStatus} onChange={e => set('settlementStatus', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Pending</option><option>Completed</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Reason for Leaving</label>
                <input value={form.reason} onChange={e => set('reason', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Exit Interview Notes</label>
                <textarea rows={3} value={form.exitInterviewNotes} onChange={e => set('exitInterviewNotes', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeModal} className="rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
              <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">{editingId ? 'Update' : 'Add'} Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerOffboarding;
