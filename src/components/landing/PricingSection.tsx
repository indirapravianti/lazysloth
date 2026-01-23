import { Check, Sparkles, Zap, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from './ScrollAnimations';

const plans = [
  {
    name: 'Free',
    price: 'NTD 0',
    period: '',
    purpose: 'Try the product, demos, and small student use cases',
    icon: Sparkles,
    color: 'bg-muted',
    borderColor: 'border-border',
    features: [
      'Up to 20 assets / month',
      'Certificates only',
      'CSV or pasted text input',
      'AI data mapping',
      'Watermark included',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: 'NTD 299',
    period: '/ month',
    purpose: 'Student organizations and small events',
    icon: Zap,
    color: 'bg-primary/10',
    borderColor: 'border-primary',
    features: [
      'Up to 500 assets / month',
      'All asset types (certificates, badges, invitations, etc.)',
      'CSV, text, or URL input',
      'AI data parsing and field mapping',
      'Automatic layout adjustment',
      'QR code verification',
      'No watermark',
      'Email support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Pro',
    price: 'NTD 899',
    period: '/ month',
    purpose: 'Educators, SMBs, and frequent bulk generation',
    icon: Building2,
    color: 'bg-quirky-teal/10',
    borderColor: 'border-quirky-teal',
    features: [
      'Up to 3,000 assets / month',
      'Advanced data parsing',
      'Custom QR branding',
      'Template reuse',
      'Batch regeneration',
      'Bulk export (PNG / PDF)',
      'Priority email support',
    ],
    cta: 'Go Pro',
    popular: false,
  },
  {
    name: 'Team',
    price: 'NTD 2,499',
    period: '/ month',
    purpose: 'Agencies, event operators, and growing teams',
    icon: Users,
    color: 'bg-quirky-purple/10',
    borderColor: 'border-quirky-purple',
    features: [
      'Up to 10,000 assets / month',
      'Up to 5 team members',
      'Shared templates',
      'Version history and audit logs',
      'API access (planned)',
      'Priority support and onboarding',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-quirky-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full border-2 border-foreground font-medium text-sm mb-4 rotate-[-1deg]">
              <Sparkles className="w-4 h-4" />
              Simple & Transparent
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              Pricing that <span className="text-primary">grows with you</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free, scale as you need. No hidden fees, no surprises.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <AnimateOnScroll 
              key={plan.name} 
              animation="fade-up" 
              delay={index * 100}
            >
              <div
                className={`relative bg-card border-2 ${plan.borderColor} rounded-2xl p-6 shadow-quirky hover:shadow-quirky-lg transition-all hover:-translate-y-1 h-full flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                }`}
                style={{ transform: `rotate(${(index % 2 === 0 ? -0.5 : 0.5)}deg)` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold border-2 border-foreground whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center border-2 border-foreground mb-4`}>
                  <plan.icon className="w-6 h-6" />
                </div>

                <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {plan.purpose}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-quirky-teal flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/dashboard/templates/new" className="mt-auto">
                  <Button 
                    variant={plan.popular ? 'default' : 'outline'} 
                    className="w-full gap-2 shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="fade-up" delay={500}>
          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include secure cloud storage and 24/7 system monitoring. 
            <span className="font-medium text-foreground"> Cancel anytime.</span>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
