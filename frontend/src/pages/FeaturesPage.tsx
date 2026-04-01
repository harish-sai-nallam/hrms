import { Users, Clock, Calendar, Package, Globe, ShieldCheck, BarChart3, FileText } from 'lucide-react';

const features = [
  { icon: Users, title: 'Employee Management', desc: 'Complete employee lifecycle management from onboarding to offboarding. Maintain detailed employee records and documents.' },
  { icon: Clock, title: 'Attendance Tracking', desc: 'Automated clock-in/out with real-time tracking. GPS-based attendance and shift management capabilities.' },
  { icon: Calendar, title: 'Leave Management', desc: 'Streamlined leave requests, approvals, and balance tracking. Custom leave policies for different teams.' },
  { icon: BarChart3, title: 'Payroll Processing', desc: 'Automated salary calculations, tax deductions, and payslip generation. Multi-currency support included.' },
  { icon: Package, title: 'Asset Management', desc: 'Track company assets assigned to employees. Manage laptops, phones, and other equipment with ease.' },
  { icon: Globe, title: 'Multi-language Support', desc: 'Support for multiple languages to serve global teams. Localized interfaces for better user experience.' },
  { icon: ShieldCheck, title: 'Policy Management', desc: 'Create and distribute company policies. Track employee acknowledgments and maintain compliance records.' },
  { icon: FileText, title: 'Reports & Analytics', desc: 'Comprehensive dashboards with actionable insights. Custom report generation for informed decision making.' },
];

const FeaturesPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">Features</div>
          <h1 className="mb-4 text-4xl font-extrabold text-foreground">Everything You Need to Manage HR</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our comprehensive suite of tools helps you manage every aspect of your workforce efficiently.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
