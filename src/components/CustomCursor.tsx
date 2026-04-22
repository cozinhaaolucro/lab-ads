import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check if it's a touch device / mobile
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      setIsDesktop(false);
      return;
    }

    document.documentElement.classList.add('cursor-none');

    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.magnetic')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Trailing Ghost Ring */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 border border-neonCyan/10 rounded-full pointer-events-none z-[9999] transform-gpu"
        animate={{
          x: mousePosition.x - 28,
          y: mousePosition.y - 28,
          scale: isHovering ? 1.2 : 1,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 30, mass: 1 }}
      />

      {/* Main Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-neonCyan/40 rounded-full pointer-events-none z-[10000] flex items-center justify-center transform-gpu"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.3 }}
      >
        <div className="w-[2px] h-1.5 bg-neonCyan/50 absolute top-0" />
        <div className="w-[2px] h-1.5 bg-neonCyan/50 absolute bottom-0" />
        <div className="w-1.5 h-[2px] bg-neonCyan/50 absolute left-0" />
        <div className="w-1.5 h-[2px] bg-neonCyan/50 absolute right-0" />
      </motion.div>
      
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neonCyan rounded-full pointer-events-none z-[10001] transform-gpu"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 28, mass: 0.1 }}
      />
    </>
  );
};
