import React from 'react';
import { m } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const directionMap = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export const FadeIn = ({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) => {
  const offset = directionMap[direction];
  return (
    <m.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <m.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12 } },
    }}
    className={className}
  >
    {children}
  </m.div>
);

export const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <m.div
    variants={{
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    }}
    className={className}
  >
    {children}
  </m.div>
);
