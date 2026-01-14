import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef<number>();
  const hueRef = useRef(180); // Start with cyan

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (x: number, y: number, velocity: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + velocity * 0.5;
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 40 + 20,
        size: Math.random() * 4 + 2,
        hue: hueRef.current + Math.random() * 60 - 30,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Calculate velocity
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Create particles based on velocity
      const particleCount = Math.min(Math.floor(velocity * 0.5) + 1, 5);
      for (let i = 0; i < particleCount; i++) {
        createParticle(e.clientX, e.clientY, velocity);
      }

      // Slowly shift hue over time
      hueRef.current = (hueRef.current + 0.5) % 360;

      // Limit particles
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 1 / particle.maxLife;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy += 0.02; // Slight gravity

        if (particle.life <= 0) return false;

        const alpha = particle.life;
        const size = particle.size * particle.life;

        // Draw particle with glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 100%, 50%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${alpha})`;
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw light orb at cursor position
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0) {
        // Outer glow
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 60);
        outerGlow.addColorStop(0, `hsla(${hueRef.current}, 100%, 70%, 0.15)`);
        outerGlow.addColorStop(0.5, `hsla(${hueRef.current + 40}, 100%, 50%, 0.05)`);
        outerGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.fillStyle = outerGlow;
        ctx.arc(x, y, 60, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        const innerGlow = ctx.createRadialGradient(x, y, 0, x, y, 25);
        innerGlow.addColorStop(0, `hsla(${hueRef.current}, 100%, 80%, 0.4)`);
        innerGlow.addColorStop(0.6, `hsla(${hueRef.current + 20}, 100%, 60%, 0.15)`);
        innerGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.fillStyle = innerGlow;
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        const core = ctx.createRadialGradient(x, y, 0, x, y, 8);
        core.addColorStop(0, `hsla(${hueRef.current}, 100%, 95%, 0.8)`);
        core.addColorStop(1, `hsla(${hueRef.current}, 100%, 70%, 0)`);
        ctx.beginPath();
        ctx.fillStyle = core;
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
