import { FadeIn } from './FadeIn';
import { ShieldCheck, Eye, GitBranch } from 'lucide-react';

const points = [
  {
    icon: Eye,
    text: 'Só reportamos métricas que impactam o seu caixa',
  },
  {
    icon: ShieldCheck,
    text: 'Você tem acesso a tudo — inclusive ao que não funcionou',
  },
  {
    icon: GitBranch,
    text: 'Cada ajuste tem uma razão documentada e um resultado esperado',
  },
];

export const TransparencySection = () => (
  <section className="px-6 py-24 md:py-32 max-w-[1440px] mx-auto relative">
    {/* Accent line */}
    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-neonCyan/20 via-transparent to-neonCyan/20" />

    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
      {/* Left — Statement (Sticky) */}
      <div className="lg:w-1/2 lg:sticky lg:top-40 self-start">
        <FadeIn>
          <p className="text-neonCyan font-mono text-xs uppercase tracking-[0.25em] mb-4">
            // nossa postura é diferente
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
            Somos Honestos Sobre<br />
            <span className="text-gradient">o Que Entregamos.</span>
          </h2>
          <p className="text-textMuted text-lg leading-relaxed mb-10 max-w-lg">
            A maioria das agências te vende cases isolados. Nós preferimos explicar o processo.
            Porque resultado repetível depende de método — não de sorte.
          </p>

          {/* Closing Statement */}
          <div className="border-l-2 border-neonCyan/40 pl-6">
            <p className="text-white font-display font-semibold text-lg leading-snug">
              Você não está pagando por resultados passados de outras contas.<br />
              <span className="text-neonCyan">Está construindo um sistema que gera os seus.</span>
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Right — Points (Scrollable) */}
      <div className="lg:w-1/2">
        <FadeIn delay={0.2}>
          <div className="space-y-6">
            {points.map((p, i) => (
              <div
                key={i}
                className="glass-panel p-8 md:p-10 flex items-center gap-6 group hover:bg-surface/90 transition-all duration-300 gradient-border"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/[0.08] bg-surface/80 rounded-sm flex-shrink-0 group-hover:border-neonCyan/30 transition-colors">
                  <p.icon className="w-6 h-6 text-white/30 group-hover:text-neonCyan transition-colors duration-300" />
                </div>
                <span className="text-white font-medium text-lg">{p.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);
