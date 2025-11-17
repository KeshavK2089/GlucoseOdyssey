import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Lightbulb, FlaskConical, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-foreground">
            About Glucose Odyssey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            An educational platform for understanding automated insulin delivery systems and diabetes research
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-5 h-5 text-primary" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Glucose Odyssey provides interactive tools to help people understand how automated insulin delivery systems work. Through hands-on simulation and curated research summaries, we make complex diabetes technology accessible to everyone.
            </p>
            <p>
              Whether you're living with diabetes, caring for someone who is, or working in healthcare, our goal is to help you better understand closed-loop insulin therapy and stay informed about the latest research.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                Insulin Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">How It Works</h4>
                <p className="text-muted-foreground">
                  The simulator uses mathematical models to show how glucose and insulin interact in the body. You can adjust parameters like meal size, insulin sensitivity, and basal rates to see how the system responds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Control Algorithm</h4>
                <p className="text-muted-foreground">
                  Based on proportional-integral-derivative (PID) control—the same fundamental approach used in many commercial automated insulin delivery systems.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Learning Tool</h4>
                <p className="text-muted-foreground">
                  Experiment with different scenarios to understand how closed-loop systems adjust insulin delivery in real-time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-success" />
                Research Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Data Sources</h4>
                <p className="text-muted-foreground">
                  Research articles are sourced from PubMed, the trusted database of biomedical literature maintained by the National Library of Medicine.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">AI Summaries</h4>
                <p className="text-muted-foreground">
                  Summaries are generated to help you quickly understand study findings and their clinical significance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Stay Informed</h4>
                <p className="text-muted-foreground">
                  Filter by topic to find research relevant to your interests—from CGM accuracy to pump technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-warning/30 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong>For Educational Use Only:</strong> This simulator is designed for learning purposes and should never be used for actual medical decisions or insulin dosing. Always consult with your healthcare team for diabetes management.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-muted bg-muted/30">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong>Simplified Model:</strong> Real glucose-insulin dynamics are far more complex than this simulation. Individual responses vary significantly based on many factors.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong>Research Summaries:</strong> AI summaries are provided for convenience. Always refer to original publications for complete information and clinical details.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Express</Badge>
              <Badge variant="outline">PubMed API</Badge>
              <Badge variant="outline">OpenAI</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="gap-2" data-testid="button-github">
                <ExternalLink className="w-4 h-4" />
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>Built to advance diabetes care education and technology understanding</p>
        </div>
      </div>
    </div>
  );
}
