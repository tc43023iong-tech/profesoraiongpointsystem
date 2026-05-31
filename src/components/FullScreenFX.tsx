import React, { useEffect, useRef, useState } from 'react';

export interface FullScreenFXProps {
  trigger: { type: 'fireworks' | 'rain'; timestamp: number } | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
}

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
}

interface FireworkRocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  size: number;
}

interface RainDrop {
  x: number;
  y: number;
  vy: number;
  length: number;
  weight: number;
}

interface RainSplash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const FullScreenFX: React.FC<FullScreenFXProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Track active animation arrays
  const rocketsRef = useRef<FireworkRocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const confettiRef = useRef<Confetti[]>([]);
  
  const rainDropsRef = useRef<RainDrop[]>([]);
  const rainSplashesRef = useRef<RainSplash[]>([]);
  
  const [activeType, setActiveType] = useState<'fireworks' | 'rain' | null>(null);
  const activeTypeRef = useRef<'fireworks' | 'rain' | null>(null);
  const opacityRef = useRef<number>(0); // for smooth transition fade-in and fade-out
  const stateTimerRef = useRef<number>(0); // timer to automatically stop effect after 4-5 seconds

  // List of energetic bright colors for celebratory fireworks and confetti
  const colors = [
    '#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', 
    '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', 
    '#10b981', '#22c55e', '#84cc16', '#eab308', '#f97316'
  ];

  // Helper to spawn a firework explosion
  const createExplosion = (x: number, y: number, color: string) => {
    const numParticles = 60 + Math.floor(Math.random() * 30);
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 1.5),
        size: 2 + Math.random() * 3,
        color,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.015,
        gravity: 0.08
      });
    }
  };

  // Helper to spawn initial celebration arrays
  const initCelebration = (width: number, height: number) => {
    bulletsReset();
    activeTypeRef.current = 'fireworks';
    setActiveType('fireworks');
    opacityRef.current = 1.0;
    stateTimerRef.current = 240; // ~4 seconds at 60fps

    // Spawn 150 confetti items at various positions at the top
    for (let i = 0; i < 120; i++) {
      confettiRef.current.push({
        x: Math.random() * width,
        y: -10 - Math.random() * height * 0.3,
        vx: -1.5 + Math.random() * 3,
        vy: 2 + Math.random() * 4,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.1 + Math.random() * 0.2,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.02 + Math.random() * 0.08
      });
    }

    // Launch initial rockets
    const numRockets = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numRockets; i++) {
      const targetPercentY = 0.2 + Math.random() * 0.3; // explod height
      rocketsRef.current.push({
        x: (0.1 + Math.random() * 0.8) * width,
        y: height + 20,
        targetY: targetPercentY * height,
        vy: -9 - Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 2
      });
    }
  };

  // Helper to spawn initial rain array
  const initRain = (width: number, height: number) => {
    bulletsReset();
    activeTypeRef.current = 'rain';
    setActiveType('rain');
    opacityRef.current = 0; // fade in slowly
    stateTimerRef.current = 240; // ~4 seconds

    // Seed initial raindrops
    for (let i = 0; i < 180; i++) {
      rainDropsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        vy: 10 + Math.random() * 8,
        length: 15 + Math.random() * 18,
        weight: 1 + Math.random() * 1.5
      });
    }
  };

  const bulletsReset = () => {
    rocketsRef.current = [];
    particlesRef.current = [];
    confettiRef.current = [];
    rainDropsRef.current = [];
    rainSplashesRef.current = [];
  };

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set or adjust size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Trigger specified effect
    if (trigger.type === 'fireworks') {
      initCelebration(canvas.width, canvas.height);
    } else {
      initRain(canvas.width, canvas.height);
    }

    // Window resize handling
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [trigger]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateAndDraw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with slight transparency for trailing effect
      ctx.clearRect(0, 0, width, height);

      if (!activeTypeRef.current) {
        animationRef.current = requestAnimationFrame(updateAndDraw);
        return;
      }

      // Handle general transparency and decay
      if (stateTimerRef.current > 0) {
        stateTimerRef.current--;
        if (activeTypeRef.current === 'rain' && opacityRef.current < 1) {
          opacityRef.current = Math.min(1, opacityRef.current + 0.05);
        }
      } else {
        // Fade out
        opacityRef.current = Math.max(0, opacityRef.current - 0.02);
        if (opacityRef.current <= 0) {
          activeTypeRef.current = null;
          setActiveType(null);
          bulletsReset();
        }
      }

      ctx.save();
      ctx.globalAlpha = opacityRef.current;

      // --- RENDER CELESTIAL CELEBRATION (FIREWORKS & CONFETTI) ---
      if (activeTypeRef.current === 'fireworks') {
        // 1. Update & Render Rockets
        rocketsRef.current.forEach((rocket, index) => {
          rocket.y += rocket.vy;
          
          // Draw rocket trailing ember spark
          ctx.beginPath();
          ctx.arc(rocket.x, rocket.y, rocket.size, 0, Math.PI * 2);
          ctx.fillStyle = rocket.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = rocket.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // If reached target, explode
          if (rocket.y <= rocket.targetY || rocket.vy >= 0) {
            createExplosion(rocket.x, rocket.y, rocket.color);
            rocketsRef.current.splice(index, 1);
            
            // Chance to launch a subsequent rocket to keep the sky busy!
            if (Math.random() < 0.65 && stateTimerRef.current > 60) {
              const targetPercentY = 0.15 + Math.random() * 0.3;
              rocketsRef.current.push({
                x: (0.15 + Math.random() * 0.75) * width,
                y: height + 15,
                targetY: targetPercentY * height,
                vy: -8 - Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 3 + Math.random() * 3
              });
            }
          }
        });

        // 2. Update & Render Sparkle Particles
        particlesRef.current.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(index, 1);
            return;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * opacityRef.current;
          ctx.fill();
        });
        ctx.globalAlpha = opacityRef.current; // Restore

        // 3. Update & Render Falling Confetti Paper
        confettiRef.current.forEach((conf) => {
          conf.y += conf.vy;
          conf.x += conf.vx;
          conf.rotation += conf.rotationSpeed;
          conf.wobble += conf.wobbleSpeed;

          // Gentle drift wave
          const driftX = Math.sin(conf.wobble) * 1.5;
          
          // Reset confetti when it touches bottom area
          if (conf.y > height + 20) {
            conf.y = -20;
            conf.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(conf.x + driftX, conf.y);
          ctx.rotate(conf.rotation);
          ctx.fillStyle = conf.color;
          
          // Draw standard colorful ribbon/rectangle
          ctx.fillRect(-conf.size / 2, -conf.size / 4, conf.size, conf.size / 2);
          ctx.restore();
        });
      }

      // --- RENDER DRAMATIC GLOOMY RAIN EFFECT ---
      if (activeTypeRef.current === 'rain') {
        // Draw deep translucent overlay vignette for atmospheric mood
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, 'rgba(15, 23, 42, 0.15)');
        grad.addColorStop(1, 'rgba(51, 65, 85, 0.05)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Update & Render Rain Drops
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.45)';
        ctx.lineCap = 'round';
        rainDropsRef.current.forEach((drop) => {
          // Drops fall straight/slanted with wind
          drop.y += drop.vy;
          drop.x += 0.8; // subtle right wind slant

          ctx.lineWidth = drop.weight;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + 1.2, drop.y + drop.length);
          ctx.stroke();

          // Collide with bottom area of screen to trigger splashes
          if (drop.y > height - 15 - Math.random() * 25) {
            // Spawn ring splash
            rainSplashesRef.current.push({
              x: drop.x,
              y: height - 12,
              radius: 1,
              maxRadius: 6 + Math.random() * 8,
              alpha: 0.6
            });
            
            // Loop back up
            drop.y = -30 - Math.random() * 40;
            drop.x = Math.random() * width;
          }
        });

        // Update & Render Splash Rings
        rainSplashesRef.current.forEach((splash, idx) => {
          splash.radius += 0.65;
          splash.alpha -= 0.04;

          if (splash.alpha <= 0 || splash.radius >= splash.maxRadius) {
            rainSplashesRef.current.splice(idx, 1);
            return;
          }

          ctx.beginPath();
          ctx.ellipse(splash.x, splash.y, splash.radius, splash.radius * 0.4, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(186, 230, 253, ${splash.alpha * opacityRef.current})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        });
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(updateAndDraw);
    };

    animationRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99999] pointer-events-none w-screen h-screen"
      style={{ display: activeType ? 'block' : 'none' }}
    />
  );
};
