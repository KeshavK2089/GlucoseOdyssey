import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FlaskConical, BookOpen, ChevronRight, Activity, Heart, Lightbulb } from "lucide-react";
import heroImage from "@assets/generated_images/Diverse_family_park_lifestyle_1d5ed8ac.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Understanding Diabetes Technology</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 text-foreground" data-testid="text-main-heading">
              Simplifying diabetes management through{" "}
              <span className="text-primary">innovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-4 leading-relaxed">
              Explore how automated insulin delivery works with our interactive simulator and stay informed about the latest research breakthroughs
            </p>
            
            <p className="text-base text-muted-foreground mb-8">
              Glucose Odyssey helps people with diabetes, caregivers, and healthcare professionals understand closed-loop insulin systems through hands-on learning
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/simulator">
                <Button 
                  size="lg" 
                  className="gap-2 text-base px-8 h-12 rounded-lg"
                  data-testid="button-enter-simulator"
                >
                  <FlaskConical className="w-5 h-5" />
                  Try the Simulator
                </Button>
              </Link>
              
              <Link href="/research">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2 text-base px-8 h-12 rounded-lg bg-background/80 backdrop-blur-sm"
                  data-testid="button-explore-research"
                >
                  <BookOpen className="w-5 h-5" />
                  Explore Research
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background" data-testid="section-features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Learn about automated insulin delivery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes complex diabetes technology accessible and understandable for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border bg-card hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Simulator</h3>
              <p className="text-muted-foreground leading-relaxed">
                See how glucose and insulin interact in real-time. Adjust meals, exercise, and insulin doses to understand closed-loop control.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Research Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay current with the latest diabetes technology studies from PubMed, summarized for clarity and clinical relevance.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card hover-elevate transition-all">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Evidence-Based</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on published clinical algorithms and peer-reviewed research to provide accurate educational simulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start with the simulator to see automated insulin delivery in action
          </p>
          <Link href="/simulator">
            <Button size="lg" className="gap-2 px-8 h-12 rounded-lg" data-testid="button-get-started">
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
