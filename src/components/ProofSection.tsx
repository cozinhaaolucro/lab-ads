import { FadeIn } from './FadeIn';
import { AnimatedCounter } from './AnimatedCounter';
const kpis = [
  { value: '-42%', label: 'Redução progressiva de CAC', detail: 'em funis otimizados' },
  { value: '3.8x', label: 'Aumento de taxa de conversão', detail: 'com otimização contínua' },
  { value: '90+', label: 'Dias de estabilização', detail: 'de aquisição previsível' },
];

export const ProofSection = () => (
  <section id="resultados" className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto relative">
    <FadeIn>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-6">
        <div>
          <p className="text-neonCyan font-mono text-xs uppercase tracking-[0.25em] mb-4">
            // projeções de performance
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            O que você pode esperar<br />
            <span className="text-gradient">de um sistema bem otimizado.</span>
          </h2>
        </div>
      </div>
    </FadeIn>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
      {kpis.map((kpi, i) => (
        <AnimatedCounter key={i} index={i} target={kpi.value} label={kpi.label} detail={kpi.detail} />
      ))}
    </div>

    {/* Disclaimer + Extra context */}
    <FadeIn delay={0.3}>
      <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Disclaimer */}
        <p className="font-mono text-[10px] text-textMuted/40 uppercase tracking-wider max-w-md leading-relaxed">
          Resultados dependem de produto, oferta e maturidade do funil.
          Projeções baseadas em padrões de otimização observados no mercado.
        </p>

        {/* Extra context row */}
        <div className="flex flex-wrap gap-px">
          {[
            { num: '4', label: 'Plataformas integradas' },
            { num: '24/7', label: 'Monitoramento ativo' },
            { num: '100%', label: 'Rastreabilidade' },
          ].map((item, i) => (
            <div key={i} className="bg-surface/50 border border-white/[0.04] px-5 py-4 text-center">
              <span className="text-white font-display font-bold text-lg block mb-0.5">{item.num}</span>
              <span className="text-textMuted font-mono text-[9px] uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </section>
);
