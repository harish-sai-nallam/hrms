import { useMemo } from 'react';
import useAllData from '@/utils/dummyData';

const TOTAL_ANNUAL_LEAVES = 20;

const ManagerSelfLeaves = () => {
  const { leaves } = useAllData();

  const usedLeaves = useMemo(
    () => leaves.filter((l: any) => l.status === 'approved' || l.status === 'Approved').length,
    [leaves]
  );
  const remaining = TOTAL_ANNUAL_LEAVES - usedLeaves;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Leaves</h1>
        <p className="text-sm text-muted-foreground">Your leave history</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{TOTAL_ANNUAL_LEAVES}</p>
          <p className="text-sm text-muted-foreground">Total Leaves</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{usedLeaves}</p>
          <p className="text-sm text-muted-foreground">Used</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-success">{remaining}</p>
          <p className="text-sm text-muted-foreground">Remaining</p>
        </div>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-accent/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">From</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">To</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Days</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No leave records found.
                  </td>
                </tr>
              ) : (
                leaves.map((l: any) => (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-accent/30">
                    <td className="px-4 py-3 text-foreground">{l.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.from || l.startDate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.to || l.endDate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.days}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        l.status === 'approved' || l.status === 'Approved'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}>{l.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerSelfLeaves;
