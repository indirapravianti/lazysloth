import { Link } from 'react-router-dom';
import { 
  Award, Zap, Star, ArrowRight, FileImage, Users, QrCode, Download, Sparkles,
  Copy, AlertTriangle, Shield, Upload, Database, Share2, GraduationCap, 
  Briefcase, BadgeCheck, CreditCard, Trophy, Check, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const painPoints = [
  { icon: Copy, text: 'Copy-pasting names is slow' },
  { icon: AlertTriangle, text: 'Inconsistent layouts' },
  { icon: Shield, text: 'No verification → fake certificates' },
  { icon: FileImage, text: "Design tools aren't built for bulk work" },
];

const features = [
  { icon: Upload, text: 'Upload your own design' },
  { icon: Database, text: 'Define only the fields you need' },
  { icon: Users, text: 'Bulk generate from CSV or manual input' },
  { icon: QrCode, text: 'Auto QR code + verification link' },
  { icon: Download, text: 'Export as PDF or image' },
];

const useCases = [
  { icon: GraduationCap, title: 'Certificates & Diplomas', color: 'bg-quirky-pink' },
  { icon: Briefcase, title: 'Business Cards', color: 'bg-quirky-blue' },
  { icon: BadgeCheck, title: 'Event Badges & Lanyards', color: 'bg-quirky-teal' },
  { icon: CreditCard, title: 'Membership Cards', color: 'bg-quirky-purple' },
  { icon: Trophy, title: 'Awards', color: 'bg-quirky-yellow' },
];

const steps = [
  { number: '1', title: 'Upload Template', description: 'Upload your design as an image or PDF' },
  { number: '2', title: 'Add Data', description: 'Paste names or upload a CSV file' },
  { number: '3', title: 'Generate & Share', description: 'Download or share with QR verification' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quirky-pink via-quirky-purple to-quirky-blue flex items-center justify-center border-2 border-foreground shadow-quirky-sm">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">MassGen</h1>
                <p className="text-xs text-muted-foreground">Template-based asset generator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <Link to="/dashboard/templates/new">
                <Button size="sm" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-quirky-yellow px-4 py-2 rounded-full border-2 border-foreground font-medium text-sm mb-6">
            <Zap className="w-4 h-4" />
            Fast, Free & No Signup Required
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-quirky-pink via-quirky-purple to-quirky-blue">thousands</span> of personalized certificates, cards, and badges — in minutes.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload one template. Add your data. We handle the rest — with QR verification built in.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/templates/new">
              <Button size="lg" className="gap-2 text-base w-full sm:w-auto">
                Start Generating for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-base w-full sm:w-auto gap-2">
              <Play className="w-5 h-5" />
              View Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="w-4 h-4 text-quirky-yellow" />
              No account needed
            </span>
            <span className="inline-flex items-center gap-1">
              <Zap className="w-4 h-4 text-quirky-teal" />
              Works offline
            </span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Manual design doesn't scale.</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point) => (
              <div
                key={point.text}
                className="flex items-center gap-4 bg-card border-2 border-foreground rounded-xl p-4 shadow-quirky-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-destructive" />
                </div>
                <p className="font-medium">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">One platform. Infinite templates.</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 bg-card border-2 border-foreground rounded-xl p-4 shadow-quirky-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-quirky-teal flex items-center justify-center flex-shrink-0 border-2 border-foreground">
                  <feature.icon className="w-5 h-5" />
                </div>
                <p className="font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Built for every use case</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-quirky hover:shadow-quirky-lg transition-shadow text-center"
              >
                <div className={`w-14 h-14 rounded-xl ${useCase.color} flex items-center justify-center border-2 border-foreground mx-auto mb-4`}>
                  <useCase.icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm">{useCase.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-quirky text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-quirky-pink via-quirky-purple to-quirky-blue flex items-center justify-center border-2 border-foreground mx-auto mb-4 text-primary-foreground font-bold text-xl">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border-2 border-foreground rounded-2xl p-8 shadow-quirky-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Built for Scale & Security</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-quirky-blue flex items-center justify-center border-2 border-foreground">
                  <Users className="w-6 h-6" />
                </div>
                <p className="font-medium">Used by teams & institutions</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-quirky-purple flex items-center justify-center border-2 border-foreground">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="font-medium">For events, HR, schools & businesses</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-quirky-teal flex items-center justify-center border-2 border-foreground">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="font-medium">Secure & verifiable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Simple pricing that grows with you.</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-quirky flex-1">
              <div className="w-12 h-12 rounded-xl bg-quirky-yellow flex items-center justify-center border-2 border-foreground mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Free Trial</h4>
              <p className="text-muted-foreground text-sm">Start generating for free, no credit card required</p>
            </div>
            <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-quirky flex-1">
              <div className="w-12 h-12 rounded-xl bg-quirky-pink flex items-center justify-center border-2 border-foreground mx-auto mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Pay As You Go</h4>
              <p className="text-muted-foreground text-sm">Pay per export or choose monthly plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-quirky-pink/20 via-quirky-purple/20 to-quirky-blue/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Stop designing one by one.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quirky-pink via-quirky-purple to-quirky-blue">Start generating at scale.</span>
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of creators, educators, and event organizers who save hours every week.
          </p>
          <Link to="/dashboard/templates/new">
            <Button size="lg" className="gap-2 text-base">
              <Sparkles className="w-5 h-5" />
              Start Generating Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-card py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Built with ✨ for creators, educators, and event organizers</p>
        </div>
      </footer>
    </div>
  );
}
