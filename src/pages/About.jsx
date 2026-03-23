import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { Target, TrendingDown, ShieldCheck, Zap, Layers, Snowflake, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function About() {
  return (
    <PageWrapper isProtected={false}>
      <div className="bg-[#0b0616] min-h-screen font-sans selection:bg-fuchsia-500/30 selection:text-white -mt-16 pt-16">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-32">
          {/* Amethyst / Fuchsia Glowing Orbs */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-[120px] opacity-60 pointer-events-none">
            <div className="aspect-square w-[700px] rounded-full bg-gradient-to-tr from-fuchsia-600/30 to-violet-600/30" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 blur-[100px] opacity-40 pointer-events-none">
            <div className="aspect-square w-[500px] rounded-full bg-violet-600/20" />
          </div>
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 mb-8 shadow-inner shadow-fuchsia-500/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 mr-2 text-fuchsia-400" />
              Our Core Philosophy
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Our Mission is Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 drop-shadow-sm">Financial Freedom</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-violet-200/60 max-w-3xl mx-auto leading-relaxed mb-12">
              DebtFree is a next-generation debt management platform built on the belief that escaping debt shouldn't require surrendering your data or paying predatory fees.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-3">Transparency</h2>
                <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">What It Does</h3>
                <p className="text-violet-200/60 text-lg leading-relaxed mb-8">
                  Most people don't realize exactly how much cumulative interest they are paying over the lifespan of multiple loans, credit cards, and mortgages. 
                  DebtFree fixes this by aggregating your portfolio locally into one mathematically sound command center.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/10">
                      <TrendingDown className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">Amortization Tracking</h4>
                      <p className="text-violet-200/50">Instantly generates a full payment schedule for every active loan, revealing exactly where every rupee goes.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-fuchsia-500/10">
                      <Target className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">Payoff Date Forecasting</h4>
                      <p className="text-violet-200/50">See the EXACT date and year you will be 100% debt free based on your current inputs and extra payments.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/10">
                      <ShieldCheck className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">100% Data Privacy</h4>
                      <p className="text-violet-200/50">No external bank connections to worry about—all inputs are managed and stored locally by you.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-[3rem] transform rotate-6 scale-105 opacity-20 blur-2xl"></div>
                <div className="bg-[#140b2e]/80 backdrop-blur-xl border border-violet-500/20 rounded-[2.5rem] p-10 relative shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <Layers className="w-7 h-7 text-fuchsia-400" /> Technology Stack
                  </h3>
                  <div className="space-y-5">
                    <div className="h-16 bg-[#1a0f3d] rounded-2xl border border-violet-500/10 flex items-center px-5 gap-5 hover:bg-[#1f1247] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><div className="w-3 h-3 rounded-full bg-indigo-400"></div></div>
                      <div className="h-3 bg-violet-200/20 rounded-full w-32"></div>
                      <div className="h-3 bg-violet-200/10 rounded-full w-16 ml-auto"></div>
                    </div>
                    <div className="h-16 bg-[#1a0f3d] rounded-2xl border border-violet-500/10 flex items-center px-5 gap-5 hover:bg-[#1f1247] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30"><div className="w-3 h-3 rounded-full bg-fuchsia-400"></div></div>
                      <div className="h-3 bg-violet-200/20 rounded-full w-40"></div>
                      <div className="h-3 bg-violet-200/10 rounded-full w-12 ml-auto"></div>
                    </div>
                    <div className="h-16 bg-[#1a0f3d] rounded-2xl border border-violet-500/10 flex items-center px-5 gap-5 hover:bg-[#1f1247] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30"><div className="w-3 h-3 rounded-full bg-violet-400"></div></div>
                      <div className="h-3 bg-violet-200/20 rounded-full w-24"></div>
                      <div className="h-3 bg-violet-200/10 rounded-full w-20 ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section className="py-24 relative z-10 border-t border-white/5 bg-[#100822]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-3">Methodology</h2>
              <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">The Mathematical Models We Use</h3>
              <p className="text-violet-200/60 text-xl max-w-3xl mx-auto leading-relaxed">
                Behind the beautiful interface lies a powerful computation engine utilizing two proven financial debt-destruction methods. 
                You can seamlessly simulate both to find out what works best for your psychological and financial needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Avalanche */}
              <div className="bg-[#140b2e] border border-violet-500/20 rounded-[2.5rem] p-10 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] group-hover:bg-fuchsia-600/20 transition-all duration-700 pointer-events-none"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-fuchsia-500/20 border border-fuchsia-400/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-5">The Avalanche Model</h3>
                <p className="text-violet-200/60 text-lg mb-8 leading-relaxed">
                  This mathematical approach strictly optimizes for saving the absolute maximum amount of money on interest over the lifespan of your loans.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Sorts your debts by highest interest rate first.</span></li>
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Allocates all extra available payments to that highest-rate loan.</span></li>
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Mathematically guarantees the fastest payoff and lowest overall interest paid.</span></li>
                </ul>
              </div>

              {/* Snowball */}
              <div className="bg-[#140b2e] border border-violet-500/20 rounded-[2.5rem] p-10 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-all duration-700 pointer-events-none"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20 border border-indigo-400/30">
                  <Snowflake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-5">The Snowball Model</h3>
                <p className="text-violet-200/60 text-lg mb-8 leading-relaxed">
                  This psychological approach optimizes for momentum. While it might cost slightly more in interest, it provides rapid emotional validation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Sorts your debts by lowest total balance first, ignoring interest rates.</span></li>
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Knocks out smaller accounts rapidly, reducing your total number of loans.</span></li>
                  <li className="flex items-start text-violet-200/80"><CheckCircle2 className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0" /> <span className="pt-0.5">Highly recommended for individuals who need quick wins to stay highly motivated.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative text-center z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#100822] to-[#0b0616] -z-10"></div>
          
          <div className="max-w-4xl mx-auto px-4 relative">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to Experience It?</h2>
            <p className="text-xl md:text-2xl text-violet-200/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Input your debt portfolio securely in your browser and see exactly when you'll be completely debt-free.
            </p>
            <div className="flex justify-center">
              <Link to="/">
                <Button size="lg" className="px-12 py-4 h-auto text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(192,38,211,0.4)] bg-gradient-to-r from-fuchsia-600 to-violet-600 border-none hover:scale-105 transition-all duration-300">
                  Return to Homepage <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
