import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  target: string;
  label: string;
  detail: string;
  suffix?: string;
  index?: number;
}

const Sparkline = ({ active, variant }: { active: boolean, variant: number }) => {
  const paths = [
    "M0,40 L15,35 L25,45 L40,25 L55,35 L70,15 L85,25 L100,5",
    "M0,45 L20,25 L35,35 L50,15 L65,25 L80,5 L100,10",
    "M0,35 L15,45 L30,25 L45,35 L60,10 L75,20 L90,5 L100,15"
  ];
  const d = paths[variant % paths.length];

  return (
    <div className="absolute inset-x-0 bottom-0 top-1/3 z-0 overflow-hidden opacity-20 pointer-events-none flex items-end">
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-neonCyan">
        <title>Gráfico Sparkline</title>
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${d} L100,50 L0,50 Z`}
          fill={`url(#gradient-${variant})`}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
    </div>
  );
};

export const AnimatedCounter = ({ target, label, detail, index = 0 }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState('0');
  const numericMatch = useMemo(() => target.match(/([-]?)(\d+\.?\d*)(.*)/), [target]);

  useEffect(() => {
    if (!isInView || !numericMatch) {
      setDisplay(target);
      return;
    }
    const sign = numericMatch[1];
    const end = parseFloat(numericMatch[2]);
    const suffix = numericMatch[3];
    const duration = 1800;
    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * end;

      if (end % 1 !== 0) {
        setDisplay(`${sign}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${sign}${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, numericMatch]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-surface p-10 md:p-12 border border-white/[0.06] flex flex-col justify-center items-center text-center hover:border-neonCyan/20 transition-all duration-500 gradient-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neonCyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated background sparkline */}
      <Sparkline active={isInView} variant={index} />

      <span className="text-5xl md:text-6xl font-display font-bold text-white mb-4 animate-counter-glow relative z-10">
        {display}
      </span>
      <span className="text-neonCyan font-mono text-xs mb-2 uppercase tracking-widest relative z-10">
        {label}
      </span>
      <span className="text-textMuted text-xs relative z-10">{detail}</span>
    </motion.div>
  );
};
