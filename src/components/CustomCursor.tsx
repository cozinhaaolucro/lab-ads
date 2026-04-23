import { useEffect, useRef, useCallback } from 'react';

export const CustomCursor = () => {
  const outerGhostRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  // Smooth trailing positions
  const ghostPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const { x, y } = posRef.current;
    const hovering = hoveringRef.current;
    const visible = visibleRef.current;

    // Lerp trailing ring towards mouse (spring-like feel without React re-renders)
    ghostPos.current.x = lerp(ghostPos.current.x, x, 0.08);
    ghostPos.current.y = lerp(ghostPos.current.y, y, 0.08);
    ringPos.current.x = lerp(ringPos.current.x, x, 0.15);
    ringPos.current.y = lerp(ringPos.current.y, y, 0.15);

    // Ghost ring (outermost, slowest)
    if (outerGhostRef.current) {
      outerGhostRef.current.style.transform = `translate3d(${ghostPos.current.x - 28}px, ${ghostPos.current.y - 28}px, 0) scale(${hovering ? 1.2 : 1})`;
      outerGhostRef.current.style.opacity = visible && !hovering ? '1' : '0';
    }

    // Main outer ring
    if (outerRingRef.current) {
      outerRingRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0) scale(${hovering ? 1.5 : 1})`;
      outerRingRef.current.style.opacity = visible ? '1' : '0';
      outerRingRef.current.style.backgroundColor = hovering ? 'rgba(0, 240, 255, 0.05)' : 'transparent';
    }

    // Center dot (instant)
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      dotRef.current.style.opacity = visible && !hovering ? '1' : '0';
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check if it's a touch device / mobile
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    document.documentElement.classList.add('cursor-none');

    const updateMousePosition = (e: MouseEvent) => {
      visibleRef.current = true;
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hoveringRef.current = !!(target.closest('a') || target.closest('button') || target.closest('.magnetic'));
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start the animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Check at render time for SSR safety + early bail on mobile
  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)) {
    return null;
  }

  return (
    <>
      {/* Trailing Ghost Ring */}
      <div
        ref={outerGhostRef}
        className="fixed top-0 left-0 w-14 h-14 border border-neonCyan/10 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ opacity: 0 }}
      />

      {/* Main Outer Ring */}
      <div
        ref={outerRingRef}
        className="fixed top-0 left-0 w-10 h-10 border border-neonCyan/40 rounded-full pointer-events-none z-[10000] flex items-center justify-center will-change-transform"
        style={{ opacity: 0, transition: 'background-color 0.2s' }}
      >
        <div className="w-[2px] h-1.5 bg-neonCyan/50 absolute top-0" />
        <div className="w-[2px] h-1.5 bg-neonCyan/50 absolute bottom-0" />
        <div className="w-1.5 h-[2px] bg-neonCyan/50 absolute left-0" />
        <div className="w-1.5 h-[2px] bg-neonCyan/50 absolute right-0" />
      </div>
      
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neonCyan rounded-full pointer-events-none z-[10001] will-change-transform"
        style={{ opacity: 0 }}
      />
    </>
  );
};
