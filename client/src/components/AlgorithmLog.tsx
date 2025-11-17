import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";

export function AlgorithmLog({ logs }: { logs?: string[] }) {
  const logEntries = logs || [];
  
  return (
    <div className="relative">
      <div className="absolute top-3 left-3 flex items-center gap-2 text-xs text-accent z-10">
        <Terminal className="w-3 h-3" />
        <span className="font-mono">ALGORITHM OUTPUT</span>
      </div>
      <ScrollArea className="h-64 w-full rounded-lg bg-muted/30 border border-border/40 p-4 pt-10 font-mono text-sm">
        <div className="space-y-1" data-testid="algorithm-log">
          {logEntries.length > 0 ? (
            logEntries.map((log, i) => (
              <div 
                key={i} 
                className="text-accent/80 hover:text-accent transition-colors leading-relaxed"
                data-testid={`log-entry-${i}`}
              >
                <span className="text-accent/50">›</span> {log}
              </div>
            ))
          ) : (
            <div className="text-muted-foreground text-center py-8">
              Run simulation to see algorithm output
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
