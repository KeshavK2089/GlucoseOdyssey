import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FlaskConical, BookOpen, ChevronRight, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-dna-spin opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="hero-dna-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <circle cx={50 + Math.sin(i * Math.PI / 3) * 30} cy={30 + i * 28} r="8" fill="url(#hero-dna-gradient)" opacity="0.6" />
                <circle cx={150 - Math.sin(i * Math.PI / 3) * 30} cy={30 + i * 28} r="8" fill="url(#hero-dna-gradient)" opacity="0.6" />
                <line 
                  x1={50 + Math.sin(i * Math.PI / 3) * 30} 
                  y1={30 + i * 28} 
                  x2={150 - Math.sin(i * Math.PI / 3) * 30} 
                  y2={30 + i * 28} 
                  stroke="url(#hero-dna-gradient)" 
                  strokeWidth="2" 
                  opacity="0.3" 
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-mono text-primary">Next-Gen Diabetes Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer" style={{
            backgroundSize: '200% auto'
          }} data-testid="text-main-heading">
            Glucose Odyssey
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-4 max-w-3xl mx-auto leading-relaxed">
            Experience the future of diabetes management through interactive closed-loop insulin simulations and AI-powered research insights
          </p>
          
          <p className="text-base text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore advanced glucose control algorithms, visualize real-time insulin delivery, and discover cutting-edge diabetes research—all in one immersive platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/simulator">
              <Button 
                size="lg" 
                className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-primary/20 transition-all"
                data-testid="button-enter-simulator"
              >
                <FlaskConical className="w-5 h-5" />
                Enter Simulator
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link href="/research">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 text-base px-8 py-6 rounded-xl backdrop-blur-md border-2"
                data-testid="button-explore-research"
              >
                <BookOpen className="w-5 h-5" />
                Explore Research
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 px-6 bg-card/30 border-y border-border/40" data-testid="section-features">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Simulator</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize glucose-insulin dynamics with real-time parameter adjustments. Test scenarios like meals, exercise, and algorithm responses.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Research Engine</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access the latest diabetes research with AI-generated summaries. Stay updated on breakthrough technologies and clinical insights.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Understand closed-loop systems, PID algorithms, and the science behind automated insulin delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
