import React, { useEffect, useRef, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import {
  Target, TrendingDown, ShieldCheck, Zap, Layers,
  Snowflake, Sparkles, CheckCircle2, ArrowRight,
  BarChart2, Brain, Lock, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

/* ─────────────────────────────────────────
   Reusable animated counter hook
───────────────────────────────────────── */
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─────────────────────────────────────────
   Intersection Observer hook
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────
   Animated stat card
───────────────────────────────────────── */
function StatCard({ value, suffix = '', label, color, inView }) {
  const count = useCounter(value, 2200, inView);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-5xl lg:text-6xl font-black tracking-tight ${color}`}>
        {count.toLocaleString('en-IN')}{suffix}
      </span>
      <span className="text-sm font-semibold uppercase tracking-widest text-violet-300/50">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Floating particle canvas
───────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,132,252,${p.alpha})`;
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
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function About() {
  const [statsRef, statsInView] = useInView(0.3);
  const [heroRef, heroInView] = useInView(0.1);
  const [featRef, featInView] = useInView(0.1);
  const [modelRef, modelInView] = useInView(0.1);
  const [timeRef, timeInView] = useInView(0.1);

  const features = [
    {
      icon: TrendingDown,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      title: 'Amortization Tracking',
      desc: 'Instantly generates a full payment schedule for every active loan, revealing exactly where every rupee goes each month.',
    },
    {
      icon: Target,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/20',
      title: 'Payoff Date Forecasting',
      desc: 'See the exact date you will be 100% debt free — calculated in real time based on your inputs and any extra payments.',
    },
    {
      icon: ShieldCheck,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      title: '100% Data Privacy',
      desc: 'No external bank connections. All financial inputs are stored locally — your data never leaves your device.',
    },
    {
      icon: BarChart2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      title: 'Visual Debt Dashboard',
      desc: 'Interactive charts break down your total debt portfolio, monthly burden, and interest-to-principal ratios at a glance.',
    },
    {
      icon: Brain,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      title: 'Smart Strategy Engine',
      desc: 'Run the Avalanche and Snowball algorithms simultaneously and compare projected savings side by side.',
    },
    {
      icon: Lock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      title: 'EMI Reminders',
      desc: 'Never miss a payment. Schedule email or SMS reminders for every loan days before the due date.',
    },
  ];

  const timeline = [
    {
      step: '01',
      title: 'Add Your Loans',
      desc: 'Enter each loan — home, car, personal, credit card — with its rate, EMI and outstanding balance.',
    },
    {
      step: '02',
      title: 'Choose a Strategy',
      desc: 'Pick Avalanche to save maximum interest or Snowball for psychological momentum. Or compare both.',
    },
    {
      step: '03',
      title: 'Simulate Extra Payments',
      desc: 'Drag the simulator slider and watch your debt-free date move closer in real time.',
    },
    {
      step: '04',
      title: 'Set Reminders',
      desc: 'Configure per-loan reminders via email or SMS so you never pay a late fee again.',
    },
  ];

  return (
    <PageWrapper isProtected={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .about-root { font-family: 'DM Sans', sans-serif; }
        .about-root h1, .about-root h2, .about-root h3, .about-root h4 { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(192,38,211,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(192,38,211,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(192,38,211,0); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(168,85,247,0.3); }
          50%       { border-color: rgba(217,70,239,0.6); }
        }

        .animate-fadeUp        { animation: fadeUp 0.7s ease both; }
        .animate-fadeIn        { animation: fadeIn 0.6s ease both; }
        .animate-float         { animation: float 5s ease-in-out infinite; }
        .animate-rotate        { animation: rotateSlow 20s linear infinite; }
        .animate-shimmer       { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); background-size: 200% 100%; animation: shimmer 2.5s linear infinite; }
        .animate-pulse-ring    { animation: pulse-ring 2.5s ease-out infinite; }
        .animate-border-glow   { animation: borderGlow 3s ease-in-out infinite; }

        .in-view  { opacity: 1 !important; transform: none !important; transition: opacity 0.7s ease, transform 0.7s ease; }
        .pre-anim { opacity: 0; transform: translateY(28px); }

        .glass-card {
          background: rgba(20, 11, 46, 0.7);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(139,92,246,0.15);
        }
        .glass-card:hover {
          border-color: rgba(192,38,211,0.35);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(139,92,246,0.2);
          transition: all 0.4s ease;
        }
        .gradient-text {
          background: linear-gradient(135deg, #e879f9, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .noise-overlay::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        .hex-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 4 L56 19 L56 49 L30 64 L4 49 L4 19 Z' fill='none' stroke='rgba(139,92,246,0.06)' stroke-width='1'/%3E%3Cpath d='M30 68 L56 83 L56 113 L30 128 L4 113 L4 83 Z' fill='none' stroke='rgba(139,92,246,0.06)' stroke-width='1'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="about-root bg-[#080412] min-h-screen text-white overflow-x-hidden -mt-16 pt-16">

        {/* ── HERO ─────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
          <ParticleCanvas />

          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-fuchsia-700/25 to-violet-700/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-700/20 to-violet-700/10 blur-[110px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-violet-500/10 animate-rotate pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-fuchsia-500/8 animate-rotate pointer-events-none"
            style={{ animationDirection: 'reverse', animationDuration: '14s' }} />

          <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto pre-anim ${heroInView ? 'in-view' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-sm font-semibold mb-10 backdrop-blur-md animate-border-glow">
              <Sparkles className="w-4 h-4" />
              Our Core Philosophy
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-8">
              We Believe<br />
              <span className="gradient-text">Debt Freedom</span><br />
              Is a Right
            </h1>

            <p className="text-lg md:text-xl text-violet-200/55 max-w-2xl mx-auto leading-relaxed mb-14">
              DebtFree is a next-generation debt management platform built on the belief that
              escaping debt shouldn't require surrendering your data or paying predatory fees.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <button className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(192,38,211,0.35)] animate-pulse-ring text-lg">
                  Get Started Free
                </button>
              </Link>
              <Link to="/">
                <button className="px-8 py-4 rounded-2xl font-bold text-violet-300 border border-violet-500/30 hover:bg-violet-500/10 transition-all duration-300 text-lg backdrop-blur-md">
                  See the App
                </button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-violet-400/40 animate-float">
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* ── STATS ────────────────────────────── */}
        <section ref={statsRef} className="relative py-24 border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 hex-grid opacity-50" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-12 pre-anim ${statsInView ? 'in-view' : ''}`}>
              <StatCard value={11333} suffix="+" label="Forks on GitHub" color="text-fuchsia-400" inView={statsInView} />
              <StatCard value={98} suffix="%" label="Interest Saved" color="text-violet-400" inView={statsInView} />
              <StatCard value={4} suffix="x" label="Faster Payoff" color="text-indigo-400" inView={statsInView} />
              <StatCard value={100} suffix="%" label="Privacy First" color="text-cyan-400" inView={statsInView} />
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ────────────────────── */}
        <section ref={featRef} className="relative py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-20 pre-anim ${featInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-fuchsia-400 uppercase tracking-[0.3em] mb-4">What We Do</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Everything You Need to<br />
                <span className="gradient-text">Eliminate Debt Faster</span>
              </h2>
              <p className="text-violet-200/50 text-xl max-w-2xl mx-auto leading-relaxed">
                Six powerful tools. One unified platform. Zero compromise on your financial privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`glass-card rounded-3xl p-8 transition-all duration-500 cursor-default pre-anim ${featInView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`w-14 h-14 rounded-2xl ${f.bg} border ${f.border} flex items-center justify-center mb-6 shadow-lg`}>
                    <f.icon className={`w-7 h-7 ${f.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-violet-200/50 leading-relaxed text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODELS ───────────────────────────── */}
        <section ref={modelRef} className="relative py-32 border-t border-white/5 overflow-hidden bg-[#0d0820]">
          <div className="absolute inset-0 hex-grid opacity-30" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-20 pre-anim ${modelInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.3em] mb-4">Methodology</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Two Proven<br />
                <span className="gradient-text">Mathematical Models</span>
              </h2>
              <p className="text-violet-200/50 text-xl max-w-3xl mx-auto leading-relaxed">
                Behind the beautiful interface lies a powerful computation engine. Simulate both
                models to find what works best for your financial and psychological needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Avalanche */}
              <div
                className={`relative rounded-[2.5rem] p-10 overflow-hidden group cursor-default pre-anim ${modelInView ? 'in-view' : ''}`}
                style={{ background: 'linear-gradient(135deg, #1a0b38, #200d40)', border: '1px solid rgba(217,70,239,0.2)', transitionDelay: '100ms' }}
              >
                <div className="absolute -right-16 -top-16 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-[80px] group-hover:bg-fuchsia-600/25 transition-all duration-700 pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-violet-600/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="animate-shimmer absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-fuchsia-500/30 border border-fuchsia-400/30 animate-float">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-5">
                    Maximum Savings
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-5 tracking-tight">The Avalanche Model</h3>
                  <p className="text-violet-200/55 text-base mb-8 leading-relaxed">
                    This mathematical approach strictly optimizes for saving the absolute maximum
                    amount of money on interest over the lifespan of your loans.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Sorts debts by highest interest rate first',
                      'Allocates all extra payments to the highest-rate loan',
                      'Mathematically guarantees the lowest total interest paid',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-violet-200/75 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Snowball */}
              <div
                className={`relative rounded-[2.5rem] p-10 overflow-hidden group cursor-default pre-anim ${modelInView ? 'in-view' : ''}`}
                style={{ background: 'linear-gradient(135deg, #0f1235, #131545)', border: '1px solid rgba(99,102,241,0.2)', transitionDelay: '200ms' }}
              >
                <div className="absolute -left-16 -top-16 w-72 h-72 bg-indigo-600/15 rounded-full blur-[80px] group-hover:bg-indigo-600/25 transition-all duration-700 pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-violet-600/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="animate-shimmer absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/30 border border-indigo-400/30 animate-float"
                    style={{ animationDelay: '1s' }}>
                    <Snowflake className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-5">
                    Maximum Momentum
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-5 tracking-tight">The Snowball Model</h3>
                  <p className="text-violet-200/55 text-base mb-8 leading-relaxed">
                    This psychological approach optimizes for momentum. While it may cost slightly
                    more in interest, it provides rapid emotional wins that keep you on track.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Sorts debts by lowest outstanding balance first',
                      'Knocks out smaller loans rapidly for quick wins',
                      'Highly recommended for staying motivated long term',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-violet-200/75 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS TIMELINE ────────────── */}
        <section ref={timeRef} className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-20 pre-anim ${timeInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-fuchsia-400 uppercase tracking-[0.3em] mb-4">How It Works</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Four Steps to<br />
                <span className="gradient-text">Financial Freedom</span>
              </h2>
            </div>

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-8 items-start pre-anim ${timeInView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 border border-violet-500/25 flex items-center justify-center shadow-lg shadow-violet-500/10">
                    <span className="text-lg font-black text-fuchsia-300">{item.step}</span>
                  </div>
                  <div className="glass-card rounded-2xl p-7 flex-1 hover:border-fuchsia-500/30 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-violet-200/50 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="relative py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0820] to-[#080412]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-fuchsia-700/15 via-violet-700/20 to-indigo-700/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.04)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold mb-10 backdrop-blur-md">
              <Layers className="w-4 h-4" />
              Start Today — It's Free
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Ready to See Your<br />
              <span className="gradient-text">Debt-Free Date?</span>
            </h2>
            <p className="text-xl text-violet-200/50 mb-14 max-w-2xl mx-auto leading-relaxed">
              Input your loan portfolio securely in your browser and see exactly when —
              and how much sooner — you can be completely debt-free.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/register">
                <button className="px-10 py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:scale-105 hover:shadow-[0_0_50px_rgba(192,38,211,0.5)] transition-all duration-300 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
                  Start For Free
                  <ArrowRight className="inline ml-3 w-5 h-5" />
                </button>
              </Link>
              <Link to="/">
                <button className="px-10 py-5 rounded-2xl font-bold text-violet-300 text-lg border border-violet-500/25 hover:bg-violet-500/10 hover:border-violet-400/40 transition-all duration-300 backdrop-blur-md">
                  Back to Homepage
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}