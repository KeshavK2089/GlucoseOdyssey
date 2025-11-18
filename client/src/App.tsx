import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Simulator from "@/pages/Simulator";
import Research from "@/pages/Research";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

// GitHub Pages base path
const BASE_PATH = import.meta.env.BASE_URL || "/";

function Router() {
  return (
    <WouterRouter base={BASE_PATH}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/simulator" component={Simulator} />
        <Route path="/research" component={Research} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
