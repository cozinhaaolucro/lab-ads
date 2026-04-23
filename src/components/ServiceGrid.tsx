import { FadeIn } from './FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { m } from 'framer-motion';
import { useState, useRef, useCallback, memo } from 'react';

const platforms = [
  {
    name: 'Google Ads',
    tag: 'SEARCH + PMAX',
    role: 'Para quem já está pronto para comprar',
    desc: 'Capturamos quem já busca o que você vende. Scripts próprios de automação e otimização de lances reduzem seu CPA enquanto mantêm volume — sem desperdiçar verba em cliques que não convertem.',
    metrics: ['CPA Alvo Otimizado', 'ROAS Preditivo', 'Scripts de Automação', 'Quality Score Engineering'],
  },
  {
    name: 'Meta Ads',
    tag: 'FEED + REELS',
    role: 'Para quem ainda não te conhece — mas deveria',
    desc: 'Criamos e testamos criativos com base em dados, não em opinião. Sabemos qual ângulo de mensagem converte mais para cada segmento — e dobramos a aposta só no que funciona.',
    metrics: ['Teste A/B Multivariado', 'CAPI Server-Side', 'Lookalike Preditivo', 'Creative Analytics'],
  },
  {
    name: 'LinkedIn Ads',
    tag: 'B2B + ABM',
    role: 'Para vender para empresas com decisores reais',
    desc: 'Segmentamos por cargo, setor e tamanho de empresa com precisão cirúrgica. Ideal para B2B com ticket alto e ciclo de venda longo — onde cada lead qualificado vale muito.',
    metrics: ['Filtros Firmográficos', 'Lead Gen Avançado', 'InMail Sequencial', 'ABM Targeting'],
  },
];

/* RadarAnim uses CSS animation (no JS overhead) and only renders when hovered */
const RadarAnim = memo(() => (
  <div className="absolute -bottom-16 -right-16 w-64 h-64 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-neonCyan animate-[spin_20s_linear_infinite]"
    >
      <title>Animação de Radar</title>
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
      <path d="M50,50 L50,2 A48,48 0 0,1 84,16 Z" fill="currentColor" opacity="0.1" />
    </svg>
  </div>
));

const PlatformCard = ({ p, i }: { p: typeof platforms[0]; i: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);

  // Throttled mousemove via RAF — at most 1 update per frame instead of every pixel
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return; // Skip if a frame is already queued
    rafRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      rafRef.current = 0;
    });
  }, []);

  return (
    <m.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); cancelAnimationFrame(rafRef.current); rafRef.current = 0; }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.15 }}
      className="group relative bg-background/40 backdrop-blur-md border border-white/[0.08] p-8 md:p-10 hover:border-neonCyan/30 transition-all duration-500 h-full flex flex-col gradient-border overflow-hidden rounded-sm"
    >
      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.08), transparent 80%)`,
        }}
      />

      {/* Perspective Glow Shadow */}
      <div className="absolute -inset-2 bg-neonCyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <RadarAnim />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-display mb-1 group-hover:text-neonCyan transition-colors duration-300">{p.name}</h3>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neonCyan/70">
              {p.tag}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neonCyan/40 group-hover:bg-neonCyan/5 transition-all duration-300">
            <ArrowUpRight aria-hidden="true" className="w-5 h-5 text-white/20 group-hover:text-neonCyan transition-colors" />
          </div>
        </div>

        <p className="font-mono text-[10px] text-neonCyan/50 uppercase tracking-wider mb-6 border-l-2 border-neonCyan/30 pl-4 py-1">
          {p.role}
        </p>

        <p className="text-textMuted text-sm leading-relaxed mb-10 flex-grow group-hover:text-white/70 transition-colors">
          {p.desc}
        </p>

        <div className="space-y-3.5 pt-8 border-t border-white/[0.06]">
          {p.metrics.map((m, j) => (
            <div key={j} className="flex items-center gap-3 text-[11px] tracking-wide">
              <div className="w-1 h-1 rounded-full bg-neonCyan/30 border border-neonCyan/50" />
              <span className="text-white/40 group-hover:text-white/80 transition-colors uppercase font-mono">
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
};

export const ServiceGrid = () => {
  return (
    <section id="plataformas" className="px-6 py-16 md:py-24 bg-surface/30 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neonCyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <FadeIn>
            <p className="text-neonCyan font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
              // cada plataforma com uma função
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Cada Canal faz uma Coisa<br />
              <span className="text-gradient">— e faz Bem.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((p, i) => (
            <PlatformCard key={i} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
