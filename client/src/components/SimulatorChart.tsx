import { useEffect, useRef } from "react";
import type { SimulationDataPoint } from "@shared/schema";

export function SimulatorChart({ data }: { data?: SimulationDataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data || !data.length) return;

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

    ctx.strokeStyle = 'hsl(240 35% 35%)';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + width, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = '#10B981';
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
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
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
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.strokeStyle = '#7F56D9';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = getX(point.time);
      const y = getInsulinY(point.insulin);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'hsl(240 20% 40%)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
      const time = (maxTime / 4) * i;
      const x = getX(time);
      ctx.fillText(`${time}min`, x, padding.top + height + 30);
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = '#10B981';
    for (let i = 0; i <= 3; i++) {
      const glucose = Math.round((maxGlucose / 3) * i);
      const y = getGlucoseY(glucose);
      ctx.fillText(`${glucose} mg/dL`, padding.left - 15, y + 4);
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = '#7F56D9';
    for (let i = 0; i <= 3; i++) {
      const insulin = ((maxInsulin / 3) * i).toFixed(1);
      const y = getInsulinY(parseFloat(insulin));
      ctx.fillText(`${insulin} U`, padding.left + width + 15, y + 4);
    }

    ctx.fillStyle = 'hsl(240 20% 40%)';
    ctx.textAlign = 'left';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText('Time (minutes)', rect.width / 2 - 30, rect.height - 10);

    ctx.save();
    ctx.translate(20, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#10B981';
    ctx.textAlign = 'center';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillText('Glucose (mg/dL)', 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(rect.width - 20, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#7F56D9';
    ctx.textAlign = 'center';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillText('Insulin (U/hr)', 0, 0);
    ctx.restore();

    ctx.fillStyle = '#10B981';
    ctx.fillRect(padding.left + 20, 13, 18, 3);
    ctx.fillStyle = 'hsl(240 20% 30%)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Glucose', padding.left + 42, 18);

    ctx.strokeStyle = '#7F56D9';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left + 110, 15);
    ctx.lineTo(padding.left + 128, 15);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'hsl(240 20% 30%)';
    ctx.fillText('Insulin', padding.left + 132, 18);

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
