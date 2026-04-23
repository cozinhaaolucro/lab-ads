import { useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { DecryptText } from './DecryptText';
import { useEffect } from 'react';
import { pushToDataLayer } from '../lib/gtm';

// Counter component for smooth number transitions
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value.toLocaleString('pt-BR'));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (latest % 1 !== 0) {
          setDisplay(latest.toFixed(1).replace('.', ','));
        } else {
          setDisplay(Math.floor(latest).toLocaleString('pt-BR'));
        }
      }
    });
    return controls.stop;
  }, [value]);

  return <span>{prefix}{display}{suffix}</span>;
}

export const RoiSimulator = () => {
  const [investment, setInvestment] = useState(15000);

  // Mathematical projections based on a logarithmic curve for realistic scaling
  const roasMultiplier = 3.8 - (investment / 100000) * 0.8; // ROAS slightly decreases as spend scales
  const projectedRevenue = investment * roasMultiplier;
  
  // CAC drops faster initially, then plateaus
  const cacReductionBase = 42; 
  const currentCacReduction = Math.min((Math.log10(investment / 4000) / Math.log10(25)) * cacReductionBase, cacReductionBase);

  // SVG Path control point
  const curveHeight = 100 - (investment / 100000) * 90;

  return (
    <section id="simulador" className="px-6 py-32 md:py-40 max-w-[1440px] mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neonCyan/[0.02] rounded-[100%] blur-[100px] pointer-events-none" />

      <FadeIn>
        <div className="text-center mb-16 relative z-10">
          <p className="text-neonCyan font-mono text-xs uppercase tracking-[0.25em] mb-4">
            // simulação preditiva
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            <DecryptText text="Modele o seu" /> <span className="text-gradient"><DecryptText text="Cenário Ideal." /></span>
          </h2>
          <p className="text-textMuted max-w-xl mx-auto leading-relaxed">
            Arraste o slider para simular como nossa metodologia otimiza a sua verba, estabiliza o custo de aquisição e escala a sua receita projetada.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 relative z-10">
          {/* Slider Input */}
          <div className="mb-14">
            <label className="flex justify-between items-end text-white font-mono mb-6">
              <span className="text-sm uppercase tracking-widest text-textMuted">Investimento Mensal (Mídia)</span>
              <span className="text-2xl text-neonCyan font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                R$ {investment.toLocaleString('pt-BR')}
              </span>
            </label>
            <div className="relative">
              <input
                type="range"
                id="roi-simulator-slider"
                min="5000"
                max="100000"
                step="1000"
                value={investment}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setInvestment(val);
                  pushToDataLayer({
                    event: 'simulator_change',
                    investment_value: val
                  });
                }}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none outline-none slider-thumb relative z-10"
              />
              {/* Active track bar */}
              <div 
                className="absolute top-0 left-0 h-1.5 bg-neonCyan rounded-full pointer-events-none drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]"
                style={{ width: `${((investment - 5000) / 95000) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 font-mono text-[10px] text-textMuted/50">
              <span>R$ 5K (Min)</span>
              <span>R$ 100K+</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/[0.06]">
            <div className="bg-surface/30 p-6 border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-neonCyan rounded-full animate-pulse" />
                <p className="text-textMuted font-mono text-[10px] uppercase tracking-wider">Receita Projetada (ROAS {roasMultiplier.toFixed(1)}x)</p>
              </div>
              <p className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                <AnimatedNumber value={projectedRevenue} prefix="R$ " />
              </p>
            </div>
            <div className="bg-surface/30 p-6 border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <p className="text-textMuted font-mono text-[10px] uppercase tracking-wider">Redução Estimada de CAC</p>
              </div>
              <p className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                <AnimatedNumber value={currentCacReduction} prefix="-" suffix="%" />
              </p>
            </div>
          </div>

          {/* Interactive Graph Curve */}
          <div className="mt-12 pt-8 h-32 relative border-b border-l border-white/[0.1]">
            <span className="absolute -left-6 top-0 text-[8px] font-mono text-textMuted/40 -rotate-90 origin-left">RECEITA</span>
            <span className="absolute bottom-[-20px] right-0 text-[8px] font-mono text-textMuted/40">TEMPO (DIAS)</span>
            
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-neonCyan overflow-visible">
              <defs>
                <linearGradient id="sim-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                animate={{ d: `M0,100 Q40,${curveHeight} 100,${curveHeight - 10}` }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              />
              <motion.path
                animate={{ d: `M0,100 Q40,${curveHeight} 100,${curveHeight - 10} L100,100 Z` }}
                fill="url(#sim-gradient)"
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              />
              {/* Target dot */}
              <motion.circle 
                animate={{ cy: curveHeight - 10 }}
                cx="100" 
                r="3" 
                fill="currentColor" 
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              />
            </svg>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
