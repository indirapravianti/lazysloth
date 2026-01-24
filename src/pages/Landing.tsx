import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, FileImage, Users, QrCode, Download, Sparkles,
  Upload, Database, GraduationCap, 
  Briefcase, BadgeCheck, CreditCard, Trophy, Check, Play, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazySlothLogo } from '@/components/LazySlothLogo';
import { InteractivePlayground } from '@/components/landing/InteractivePlayground';
import { PricingSection } from '@/components/landing/PricingSection';
import { StackingCards } from '@/components/landing/StackingCards';

const features = [
  { icon: Palette, text: 'Design from scratch or upload' },
  { icon: Upload, text: 'Import your own templates' },
  { icon: Database, text: 'Bulk generate from CSV' },
  { icon: QrCode, text: 'Auto QR verification' },
  { icon: Download, text: 'Export as PDF or PNG' },
];

const useCases = [
  { icon: GraduationCap, title: 'Certificates', color: 'bg-primary' },
  { icon: Briefcase, title: 'Business Cards', color: 'bg-[hsl(var(--quirky-blue))]' },
  { icon: BadgeCheck, title: 'Event Badges', color: 'bg-[hsl(var(--quirky-teal))]' },
  { icon: CreditCard, title: 'Membership Cards', color: 'bg-[hsl(var(--quirky-purple))]' },
  { icon: Trophy, title: 'Awards', color: 'bg-[hsl(var(--quirky-pink))]' },
];

const steps = [
  { number: '1', title: 'Design or Upload', description: 'Create from scratch or upload your template', icon: Palette },
  { number: '2', title: 'Add Your Data', description: 'Paste names or import CSV', icon: Upload },
  { number: '3', title: 'Generate & Share', description: 'Download all with QR verification', icon: Download },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header - Black navbar */}
      <header className="bg-foreground text-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <LazySlothLogo size="sm" inverted />
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                  Dashboard
                </Button>
              </Link>
              <Link to="/dashboard/templates/new">
                <Button size="sm" className="gap-2 bg-primary text-foreground hover:bg-primary/90">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean and minimal */}
      <section className="py-20 md:py-32 px-4 relative">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-primary/30 blur-2xl" />
        <div className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full bg-[hsl(var(--quirky-pink))]/20 blur-2xl" />

        <div className="container mx-auto max-w-5xl relative">
          <div className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full font-bold text-sm mb-8">
            <Zap className="w-4 h-4" />
            Work smarter, not harder 🦥
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Generate <span className="text-primary">thousands</span> of
            <br className="hidden md:block" />
            personalized assets
            <span className="text-muted-foreground"> — in minutes.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Certificates, badges, cards, and more. Upload a template or design from scratch. 
            Add your data. We handle the rest — <span className="font-semibold text-foreground">with QR verification built in.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard/templates/new">
              <Button size="lg" className="gap-2 text-base w-full sm:w-auto shadow-quirky hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
                Start Generating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-base w-full sm:w-auto gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-10 text-sm">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20">
              <Check className="w-4 h-4 text-[hsl(var(--quirky-teal))]" />
              No account needed
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20">
              <Check className="w-4 h-4 text-[hsl(var(--quirky-teal))]" />
              100% browser-based
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20">
              <Check className="w-4 h-4 text-[hsl(var(--quirky-teal))]" />
              Works offline
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <InteractivePlayground />

      {/* Problem Section - Stacking Cards */}
      <StackingCards />

      {/* Solution Section */}
      <section className="py-20 px-4 bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-12">
            <span className="inline-block text-5xl mb-4">✨</span>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              One platform. <span className="text-primary">Infinite</span> possibilities.
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 bg-background text-foreground rounded-full px-6 py-4 hover:-translate-y-1 transition-all"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <p className="font-semibold">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-5xl mb-4">🎯</span>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Works for everything you need</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-card border-2 border-foreground rounded-2xl p-6 md:p-8 hover:-translate-y-2 transition-all cursor-default group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${useCase.color} flex items-center justify-center border-2 border-foreground mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h4 className="font-bold text-lg text-center">{useCase.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center mb-12">
            <span className="inline-block text-5xl mb-4">🦥</span>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              Three steps to <span className="text-primary">lazy</span> perfection
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group">
                <div className="bg-card border-2 border-foreground rounded-2xl p-8 text-center hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center border-2 border-foreground mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="text-6xl font-bold text-muted/20 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-foreground flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <section className="py-24 px-4 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[hsl(var(--quirky-pink))]/20 blur-3xl" />

        <div className="container mx-auto max-w-3xl text-center relative">
          <span className="inline-block text-6xl mb-6">🚀</span>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Stop designing one by one.
            <br />
            <span className="text-primary">Start generating at scale.</span>
          </h3>
          
          <p className="text-background/70 mb-8 text-lg">
            Join thousands of lazy (smart) creators who automated the boring stuff.
          </p>
          
          <Link to="/dashboard/templates/new">
            <Button size="lg" className="gap-2 text-lg px-10 py-7 shadow-quirky hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
              <Sparkles className="w-6 h-6" />
              Start Generating Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/20 bg-background py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <LazySlothLogo size="sm" />
          <p className="text-sm text-muted-foreground">
            Built with 🦥 for lazy geniuses everywhere
          </p>
        </div>
      </footer>
    </div>
  );
}
