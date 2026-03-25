import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Shield, Zap, Star, LayoutDashboard, Target, TrendingDown, BarChart3, Users, DollarSign, Activity, Sparkles, ChevronDown, Brain, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';
import ParticleCanvas from '../components/ui/ParticleCanvas';

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
   Animated counter hook
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
   Particle Canvas
───────────────────────────────────────── */


/* ─────────────────────────────────────────
   Stat Card
───────────────────────────────────────── */
function StatCard({ value, suffix = '', label, color, inView }) {
  const count = useCounter(value, 2200, inView);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-4xl lg:text-5xl font-black tracking-tight ${color}`}>
        {count.toLocaleString('en-IN')}{suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Dashboard Mockup
───────────────────────────────────────── */
function SaaSDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex h-full w-full text-white bg-transparent"
    >
      {/* SIDEBAR - hidden on small mockup screens */}
      <div className="hidden lg:flex w-48 border-r border-white/5 bg-slate-950/60 backdrop-blur-md p-5 flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <TrendingDown className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white">DebtFree</span>
        </div>
        <nav className="flex flex-col gap-1 text-xs text-slate-500">
          {[
            { icon: BarChart3, label: 'Dashboard', active: true },
            { icon: Target, label: 'My Loans' },
            { icon: Zap, label: 'Strategy' },
            { icon: Activity, label: 'Simulator' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'hover:text-white hover:bg-white/5'}`}>
              <item.icon size={13} />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">R</div>
        </div>
      </div>

      {/* MOBILE MINI SIDEBAR - visible on small mockup but hidden on large */}
      <div className="flex lg:hidden w-12 border-r border-white/5 bg-slate-950/60 backdrop-blur-md p-2 flex-col items-center gap-6">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <TrendingDown className="w-3 h-3 text-white" />
        </div>
        <div className="flex flex-col gap-4 text-slate-500">
          <BarChart3 size={14} className="text-blue-400" />
          <Target size={14} />
          <Zap size={14} />
          <Activity size={14} />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-3 md:p-5 space-y-3 md:space-y-4 text-left overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-wider">Debt Overview</h1>
            <p className="text-[8px] md:text-xs text-slate-500">March 2025</p>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            <div className="w-12 md:w-20 h-5 md:h-6 bg-slate-800/50 rounded-lg border border-white/5"></div>
            <div className="w-5 md:w-6 h-5 md:h-6 bg-blue-500/20 rounded-lg border border-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-2.5 md:w-3 h-2.5 md:h-3 text-blue-400" />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Debt', value: '₹54.3L', change: '-2.1%', up: false },
            { label: 'Monthly EMI', value: '₹66.6K', change: '+0%', up: true },
            { label: 'Debt Free', value: 'Aug 2031', change: '↑ 8mo', up: true },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="bg-slate-900/60 border border-white/5 rounded-xl p-3 backdrop-blur-xl"
            >
              <div className="text-[10px] text-slate-500 mb-1">{card.label}</div>
              <div className="text-sm font-bold text-white">{card.value}</div>
              <div className={`text-[10px] mt-1 font-semibold ${card.up ? 'text-emerald-400' : 'text-red-400'}`}>{card.change}</div>
            </motion.div>
          ))}
        </div>

        {/* CHART */}
        <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Payoff Timeline</h2>
            <div className="flex gap-3 text-[9px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>Avalanche</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>Snowball</span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {[90, 78, 68, 60, 52, 45, 38, 32, 25, 18, 10, 4].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.08 + 0.6, type: 'spring', stiffness: 100 }}
                className="flex-1 rounded-t-sm"
                style={{ background: `linear-gradient(to top, rgba(37,99,235,0.6), rgba(99,102,241,0.4))` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none rounded-xl" />
        </div>

        {/* LOANS */}
        <div className="space-y-2">
          {[
            { name: 'HDFC Home Loan', progress: 76, amount: '₹38L', color: 'bg-blue-500' },
            { name: 'SBI Car Loan', progress: 44, amount: '₹4.5L', color: 'bg-indigo-500' },
          ].map((loan, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 + 1 }}
              className="bg-slate-900/60 border border-white/5 rounded-xl p-3 flex items-center gap-3"
            >
              <div className={`w-2 h-8 rounded-full ${loan.color}`} />
              <div className="flex-1">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-white">{loan.name}</span>
                  <span className="text-[10px] text-slate-400">{loan.amount}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loan.progress}%` }}
                    transition={{ delay: i * 0.15 + 1.2, duration: 1 }}
                    className={`h-full rounded-full ${loan.color}`}
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{loan.progress}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Landing Component
───────────────────────────────────────── */
export default function Landing() {
  const [statsRef, statsInView] = useInView(0.3);
  const [featRef, featInView] = useInView(0.1);
  const [howRef, howInView] = useInView(0.1);
  const [testRef, testInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  const isAuth = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';



  const steps = [
    { num: '1', title: 'Map Your Debt', desc: 'Input your balances, interest rates, and minimum payments into our secure interface in minutes.', glow: 'bg-blue-500/20 group-hover:bg-blue-500/40' },
    { num: '2', title: 'Pick Your Strategy', desc: 'Choose between crushing high-interest loans first or getting fast emotional wins with smaller debts.', glow: 'bg-purple-500/20 group-hover:bg-purple-500/40' },
    { num: '3', title: 'See The Future', desc: 'Simulate how an extra ₹500/month shaves years off your timeline and lakhs in interest.', glow: 'bg-emerald-500/20 group-hover:bg-emerald-500/40' },
  ];

  const testimonials = [
    { text: "This tool helped me realize I could be debt free 3 years earlier just by adding ₹2,000 extra to my home loan EMI.", author: "Rahul S.", role: "Software Engineer" },
    { text: "The visual comparison between Avalanche and Snowball made it so easy to pick the right strategy for my 4 credit cards.", author: "Priya M.", role: "Product Manager" },
    { text: "Finally an app that doesn't force me to link my bank account. The privacy is unmatched.", author: "Amit T.", role: "Entrepreneur" },
    { text: "DebtFree's dashboard became my morning routine. Watching my payoff date get closer is addicting!", author: "Sarah L.", role: "Doctor" },
    { text: "I cleared my education loan a whole year early thanks to the amortization schedules here.", author: "Rohan K.", role: "CA Student" },
  ];

  return (
    <PageWrapper isProtected={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        .land-root { font-family: 'DM Sans', sans-serif; }
        .land-root h1, .land-root h2, .land-root h3, .land-root h4 { font-family: 'Syne', sans-serif; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(37,99,235,0.3)} 50%{box-shadow:0 0 40px rgba(37,99,235,0.6)} }
        @keyframes borderGlow { 0%,100%{border-color:rgba(37,99,235,0.25)} 50%{border-color:rgba(99,102,241,0.5)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        .animate-float       { animation: float 5s ease-in-out infinite; }
        .animate-rotate      { animation: rotateSlow 25s linear infinite; }
        .animate-marquee     { animation: marquee 30s linear infinite; }
        .animate-shimmer     { background: linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent); background-size:200% 100%; animation:shimmer 2.5s linear infinite; }
        .animate-pulse-glow  { animation: pulseGlow 2.5s ease-in-out infinite; }
        .animate-border-glow { animation: borderGlow 3s ease-in-out infinite; }

        .in-view  { opacity:1!important; transform:none!important; transition:opacity 0.7s ease,transform 0.7s ease; }
        .pre-anim { opacity:0; transform:translateY(24px); }

        .glass-card {
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .glass-card:hover {
          border-color: rgba(37,99,235,0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(37,99,235,0.15);
          transition: all 0.4s ease;
        }
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #818cf8, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-gradient {
          background: radial-gradient(ellipse at top, #0f172a 0%, #020617 60%);
        }
        .hex-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 4 L56 19 L56 49 L30 64 L4 49 L4 19 Z' fill='none' stroke='rgba(37,99,235,0.05)' stroke-width='1'/%3E%3Cpath d='M30 68 L56 83 L56 113 L30 128 L4 113 L4 83 Z' fill='none' stroke='rgba(37,99,235,0.05)' stroke-width='1'/%3E%3C/svg%3E");
        }
        .noise::after {
          content:''; position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events:none; z-index:0; opacity:0.35;
        }
        .bento-large:hover .bento-glow { opacity: 0.4; }
        .bento-glow { transition: opacity 0.7s ease; }
      `}</style>

      <div className="land-root bg-[#020617] min-h-screen text-white overflow-x-hidden -mt-16 pt-16">

        {/* ── HERO ─────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise px-4">
          <ParticleCanvas />

          {/* Orbs */}
          <div className="absolute top-[-5%] left-[10%] w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

          {/* Rotating rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-blue-500/8 animate-rotate pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-indigo-500/6 animate-rotate pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '18s' }} />

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-10 backdrop-blur-md animate-border-glow"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              The Ultimate Financial Command Center
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1] md:leading-[0.95] mb-8"
            >
              Destroy your debt,<br />
              <span className="gradient-text">Accelerate your freedom.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              The intelligent dashboard to track loans, visualize payoff strategies,
              and simulate extra payments to reach financial independence decades earlier.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
            >
              {isAuth ? (
                <Link to="/dashboard">
                  <button className="px-10 py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 animate-pulse-glow shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    Go to Dashboard <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <button className="px-10 py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                      Start for Free <ArrowRight className="inline ml-2 w-5 h-5" />
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="px-10 py-4 rounded-2xl font-bold text-slate-300 text-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300">
                      Log in
                    </button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative max-w-5xl mx-auto block group px-0 sm:px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-indigo-600/5 rounded-t-3xl blur-[40px] md:blur-[60px] -z-10 group-hover:from-blue-600/30 transition-all duration-700" />
              <div className="relative rounded-t-xl md:rounded-t-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/8 shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform duration-700 ring-1 ring-white/5">
                {/* OSX Toolbar */}
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-3 bg-slate-950/90 border-b border-white/5">
                  <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-red-500/40" />
                  <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-emerald-500/40" />
                  <div className="mx-auto w-1/2 md:w-1/3 h-4 md:h-5 bg-slate-800/60 rounded-lg border border-white/5 flex items-center justify-center">
                    <span className="text-[7px] md:text-[9px] text-slate-500">debtfree.app/dashboard</span>
                  </div>
                </div>
                <div className="flex h-full p-0">
                  <SaaSDashboard />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-float">
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>

        {/* ── STATS ────────────────────────────── */}
        <section ref={statsRef} className="relative py-20 border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 hex-grid opacity-60" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 pre-anim ${statsInView ? 'in-view' : ''}`}>
              <StatCard value={54} suffix="L+" label="Total Debt Tracked" color="text-blue-400" inView={statsInView} />
              <StatCard value={11333} suffix="+" label="GitHub Forks" color="text-indigo-400" inView={statsInView} />
              <StatCard value={3} suffix=" yrs" label="Avg Years Saved" color="text-emerald-400" inView={statsInView} />
              <StatCard value={100} suffix="%" label="Privacy First" color="text-amber-400" inView={statsInView} />
            </div>
          </div>
        </section>

        {/* ── BENTO FEATURES ───────────────────── */}
        <section ref={featRef} className="relative py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-16 pre-anim ${featInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em] mb-4">Capabilities</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Everything you need<br />
                <span className="gradient-text">to succeed</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                Three powerful tools. One unified platform. Built for India's debt reality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
              {/* Large card */}
              <div className={`col-span-1 sm:col-span-2 lg:row-span-2 relative glass-card rounded-[2rem] p-6 md:p-10 overflow-hidden group bento-large cursor-default pre-anim ${featInView ? 'in-view' : ''}`} style={{ transitionDelay: '50ms' }}>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/15 rounded-full blur-[80px] bento-glow pointer-events-none" />
                <div className="animate-shimmer absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.2)] animate-float">
                    <LayoutDashboard className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Command Center Dashboard</h3>
                  <p className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
                    Get a master view of your entire financial landscape. Total balances, monthly obligations,
                    and an exact calendar visualization of your debt-free date — all mapped out in front of you.
                  </p>
                  <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                    {['Real-time', 'Visual', 'Actionable'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] md:text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategy card */}
              <div className={`col-span-1 relative glass-card rounded-[2rem] p-8 overflow-hidden group cursor-default pre-anim ${featInView ? 'in-view' : ''}`} style={{ transitionDelay: '150ms' }}>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                    <Zap className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Payoff Architect</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Instantly toggle between Snowball and Avalanche math to find your ultimate chronological victory path.</p>
                </div>
              </div>

              {/* Privacy card */}
              <div className={`col-span-1 relative glass-card rounded-[2rem] p-8 overflow-hidden group cursor-default pre-anim ${featInView ? 'in-view' : ''}`} style={{ transitionDelay: '250ms' }}>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                    <Shield className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Air-Gapped Privacy</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Zero bank connections. Zero tracking. Your data belongs entirely to you, secured locally in your browser.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────── */}
        <section ref={howRef} id="how-it-works" className="relative py-32 overflow-hidden border-t border-white/5 bg-slate-950/50">
          <div className="absolute inset-0 hex-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-20 pre-anim ${howInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.3em] mb-4">Simplicity</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Three steps<br />
                <span className="gradient-text">to clarity</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                No complexity. No learning curve. Just results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden md:block" />

              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`relative group pre-anim h-full flex flex-col ${howInView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="relative mb-8 shrink-0">
                    <div className="w-20 h-20 bg-slate-900 border border-white/8 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-2xl relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                      <div className={`absolute inset-0 ${step.glow} blur-xl rounded-2xl -z-10 transition-colors duration-500`} />
                      {step.num}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-7 hover:border-blue-500/30 transition-all duration-300 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed grow">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────── */}
        <section ref={testRef} className="relative py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-16 pre-anim ${testInView ? 'in-view' : ''}`}>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Social Proof</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                Loved by <span className="gradient-text">thousands</span>
              </h2>
              <p className="text-slate-400 text-xl">Real stories from real people who took control.</p>
            </div>

            {/* Marquee */}
            <div className="relative flex overflow-hidden w-full group py-4">
              <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

              {[0, 1].map((_, setIdx) => (
                <div
                  key={setIdx}
                  aria-hidden={setIdx === 1}
                  className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch gap-5 px-3"
                >
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="w-[340px] md:w-[400px] shrink-0 glass-card rounded-2xl p-7 cursor-default whitespace-normal hover:border-blue-500/25 transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="flex gap-1 mb-4 shrink-0">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-300 italic mb-6 text-sm leading-relaxed grow min-h-[4.5rem]">"{t.text}"</p>
                      <div className="flex items-center gap-3 shrink-0 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center border border-blue-500/30">
                          <span className="text-white font-bold text-sm">{t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{t.author}</p>
                          <p className="text-slate-500 text-xs">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────── */}
        <section ref={ctaRef} className="relative py-40 overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-slate-950 to-[#020617]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-700/10 via-indigo-700/15 to-emerald-700/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

          <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center pre-anim ${ctaInView ? 'in-view' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-10 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              100% Free — No Credit Card Required
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Your debt-free life<br />
              <span className="gradient-text">starts today.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Indians who have already mapped their path to zero.
              No bank connections. No fees. Just clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {isAuth ? (
                <Link to="/dashboard">
                  <button className="px-12 py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)]">
                    Go to Dashboard <ArrowRight className="inline ml-3 w-5 h-5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <button className="px-12 py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)]">
                      Create Free Account <ArrowRight className="inline ml-3 w-5 h-5" />
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="px-12 py-5 rounded-2xl font-bold text-slate-300 text-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300">
                      Log in
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 text-slate-600 text-sm">
              {['No credit card', 'No bank connection', 'Open source', '100% private'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
