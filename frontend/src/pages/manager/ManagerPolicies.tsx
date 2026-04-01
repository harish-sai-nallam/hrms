import { policies } from '@/utils/dummyData';
import { FileText } from 'lucide-react';

const ManagerPolicies = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Company Policies</h1>
        <p className="text-sm text-muted-foreground">Review and share company policies with your team</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {policies.map(p => (
          <div key={p.id} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{p.category}</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerPolicies;
