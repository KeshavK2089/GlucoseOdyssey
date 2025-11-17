import type { SimulatorParameters, Scenario, SimulationDataPoint } from "@shared/schema";

export function runGlucoseInsulinSimulation(
  parameters: SimulatorParameters,
  scenario: Scenario,
  durationMinutes: number = 240
): { dataPoints: SimulationDataPoint[]; logs: string[] } {
  const {
    weight,
    carbIntake,
    insulinSensitivityFactor,
    basalRate,
    targetGlucose,
    correctionFactor,
  } = parameters;

  const dataPoints: SimulationDataPoint[] = [];
  const logs: string[] = [];
  
  const timestep = 5;
  const steps = durationMinutes / timestep;
  
  let glucose = targetGlucose + (Math.random() - 0.5) * 20;
  let insulinOnBoard = 0;
  let carbsOnBoard = 0;
  
  const Kp = 0.02;
  const Ki = 0.001;
  const Kd = 0.015;
  
  let integralError = 0;
  let previousError = 0;
  
  const carbAbsorptionTime = 180;
  const insulinActionTime = 300;
  
  const scenarioMultipliers: Record<Scenario['type'], { glucose: number; insulin: number }> = {
    'normal': { glucose: 1.0, insulin: 1.0 },
    'meal': { glucose: 1.3, insulin: 1.0 },
    'exercise': { glucose: 0.7, insulin: 1.3 },
    'stress': { glucose: 1.4, insulin: 0.8 },
    'missed_bolus': { glucose: 1.2, insulin: 0.5 },
  };
  
  const multiplier = scenarioMultipliers[scenario.type];
  const intensity = scenario.intensity;
  
  logs.push(`[00:00] Simulation started - Scenario: ${scenario.type}`);
  logs.push(`[00:00] Target glucose: ${targetGlucose} mg/dL`);
  logs.push(`[00:00] Basal rate: ${basalRate.toFixed(2)} U/hr`);
  
  const mealTime = 60;
  
  for (let step = 0; step < steps; step++) {
    const time = step * timestep;
    
    if (time === mealTime && carbIntake > 0) {
      carbsOnBoard += carbIntake;
      const bolusUnits = (carbIntake / correctionFactor) * multiplier.insulin;
      insulinOnBoard += bolusUnits;
      logs.push(`[${formatTime(time)}] Meal detected: ${carbIntake}g carbs`);
      logs.push(`[${formatTime(time)}] Bolus delivered: ${bolusUnits.toFixed(2)} U`);
    }
    
    const carbAbsorptionRate = carbsOnBoard / (carbAbsorptionTime / timestep);
    const carbEffect = carbAbsorptionRate * 5 * multiplier.glucose;
    carbsOnBoard = Math.max(0, carbsOnBoard - carbAbsorptionRate);
    
    const insulinDecayRate = insulinOnBoard / (insulinActionTime / timestep);
    const insulinEffect = insulinDecayRate * insulinSensitivityFactor * multiplier.insulin;
    insulinOnBoard = Math.max(0, insulinOnBoard - insulinDecayRate);
    
    const error = targetGlucose - glucose;
    integralError += error * timestep;
    const derivativeError = (error - previousError) / timestep;
    
    const pidOutput = (Kp * error) + (Ki * integralError) + (Kd * derivativeError);
    
    const basalInsulin = (basalRate / 60) * timestep;
    const correctionInsulin = Math.max(0, pidOutput / 100);
    const totalInsulinDelivery = (basalInsulin + correctionInsulin) * multiplier.insulin;
    
    insulinOnBoard += totalInsulinDelivery;
    
    const glucoseChange = carbEffect - insulinEffect + (Math.random() - 0.5) * 3;
    glucose = Math.max(40, Math.min(400, glucose + glucoseChange));
    
    previousError = error;
    
    const currentInsulinRate = (totalInsulinDelivery / timestep) * 60;
    
    dataPoints.push({
      time,
      glucose: Math.round(glucose * 10) / 10,
      insulin: Math.round(currentInsulinRate * 100) / 100,
      carbs: time === mealTime ? carbIntake : 0,
    });
    
    if (step % 12 === 0) {
      if (glucose > targetGlucose + 30) {
        logs.push(`[${formatTime(time)}] High glucose detected (${Math.round(glucose)} mg/dL) - increasing insulin`);
      } else if (glucose < targetGlucose - 20) {
        logs.push(`[${formatTime(time)}] Low glucose risk (${Math.round(glucose)} mg/dL) - reducing insulin`);
      } else {
        logs.push(`[${formatTime(time)}] Glucose in target range (${Math.round(glucose)} mg/dL)`);
      }
    }
  }
  
  logs.push(`[${formatTime(durationMinutes)}] Simulation complete`);
  const avgGlucose = dataPoints.reduce((sum, dp) => sum + dp.glucose, 0) / dataPoints.length;
  logs.push(`[${formatTime(durationMinutes)}] Average glucose: ${Math.round(avgGlucose)} mg/dL`);
  
  return { dataPoints, logs };
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
