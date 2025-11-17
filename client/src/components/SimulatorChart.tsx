import { useEffect, useRef } from "react";
import type { SimulationDataPoint } from "@shared/schema";

export function SimulatorChart({ data }: { data: SimulationDataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);

    const padding = { top: 40, right: 80, bottom: 60, left: 80 };
    const width = rect.width - padding.left - padding.right;
    const height = rect.height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, rect.width, rect.height);

    const maxTime = Math.max(...data.map(d => d.time));
    const maxGlucose = Math.max(...data.map(d => d.glucose));
    const maxInsulin = Math.max(...data.map(d => d.insulin));

    const getX = (time: number) => padding.left + (time / maxTime) * width;
    const getGlucoseY = (glucose: number) => padding.top + height - (glucose / (maxGlucose * 1.2)) * height;
    const getInsulinY = (insulin: number) => padding.top + height - (insulin / (maxInsulin * 1.5)) * height;

    ctx.strokeStyle = 'hsl(220 15% 15%)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'hsl(190 95% 55%)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = getX(point.time);
      const y = getGlucoseY(point.glucose);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + height);
    gradient.addColorStop(0, 'hsla(190, 95%, 55%, 0.3)');
    gradient.addColorStop(1, 'hsla(190, 95%, 55%, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = getX(point.time);
      const y = getGlucoseY(point.glucose);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(getX(data[data.length - 1].time), padding.top + height);
    ctx.lineTo(getX(data[0].time), padding.top + height);
    ctx.closePath();
    ctx.fill();

    data.forEach((point, i) => {
      if (i % 5 === 0) {
        const x = getX(point.time);
        const y = getGlucoseY(point.glucose);
        ctx.fillStyle = 'hsl(190 95% 55%)';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.strokeStyle = 'hsl(270 70% 65%)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = getX(point.time);
      const y = getInsulinY(point.insulin);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'hsl(220 15% 95%)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
      const time = (maxTime / 4) * i;
      const x = getX(time);
      ctx.fillText(`${time}min`, x, padding.top + height + 30);
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = 'hsl(190 95% 55%)';
    for (let i = 0; i <= 3; i++) {
      const glucose = Math.round((maxGlucose / 3) * i);
      const y = getGlucoseY(glucose);
      ctx.fillText(`${glucose}`, padding.left - 15, y + 4);
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = 'hsl(270 70% 65%)';
    for (let i = 0; i <= 3; i++) {
      const insulin = ((maxInsulin / 3) * i).toFixed(1);
      const y = getInsulinY(parseFloat(insulin));
      ctx.fillText(insulin, padding.left + width + 15, y + 4);
    }

    ctx.fillStyle = 'hsl(220 15% 95%)';
    ctx.textAlign = 'left';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('Time (minutes)', rect.width / 2 - 30, rect.height - 10);

    ctx.save();
    ctx.translate(20, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = 'hsl(190 95% 55%)';
    ctx.textAlign = 'center';
    ctx.fillText('Glucose (mg/dL)', 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(rect.width - 20, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = 'hsl(270 70% 65%)';
    ctx.textAlign = 'center';
    ctx.fillText('Insulin (U/hr)', 0, 0);
    ctx.restore();

    ctx.fillStyle = 'hsl(190 95% 55%)';
    ctx.fillRect(padding.left + 20, 15, 15, 3);
    ctx.fillStyle = 'hsl(220 15% 95%)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Glucose', padding.left + 40, 20);

    ctx.strokeStyle = 'hsl(270 70% 65%)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding.left + 120, 16);
    ctx.lineTo(padding.left + 135, 16);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'hsl(220 15% 95%)';
    ctx.fillText('Insulin', padding.left + 140, 20);

  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-96"
      style={{ width: '100%', height: '384px' }}
      data-testid="canvas-simulator-chart"
    />
  );
}
