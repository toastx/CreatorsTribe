import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        creator: {
          DEFAULT: "hsl(var(--creator))",
          foreground: "hsl(var(--creator-foreground))",
          hover: "hsl(var(--creator-hover))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          hover: "hsl(var(--success-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          elevated: "hsl(var(--card-elevated))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-creator': 'var(--gradient-creator)', 
        'gradient-success': 'var(--gradient-success)',
        'gradient-mesh': 'var(--gradient-mesh)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
        'glow': 'var(--shadow-glow)',
      },
      animation: {
        'fade-in': 'fadeIn var(--duration-normal) ease-out',
        'fade-out': 'fadeOut var(--duration-normal) ease-out',
        'slide-up': 'slideUp var(--duration-normal) ease-out',
        'slide-down': 'slideDown var(--duration-normal) ease-out',
        'scale-in': 'scaleIn var(--duration-fast) ease-out',
        'bounce-gentle': 'bounceGentle var(--duration-slow) ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'count-up': 'countUp var(--duration-slow) ease-out',
        'holographic': 'holographic 3s ease-in-out infinite',
        'cosmic-drift': 'cosmic-drift 20s ease-in-out infinite',
        'quantum-shimmer': 'quantum-shimmer 2s ease-in-out infinite',
        'kinetic-rise': 'kinetic-rise 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float-pulse': 'float-pulse 4s ease-in-out infinite',
        'cyber-blink': 'cyber-blink 2s ease-in-out infinite',
        'matrix-fall': 'matrix-fall 3s linear infinite',
        'skeleton-glow': 'skeleton-glow 1.5s ease-in-out infinite',
        'particle-drift': 'particle-drift 15s linear infinite',
        'energy-burst': 'energy-burst 0.6s ease-out',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--creator) / 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 40px hsl(var(--primary) / 0.7), 0 0 80px hsl(var(--creator) / 0.4)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countUp: {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        holographic: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'cosmic-drift': {
          '0%, 100%': { transform: 'translateX(0%) translateY(0%) rotate(0deg)' },
          '33%': { transform: 'translateX(30%) translateY(-30%) rotate(120deg)' },
          '66%': { transform: 'translateX(-20%) translateY(20%) rotate(240deg)' },
        },
        'quantum-shimmer': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        'kinetic-rise': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(40px) scale(0.9)',
            filter: 'blur(4px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          },
        },
        'float-pulse': {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
          },
          '50%': { 
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 0 40px hsl(var(--primary) / 0.5)'
          },
        },
        'cyber-blink': {
          '0%, 90%, 100%': { opacity: '1' },
          '95%': { opacity: '0.1' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'skeleton-glow': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'particle-drift': {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '100%': { transform: 'translateY(-100px) translateX(50px)' },
        },
        'energy-burst': {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(2) rotate(180deg)',
            opacity: '0'
          },
        },
        'neon-pulse': {
          '0%, 100%': { 
            filter: 'brightness(1) drop-shadow(0 0 5px hsl(var(--primary)))'
          },
          '50%': { 
            filter: 'brightness(1.3) drop-shadow(0 0 20px hsl(var(--primary)))'
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
