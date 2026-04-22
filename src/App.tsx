import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QualifierSection } from './components/QualifierSection';
import { Methodology } from './components/Methodology';
import { ServiceGrid } from './components/ServiceGrid';
import { ProofSection } from './components/ProofSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ContactFormProvider } from './components/ContactFormContext';
import { ContactFormModal } from './components/ContactFormModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

function App() {
  return (
    <ContactFormProvider>
      <div className="relative min-h-screen bg-background bg-grid-pattern bg-grid noise-bg scanline-overlay">
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <QualifierSection />
          <Methodology />
          <ServiceGrid />
          <ProofSection />
          <FinalCTA />
        </main>

        <Footer />
        <ContactFormModal />
        <WhatsAppFloat />
      </div>
    </ContactFormProvider>
  );
}

export default App;
