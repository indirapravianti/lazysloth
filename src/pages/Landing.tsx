import { Link } from 'react-router-dom';
import { Award, Zap, Star, ArrowRight, FileImage, Users, QrCode, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FileImage,
    title: 'Any Template',
    description: 'Certificates, business cards, lanyards, badges - design once, generate thousands.',
    color: 'bg-quirky-pink',
  },
  {
    icon: Users,
    title: 'Mass Generation',
    description: 'Upload CSV or paste names. Generate hundreds of personalized assets in seconds.',
    color: 'bg-quirky-teal',
  },
  {
    icon: QrCode,
    title: 'QR Verification',
    description: 'Add unique QR codes for authenticity verification and tracking.',
    color: 'bg-quirky-purple',
  },
  {
    icon: Download,
    title: 'Bulk Export',
    description: 'Download as individual PNGs or a single ZIP file. Print-ready quality.',
    color: 'bg-quirky-blue',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card">
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
            Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-quirky-pink via-quirky-purple to-quirky-blue">Thousands</span> of<br />
            Personalized Assets
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload a template, add your data, customize the design — then mass generate certificates, business cards, lanyards, and more in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/templates/new">
              <Button size="lg" className="gap-2 text-base w-full sm:w-auto">
                Create Your First Template
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-base w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
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

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-2xl font-bold text-center mb-12">Everything You Need</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-quirky hover:shadow-quirky-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center border-2 border-foreground mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Generate?</h3>
          <p className="text-muted-foreground mb-8">
            Start creating personalized assets in minutes. No signup, no credit card, no limits.
          </p>
          <Link to="/dashboard/templates/new">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-5 h-5" />
              Start Creating Now
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
