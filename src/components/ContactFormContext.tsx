import { createContext, useContext, useState, type ReactNode, type MouseEvent } from 'react';
import { pushToDataLayer } from '../lib/gtm';

interface ContactFormContextType {
  isOpen: boolean;
  coords: { x: number; y: number } | null;
  open: (e?: MouseEvent | any) => void;
  close: () => void;
}

const ContactFormCtx = createContext<ContactFormContextType>({
  isOpen: false,
  coords: null,
  open: () => {},
  close: () => {},
});

export const useContactForm = () => useContext(ContactFormCtx);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const open = (e?: MouseEvent | any) => {
    if (e && typeof e.clientX === 'number') {
      setCoords({ x: e.clientX, y: e.clientY });
    } else {
      setCoords(null);
    }
    setIsOpen(true);
    
    // GTM Event
    pushToDataLayer({
      event: 'open_form',
      location: e && e.currentTarget ? e.currentTarget.innerText || 'button' : 'unknown'
    });
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setCoords(null), 300); // clear after animation
  };

  return (
    <ContactFormCtx.Provider value={{ isOpen, coords, open, close }}>
      {children}
    </ContactFormCtx.Provider>
  );
};
