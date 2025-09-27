import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Energy beams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-px h-32 bg-gradient-to-t from-transparent via-primary to-transparent"
          style={{
            left: `${10 + i * 15}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      color: ['primary', 'creator', 'success'][Math.floor(Math.random() * 3)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color} opacity-60`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cyber-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--creator))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#cyber-grid)"
        />
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-gradient)"
        />
      </svg>
    </div>
  );
}

export function HolographicOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-creator/10"
        animate={{
          background: [
            "linear-gradient(45deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--creator) / 0.1))",
            "linear-gradient(135deg, hsl(var(--creator) / 0.1), transparent, hsl(var(--success) / 0.1))",
            "linear-gradient(225deg, hsl(var(--success) / 0.1), transparent, hsl(var(--primary) / 0.1))",
            "linear-gradient(315deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--creator) / 0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}