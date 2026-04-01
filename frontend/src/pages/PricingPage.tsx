import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Perfect for small teams getting started',
    features: ['Up to 10 employees', 'Basic attendance', 'Leave management', 'Email support', 'Basic reports'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Monthly',
    price: '₹499',
    period: '/month',
    desc: 'Best for growing teams with advanced needs',
    features: ['Up to 100 employees', 'Advanced attendance', 'Payroll processing', 'Asset management', 'Priority support', 'Custom reports', 'API access'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Yearly',
    price: '₹3,500',
    period: '/year',
    desc: 'Save 28% with annual billing',
    features: ['Unlimited employees', 'All Monthly features', 'Multi-language', 'Custom branding', 'Dedicated account manager', 'SLA guarantee', 'Data export', 'SSO integration'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
];

const PricingPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">Pricing</div>
          <h1 className="mb-4 text-4xl font-extrabold text-foreground">Simple, Transparent Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Choose the plan that fits your team. No hidden fees.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
              plan.highlighted
                ? 'border-primary bg-card shadow-lg shadow-primary/10 ring-1 ring-primary'
                : 'bg-card'
            }`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                plan.highlighted
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border bg-accent text-foreground hover:bg-accent/80'
              }`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
