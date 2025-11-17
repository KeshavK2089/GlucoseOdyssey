import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Search, ExternalLink, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/research'],
    queryFn: fetchResearchArticles,
  });

  const articles = Array.isArray(data) ? data : [];

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
      selectedTopics.some(topic => article.topics?.includes(topic));
    const matchesSearch = searchQuery === "" || 
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-foreground">
            Latest Diabetes Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay current with breakthrough studies and clinical insights from leading diabetes research journals
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
          <Card>
            <CardContent className="py-24">
              <LoadingSpinner text="Fetching latest research..." />
            </CardContent>
          </Card>
        ) : isError ? (
          <Card className="bg-muted/30 mb-8">
            <CardContent className="py-12 text-center">
              <Lightbulb className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Using Sample Data</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Live PubMed integration will be available when connected to the backend
              </p>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id}
              className="hover-elevate transition-all group"
              data-testid={`card-article-${article.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge variant="outline" className="text-xs shrink-0">
                    {article.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.pubDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <CardTitle className="text-xl font-serif leading-snug line-clamp-2">
                  {article.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {article.authors.slice(0, 3).join(", ")}
                  {article.authors.length > 3 && " et al."}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-primary mb-1">Clinical Significance</p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {article.whyItMatters}
                    </p>
                  </div>
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

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                    data-testid={`button-expand-${article.id}`}
                  >
                    {expandedArticle === article.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Read More
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    data-testid={`button-external-${article.id}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Source
                  </Button>
                </div>

                {expandedArticle === article.id && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Abstract</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {article.abstract}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && !isLoading && (
          <Card>
            <CardContent className="py-24">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
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
