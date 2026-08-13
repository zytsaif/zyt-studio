import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 22), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#8b5cf6', '#a855f7', '#06b6d4', '#3b82f6', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Isometric Floating Minecraft Cube Blocks
    const cubeCount = 8;
    const cubes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      rotation: number;
      rotSpeed: number;
      color: string;
    }> = [];

    for (let i = 0; i < cubeCount; i++) {
      cubes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 20 + 16,
        speed: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        color: colors[i % colors.length],
      });
    }

    // Mouse tracking
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Helper to draw isometric cube
    const drawIsometricCube = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      angle: number,
      color: string
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(angle * 0.2);

      const h = size * 0.6;
      const w = size * 0.8;

      // Top face
      context.beginPath();
      context.moveTo(0, -h);
      context.lineTo(w, -h / 2);
      context.lineTo(0, 0);
      context.lineTo(-w, -h / 2);
      context.closePath();
      context.fillStyle = color + '22';
      context.fill();
      context.strokeStyle = color + '88';
      context.lineWidth = 1.2;
      context.stroke();

      // Left face
      context.beginPath();
      context.moveTo(-w, -h / 2);
      context.lineTo(0, 0);
      context.lineTo(0, h);
      context.lineTo(-w, h / 2);
      context.closePath();
      context.fillStyle = color + '15';
      context.fill();
      context.stroke();

      // Right face
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(w, -h / 2);
      context.lineTo(w, h / 2);
      context.lineTo(0, h);
      context.closePath();
      context.fillStyle = color + '33';
      context.fill();
      context.stroke();

      context.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle web
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse avoidance
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          const force = (120 - distMouse) / 120;
          p1.x += (dxMouse / distMouse) * force * 1.5;
          p1.y += (dyMouse / distMouse) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p1.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw floating isometric minecraft cubes
      ctx.globalAlpha = 1;
      cubes.forEach((cube) => {
        cube.y -= cube.speed;
        cube.rotation += cube.rotSpeed;

        if (cube.y < -50) {
          cube.y = height + 50;
          cube.x = Math.random() * width;
        }

        drawIsometricCube(ctx, cube.x, cube.y, cube.size, cube.rotation, cube.color);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
