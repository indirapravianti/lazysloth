import { Link } from 'react-router-dom';
import { 
  Zap, Star, ArrowRight, FileImage, Users, QrCode, Download, Sparkles,
  Copy, AlertTriangle, Shield, Upload, Database, Share2, GraduationCap, 
  Briefcase, BadgeCheck, CreditCard, Trophy, Check, Play, Palette, MousePointer,
  Rocket, Heart, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazySlothLogo } from '@/components/LazySlothLogo';
import { InteractivePlayground } from '@/components/landing/InteractivePlayground';
import { PricingSection } from '@/components/landing/PricingSection';
import { AnimateOnScroll, FloatingDecoration } from '@/components/landing/ScrollAnimations';

const painPoints = [
  { icon: Copy, text: 'Copy-pasting names is slow', rotation: '-2deg' },
  { icon: AlertTriangle, text: 'Inconsistent layouts', rotation: '2deg' },
  { icon: Shield, text: 'No verification → fake certificates', rotation: '-1deg' },
  { icon: FileImage, text: "Design tools aren't built for bulk work", rotation: '1.5deg' },
];

const features = [
  { icon: Palette, text: 'Design from scratch or upload', color: 'bg-quirky-pink' },
  { icon: Upload, text: 'Import your own templates', color: 'bg-quirky-teal' },
  { icon: Database, text: 'Bulk generate from CSV', color: 'bg-quirky-purple' },
  { icon: QrCode, text: 'Auto QR verification', color: 'bg-primary' },
  { icon: Download, text: 'Export as PDF or PNG', color: 'bg-quirky-blue' },
];

const useCases = [
  { icon: GraduationCap, title: 'Certificates', color: 'bg-primary', rotate: '-3deg' },
  { icon: Briefcase, title: 'Business Cards', color: 'bg-quirky-blue', rotate: '2deg' },
  { icon: BadgeCheck, title: 'Event Badges', color: 'bg-quirky-teal', rotate: '-1.5deg' },
  { icon: CreditCard, title: 'Membership Cards', color: 'bg-quirky-purple', rotate: '3deg' },
  { icon: Trophy, title: 'Awards', color: 'bg-quirky-pink', rotate: '-2deg' },
];

