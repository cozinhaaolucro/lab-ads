import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';
import { ContactFormProvider } from './components/ContactFormContext';
import { ContactFormModal } from './components/ContactFormModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

// Lazy-load below-the-fold sections — they won't block initial paint
const QualifierSection = lazy(() => import('./components/QualifierSection').then(m => ({ default: m.QualifierSection })));
const Methodology = lazy(() => import('./components/Methodology').then(m => ({ default: m.Methodology })));
const ServiceGrid = lazy(() => import('./components/ServiceGrid').then(m => ({ default: m.ServiceGrid })));
const ProofSection = lazy(() => import('./components/ProofSection').then(m => ({ default: m.ProofSection })));
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  return (
    <ContactFormProvider>
      <div className="relative min-h-screen bg-background bg-grid-pattern bg-grid noise-bg scanline-overlay">
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <Suspense fallback={null}>
            <QualifierSection />
            <Methodology />
            <ServiceGrid />
            <ProofSection />
            <FinalCTA />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <ContactFormModal />
        <WhatsAppFloat />
      </div>
    </ContactFormProvider>
  );
}

export default App;
