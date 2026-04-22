import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useContactForm } from './ContactFormContext';

const WPP_NUMBER = '5541998498430';

const investmentOptions = [
  { value: '5k-10k', label: 'R$ 5.000 – R$ 10.000' },
  { value: '10k-25k', label: 'R$ 10.000 – R$ 25.000' },
  { value: '25k-50k', label: 'R$ 25.000 – R$ 50.000' },
  { value: '50k+', label: 'R$ 50.000+' },
];

export const ContactFormModal = () => {
  const { isOpen, close, coords } = useContactForm();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    investment: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1024, height: typeof window !== 'undefined' ? window.innerHeight : 768 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStyle = (): React.CSSProperties => {
    const modalWidth = 380; 
    const estimatedHeight = 680; 

    const isMobile = windowSize.width < 768;

    // Mobile fallback: Bottom Sheet
    if (isMobile) {
      return { 
        bottom: 0, left: 0, right: 0,
        width: '100%', maxHeight: '90vh',
        borderBottomLeftRadius: 0, borderBottomRightRadius: 0
      };
    }

    if (!coords) {
      return { 
        top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
        width: '380px', height: 'fit-content', maxHeight: '90vh'
      };
    }

    let x = coords.x + 20;
    let y = coords.y - 20;

    // X-axis collision (flip to left side of cursor)
    if (x + modalWidth > windowSize.width - 20) {
      x = coords.x - modalWidth - 20;
    }
    
    // Y-axis collision (push up)
    if (y + estimatedHeight > windowSize.height - 20) {
      y = windowSize.height - estimatedHeight - 20;
    }
    
    // Top-left bounds clamping
    if (x < 20) x = 20;
    if (y < 20) y = 20;

    const availableHeight = windowSize.height - y - 20;

    return { top: y, left: x, width: modalWidth, maxHeight: availableHeight };
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const investmentLabel =
      investmentOptions.find((o) => o.value === form.investment)?.label || 'Não informado';
    const message = encodeURIComponent(
      `*Novo Lead — LabAds*\n\n` +
        `👤 *Nome:* ${form.name}\n` +
        `📧 *E-mail:* ${form.email}\n` +
        `📱 *WhatsApp:* ${form.phone}\n` +
        `🏢 *Empresa:* ${form.company}\n` +
        `💰 *Investimento Mensal:* ${investmentLabel}\n\n` +
        `Solicito um diagnóstico estratégico gratuito.`
    );
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WPP_NUMBER}?text=${message}`, '_blank');
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', company: '', investment: '' });
        close();
      }, 600);
    }, 1200);
  };

  const isValid = form.name && form.email && form.phone;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop (optional but helpful for tap-to-close on small screens) */}
          <motion.div 
            className="md:hidden fixed inset-0 z-[8999] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          />
          
          <motion.div
            className="fixed z-[9000] flex flex-col bg-background/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
            style={getStyle()}
            initial={windowSize.width < 768 ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
            animate={windowSize.width < 768 ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={windowSize.width < 768 ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-px bg-neonCyan/50" />
            <div className="absolute top-0 left-0 w-px h-10 bg-neonCyan/50" />
            <div className="absolute bottom-0 left-0 w-10 h-px bg-neonCyan/30" />
            <div className="absolute bottom-0 left-0 w-px h-10 bg-neonCyan/30" />

            {/* Top bar */}
            <div className="h-12 border-b border-white/[0.08] flex items-center justify-between px-5 bg-surface/40 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold">
                  Iniciar Protocolo
                </span>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!submitted ? (
                <>
                  <h3 className="font-display font-bold text-xl text-white mb-1">
                    Diagnóstico Estratégico
                  </h3>
                  <p className="text-textMuted text-sm mb-8 leading-relaxed">
                    Preencha os campos e receba uma análise completa do seu funil em até 30 minutos.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Field label="Nome" value={form.name} onChange={(v) => updateField('name', v)} required />
                    <Field label="E-mail" type="email" value={form.email} onChange={(v) => updateField('email', v)} required />
                    <Field label="WhatsApp" value={form.phone} onChange={(v) => updateField('phone', v)} placeholder="(41) 99999-9999" required />
                    <Field label="Empresa" value={form.company} onChange={(v) => updateField('company', v)} />

                    <div>
                      <label className="block font-mono text-[10px] text-textMuted uppercase tracking-wider mb-2">
                        Investimento Mensal em Mídia
                      </label>
                      <select
                        value={form.investment}
                        onChange={(e) => updateField('investment', e.target.value)}
                        className="w-full bg-surface/60 border border-white/[0.08] text-white text-sm px-4 py-3 font-mono rounded-sm outline-none focus:border-neonCyan/40 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-background">Selecionar faixa...</option>
                        {investmentOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-background">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={!isValid}
                      className="w-full mt-2 cta-shimmer bg-neonCyan text-black px-6 py-4 font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neonCyan"
                    >
                      <span>Iniciar Diagnóstico</span>
                    </button>
                  </form>

                  <p className="mt-5 text-center font-mono text-[9px] text-textMuted/40 uppercase tracking-wider">
                    Dados enviados via WhatsApp · Sem spam
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-neonCyan flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-neonCyan pulse-dot" />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Protocolo Iniciado
                  </h3>
                  <p className="text-textMuted text-sm">Redirecionando para o WhatsApp...</p>
                  <motion.div className="mt-6 h-1 bg-neonCyan/20 rounded-full overflow-hidden max-w-[200px] mx-auto">
                    <motion.div
                      className="h-full bg-neonCyan"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Field = ({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <div>
    <label className="block font-mono text-[10px] text-textMuted uppercase tracking-wider mb-2">
      {label} {required && <span className="text-neonCyan/60">*</span>}
    </label>
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      className="w-full bg-surface/60 border border-white/[0.08] text-white text-sm px-4 py-3 font-mono rounded-sm outline-none focus:border-neonCyan/40 transition-colors placeholder:text-white/15"
    />
  </div>
);
