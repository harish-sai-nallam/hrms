import { useState } from 'react';
import { companies } from '@/utils/dummyData';
import { toast } from 'sonner';

const SubscriptionManagement = () => {
  const [data, setData] = useState(companies);

  const updatePlan = (id: string, plan: string) => {
    setData(data.map(c => c.id === id ? { ...c, plan } : c));
    toast.success('Plan updated');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription Management</h1>
        <p className="text-sm text-muted-foreground">Manage company plans and subscriptions</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-accent/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Company</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Current Plan</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Expiry</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Change Plan</th>
            </tr></thead>
            <tbody>
              {data.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">{c.plan}</span></td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === 'active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>{c.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{c.expiry}</td>
                  <td className="px-4 py-3">
                    <select value={c.plan} onChange={e => updatePlan(c.id, e.target.value)}
                      className="rounded-lg border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                      <option value="free">Free</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option>
                    </select>
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

export default SubscriptionManagement;
