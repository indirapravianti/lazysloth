import { cn } from '@/lib/utils';

interface LazySlothLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export function LazySlothLogo({ className, size = 'md', showText = true, inverted = false }: LazySlothLogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', subtext: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', subtext: 'text-xs' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', subtext: 'text-sm' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', subtext: 'text-base' },
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'relative rounded-2xl bg-primary flex items-center justify-center border-2',
        inverted ? 'border-background' : 'border-foreground',
        sizes[size].icon
      )}>
        {/* Sloth Face */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5">
          {/* Face */}
          <ellipse cx="50" cy="55" rx="35" ry="30" fill="hsl(30, 20%, 85%)" />
          
          {/* Eye patches */}
          <ellipse cx="35" cy="48" rx="14" ry="12" fill="hsl(30, 15%, 35%)" />
          <ellipse cx="65" cy="48" rx="14" ry="12" fill="hsl(30, 15%, 35%)" />
          
          {/* Eyes - sleepy/half-closed */}
          <ellipse cx="35" cy="50" rx="5" ry="2" fill="hsl(0, 0%, 10%)" />
          <ellipse cx="65" cy="50" rx="5" ry="2" fill="hsl(0, 0%, 10%)" />
          
          {/* Eye shine */}
          <ellipse cx="33" cy="49" rx="2" ry="1" fill="hsl(0, 0%, 100%)" opacity="0.7" />
          <ellipse cx="63" cy="49" rx="2" ry="1" fill="hsl(0, 0%, 100%)" opacity="0.7" />
          
          {/* Nose */}
          <ellipse cx="50" cy="62" rx="8" ry="5" fill="hsl(30, 10%, 25%)" />
          
          {/* Smile */}
          <path d="M 40 70 Q 50 78 60 70" stroke="hsl(30, 10%, 25%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Zzz for sleepy effect */}
          <text x="72" y="30" fontSize="14" fontWeight="bold" fill="hsl(48, 100%, 50%)">z</text>
          <text x="80" y="22" fontSize="11" fontWeight="bold" fill="hsl(48, 100%, 50%)">z</text>
          <text x="86" y="16" fontSize="8" fontWeight="bold" fill="hsl(48, 100%, 50%)">z</text>
        </svg>
      </div>
      
      {showText && (
        <div>
          <h1 className={cn(
            'font-bold tracking-tight',
            sizes[size].text,
            inverted ? 'text-background' : 'text-foreground'
          )}>LazySloth</h1>
          <p className={cn(
            sizes[size].subtext,
            inverted ? 'text-background/70' : 'text-muted-foreground'
          )}>Generate at scale</p>
        </div>
      )}
    </div>
  );
}
