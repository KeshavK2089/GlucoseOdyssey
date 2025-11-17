export function DNALoader({ text = "Analyzing data..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6" data-testid="loading-dna">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 animate-dna-spin">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="dna-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
              <linearGradient id="dna-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            
            <circle cx="30" cy="20" r="5" fill="url(#dna-gradient-1)" className="animate-glow-pulse" />
            <circle cx="70" cy="20" r="5" fill="url(#dna-gradient-2)" className="animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
            <line x1="30" y1="20" x2="70" y2="20" stroke="url(#dna-gradient-1)" strokeWidth="2" opacity="0.6" />
            
            <circle cx="30" cy="40" r="5" fill="url(#dna-gradient-2)" className="animate-glow-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="70" cy="40" r="5" fill="url(#dna-gradient-1)" className="animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
            <line x1="30" y1="40" x2="70" y2="40" stroke="url(#dna-gradient-2)" strokeWidth="2" opacity="0.6" />
            
            <circle cx="30" cy="60" r="5" fill="url(#dna-gradient-1)" className="animate-glow-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="70" cy="60" r="5" fill="url(#dna-gradient-2)" className="animate-glow-pulse" style={{ animationDelay: '2.5s' }} />
            <line x1="30" y1="60" x2="70" y2="60" stroke="url(#dna-gradient-1)" strokeWidth="2" opacity="0.6" />
            
            <circle cx="30" cy="80" r="5" fill="url(#dna-gradient-2)" className="animate-glow-pulse" style={{ animationDelay: '3s' }} />
            <circle cx="70" cy="80" r="5" fill="url(#dna-gradient-1)" className="animate-glow-pulse" style={{ animationDelay: '3.5s' }} />
            <line x1="30" y1="80" x2="70" y2="80" stroke="url(#dna-gradient-2)" strokeWidth="2" opacity="0.6" />
            
            <path d="M 30 20 Q 50 30, 70 40" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" fill="none" />
            <path d="M 70 20 Q 50 30, 30 40" stroke="hsl(var(--secondary) / 0.4)" strokeWidth="2" fill="none" />
            <path d="M 30 40 Q 50 50, 70 60" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" fill="none" />
            <path d="M 70 40 Q 50 50, 30 60" stroke="hsl(var(--secondary) / 0.4)" strokeWidth="2" fill="none" />
            <path d="M 30 60 Q 50 70, 70 80" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" fill="none" />
            <path d="M 70 60 Q 50 70, 30 80" stroke="hsl(var(--secondary) / 0.4)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-glow-pulse" data-testid="text-loading">
        {text}
      </p>
    </div>
  );
}
