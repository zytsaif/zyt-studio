import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const auraX = useSpring(cursorX, springConfig);
  const auraY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    setEnabled(true);

    const colors = ['#a855f7', '#06b6d4', '#ef4444', '#3b82f6'];

    let particleCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Emit mouse trail particle every few moves
      if (Math.random() > 0.4) {
        particleCounter++;
        const newParticle: Particle = {
          id: particleCounter,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner Dot Cursor */}
      <motion.div
        style={{ left: cursorX, top: cursorY }}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#06b6d4]"
      />

      {/* Outer Glow Ring */}
      <motion.div
        style={{ left: auraX, top: auraY }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-400/70 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-purple-500/10 backdrop-blur-[0.5px]"
      />

      {/* Mouse Trail Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2"
        />
      ))}
    </>
  );
};
