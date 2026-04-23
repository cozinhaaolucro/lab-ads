import { FadeIn } from './FadeIn';
import { Target, AlertTriangle, HelpCircle, ShieldX } from 'lucide-react';

const qualifiers = [
  {
    icon: Target,
    text: 'Você investe em mídia todo mês e no final não consegue explicar com clareza o que voltou',
  },
  {
    icon: AlertTriangle,
    text: 'Sua agência (ou você mesmo) "testa" — mas sem hipótese, sem grupo de controle, sem significância',
  },
  {
    icon: HelpCircle,
    text: 'Você sabe que tem desperdício, mas não sabe em qual etapa do funil ele mora',
  },
];

export const QualifierSection = () => (
  <section id="qualificacao" className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto relative overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
      {/* Left — "Isso é pra você se:" */}
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10 leading-tight">
          Isso resolve o seu problema <span className="text-neonCyan">se:</span>
        </h2>

        <div className="space-y-5">
          {qualifiers.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 border border-white/[0.06] bg-surface/30 rounded-sm hover:border-neonCyan/20 transition-colors duration-300"
            >
              <q.icon className="w-5 h-5 text-neonCyan/60 flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-[15px] leading-relaxed">{q.text}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Right — Positive Friction (Sticky) */}
      <div className="lg:sticky lg:top-40 self-start">
        <FadeIn delay={0.2}>
          <div className="flex flex-col justify-center h-full">
            <div className="border border-white/[0.08] bg-surface/20 p-8 md:p-10 rounded-sm relative overflow-hidden group">
            
            {/* CSS-only Scanner Line — no framer-motion overhead */}
            <div
              className="absolute left-0 right-0 h-[2px] bg-neonCyan/30 blur-[1px] shadow-[0_0_15px_rgba(0,240,255,0.6)] z-0 pointer-events-none animate-[scanVertical_4s_linear_infinite]"
            />

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-px bg-neonCyan/40 z-10" />
            <div className="absolute top-0 left-0 w-px h-8 bg-neonCyan/40 z-10" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldX className="w-5 h-5 text-white/30" />
                <span className="font-mono text-[10px] text-textMuted uppercase tracking-[0.2em]">
                  Filtro de entrada
                </span>
              </div>

              <p className="text-white font-display font-semibold text-xl md:text-2xl leading-snug mb-4 flex items-center gap-2">
                Trabalhamos com quem está pronto para decisões baseadas em dados.
                <span className="animate-blink text-neonCyan/80 font-mono">◌</span>
              </p>
              <p className="text-textMuted text-sm leading-relaxed mb-6">
                Nosso modelo exige histórico de dados e investimento mínimo em mídia para funcionar.
                Se você ainda está validando produto ou quer começar com R$ 500/mês, ainda não
                é o momento certo — e seremos honestos sobre isso no diagnóstico.
              </p>

              <div className="border-t border-white/[0.06] pt-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neonCyan/50" />
                <p className="font-mono text-[10px] text-neonCyan/60 uppercase tracking-wider">
                  Investimento mínimo recomendado: R$ 5.000/mês em mídia
                </p>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </div>
  </section>
);
