import { useEffect, useState } from 'react';

const LOG_LINES = [
  '[SYS] Model converged. CAC optimization deployed.',
  '[NET] Connecting to Meta Ads API... SUCCESS.',
  '[DB] Querying firmographic data (LinkedIn). Match: 94%.',
  '[AI] Predictive ROAS adjusted to +14% for segment A.',
  '[SYS] Reallocating budget to PMAX High-Intent.',
  '[WARN] Creative fatigue detected on Ad_ID_882. Rotating.',
  '[OK] A/B test concluded. Variant B won by 3.2x CTR.',
  '[NET] Syncing offline conversions via CAPI.',
  '[SYS] Recalculating customer LTV.',
  '[AI] Anomaly detected in CPC. Initiating bid adjustments.',
  '[SYS] LabAds Core Engine v2.4 running smoothly.',
  '[SEC] Auth successful. Validating ad account tokens.',
  '[DATA] Parsing Google Analytics 4 stream.',
];

export const SystemLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const initialLogs = Array.from({ length: 50 }, () => {
      const time = new Date(Date.now() - Math.random() * 100000).toISOString().split('T')[1].slice(0, 12);
      return `${time} ${LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]}`;
    });
    setLogs(initialLogs);

    const interval = setInterval(() => {
      setLogs((prev) => {
        const time = new Date().toISOString().split('T')[1].slice(0, 12);
        const newLog = `${time} ${LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]}`;
        return [...prev.slice(1), newLog];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] flex flex-col justify-end p-8 [mask-image:linear-gradient(to_top,black,transparent)]">
      <div className="flex flex-col items-start gap-1">
        {logs.map((log, i) => (
          <div key={i} className="font-mono text-[10px] text-neonCyan whitespace-nowrap">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
