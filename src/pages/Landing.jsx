import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Shield, Zap, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

export default function Landing() {
  return (
    <PageWrapper isProtected={false}>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
          Take control of your debt, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">accelerate your freedom.</span>
        </h1>
        <p className="mt-4 text-xl text-text-muted max-w-2xl mx-auto mb-10">
          The all-in-one planning tool to track loans, visualize payoff strategies, 
          and simulate extra payments to become debt-free faster.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {localStorage.getItem('isAuthenticated') === 'true' ? (
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg shadow-primary/20">
                Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg shadow-primary/20">
                  Start for Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary">Everything you need to succeed</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Dashboard</h3>
              <p className="text-text-muted">Get a clear picture of your total balance, monthly obligations, and exact debt-free date.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Payoff Strategies</h3>
              <p className="text-text-muted">Compare Snowball vs Avalanche methods to identify the fastest route to zero balance.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-text-muted">Your financial data stays local. We don't link to bank accounts, ensuring complete privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">1</div>
              <h3 className="text-xl font-semibold mb-2">Add Your Loans</h3>
              <p className="text-text-muted">Enter basic details like principal, interest rate, and EMI amount.</p>
            </div>
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">2</div>
              <h3 className="text-xl font-semibold mb-2">Choose Strategy</h3>
              <p className="text-text-muted">Pick between saving the most interest or getting quick emotional wins.</p>
            </div>
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">3</div>
              <h3 className="text-xl font-semibold mb-2">Track & Simulate</h3>
              <p className="text-text-muted">See how extra monthly payments can shave years off your debt timeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center border border-slate-800 overflow-hidden relative shadow-2xl">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 relative z-10 tracking-tight">Loved by thousands</h2>
            
            <div className="relative flex overflow-hidden w-full group py-4 -mx-4 z-10">
              {/* Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
              
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

            <div className="mt-12 relative z-10">
              {localStorage.getItem('isAuthenticated') === 'true' ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 shadow-lg shadow-primary/40 bg-white text-slate-900 border-none hover:bg-slate-100 ring-2 ring-primary/50 text-base">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="px-8 shadow-lg shadow-primary/40 bg-white text-slate-900 border-none hover:bg-slate-100 ring-2 ring-primary/50 text-base">Create Free Account</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
