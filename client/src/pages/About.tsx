import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, FlaskConical, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Glucose Odyssey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the technology behind next-generation diabetes management
          </p>
        </div>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Glucose Odyssey is an educational platform designed to demystify automated insulin delivery systems 
              and accelerate diabetes research accessibility. We combine interactive simulations with AI-powered 
              research curation to create an immersive learning experience.
            </p>
            <p>
              Our goal is to empower patients, caregivers, researchers, and healthcare professionals with deeper 
              understanding of closed-loop insulin therapy and the latest scientific breakthroughs in diabetes technology.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                Insulin Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/90 leading-relaxed">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Glucose-Insulin Model</h4>
                <p className="text-muted-foreground">
                  The simulator uses a simplified mathematical model based on the Bergman minimal model, 
                  accounting for insulin sensitivity, carbohydrate absorption, and basal insulin needs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">PID Control Algorithm</h4>
                <p className="text-muted-foreground">
                  Our implementation uses Proportional-Integral-Derivative (PID) control—the same fundamental 
                  approach used in many commercial automated insulin delivery systems.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Scenario Testing</h4>
                <p className="text-muted-foreground">
                  Test different real-world situations including meals, exercise, stress responses, and 
                  missed doses to understand how the algorithm adapts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                AI Research Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/90 leading-relaxed">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Data Sources</h4>
                <p className="text-muted-foreground">
                  Research articles are fetched from PubMed's public API, focusing on diabetes technology, 
                  automated insulin delivery, and clinical outcomes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">AI Summarization</h4>
                <p className="text-muted-foreground">
                  Large language models process abstracts to generate concise summaries and "why it matters" 
                  insights, making complex research accessible.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Topic Filtering</h4>
                <p className="text-muted-foreground">
                  Filter by technology type, patient population, or research focus to find the most 
                  relevant studies for your interests.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Important Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <p className="text-sm text-destructive-foreground/90 leading-relaxed">
                <strong>Educational Purpose Only:</strong> This simulator is designed for educational purposes 
                and should never be used for actual medical decision-making or insulin dosing. Always consult 
                with qualified healthcare professionals for diabetes management.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
              <p className="text-sm text-accent-foreground/90 leading-relaxed">
                <strong>Simplified Model:</strong> The glucose-insulin dynamics are simplified representations. 
                Real physiology is far more complex and varies significantly between individuals.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong>Research Summaries:</strong> AI-generated summaries are provided for convenience but 
                may not capture all nuances. Always refer to original publications for complete information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">TailwindCSS</Badge>
              <Badge variant="outline">Express</Badge>
              <Badge variant="outline">Canvas API</Badge>
              <Badge variant="outline">PubMed API</Badge>
              <Badge variant="outline">OpenAI</Badge>
              <Badge variant="outline">Vite</Badge>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="gap-2" data-testid="button-github">
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Built with passion for advancing diabetes care and technology education</p>
        </div>
      </div>
    </div>
  );
}
