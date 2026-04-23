import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useContactForm } from './ContactFormContext';

const navLinks = [
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Plataformas', href: '#plataformas' },
  { label: 'Resultados', href: '#resultados' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useContactForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="font-display font-bold text-xl tracking-tight text-white">
            Lab<span className="text-neonCyan">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="text-sm font-mono text-textMuted hover:text-white transition-colors uppercase tracking-wider relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neonCyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <button
            onClick={open}
            id="nav-cta-button"
            className="cta-shimmer text-sm font-mono text-black bg-neonCyan px-5 py-2.5 uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center gap-2"
          >
            Iniciar Protocolo
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] mt-4"
          >
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-mono text-textMuted hover:text-white transition-colors uppercase tracking-wider px-2"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); open(); }}
                className="text-sm font-mono text-black bg-neonCyan px-5 py-3 uppercase tracking-wider font-semibold text-center mt-2"
              >
                Iniciar Protocolo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
