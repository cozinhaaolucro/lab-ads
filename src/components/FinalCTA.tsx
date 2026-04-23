import { FadeIn } from './FadeIn';
import { ChevronRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { SystemLogs } from './SystemLogs';
import { useContactForm } from './ContactFormContext';
import { DecryptText } from './DecryptText';

export const FinalCTA = () => {
  const { open } = useContactForm();
  return (
  <section id="contato" className="px-6 py-16 md:py-24 relative overflow-hidden bg-background">
    <SystemLogs />

    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonCyan/[0.06] rounded-full blur-[150px] pointer-events-none z-0" />

    {/* 3D Grid Floor — CSS animation instead of framer-motion */}
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1000px' }}>
      <div
        className="absolute w-[200%] h-[200%] left-[-50%] top-[20%] bg-grid opacity-[0.15] animate-[grid-flow_2s_linear_infinite]"
        style={{
          transformOrigin: 'top center',
          transform: 'rotateX(75deg)',
        }}
      />
      {/* Fade out edges to blend smoothly */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>

    <div className="max-w-3xl mx-auto text-center relative z-10">
      <FadeIn delay={0.1}>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight drop-shadow-xl">
          Em 30 Minutos Você Sabe<br />
          <span className="text-neonCyan drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]"><DecryptText text="Onde Está Perdendo Dinheiro" /></span>.
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-textMuted text-lg leading-relaxed mb-12 max-w-xl mx-auto drop-shadow-md">
          Fazemos uma análise ao vivo do seu funil: CAC, ROAS, estrutura de campanha e criativos.
          Você sai com um mapa claro do problema — e do que fazer primeiro.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex justify-center">
          <MagneticButton>
            <button
              onClick={open}
              className="group cta-shimmer inline-flex items-center gap-3 bg-neonCyan text-black px-10 py-5 font-mono font-bold uppercase tracking-wider text-lg hover:bg-white transition-colors glow-cyan relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_0.6s_ease-out_forwards]" />
              <span className="relative z-10">Quero meu diagnóstico gratuito</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </MagneticButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p className="text-textMuted/50 font-mono text-xs mt-8 uppercase tracking-wider">
          Gratuito · 30 minutos · Sem compromisso de contratação
        </p>
      </FadeIn>
    </div>
  </section>
  );
};
