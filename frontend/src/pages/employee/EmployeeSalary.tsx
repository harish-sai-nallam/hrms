import useAllData from '@/utils/dummyData';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

const EmployeeSalary = () => {
  const { payslip } = useAllData();

  if (!payslip) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Salary & Payslip</h1>
            <p className="text-sm text-muted-foreground">View your monthly payslip</p>
          </div>
        </div>
        <div className="glass-card max-w-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">No payslip available for this month.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Salary & Payslip</h1>
          <p className="text-sm text-muted-foreground">View your monthly payslip</p>
        </div>
        <button
          onClick={() => toast.success('Payslip downloaded (demo)')}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div className="glass-card max-w-2xl p-6">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Payslip — March 2026</h3>
            <p className="text-xs text-muted-foreground">SHNOOR INTERNATIONAL LLC</p>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Paid</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Earnings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Basic Salary</span><span className="text-foreground">${payslip.basicSalary ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">HRA</span><span className="text-foreground">${payslip.hra ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Conveyance</span><span className="text-foreground">${payslip.conveyance ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Medical</span><span className="text-foreground">${payslip.medicalAllowance ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Special Allowance</span><span className="text-foreground">${payslip.specialAllowance ?? 0}</span></div>
              <div className="flex justify-between border-t pt-2 font-semibold"><span className="text-foreground">Gross</span><span className="text-foreground">${payslip.grossEarnings ?? 0}</span></div>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Deductions</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">PF</span><span className="text-foreground">${payslip.providentFund ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Prof. Tax</span><span className="text-foreground">${payslip.professionalTax ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Income Tax</span><span className="text-foreground">${payslip.incomeTax ?? 0}</span></div>
              <div className="flex justify-between border-t pt-2 font-semibold"><span className="text-foreground">Total</span><span className="text-destructive">${payslip.totalDeductions ?? 0}</span></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between rounded-lg bg-primary/10 p-4">
          <span className="text-lg font-bold text-foreground">Net Salary</span>
          <span className="text-lg font-bold text-primary">${payslip.netSalary ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;
