import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, FileImage, Sparkles, FolderOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LazySlothLogo } from '@/components/LazySlothLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Overview' },
  { href: '/dashboard/templates', icon: FileImage, label: 'Templates' },
  { href: '/dashboard/generate', icon: Sparkles, label: 'Generate' },
  { href: '/dashboard/assets', icon: FolderOpen, label: 'Assets' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Black navbar */}
      <header className="bg-foreground text-background shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <LazySlothLogo size="sm" inverted />
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-background/70 hover:text-background hover:bg-background/10'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-background/70 hover:text-background hover:bg-background/10'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
