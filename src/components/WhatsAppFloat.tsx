import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useContactForm } from './ContactFormContext';
import { pushToDataLayer } from '../lib/gtm';

const WPP = '5541998498430';

const WppIcon = ({ c = '' }: { c?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { isOpen: modalOpen } = useContactForm();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [isOpen]);

  const isValid = name.trim() && phone.trim() && email.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const text = encodeURIComponent(
      `Olá! Meu nome é ${name}.\n📧 ${email}\n📱 ${phone}\n\nGostaria de saber mais sobre os serviços da LabAds.`
    );
    window.open(`https://wa.me/${WPP}?text=${text}`, '_blank');
    
    // GTM Event
    pushToDataLayer({
      event: 'whatsapp_start',
      form_id: 'whatsapp_float'
    });

    setName(''); setPhone(''); setEmail(''); setIsOpen(false);
  };

  if (modalOpen) return null;

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[8000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="absolute bottom-[72px] right-0 w-[300px] bg-background/95 backdrop-blur-xl border border-white/[0.08] rounded-sm overflow-hidden shadow-2xl shadow-black/60"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-px bg-neonGreen/50" />
            <div className="absolute top-0 left-0 w-px h-6 bg-neonGreen/50" />

            {/* Header */}
            <div className="h-9 border-b border-white/[0.08] flex items-center justify-between px-3 bg-surface/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neonGreen animate-pulse" />
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">WhatsApp Direto</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} id="wpp-float-form" className="p-4 space-y-3">
              <p className="text-white text-sm font-display font-semibold">Fale conosco agora</p>
              <p className="text-textMuted text-[11px] leading-relaxed">
                Preencha seus dados para iniciar conversa.
              </p>

              <div>
                <label htmlFor="wpp-name" className="block font-mono text-[9px] text-textMuted uppercase tracking-wider mb-1.5">
                  Nome <span className="text-neonGreen/60">*</span>
                </label>
                <input
                  type="text" id="wpp-name" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full bg-surface/60 border border-white/[0.08] text-white text-xs px-3 py-2.5 font-mono rounded-sm outline-none focus:border-neonGreen/40 transition-colors placeholder:text-white/15"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="wpp-phone" className="block font-mono text-[9px] text-textMuted uppercase tracking-wider mb-1.5">
                  Número <span className="text-neonGreen/60">*</span>
                </label>
                <input
                  type="tel" id="wpp-phone" value={phone} onChange={(e) => setPhone(e.target.value)} required
                  className="w-full bg-surface/60 border border-white/[0.08] text-white text-xs px-3 py-2.5 font-mono rounded-sm outline-none focus:border-neonGreen/40 transition-colors placeholder:text-white/15"
                  placeholder="(41) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="wpp-email" className="block font-mono text-[9px] text-textMuted uppercase tracking-wider mb-1.5">
                  E-mail <span className="text-neonGreen/60">*</span>
                </label>
                <input
                  type="email" id="wpp-email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-surface/60 border border-white/[0.08] text-white text-xs px-3 py-2.5 font-mono rounded-sm outline-none focus:border-neonGreen/40 transition-colors placeholder:text-white/15"
                  placeholder="seu@email.com"
                />
              </div>

              <button
                type="submit"
                id="wpp-float-submit"
                disabled={!isValid}
                className="w-full bg-neonGreen text-black py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-sm transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white disabled:hover:bg-neonGreen"
              >
                <WppIcon c="w-4 h-4" />
                Iniciar Conversa
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        id="wpp-float-toggle"
        className="relative w-14 h-14 rounded-full bg-neonGreen text-black flex items-center justify-center shadow-lg shadow-neonGreen/20 hover:shadow-neonGreen/40 hover:scale-105 transition-all"
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1.5, stiffness: 260, damping: 20 }}
      >
        <span className="absolute inset-0 rounded-full bg-neonGreen animate-ping opacity-20" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="w" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <WppIcon c="w-7 h-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
