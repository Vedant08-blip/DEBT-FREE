import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ color = '96,165,250', maxParticles = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    
    const particles = Array.from({ length: maxParticles }, () => ({
      x: Math.random() * W, 
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.05,
    }));
    
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.alpha})`;
        ctx.fill();
        p.x += p.dx; 
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    const onResize = () => { 
      W = canvas.width = canvas.offsetWidth; 
      H = canvas.height = canvas.offsetHeight; 
    };
    window.addEventListener('resize', onResize);
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', onResize); 
    };
  }, [color, maxParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30" 
    />
  );
}
