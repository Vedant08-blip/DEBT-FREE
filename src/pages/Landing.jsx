import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Shield, Zap, Star, LayoutDashboard, Target, TrendingDown } from 'lucide-react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

export default function Landing() {
  return (
    <PageWrapper isProtected={false}>
      {/* 1. PREMIUM HERO SECTION (Dark Mode) */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 -mt-16 mb-20 rounded-b-[3rem] sm:rounded-b-[5rem] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-y-[-50%] -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
        
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto pt-24 text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-accent bg-accent/10 border border-accent/20 mb-8 shadow-inner shadow-accent/20 backdrop-blur-md">
            <span className="flex w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Meet the New Standard of Debt Management
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Destroy your debt, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-accent drop-shadow-sm">accelerate your freedom.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
            The intelligent dashboard to track loans, visualize payoff strategies, 
            and simulate extra payments to reach financial independence decades earlier.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-20">
            {localStorage.getItem('isAuthenticated') === 'true' ? (
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-xl shadow-primary/30 ring-2 ring-primary/20 hover:scale-105 transition-transform duration-300">
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-10 shadow-xl shadow-primary/30 ring-2 ring-primary/20 hover:scale-105 transition-transform duration-300">
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

          {/* Floating UI Elements matching the dark theme */}
          <div className="mt-20 relative max-w-5xl mx-auto hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20 h-full w-full bottom-0"></div>
            
            <div className="flex justify-center gap-6 relative z-10 transition-transform duration-700 hover:scale-[1.02]">
              {/* Glass Card 1 */}
              <div className="w-64 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl transform -rotate-6 translate-y-12">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <TrendingDown className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">-3 Years</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Debt Free Date</p>
                <p className="text-2xl font-bold text-white">Nov 2028</p>
              </div>

              {/* Glass Card 2 (Center) */}
              <div className="w-80 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-left shadow-2xl shadow-primary/20 transform -translate-y-4 z-20 ring-1 ring-white/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40 text-white">
                    <PieChart className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Total Outstanding</p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-6">₹14,50,000</p>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent w-2/3 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-3 text-right">66% Paid</p>
              </div>

              {/* Glass Card 3 */}
              <div className="w-64 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl transform rotate-6 translate-y-12">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-blue-400 text-xs font-bold px-2 py-1 bg-blue-400/10 rounded-full border border-blue-400/20">Active</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Current Strategy</p>
                <p className="text-2xl font-bold text-white">Avalanche</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES (Light & Crisp Mode) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">Everything you need to succeed</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            {/* Bento 1: Large Box */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-slate-50 rounded-[2rem] p-10 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md shadow-slate-200/50 border border-slate-100">
                <LayoutDashboard className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Command Center Dashboard</h3>
              <p className="text-text-muted text-lg max-w-md leading-relaxed">
                Get a master view of your entire financial landscape. Total balances, monthly obligations, and an exact calendar visualization of your debt-free date mapped out in front of you.
              </p>
            </div>

            {/* Bento 2: Strategy */}
            <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-[2rem] p-8 border border-border shadow-sm group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Payoff Architect</h3>
              <p className="text-text-muted">Instantly toggle between Snowball and Avalanche math to find your ultimate victory path.</p>
            </div>

            {/* Bento 3: Privacy */}
            <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-amber-50 to-slate-50 rounded-[2rem] p-8 border border-border shadow-sm group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Air-Gapped Privacy</h3>
              <p className="text-text-muted">Zero bank connections. Zero tracking. Your data belongs entirely to you, secured locally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (Playful Indigo Gradient) */}
      <section id="how-it-works" className="py-32 bg-primary relative overflow-hidden text-white rounded-[3rem] sm:rounded-[5rem] mx-4 sm:mx-6 lg:mx-8 shadow-2xl mb-24">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2">Simplicity</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Three steps to clarity</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-white/20 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-xl shadow-black/20 ring-8 ring-primary/50 mx-auto md:mx-0 transform -rotate-3 transition-transform hover:rotate-0">1</div>
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Map Your Debt</h3>
              <p className="text-blue-100 text-lg leading-relaxed text-center md:text-left">Quickly input your balances, interest rates, and minimum payments into our secure interface.</p>
            </div>
            {/* Step 2 */}
            <div className="relative z-10 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-xl shadow-black/20 ring-8 ring-primary/50 mx-auto md:mx-0 transform rotate-3 transition-transform hover:rotate-0">2</div>
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Pick Your Strategy</h3>
              <p className="text-blue-100 text-lg leading-relaxed text-center md:text-left">Choose between crushing high-interest loans first or getting fast emotional wins.</p>
            </div>
            {/* Step 3 */}
            <div className="relative z-10 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center text-3xl font-extrabold mb-8 shadow-xl shadow-black/20 ring-8 ring-primary/50 mx-auto md:mx-0 transform -rotate-3 transition-transform hover:rotate-0">3</div>
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">See The Future</h3>
              <p className="text-blue-100 text-lg leading-relaxed text-center md:text-left">Simulate how an extra ₹500/month shaves years off your timeline and thousands in interest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS (Dark Premium Marquee) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center border border-slate-800 overflow-hidden relative shadow-2xl">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 relative z-10 tracking-tight">Loved by thousands</h2>
            
            <div className="relative flex overflow-hidden w-full group py-4 -mx-4 z-10">
              {/* Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] min-w-full shrink-0 items-center justify-around gap-6 px-3">
                {[
                  { text: "This tool helped me realize I could be debt free 3 years earlier just by adding ₹2,000 extra to my home loan EMI.", author: "Rahul S." },
                  { text: "The visual comparison between Avalanche and Snowball made it so easy to pick the right strategy for my 4 credit cards.", author: "Priya M." },
                  { text: "Finally an app that doesn't force me to link my bank account. The privacy is unmatched.", author: "Amit T." },
                  { text: "DebtFree's dashboard became my morning routine. Watching my payoff date get closer is addicting!", author: "Sarah L." },
                  { text: "I cleared my education loan a whole year early thanks to the amortization schedules here.", author: "Rohan K." }
                ].map((t, i) => (
                  <div key={i} className="w-[320px] md:w-[380px] shrink-0 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 whitespace-normal text-left hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-200 italic mb-6 text-sm md:text-base leading-relaxed min-h-[5rem]">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-inner ring-2 ring-white/20">
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
                  <div key={i} className="w-[320px] md:w-[380px] shrink-0 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 whitespace-normal text-left hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-200 italic mb-6 text-sm md:text-base leading-relaxed min-h-[5rem]">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-inner ring-2 ring-white/20">
                        <span className="text-white font-bold text-sm tracking-widest">{t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}</span>
                      </div>
                      <p className="font-semibold text-white tracking-wide">{t.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 relative z-10">
              {localStorage.getItem('isAuthenticated') === 'true' ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-10 shadow-xl shadow-primary/40 bg-white text-slate-900 border-none hover:bg-slate-100 ring-2 ring-primary/50 text-lg hover:scale-105 transition-transform duration-300">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="px-10 shadow-xl shadow-primary/40 bg-white text-slate-900 border-none hover:bg-slate-100 ring-2 ring-primary/50 text-lg hover:scale-105 transition-transform duration-300">Create Free Account</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
