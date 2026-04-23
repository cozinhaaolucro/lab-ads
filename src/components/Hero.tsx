import { lazy, Suspense } from 'react';
import { FadeIn } from './FadeIn';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { m } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { useContactForm } from './ContactFormContext';

// Lazy load heavy charts to free up main thread for LCP
const DataVisualization = lazy(() => import('./DataVisualization').then(m => ({ default: m.DataVisualization })));

const bullets = [
  'Funil mapeado do clique à compra — sem ponto cego',
  'Campanhas ajustadas toda semana com base em dados, não intuição',
  'Você sabe exatamente onde está perdendo dinheiro — e como parar',
];

export const Hero = () => {
  const { open } = useContactForm();
  return (
  <section className="relative px-6 pt-32 pb-12 md:pt-36 md:pb-20 max-w-[1440px] mx-auto overflow-hidden">
    {/* Ambient gradient orbs (Optimized for performance: using radial gradients instead of blur) */}
    <div className="absolute top-20 -left-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[radial-gradient(circle,rgba(0,240,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />

    {/* Two-column grid: Text left, Visualization right */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
      {/* Left Column — Copy */}
      <div className="lg:col-span-5">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-white leading-[1.05] tracking-tight mb-8">
            Seu Tráfego Pago <br />
            <span className="text-gradient">está Gerando</span>{' '}
            <span className="text-neonCyan">Lucro?</span>
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="text-lg md:text-xl text-textMuted max-w-xl leading-relaxed mb-8 font-light">
            Se você investe em mídia todo mês e ainda não sabe{' '}
            <span className="text-white font-medium">exatamente quanto cada real retorna</span>{' '}
            — você não tem uma estratégia. Tem uma aposta.{' '}
            A LabAds transforma isso em sistema:{' '}
            <span className="text-white font-medium">CAC controlado, ROAS previsível, escala sem surpresas.</span>
          </p>

          {/* Reinforcement Bullets */}
          <ul className="space-y-3 mb-12">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-textMuted">
                <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-neonCyan/70 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <MagneticButton>
              <button
                onClick={open}
                id="hero-cta-button"
                className="group cta-shimmer inline-flex items-center gap-3 bg-neonCyan text-black px-8 py-4 font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors glow-cyan"
              >
                <span>Ver onde estou perdendo dinheiro</span>
                <ChevronRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>
            <a
              href="#metodologia"
              id="hero-methodology-link"
              className="group inline-flex items-center gap-3 border border-white/10 text-textMuted px-8 py-4 font-mono text-sm uppercase tracking-wider hover:border-white/30 hover:text-white transition-all"
            >
              <span>Ver Metodologia</span>
              <m.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </m.span>
            </a>
          </div>
          {/* Microcopy */}
          <p className="mt-4 font-mono text-[10px] text-textMuted/50 uppercase tracking-wider">
            Diagnóstico de 30 min · Gratuito · Sem compromisso de contratação
          </p>
        </div>
      </div>

      {/* Right Column — Data Visualization Dashboard */}
      <div className="lg:col-span-7 w-full mt-12 lg:mt-0">
        <Suspense fallback={<div className="aspect-video bg-white/[0.02] rounded-sm animate-pulse" />}>
          <DataVisualization />
        </Suspense>
      </div>
    </div>

    {/* Terminal-style Diagnostic Proof & Badges */}
    <FadeIn delay={0.5}>
      <div className="mt-20 md:mt-28 max-w-4xl mx-auto glass-panel flex flex-col md:flex-row overflow-hidden">
        
        {/* Terminal Panel (Left) */}
        <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-white/[0.04]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs font-mono text-textMuted">lab_diagnostico.sh</span>
          </div>
          <div className="font-mono text-xs md:text-sm space-y-3 text-textMuted overflow-x-auto">
            <p className="whitespace-nowrap"><span className="text-neonCyan">$</span> executando diagnóstico de funil...</p>
            <p className="whitespace-nowrap"><span className="text-neonCyan">$</span> CAC atual: <span className="text-white">R$ 47,20</span> <span className="mx-1 text-neonCyan">→</span> CAC ideal estimado: <span className="text-white">R$ 27,38</span></p>
            <p className="whitespace-nowrap"><span className="text-neonCyan">$</span> gargalo_identificado: <span className="text-yellow-400">topo de funil fraco + criativo com fadiga</span></p>
            <p className="whitespace-nowrap"><span className="text-neonCyan">$</span> recomendação: <span className="text-white">ajuste de segmentação + novos criativos + otim. de landing</span></p>
            <p className="flex items-center gap-1 whitespace-nowrap mt-4">
              <span className="text-neonCyan">$</span> status: <span className="text-neonGreen">DIAGNÓSTICO COMPLETO</span>
              <span className="animate-blink text-neonCyan ml-1">▌</span>
            </p>
          </div>
        </div>

        {/* Partner Badges (Right) */}
        <div className="p-6 md:p-8 flex flex-col justify-center bg-white/[0.01] flex-shrink-0 md:w-64">
          <div className="font-mono text-[10px] text-textMuted/60 uppercase tracking-widest mb-6 text-center md:text-left">
            Parceiros Oficiais
          </div>
          
          <div className="flex flex-row md:flex-col gap-4 justify-center flex-wrap">
            {/* Google */}
            <div className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="grayscale group-hover:grayscale-0 transition-all duration-300">
                <title>Google Partner</title>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[13px] text-white leading-none">Google</span>
                {' '}
                <span className="font-sans text-[10px] text-textMuted leading-none mt-1 uppercase tracking-wider">Partner</span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#0668E1] grayscale group-hover:grayscale-0 transition-all duration-300">
                <title>Meta Business Partner</title>
                <path d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[13px] text-white leading-none">Meta</span>
                {' '}
                <span className="font-sans text-[10px] text-textMuted leading-none mt-1 uppercase tracking-wider">Business Partner</span>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" className="grayscale group-hover:grayscale-0 transition-all duration-300">
                <title>LinkedIn Marketing Partner</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[13px] text-white leading-none">LinkedIn</span>
                {' '}
                <span className="font-sans text-[10px] text-textMuted leading-none mt-1 uppercase tracking-wider">Marketing</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  </section>
  );
};
