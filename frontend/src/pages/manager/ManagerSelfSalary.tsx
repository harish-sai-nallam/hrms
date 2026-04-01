import { payslipData } from '@/utils/dummyData';

const ManagerSelfSalary = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">My Salary</h1>
      <p className="text-sm text-muted-foreground">Current month payslip</p>
    </div>
    <div className="glass-card max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold text-foreground">Payslip — March 2026</h3>
        <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Paid</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 font-semibold text-foreground">Earnings</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Basic Salary</span><span className="text-foreground">${payslipData.basicSalary}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">HRA</span><span className="text-foreground">${payslipData.hra}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Conveyance</span><span className="text-foreground">${payslipData.conveyance}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Medical</span><span className="text-foreground">${payslipData.medicalAllowance}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Special Allowance</span><span className="text-foreground">${payslipData.specialAllowance}</span></div>
            <div className="flex justify-between border-t pt-2 font-semibold"><span className="text-foreground">Gross Earnings</span><span className="text-foreground">${payslipData.grossEarnings}</span></div>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-foreground">Deductions</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Provident Fund</span><span className="text-foreground">${payslipData.providentFund}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Professional Tax</span><span className="text-foreground">${payslipData.professionalTax}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Income Tax</span><span className="text-foreground">${payslipData.incomeTax}</span></div>
            <div className="flex justify-between border-t pt-2 font-semibold"><span className="text-foreground">Total Deductions</span><span className="text-destructive">${payslipData.totalDeductions}</span></div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between rounded-lg bg-primary/10 p-4">
        <span className="text-lg font-bold text-foreground">Net Salary</span>
        <span className="text-lg font-bold text-primary">${payslipData.netSalary}</span>
      </div>
    </div>
  </div>
);

export default ManagerSelfSalary;
