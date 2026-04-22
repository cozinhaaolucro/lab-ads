import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!@#$%^&*()_+-=[]{};:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const DecryptText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!isInView) {
      // Show invisible characters to keep the physical width intact before animation
      setDisplayText(text.replace(/./g, ' '));
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration || letter === ' ') {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 2; // Decryption speed
    }, 30);
    
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={`whitespace-pre-wrap ${className}`}>
      {displayText}
    </span>
  );
};
