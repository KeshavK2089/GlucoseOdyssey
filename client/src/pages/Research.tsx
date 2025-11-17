import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, Search, ExternalLink, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { DNALoader } from "@/components/DNALoader";
import type { ResearchArticle } from "@shared/schema";

const topics = ["AID Systems", "CGM", "Insulin Pumps", "Type 1", "Type 2", "Clinical Trials"];

async function fetchResearchArticles(): Promise<ResearchArticle[]> {
  try {
    const { apiRequest } = await import("@/lib/queryClient");
    return await apiRequest('GET', '/api/research', undefined);
  } catch (error) {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const mockPath = `${baseUrl}mock-research.json`.replace('//', '/');
    const mockResponse = await fetch(mockPath);
    return mockResponse.json();
  }
}

export default function Research() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const { data: articles = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/research'],
    queryFn: fetchResearchArticles,
  });

  const mockArticles: ResearchArticle[] = [
    {
      id: "1",
      title: "Hybrid Closed-Loop Systems Reduce HbA1c in Type 1 Diabetes: Meta-Analysis",
      authors: ["Smith J", "Johnson M", "Williams K"],
      source: "Diabetes Care",
      pubDate: "2024-11-10",
      abstract: "Background: Automated insulin delivery systems have shown promise in improving glycemic control. Methods: We conducted a systematic review and meta-analysis of 24 randomized controlled trials involving 2,847 participants. Results: Hybrid closed-loop systems reduced HbA1c by 0.45% compared to standard insulin therapy (p<0.001). Time in range increased by 12.3% (p<0.001) without increasing hypoglycemia risk. Conclusion: These findings support the efficacy and safety of automated insulin delivery.",
      summary: "Meta-analysis shows hybrid closed-loop insulin delivery reduces HbA1c by 0.45% and increases time-in-range by 12.3% without increasing hypoglycemia risk.",
      whyItMatters: "First comprehensive analysis demonstrating real-world efficacy of automated insulin delivery across diverse populations",
      url: "https://example.com/article1",
      topics: ["AID Systems", "Type 1", "Clinical Trials"],
    },
    {
      id: "2",
      title: "Next-Generation CGM Sensors Achieve 99% Accuracy in Hypoglycemic Range",
      authors: ["Chen L", "Rodriguez A", "Patel S"],
      source: "Journal of Diabetes Science and Technology",
      pubDate: "2024-11-05",
      abstract: "Objective: To evaluate the accuracy of next-generation continuous glucose monitoring sensors in the hypoglycemic range (<70 mg/dL). Methods: 156 participants wore the new sensor for 14 days. Results: Mean absolute relative difference (MARD) was 6.2% overall and 7.1% in hypoglycemic range. 99.2% of readings in Clarke Error Grid Zone A. Conclusion: The new sensor provides highly accurate glucose readings across all ranges.",
      summary: "New CGM sensors demonstrate 99% accuracy in detecting low blood sugar with 6.2% overall error rate across 14-day wear period.",
      whyItMatters: "Breakthrough in hypoglycemia detection could prevent severe low blood sugar events in vulnerable populations",
      url: "https://example.com/article2",
      topics: ["CGM", "Type 1"],
    },
    {
      id: "3",
      title: "AI-Powered Insulin Dosing Algorithm Outperforms Traditional PID Controllers",
      authors: ["Thompson R", "Lee H", "Garcia M"],
      source: "Nature Medicine",
      pubDate: "2024-10-28",
      abstract: "Background: Machine learning approaches may improve automated insulin delivery. Methods: We developed a reinforcement learning algorithm and compared it to standard PID control in a 12-week crossover trial with 92 participants. Results: The AI algorithm increased time-in-range from 68% to 81% (p<0.001) with 32% reduction in hypoglycemic events. The system adapted to individual meal patterns and exercise. Conclusion: AI-based dosing shows significant improvements over conventional algorithms.",
      summary: "Machine learning algorithm increases glucose time-in-range from 68% to 81% while reducing low blood sugar events by 32%.",
      whyItMatters: "Represents paradigm shift toward personalized, adaptive insulin therapy that learns individual patterns",
      url: "https://example.com/article3",
      topics: ["AID Systems", "Clinical Trials"],
    },
    {
      id: "4",
      title: "Tubeless Insulin Pump Technology Shows High Satisfaction in Pediatric Users",
      authors: ["Anderson K", "Wright D", "Foster J"],
      source: "Diabetes Technology & Therapeutics",
      pubDate: "2024-10-20",
      abstract: "Purpose: To assess user satisfaction and glycemic outcomes with tubeless insulin pumps in children aged 7-17. Methods: 203 pediatric patients switched to tubeless pumps for 6 months. Results: User satisfaction scores improved from 6.8 to 8.9 (p<0.001). HbA1c decreased by 0.3%. 89% of parents reported reduced diabetes burden. Conclusion: Tubeless technology is well-accepted and effective in pediatric populations.",
      summary: "Tubeless insulin pumps increase user satisfaction scores from 6.8 to 8.9 while improving glucose control in children and teens.",
      whyItMatters: "Addresses major barrier to pump adoption in young people, potentially improving long-term diabetes management",
      url: "https://example.com/article4",
      topics: ["Insulin Pumps", "Type 1"],
    },
    {
      id: "5",
      title: "Ultra-Fast Insulin Analog Reduces Post-Meal Glucose Spikes by 40%",
      authors: ["Kumar V", "Martinez C", "Zhao Y"],
      source: "The Lancet Diabetes & Endocrinology",
      pubDate: "2024-10-15",
      abstract: "Background: Post-prandial hyperglycemia remains challenging. Methods: Phase 3 trial of novel ultra-fast insulin analog vs standard rapid-acting insulin in 487 participants. Results: Peak glucose reduction of 41mg/dL at 1-hour post-meal (p<0.001). Onset of action: 8 minutes vs 15 minutes for standard insulin. No increase in hypoglycemia. Conclusion: Ultra-fast analog offers superior post-meal control.",
      summary: "New ultra-fast insulin starts working in 8 minutes and reduces post-meal glucose spikes by 40% compared to current rapid-acting formulations.",
      whyItMatters: "Game-changer for mealtime dosing, allowing more flexible eating patterns and better glucose control",
      url: "https://example.com/article5",
      topics: ["Type 1", "Type 2", "Clinical Trials"],
    },
  ];

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['/api/research'] });
    refetch();
  };

  const filteredArticles = articles.filter(article => {
    const matchesTopic = selectedTopics.length === 0 || 
      selectedTopics.some(topic => article.topics.includes(topic));
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-network" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="150" cy="50" r="3" fill="hsl(var(--secondary))" opacity="0.3" />
              <circle cx="100" cy="150" r="3" fill="hsl(var(--accent))" opacity="0.3" />
              <line x1="50" y1="50" x2="150" y2="50" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
              <line x1="50" y1="50" x2="100" y2="150" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.2" />
              <line x1="150" y1="50" x2="100" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-network)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Research Vault
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest diabetes research with AI-powered insights
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Button 
              className="gap-2" 
              onClick={handleRefresh}
              disabled={isLoading}
              data-testid="button-refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Articles
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <Badge
                key={topic}
                variant={selectedTopics.includes(topic) ? "default" : "outline"}
                className="cursor-pointer hover-elevate active-elevate-2"
                onClick={() => toggleTopic(topic)}
                data-testid={`badge-topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-24">
              <DNALoader text="Fetching latest research..." />
            </CardContent>
          </Card>
        ) : isError ? (
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-24">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-accent/40 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-accent/60" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Using Demo Data</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Displaying sample research articles. Live PubMed integration will be available when backend is running.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id}
              className="border-border/40 bg-card/50 backdrop-blur-sm hover-elevate transition-all group"
              data-testid={`card-article-${article.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge variant="outline" className="text-xs shrink-0">
                    {article.source}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 shrink-0"
                    data-testid={`button-external-${article.id}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                <CardTitle className="text-lg leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.pubDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-foreground/90 leading-relaxed">
                    {article.whyItMatters}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {article.topics.map(topic => (
                    <Badge 
                      key={topic} 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`article-${article.id}-topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                  data-testid={`button-expand-${article.id}`}
                >
                  {expandedArticle === article.id ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Abstract
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Read Abstract
                    </>
                  )}
                </Button>

                {expandedArticle === article.id && (
                  <div className="pt-4 border-t border-border/40 space-y-3">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {article.abstract}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Authors: {article.authors.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-24">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-dashed border-border/40 flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters or search terms to find relevant research
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
