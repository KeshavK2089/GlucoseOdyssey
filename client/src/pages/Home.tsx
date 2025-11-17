import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, BookOpen, ChevronRight, Activity, Heart, Lightbulb, Calendar, Beaker, Syringe, Sparkles, Apple, Dumbbell, Stethoscope, AlertCircle } from "lucide-react";
import heroImage from "@assets/generated_images/Diverse_family_park_lifestyle_1d5ed8ac.png";
import historicalMicroscope from "@assets/stock_images/vintage_medical_micr_9b7c81eb.jpg";
import healthyLifestyle from "@assets/stock_images/healthy_lifestyle_fr_f2211e4f.jpg";
import modernResearch from "@assets/stock_images/medical_research_doc_3b97fe48.jpg";
import insulinVial from "@assets/stock_images/insulin_vial_syringe_ce336f1e.jpg";

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

      <section className="py-24 px-6 bg-card" data-testid="section-history">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Calendar className="w-3 h-3 mr-2" />
              Historical Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-foreground">
              The Evolution of Diabetes Care
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From ancient discovery to modern automated systems. Explore the remarkable journey of diabetes understanding and treatment
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="relative">
              <img 
                src={historicalMicroscope} 
                alt="Historical medical research" 
                className="rounded-xl w-full h-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl" />
            </div>

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-primary">1500 BCE</span>
                  <Badge variant="outline" className="text-xs">Ancient Discovery</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">First Documentation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ancient Egyptian papyrus describes "too great emptying of urine", the earliest known reference to diabetes symptoms, marking humanity's first encounter with this condition.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-primary">1889</span>
                  <Badge variant="outline" className="text-xs">Breakthrough</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pancreas Discovery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Oskar Minkowski and Joseph von Mering discover the pancreas's role in diabetes by removing it from dogs, establishing the foundation for understanding insulin's importance.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-success" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-success">1921</span>
                  <Badge className="text-xs bg-success text-success-foreground">Life-Saving Moment</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Insulin Isolated</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Frederick Banting and Charles Best isolate insulin at the University of Toronto, transforming diabetes from a death sentence into a manageable condition. One of medicine's greatest achievements.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20 lg:flex-row-reverse">
            <div className="space-y-8 lg:order-2">
              <div className="relative pl-8 border-l-2 border-secondary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-secondary">1960s</span>
                  <Badge variant="outline" className="text-xs">Technology Era</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Blood Glucose Monitoring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  First home glucose meters emerge, empowering people with diabetes to monitor their levels independently. A revolutionary shift toward self-management.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-secondary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-secondary">1999</span>
                  <Badge variant="outline" className="text-xs">Continuous Innovation</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">First CGM Approved</h3>
                <p className="text-muted-foreground leading-relaxed">
                  FDA approves the first continuous glucose monitor (CGM), providing real-time glucose data and trend arrows that transform diabetes decision-making.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-secondary/30">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary" />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl font-serif font-semibold text-primary">2016</span>
                  <Badge className="text-xs bg-primary text-primary-foreground">Modern Era</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Insulin Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  First hybrid closed-loop system (artificial pancreas) approved, automatically adjusting insulin delivery based on CGM readings. The dawn of automated diabetes care.
                </p>
              </div>
            </div>

            <div className="relative lg:order-1">
              <img 
                src={insulinVial} 
                alt="Modern insulin therapy" 
                className="rounded-xl w-full h-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Today & Tomorrow</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Current Research Frontiers</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Modern diabetes care continues to evolve with AI-powered algorithms, smaller sensors, and smarter insulin pumps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Beaker className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Stem Cell Research</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Scientists are working to grow insulin-producing beta cells that could potentially cure Type 1 diabetes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">AI Algorithms</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Machine learning personalizes insulin delivery, predicting glucose trends and preventing highs and lows
                  </p>
                </CardContent>
              </Card>

              <Card className="border-success/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                    <Syringe className="w-6 h-6 text-success" />
                  </div>
                  <h4 className="font-semibold mb-2">Ultra-Rapid Insulin</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Faster-acting insulin formulations enable tighter glucose control and more responsive automated systems
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-background" data-testid="section-prevention">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Heart className="w-3 h-3 mr-2" />
              Health & Wellness
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-foreground">
              Understanding Diabetes Prevention
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              While Type 1 diabetes cannot currently be prevented, Type 2 diabetes and prediabetes can often be delayed or prevented through lifestyle changes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={healthyLifestyle} 
                alt="Healthy lifestyle with nutritious foods" 
                className="rounded-xl w-full shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthy Eating</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Choose whole grains, vegetables, fruits, and lean proteins. Limit processed foods, sugary drinks, and refined carbohydrates to maintain stable blood sugar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Regular Physical Activity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Aim for 150 minutes of moderate exercise weekly. Physical activity helps your body use insulin more effectively and maintains healthy weight.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Weight Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Losing just 5-10% of body weight can significantly reduce Type 2 diabetes risk. Small, sustainable changes make the biggest difference.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Regular Screening</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Annual checkups and blood sugar tests help catch prediabetes early. Early detection enables intervention before diabetes develops.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-warning/10 via-background to-background border-warning/30">
            <CardContent className="p-8 md:p-12">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Know Your Risk Factors</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>Family history of diabetes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>Age 45 or older</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>Overweight or obesity</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>Physical inactivity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>History of gestational diabetes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>High blood pressure or cholesterol</span>
                      </li>
                    </ul>
                  </div>
                  <p className="mt-4 text-foreground/80">
                    <strong>If you have one or more risk factors,</strong> talk to your healthcare provider about screening and prevention strategies tailored to your needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
