import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, ShieldCheck, BarChart3, Globe, CheckCircle2 } from 'lucide-react';

const featureCards = [
  { icon: Users, title: 'Employee Management', desc: 'Complete employee lifecycle management' },
  { icon: Clock, title: 'Time & Attendance', desc: 'Automated clock-in/out tracking' },
  { icon: ShieldCheck, title: 'Leave Management', desc: 'Streamlined leave requests & approvals' },
  { icon: BarChart3, title: 'Payroll & Reports', desc: 'Automated payroll processing' },
  { icon: Globe, title: 'Multi-language', desc: 'Support for global teams' },
  { icon: CheckCircle2, title: 'Compliance', desc: 'Built-in policy management' },
];

const bullets = [
  'Automated payroll processing & tax calculations',
  'Real-time attendance tracking with geo-fencing',
  'Self-service portal for employees',
  'Advanced analytics & custom reports',
];

const LandingPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3" />
        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                🚀 Next-Gen HR Platform
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                Next Generation HR Management{' '}
                <span className="text-primary">For Your Company</span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Streamline your HR operations with our powerful, intuitive platform. From hiring to retirement, manage every aspect of your workforce.
              </p>
              <ul className="mb-8 space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/features" className="inline-flex items-center gap-2 rounded-lg border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all">
                  View Features
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {featureCards.map((f, i) => (
                <div key={i} className="glass-card p-5 transition-all hover:shadow-md hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {[
            { value: '500+', label: 'Companies' },
            { value: '50K+', label: 'Employees' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Ready to Transform Your HR?</h2>
          <p className="mb-8 text-primary-foreground/80">Join hundreds of companies already using our platform.</p>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3 text-sm font-semibold text-foreground shadow-lg hover:bg-card/90 transition-all">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
