import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Footer = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="relative bg-background border-t border-white/[0.04] pt-20 pb-10 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-neonCyan/20 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[300px] bg-neonCyan/[0.02] blur-[120px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-20">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  Lab<span className="text-neonCyan">.</span>
                </span>
              </div>
              <p className="text-textMuted text-xs leading-relaxed max-w-xs">
                Laboratório de tráfego pago com precisão matemática e estatística aplicada.
              </p>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="text-white/40 uppercase text-[10px] tracking-[0.2em] mb-4">Navegação</h4>
                <div className="space-y-3">
                  <a href="#metodologia" className="block text-textMuted hover:text-neonCyan transition-colors text-xs">Metodologia</a>
                  <a href="#plataformas" className="block text-textMuted hover:text-neonCyan transition-colors text-xs">Plataformas</a>
                  <a href="#resultados" className="block text-textMuted hover:text-neonCyan transition-colors text-xs">Resultados</a>
                </div>
              </div>
              <div>
                <h4 className="text-white/40 uppercase text-[10px] tracking-[0.2em] mb-4">Contato</h4>
                <div className="space-y-3">
                  <a href="mailto:lab@labads.com.br" className="block text-textMuted hover:text-neonCyan transition-colors text-xs">lab@labads.com.br</a>
                  <a href="https://wa.me/5541998498430" target="_blank" rel="noopener noreferrer" className="block text-textMuted hover:text-neonCyan transition-colors text-xs">WhatsApp Direto</a>
                </div>
              </div>
              <div>
                <h4 className="text-white/40 uppercase text-[10px] tracking-[0.2em] mb-4">Legal</h4>
                <div className="space-y-3">
                  <button onClick={() => setLegalType('terms')} className="block text-textMuted hover:text-neonCyan transition-colors text-xs text-left">Termos de Uso</button>
                  <button onClick={() => setLegalType('privacy')} className="block text-textMuted hover:text-neonCyan transition-colors text-xs text-left">Privacidade</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/20 text-[10px] tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} LabAds_ · Todos os direitos reservados
            </span>
            <span className="text-white/20 text-[10px] tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neonGreen/50" />
              System Status: Online
            </span>
          </div>
        </div>
      </footer>

      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </>
  );
};
