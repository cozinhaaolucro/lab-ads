import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ─── Animated Counter Hook ─── */
const useTickingNumber = (end: number, decimals = 0, duration = 2000, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let rafId: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(parseFloat((eased * end).toFixed(decimals)));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, end, decimals, duration]);
  return val;
};

/* ─── Flowing Data Particles ─── */
const HorizontalParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="hidden md:block absolute w-1.5 h-1.5 rounded-full bg-neonCyan shadow-[0_0_8px_#00F0FF] transform-gpu"
    initial={{ left: '10%', top: '45%', opacity: 0, scale: 0.5 }}
    animate={{ 
      left: ['10%', '50%', '90%'], 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1.2, 1, 0.5] 
    }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const VerticalParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="md:hidden absolute w-1.5 h-1.5 rounded-full bg-neonCyan shadow-[0_0_8px_#00F0FF] transform-gpu"
    initial={{ top: '10%', left: '50%', opacity: 0, x: '-50%', scale: 0.5 }}
    animate={{ 
      top: ['10%', '50%', '90%'], 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1.2, 1, 0.5] 
    }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ─── Chaotic Line (Filled Area) ─── */
const ChaoticGraph = ({ active }: { active: boolean }) => {
  const redPaths = [
    'M0,55 L15,20 L30,65 L45,35 L60,58 L75,15 L90,50 L105,25 L120,60 L135,40 L150,10 L165,55 L180,30 L200,45',
    'M0,30 L15,60 L30,15 L45,50 L60,25 L75,65 L90,35 L105,55 L120,10 L135,50 L150,40 L165,20 L180,60 L200,35',
  ];
  const redArea = redPaths.map(p => `${p} L200,70 L0,70 Z`);

  const orangePaths = [
    'M0,40 L15,45 L30,38 L45,50 L60,42 L75,48 L90,36 L105,44 L120,40 L135,46 L150,38 L165,42 L180,44 L200,40',
    'M0,50 L15,35 L30,48 L45,30 L60,52 L75,38 L90,46 L105,34 L120,50 L135,36 L150,48 L165,32 L180,44 L200,50',
  ];

  return (
    <svg viewBox="0 0 200 70" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chaosFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Background Grid */}
      <path d="M0,17.5 L200,17.5 M0,35 L200,35 M0,52.5 L200,52.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
      <path d="M50,0 L50,70 M100,0 L100,70 M150,0 L150,70" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />

      {/* Area Fill */}
      <motion.path
        fill="url(#chaosFill)"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1, d: redArea } : { opacity: 0 }}
        transition={{ 
          opacity: { duration: 1, delay: 0.5 },
          d: { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }}
      />
      {/* Red Line */}
      <motion.path
        d={redPaths[0]}
        stroke="#ef4444"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1, d: redPaths } : { pathLength: 0, opacity: 0 }}
        transition={{ 
          opacity: { duration: 0.8 },
          pathLength: { duration: 1.5, ease: 'easeOut' },
          d: { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }}
        style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' }}
      />
      {/* Orange Line */}
      <motion.path
        d={orangePaths[0]}
        stroke="#f97316"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.6, d: orangePaths } : { pathLength: 0, opacity: 0 }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.2 },
          pathLength: { duration: 1.8, ease: 'easeOut', delay: 0.2 },
          d: { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }}
      />
    </svg>
  );
};

/* ─── Stable Growth Line (Filled Area) ─── */
const GrowthGraph = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 200 70" className="w-full h-full overflow-visible" preserveAspectRatio="none">
    <defs>
      <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Background Grid */}
    <path d="M0,17.5 L200,17.5 M0,35 L200,35 M0,52.5 L200,52.5" stroke="rgba(0,240,255,0.1)" strokeWidth="0.5" strokeDasharray="2,2" />
    <path d="M50,0 L50,70 M100,0 L100,70 M150,0 L150,70" stroke="rgba(0,240,255,0.1)" strokeWidth="0.5" strokeDasharray="2,2" />

    {/* Fill Area */}
    <motion.path
      d="M0,65 L30,60 L60,52 L90,40 L120,30 L150,18 L180,10 L200,5 L200,70 L0,70 Z"
      fill="url(#growthFill)"
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 1.5, duration: 1 }}
    />
    
    {/* Main Line */}
    <motion.path
      d="M0,65 L30,60 L60,52 L90,40 L120,30 L150,18 L180,10 L200,5"
      stroke="#00F0FF"
      strokeWidth="2.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={active ? { pathLength: 1 } : {}}
      transition={{ delay: 0.8, duration: 1.8, ease: 'easeOut' }}
      style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.8))' }}
    />
    
    {/* End Dot */}
    <motion.circle
      cx="200" cy="5" r="3.5"
      fill="#fff"
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 2.6, type: 'spring' }}
      style={{ filter: 'drop-shadow(0 0 10px #00F0FF)' }}
    />
  </svg>
);

