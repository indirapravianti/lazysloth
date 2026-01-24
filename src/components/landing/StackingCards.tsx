import { useEffect, useRef, useState } from 'react';

const problemCards = [
  {
    id: 1,
    title: "Time Drain",
    subtitle: "Hours wasted on repetitive tasks",
    description: "Every certificate, badge, or card requires manual text replacement. What should take minutes ends up consuming entire days of productive work.",
    color: "bg-[hsl(var(--quirky-pink))]",
    illustration: "clock"
  },
  {
    id: 2,
    title: "Error Prone",
    subtitle: "Mistakes multiply at scale",
    description: "Typos, wrong names, inconsistent formatting. When you're copy-pasting hundreds of entries, errors are inevitable — and embarrassing.",
    color: "bg-[hsl(var(--quirky-teal))]",
    illustration: "warning"
  },
  {
    id: 3,
    title: "No Verification",
    subtitle: "Anyone can fake your credentials",
    description: "Without built-in verification, your certificates are just images. Anyone with basic editing skills can create convincing fakes.",
    color: "bg-[hsl(var(--quirky-purple))]",
    illustration: "shield"
  },
  {
    id: 4,
    title: "Design Lock-in",
    subtitle: "Tools not built for bulk generation",
    description: "Canva, Photoshop, Figma — great for design, terrible for generating thousands of variations. You need a different approach entirely.",
    color: "bg-primary",
    illustration: "lock"
  }
];

// CSS-based illustrations
function ClockIllustration() {
  return (
    <div className="relative w-24 h-24">
      {/* Clock face */}
      <div className="absolute inset-0 rounded-full border-4 border-current" />
      {/* Clock center */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
      {/* Hour hand */}
      <div className="absolute top-1/2 left-1/2 w-1.5 h-6 -translate-x-1/2 origin-bottom bg-current rounded-full" style={{ transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'bottom center' }} />
      {/* Minute hand */}
      <div className="absolute top-1/2 left-1/2 w-1 h-8 -translate-x-1/2 origin-bottom bg-current rounded-full" style={{ transform: 'translateX(-50%) rotate(90deg)', transformOrigin: 'bottom center' }} />
      {/* Flying papers */}
      <div className="absolute -top-2 -right-2 w-6 h-8 bg-current/20 border-2 border-current rounded rotate-12" />
      <div className="absolute -top-4 right-2 w-5 h-7 bg-current/10 border-2 border-current rounded -rotate-6" />
    </div>
  );
}

function WarningIllustration() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Triangle */}
      <div className="w-20 h-20 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,10 95,90 5,90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        {/* Exclamation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-20%] flex flex-col items-center">
          <div className="w-2 h-6 bg-current rounded-full" />
          <div className="w-2 h-2 bg-current rounded-full mt-1" />
        </div>
      </div>
      {/* X marks around */}
      <span className="absolute -top-1 -left-1 text-lg font-bold">✗</span>
      <span className="absolute top-2 -right-2 text-sm font-bold">✗</span>
      <span className="absolute -bottom-1 left-0 text-xs font-bold">✗</span>
    </div>
  );
}

function ShieldIllustration() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Shield shape */}
      <svg viewBox="0 0 100 120" className="w-20 h-24">
        <path 
          d="M50,5 L95,20 L95,60 Q95,100 50,115 Q5,100 5,60 L5,20 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Broken/crack lines */}
        <path 
          d="M30,40 L45,55 L35,75" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path 
          d="M55,35 L70,50 L60,65 L75,80" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function LockIllustration() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Lock body */}
      <div className="relative">
        <div className="w-16 h-14 border-4 border-current rounded-lg mt-6" />
        {/* Lock shackle */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 border-4 border-current rounded-t-full border-b-0" />
        {/* Keyhole */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-current rounded-full" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-current rounded-b-full" />
      </div>
      {/* Chain links */}
      <div className="absolute -right-2 top-1/2 flex gap-0.5">
        <div className="w-3 h-5 border-2 border-current rounded-full" />
        <div className="w-3 h-5 border-2 border-current rounded-full -ml-1" />
      </div>
    </div>
  );
}

const illustrations: Record<string, React.FC> = {
  clock: ClockIllustration,
  warning: WarningIllustration,
  shield: ShieldIllustration,
  lock: LockIllustration
};

export function StackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress: 0 when section enters, 1 when section exits
      const start = rect.top - viewportHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      
      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 relative min-h-[150vh]"
      style={{ perspective: '1000px' }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 sticky top-24">
          <span className="inline-block text-5xl mb-4">😫</span>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            Manual design <span className="line-through text-muted-foreground">doesn't</span> can't scale.
          </h3>
          <p className="text-muted-foreground text-lg">Here's why it's holding you back</p>
        </div>

        <div className="sticky top-40 h-[400px] flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            {problemCards.map((card, index) => {
              const cardProgress = scrollProgress * problemCards.length;
              const isActive = cardProgress >= index && cardProgress < index + 1;
              const isPast = cardProgress > index + 1;
              const isFuture = cardProgress < index;
              
              // Calculate individual card animation
              const localProgress = Math.max(0, Math.min(1, cardProgress - index));
              
              let translateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = problemCards.length - index;
              
              if (isFuture) {
                translateY = (index - Math.floor(cardProgress)) * 20;
                scale = 1 - (index - Math.floor(cardProgress)) * 0.05;
                opacity = 1 - (index - Math.floor(cardProgress)) * 0.3;
              } else if (isPast) {
                translateY = -100 - (cardProgress - index - 1) * 50;
                opacity = Math.max(0, 1 - (cardProgress - index - 1));
                zIndex = index;
              } else if (isActive) {
                translateY = -localProgress * 20;
                zIndex = problemCards.length + 1;
              }

              const Illustration = illustrations[card.illustration];

              return (
                <div
                  key={card.id}
                  className={`absolute inset-0 ${card.color} rounded-2xl border-2 border-foreground p-8 transition-all duration-300`}
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start gap-6 h-full">
                    <div className="flex-shrink-0 text-foreground/80">
                      <Illustration />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-foreground/10 text-sm font-medium mb-3">
                        Problem #{card.id}
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h4>
                      <p className="text-lg font-medium mb-3 opacity-80">{card.subtitle}</p>
                      <p className="text-foreground/70 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
