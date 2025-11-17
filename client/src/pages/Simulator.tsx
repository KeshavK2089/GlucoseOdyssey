import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Download } from "lucide-react";
import { DNALoader } from "@/components/DNALoader";
import { SimulatorChart } from "@/components/SimulatorChart";
import { AlgorithmLog } from "@/components/AlgorithmLog";
import type { SimulatorParameters, Scenario, SimulationResult } from "@shared/schema";

export default function Simulator() {
  const [parameters, setParameters] = useState<SimulatorParameters>({
    weight: 70,
    carbIntake: 45,
    insulinSensitivityFactor: 50,
    basalRate: 1.0,
    targetGlucose: 100,
    correctionFactor: 50,
  });

  const [scenario, setScenario] = useState<Scenario>({
    type: 'normal',
    intensity: 0.5,
  });

  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const simulationMutation = useMutation({
    mutationFn: async () => {
      const { apiRequest } = await import("@/lib/queryClient");
      return apiRequest('POST', '/api/simulate', { parameters, scenario });
    },
    onSuccess: (data) => {
      setSimulationResult(data);
    },
  });

  const runSimulation = () => {
    simulationMutation.mutate();
  };

  const resetSimulation = () => {
    setSimulationResult(null);
    setParameters({
      weight: 70,
      carbIntake: 45,
      insulinSensitivityFactor: 50,
      basalRate: 1.0,
      targetGlucose: 100,
      correctionFactor: 50,
    });
    setScenario({ type: 'normal', intensity: 0.5 });
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Insulin Simulator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize closed-loop insulin delivery with real-time parameter control
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Simulator Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Weight (kg)</Label>
                    <span className="text-sm font-mono text-primary font-semibold" data-testid="value-weight">{parameters.weight}</span>
                  </div>
                  <Slider
                    value={[parameters.weight]}
                    onValueChange={([value]) => setParameters({ ...parameters, weight: value })}
                    min={20}
                    max={200}
                    step={1}
                    data-testid="slider-weight"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Carb Intake (g)</Label>
                    <span className="text-sm font-mono text-accent font-semibold" data-testid="value-carb-intake">{parameters.carbIntake}</span>
                  </div>
                  <Slider
                    value={[parameters.carbIntake]}
                    onValueChange={([value]) => setParameters({ ...parameters, carbIntake: value })}
                    min={0}
                    max={200}
                    step={5}
                    data-testid="slider-carb-intake"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Insulin Sensitivity (mg/dL per U)</Label>
                    <span className="text-sm font-mono text-secondary font-semibold" data-testid="value-insulin-sensitivity">{parameters.insulinSensitivityFactor}</span>
                  </div>
                  <Slider
                    value={[parameters.insulinSensitivityFactor]}
                    onValueChange={([value]) => setParameters({ ...parameters, insulinSensitivityFactor: value })}
                    min={10}
                    max={150}
                    step={5}
                    data-testid="slider-insulin-sensitivity"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Basal Rate (U/hr)</Label>
                    <span className="text-sm font-mono text-primary font-semibold">{parameters.basalRate.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[parameters.basalRate]}
                    onValueChange={([value]) => setParameters({ ...parameters, basalRate: value })}
                    min={0}
                    max={5}
                    step={0.1}
                    data-testid="slider-basal-rate"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Target Glucose (mg/dL)</Label>
                    <span className="text-sm font-mono text-primary font-semibold">{parameters.targetGlucose}</span>
                  </div>
                  <Slider
                    value={[parameters.targetGlucose]}
                    onValueChange={([value]) => setParameters({ ...parameters, targetGlucose: value })}
                    min={70}
                    max={180}
                    step={5}
                    data-testid="slider-target-glucose"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Scenario Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Scenario Type</Label>
                  <Select
                    value={scenario.type}
                    onValueChange={(value) => setScenario({ ...scenario, type: value as Scenario['type'] })}
                  >
                    <SelectTrigger data-testid="select-scenario">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal Activity</SelectItem>
                      <SelectItem value="meal">Post-Meal</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="stress">Stress Response</SelectItem>
                      <SelectItem value="missed_bolus">Missed Bolus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={runSimulation} 
                    className="flex-1 gap-2"
                    data-testid="button-run-simulation"
                  >
                    <Play className="w-4 h-4" />
                    Run Simulation
                  </Button>
                  <Button 
                    onClick={resetSimulation} 
                    variant="outline"
                    data-testid="button-reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {simulationMutation.isPending ? (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardContent className="py-24">
                  <DNALoader text="Running simulation..." />
                </CardContent>
              </Card>
            ) : simulationMutation.isError ? (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardContent className="py-24">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-destructive/40 flex items-center justify-center">
                      <Play className="w-10 h-10 text-destructive/60" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-destructive">Simulation Error</h3>
                    <p className="text-muted-foreground mb-6">
                      {simulationMutation.error?.message || 'Failed to run simulation'}
                    </p>
                    <Button onClick={runSimulation} variant="outline" data-testid="button-retry">
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : simulationResult ? (
              <>
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        Glucose & Insulin Dynamics
                      </CardTitle>
                      <Button variant="ghost" size="icon" data-testid="button-export">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <SimulatorChart data={simulationResult.dataPoints} />
                  </CardContent>
                </Card>

                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      Algorithm Activity Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlgorithmLog logs={simulationResult.algorithmLogs} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardContent className="py-24">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-dashed border-border/40 flex items-center justify-center">
                      <Play className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Simulate</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Configure your parameters and select a scenario, then click "Run Simulation" to visualize glucose-insulin dynamics
                    </p>
                    <Badge variant="outline" className="gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      PID Controller Ready
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