/* ─── Processing Node ─── */
const ProcessingNode = ({ label, delay }: { label: string; delay: number }) => (
  <motion.div
    className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-neonCyan/[0.03] border border-neonCyan/10 backdrop-blur-sm"
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: [0, 1, 1, 0.4], x: 0 }}
    transition={{ delay, duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-neonCyan/80 glow-cyan" />
    <span className="font-mono text-[9px] lg:text-[10px] text-neonCyan/90 uppercase tracking-widest">
      {label}
    </span>
  </motion.div>
);

export const DataVisualization = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const roas = useTickingNumber(382, 0, 2200, isInView);
  const cpa = useTickingNumber(42, 0, 2000, isInView);

  return (
    <div ref={ref} className="relative w-full mt-4 lg:mt-0 lg:pl-12">
      
      {/* ── Top HUD Indicator ── */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04] relative">
        <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-gradient-to-r from-neonCyan/60 to-transparent" />
        <div className="flex items-center gap-3 lg:gap-4">
          <span className="w-2 h-2 rounded-full bg-neonCyan animate-pulse shadow-[0_0_12px_#00F0FF]" />
          <span className="font-mono text-[10px] lg:text-xs text-neonCyan uppercase tracking-[0.2em] font-semibold">
            Lab.Ads_ Engine // v4.2
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 lg:gap-6 font-mono text-[9px] lg:text-[10px] text-white/40 uppercase tracking-wider">
          <span>Latência: 0.003s</span>
          <span className="text-neonGreen glow-green font-bold">● System Online</span>
        </div>
      </div>

      {/* ── 3-Stage Flow Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.6fr_1fr] relative gap-4 lg:gap-6 min-h-[440px]">
        
        {/* Connection Track (Background) */}
        <div className="hidden md:block absolute top-[45%] left-4 right-4 h-[2px] bg-gradient-to-r from-red-500/20 via-neonCyan/20 to-neonCyan/40 pointer-events-none" />
        
        {/* Flow Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <HorizontalParticle delay={i * 0.3} />
              <VerticalParticle delay={i * 0.3} />
            </div>
          ))}
        </div>

        {/* ═══ STAGE 1: CAOS ═══ */}
        <div className="flex flex-col relative z-10 bg-surface/30 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40 overflow-hidden group hover:border-red-500/30 transition-colors duration-500">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-500/20 transition-colors duration-500" />
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              <h3 className="font-display text-sm lg:text-base text-white/80 uppercase tracking-widest font-semibold">Caos</h3>
            </div>
            <span className="font-mono text-[9px] lg:text-[10px] text-red-500/60 uppercase font-medium">Fase 1</span>
          </div>

          <div className="h-36 lg:h-44 w-full mb-3 relative">
            <ChaoticGraph active={isInView} />
          </div>

          <p className="font-display text-sm lg:text-[15px] text-white/60 leading-relaxed tracking-wide relative z-10">
            Você perdeu o <span className="text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">Controle</span> da sua Operação.
          </p>

          <div className="flex flex-wrap gap-2 lg:gap-3 mt-auto relative z-10">
            {['CPC alto', 'ROAS instável'].map((tag) => (
              <span key={tag} className="font-mono text-[9px] lg:text-[10px] text-red-400/80 border border-red-500/20 px-3 py-1.5 uppercase bg-red-500/[0.03] rounded-sm backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ STAGE 2: PROCESSAMENTO ═══ */}
        <div className="flex flex-col items-center justify-center py-6 md:py-0 relative z-10">
          {/* Core Node */}
          <motion.div
            animate={{ boxShadow: ['0 0 30px rgba(0,240,255,0.1)', '0 0 60px rgba(0,240,255,0.2)', '0 0 30px rgba(0,240,255,0.1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full border border-neonCyan/30 bg-surface/80 backdrop-blur-xl flex flex-col items-center justify-center relative shadow-2xl shadow-black/60"
          >
            <div className="absolute inset-2 rounded-full border border-neonCyan/20 border-dashed animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border border-neonCyan/10 border-dotted animate-[spin_12s_linear_infinite_reverse]" />
            <h3 className="font-display font-bold text-xl lg:text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">LAB<span className="text-neonCyan">.</span></h3>
          </motion.div>
          
          <div className="mt-8 flex flex-col items-center gap-3">
            <ProcessingNode label="modelagem matemática" delay={0} />
            <ProcessingNode label="otimização contínua" delay={1.2} />
          </div>
        </div>

        {/* ═══ STAGE 3: LUCRO PREVISÍVEL ═══ */}
        <div className="flex flex-col relative z-10 bg-surface/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 lg:p-8 shadow-2xl shadow-neonCyan/5 overflow-hidden group hover:border-neonCyan/40 transition-colors duration-500">
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-neonCyan/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-neonCyan/20 transition-colors duration-500" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-neonCyan rounded-full glow-cyan" />
              <h3 className="font-display text-sm lg:text-base text-white uppercase tracking-widest font-bold">Lucro Previsível</h3>
            </div>
            <span className="font-mono text-[9px] lg:text-[10px] text-neonCyan/80 uppercase font-medium">Fase 3</span>
          </div>

          <div className="h-36 lg:h-44 w-full mb-10 relative z-10">
            <GrowthGraph active={isInView} />
          </div>

          <div className="flex flex-col gap-3 lg:gap-4 mt-auto relative z-10 bg-black/20 p-4 lg:p-5 rounded-xl border border-white/[0.03]">
            <div className="flex items-end justify-between border-b border-white/[0.04] pb-3">
              <span className="font-mono text-[9px] lg:text-[10px] text-textMuted uppercase tracking-wider mb-1">Aumento ROAS</span>
              <span className="font-display font-bold text-3xl lg:text-4xl text-white drop-shadow-md">+{roas}%</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-mono text-[9px] lg:text-[10px] text-textMuted uppercase tracking-wider mb-1">Redução CPA</span>
              <span className="font-display font-bold text-3xl lg:text-4xl text-neonCyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">-{cpa}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
