import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Shield, Zap, Star, LayoutDashboard, Target, TrendingDown } from 'lucide-react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

export default function Landing() {
  return (
    <PageWrapper isProtected={false}>
      {/* 
        UNIFIED DARK THEME WRAPPER 
        This prevents sections from looking "divided" and creates a seamless, infinite canvas feel. 
      */}
      <div className="bg-slate-950 min-h-screen font-sans selection:bg-primary/30 selection:text-white -mt-16 pt-16">
        
        {/* 1. SEAMLESS HERO SECTION */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2"></div>
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3"></div>
          
          {/* Grid Layout (subtle) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 mb-8 shadow-inner shadow-blue-500/20 backdrop-blur-md">
              <span className="flex w-2.5 h-2.5 rounded-full bg-blue-400 mr-2.5 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              The Ultimate Financial Command Center
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Destroy your debt, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-accent drop-shadow-sm">accelerate your freedom.</span>
            </h1>
            <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-medium">
              The intelligent dashboard to track loans, visualize payoff strategies, 
              and simulate extra payments to reach financial independence decades earlier.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-20">
              {localStorage.getItem('isAuthenticated') === 'true' ? (
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-[0_0_30px_rgba(37,99,235,0.3)] ring-1 ring-primary/50 hover:scale-105 transition-all duration-300">
                    Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-10 shadow-[0_0_30px_rgba(37,99,235,0.3)] ring-1 ring-primary/50 hover:scale-105 transition-all duration-300">
                      Start for Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-10 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300">
                      Log in
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* APP WIREFRAME VISUALIZATION (Replacing the 3 stat cards) */}
            <div className="mt-24 relative max-w-5xl mx-auto hidden md:block group perspective-1000">
              {/* Glow Behind Mockup */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-accent/10 rounded-t-3xl blur-[80px] -z-10 group-hover:from-primary/40 transition-all duration-700"></div>
              
              <div className="relative rounded-t-xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden aspect-[21/9] transform transition-transform duration-1000 group-hover:-translate-y-2 ring-1 ring-white/5">
                {/* OSX Toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="mx-auto w-1/3 h-2 bg-slate-800 rounded-full"></div>
                </div>
                
                {/* App Layout Skeleton */}
                <div className="flex h-full p-6 gap-6">
                  {/* Sidebar Skeleton */}
                  <div className="w-48 h-full flex flex-col gap-4">
                    <div className="h-8 w-24 bg-white/5 rounded-lg mb-4"></div>
                    <div className="h-6 w-full bg-primary/20 rounded-md border border-primary/30"></div>
                    <div className="h-6 w-3/4 bg-white/5 rounded-md"></div>
                    <div className="h-6 w-5/6 bg-white/5 rounded-md"></div>
                    <div className="h-6 w-2/3 bg-white/5 rounded-md"></div>
                  </div>
                  
                  {/* Main Content Skeleton */}
                  <div className="flex-1 h-full flex flex-col gap-6">
                    {/* Header Skeletons */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="h-4 w-32 bg-slate-600 rounded-full mb-2"></div>
                        <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                      </div>
                      <div className="h-10 w-32 bg-primary/20 rounded-xl border border-primary/30"></div>
                    </div>
                    
                    {/* Visual Charts Skeleton */}
                    <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 p-6 flex items-end gap-3 relative overflow-hidden">
                      {/* Decorative Graph lines */}
                      <svg className="absolute inset-0 w-full h-full text-white/5" preserveAspectRatio="none" viewBox="0 0 100 100">
                         <path d="M0,100 L0,50 Q25,30 50,60 T100,20 L100,100 Z" fill="currentColor" />
                         <path d="M0,100 L0,70 Q25,50 50,80 T100,40 L100,100 Z" fill="url(#grad)" opacity="0.5" />
                         <defs>
                           <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                             <stop offset="0%" stopColor="#10B981" />
                             <stop offset="100%" stopColor="transparent" />
                           </linearGradient>
                         </defs>
                      </svg>
                      
                      {/* Bars */}
                      <div className="w-1/6 bg-slate-700/50 rounded-t-md h-[40%] relative z-10 transition-all duration-1000 group-hover:h-[60%]"></div>
                      <div className="w-1/6 bg-slate-700/50 rounded-t-md h-[55%] relative z-10 transition-all duration-1000 group-hover:h-[70%]"></div>
                      <div className="w-1/6 bg-slate-700/50 rounded-t-md h-[30%] relative z-10 transition-all duration-1000 group-hover:h-[40%]"></div>
                      <div className="w-1/6 bg-primary/40 rounded-t-md h-[80%] relative z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-1000 group-hover:h-[90%] border-t border-primary"></div>
                      <div className="w-1/6 bg-slate-700/50 rounded-t-md h-[50%] relative z-10 transition-all duration-1000 group-hover:h-[65%]"></div>
                      <div className="w-1/6 bg-accent/40 rounded-t-md h-[20%] relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-1000 group-hover:h-[30%] border-t border-accent"></div>
                    </div>
                  </div>
                </div>
                
                {/* Fade to transparent at the very bottom so it blends into the page */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. UNIFIED BENTO FEATURES (Dark Mode) */}
        <section className="py-24 relative overflow-hidden text-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Capabilities</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Everything you need to succeed</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] text-left">
              {/* Bento 1: Large Box */}
              <div className="md:col-span-2 md:row-span-2 bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-md rounded-[2rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  <LayoutDashboard className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Command Center Dashboard</h3>
                <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                  Get a master view of your entire financial landscape. Total balances, monthly obligations, and an exact calendar visualization of your debt-free date mapped out in front of you.
                </p>
              </div>

              {/* Bento 2: Strategy */}
              <div className="md:col-span-1 md:row-span-1 bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-md rounded-[2rem] p-8 border border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-[50px] group-hover:bg-accent/20 transition-all duration-700 pointer-events-none"></div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Payoff Architect</h3>
                <p className="text-slate-400">Instantly toggle between Snowball and Avalanche math to find your ultimate chronological victory path.</p>
              </div>

              {/* Bento 3: Privacy */}
              <div className="md:col-span-1 md:row-span-1 bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-md rounded-[2rem] p-8 border border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none"></div>
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                  <Shield className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Air-Gapped Privacy</h3>
                <p className="text-slate-400">Zero bank connections. Zero tracking. Your data belongs entirely to you, secured locally in your browser.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (Unified Dark, deeply integrated) */}
        <section id="how-it-works" className="py-24 relative overflow-hidden z-10">
          <div className="absolute inset-x-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="mb-20">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Simplicity</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Three steps to clarity</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative text-left">
              {/* Step 1 */}
              <div className="relative group">
                <div className="w-20 h-20 bg-slate-900 border border-white/10 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-2xl relative z-10 transition-transform group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl -z-10 group-hover:bg-blue-500/40 transition-colors"></div>
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Map Your Debt</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Quickly input your balances, interest rates, and minimum payments into our secure interface.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative group">
                <div className="w-20 h-20 bg-slate-900 border border-white/10 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-2xl relative z-10 transition-transform group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-2xl -z-10 group-hover:bg-purple-500/40 transition-colors"></div>
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Pick Your Strategy</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Choose between crushing high-interest loans first or getting fast emotional wins.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative group">
                <div className="w-20 h-20 bg-slate-900 border border-white/10 text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-2xl relative z-10 transition-transform group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl -z-10 group-hover:bg-emerald-500/40 transition-colors"></div>
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">See The Future</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Simulate how an extra ₹500/month shaves years off your timeline and thousands in interest.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. UNIFIED TESTIMONIALS (Seamless dark integration) */}
        <section className="pt-24 pb-32 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">Loved by thousands</h2>
            
            <div className="relative flex overflow-hidden w-full group py-4 -mx-4">
              {/* Deep Slates Fade Edges to blend with bg-slate-950 context perfectly */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] min-w-full shrink-0 items-center justify-around gap-6 px-3">
                {[
                  { text: "This tool helped me realize I could be debt free 3 years earlier just by adding ₹2,000 extra to my home loan EMI.", author: "Rahul S." },
                  { text: "The visual comparison between Avalanche and Snowball made it so easy to pick the right strategy for my 4 credit cards.", author: "Priya M." },
                  { text: "Finally an app that doesn't force me to link my bank account. The privacy is unmatched.", author: "Amit T." },
                  { text: "DebtFree's dashboard became my morning routine. Watching my payoff date get closer is addicting!", author: "Sarah L." },
                  { text: "I cleared my education loan a whole year early thanks to the amortization schedules here.", author: "Rohan K." }
                ].map((t, i) => (
                  <div key={i} className="w-[320px] md:w-[380px] shrink-0 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-slate-800 transition-colors cursor-default text-left">
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-300 italic mb-6 text-sm md:text-base leading-relaxed min-h-[5rem]">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                        <span className="text-white font-bold text-sm tracking-widest">{t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}</span>
                      </div>
                      <p className="font-semibold text-white tracking-wide">{t.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] min-w-full shrink-0 items-center justify-around gap-6 px-3" aria-hidden="true">
                {[
                  { text: "This tool helped me realize I could be debt free 3 years earlier just by adding ₹2,000 extra to my home loan EMI.", author: "Rahul S." },
                  { text: "The visual comparison between Avalanche and Snowball made it so easy to pick the right strategy for my 4 credit cards.", author: "Priya M." },
                  { text: "Finally an app that doesn't force me to link my bank account. The privacy is unmatched.", author: "Amit T." },
                  { text: "DebtFree's dashboard became my morning routine. Watching my payoff date get closer is addicting!", author: "Sarah L." },
                  { text: "I cleared my education loan a whole year early thanks to the amortization schedules here.", author: "Rohan K." }
                ].map((t, i) => (
                  <div key={i} className="w-[320px] md:w-[380px] shrink-0 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-slate-800 transition-colors cursor-default text-left">
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-300 italic mb-6 text-sm md:text-base leading-relaxed min-h-[5rem]">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                        <span className="text-white font-bold text-sm tracking-widest">{t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}</span>
                      </div>
                      <p className="font-semibold text-white tracking-wide">{t.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 relative z-10 pb-10">
              {localStorage.getItem('isAuthenticated') === 'true' ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-10 shadow-[0_0_30px_rgba(37,99,235,0.3)] ring-1 ring-primary/50 text-lg hover:scale-105 transition-transform duration-300">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="px-10 shadow-[0_0_30px_rgba(37,99,235,0.3)] ring-1 ring-primary/50 text-lg hover:scale-105 transition-transform duration-300">Create Free Account</Button>
                </Link>
              )}
            </div>
            
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