const steps = [
  { number: '1', title: 'Design or Upload', description: 'Create from scratch or upload your template', icon: Palette },
  { number: '2', title: 'Add Your Data', description: 'Paste names or import CSV', icon: Upload },
  { number: '3', title: 'Generate & Share', description: 'Download all with QR verification', icon: Download },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <LazySlothLogo size="sm" />
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link to="/dashboard/templates/new">
                <Button size="sm" className="gap-2 shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - More Dynamic */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-quirky-teal/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-quirky-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating decorations */}
        <FloatingDecoration emoji="🦥" className="top-20 left-[5%] rotate-12" />
        <FloatingDecoration emoji="✨" className="top-40 right-[10%] -rotate-6" />
        <FloatingDecoration emoji="💤" className="bottom-20 left-[15%] rotate-6" />
        <FloatingDecoration emoji="🎨" className="bottom-10 right-[5%] -rotate-12" />
        <FloatingDecoration emoji="🚀" className="top-32 right-[25%] rotate-12" />

        <div className="container mx-auto max-w-5xl relative">
          <AnimateOnScroll animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 rounded-full border-2 border-foreground font-bold text-sm mb-8 shadow-quirky-sm transform rotate-[-2deg] hover:rotate-0 transition-transform">
              <Zap className="w-4 h-4 animate-pulse" />
              Work smarter, not harder 🦥
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={100}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Generate <span className="relative inline-block">
                <span className="relative z-10 text-primary">thousands</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 3 80 3 100 5C120 7 160 9 198 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/40"/>
                </svg>
              </span> of
              <br className="hidden md:block" />
              personalized assets
              <span className="text-muted-foreground block md:inline"> — in minutes.</span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              Certificates, badges, cards, and more. Upload a template or design from scratch. 
              Add your data. We handle the rest — <span className="font-semibold text-foreground">with QR verification built in.</span>
            </p>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard/templates/new">
                <Button size="lg" className="gap-2 text-base w-full sm:w-auto shadow-quirky hover:shadow-quirky-sm hover:translate-x-1 hover:translate-y-1 transition-all group">
                  Start Generating Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base w-full sm:w-auto gap-2 shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={400}>
            <div className="flex flex-wrap items-center gap-4 mt-10 text-sm">
              <span className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border-2 border-foreground shadow-quirky-sm hover:scale-105 transition-transform cursor-default">
                <Check className="w-4 h-4 text-quirky-teal" />
                No account needed
              </span>
              <span className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border-2 border-foreground shadow-quirky-sm rotate-1 hover:rotate-0 hover:scale-105 transition-all cursor-default">
                <Check className="w-4 h-4 text-quirky-teal" />
                100% browser-based
              </span>
              <span className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border-2 border-foreground shadow-quirky-sm -rotate-1 hover:rotate-0 hover:scale-105 transition-all cursor-default">
                <Check className="w-4 h-4 text-quirky-teal" />
                Works offline
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Interactive Playground */}
      <InteractivePlayground />

      {/* Problem Section - Scattered Layout */}
      <section className="py-20 px-4 relative">
        {/* Decorative lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-5">
            <pattern id="diagonal" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect fill="url(#diagonal)" width="100%" height="100%" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl relative">
          <AnimateOnScroll animation="scale">
            <div className="text-center mb-16">
              <span className="inline-block text-6xl mb-4 animate-bounce">😫</span>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">
                Manual design <span className="relative">
                  <span className="line-through text-muted-foreground">doesn't</span>
                </span> can't scale.
              </h3>
              <p className="text-muted-foreground text-lg">Sound familiar?</p>
            </div>
          </AnimateOnScroll>

          {/* Pain points in a more dynamic layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {painPoints.map((point, i) => (
              <AnimateOnScroll
                key={point.text}
                animation={i % 2 === 0 ? 'fade-left' : 'fade-right'}
                delay={i * 100}
              >
                <div
                  className="flex items-center gap-4 bg-card border-2 border-foreground rounded-xl p-5 shadow-quirky hover:shadow-quirky-lg transition-all hover:-translate-y-1 cursor-default"
                  style={{ transform: `rotate(${point.rotation})` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0 border-2 border-destructive/30">
                    <point.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <p className="font-semibold">{point.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Asymmetric */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-quirky-teal/5 relative overflow-hidden">
        <FloatingDecoration emoji="🚀" className="top-10 right-[10%]" />
        <FloatingDecoration emoji="💡" className="bottom-20 left-[5%]" />
        
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-foreground/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-foreground/5 rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block text-6xl mb-4">✨</span>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">
                One platform. <span className="text-primary">Infinite</span> possibilities.
              </h3>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, i) => (
              <AnimateOnScroll key={feature.text} animation="scale" delay={i * 80}>
                <div
                  className="flex items-center gap-3 bg-card border-2 border-foreground rounded-2xl px-6 py-4 shadow-quirky-sm hover:shadow-quirky hover:-translate-y-2 transition-all cursor-default group"
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i * 0.8)}deg)` }}
                >
                  <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0 border-2 border-foreground group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <p className="font-semibold">{feature.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Playful Grid */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block text-6xl mb-4">🎯</span>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">Works for everything you need</h3>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {useCases.map((useCase, i) => (
              <AnimateOnScroll key={useCase.title} animation="rotate" delay={i * 60}>
                <div
                  className="bg-card border-2 border-foreground rounded-2xl p-6 md:p-8 shadow-quirky hover:shadow-quirky-lg transition-all hover:-translate-y-2 cursor-default group"
                  style={{ transform: `rotate(${useCase.rotate})` }}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${useCase.color} flex items-center justify-center border-2 border-foreground mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <useCase.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h4 className="font-bold text-lg text-center">{useCase.title}</h4>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Creative Steps */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-foreground rounded-full" />
        </div>

        <div className="container mx-auto max-w-4xl relative">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block text-6xl mb-4">🦥</span>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">
                Three steps to <span className="text-primary">lazy</span> perfection
              </h3>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <AnimateOnScroll key={step.title} animation="fade-up" delay={index * 150}>
                <div className="relative group">
                  <div className="bg-card border-2 border-foreground rounded-2xl p-8 shadow-quirky text-center hover:shadow-quirky-lg transition-all group-hover:-translate-y-2">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center border-2 border-foreground mx-auto mb-4 shadow-quirky-sm group-hover:scale-110 transition-transform">
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="text-7xl font-bold text-muted/20 absolute top-4 right-4">
                      {step.number}
                    </div>
                    <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-primary border-2 border-foreground flex items-center justify-center shadow-quirky-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Globe className="w-6 h-6" />
                <span className="font-medium">Used by teams worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Heart className="w-6 h-6 text-quirky-pink" />
                <span className="font-medium">Loved by educators</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Shield className="w-6 h-6 text-quirky-teal" />
                <span className="font-medium">Secure & verifiable</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/20 via-quirky-teal/10 to-quirky-purple/20 relative overflow-hidden">
        <FloatingDecoration emoji="🎉" className="top-10 left-[10%]" />
        <FloatingDecoration emoji="🦥" className="bottom-10 right-[10%]" />
        <FloatingDecoration emoji="⚡" className="top-20 right-[20%]" />

        <div className="container mx-auto max-w-3xl text-center relative">
          <AnimateOnScroll animation="scale">
            <span className="inline-block text-7xl mb-6 animate-bounce">🚀</span>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Stop designing one by one.
              <br />
              <span className="text-primary">Start generating at scale.</span>
            </h3>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of lazy (smart) creators who automated the boring stuff.
            </p>
            
            <Link to="/dashboard/templates/new">
              <Button size="lg" className="gap-2 text-lg px-10 py-7 shadow-quirky hover:shadow-quirky-sm hover:translate-x-1 hover:translate-y-1 transition-all group">
                <Sparkles className="w-6 h-6" />
                Start Generating Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-card py-8 px-4">
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
