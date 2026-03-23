import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { Target, TrendingDown, ShieldCheck, Zap, Layers, Snowflake, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function About() {
  return (
    <PageWrapper isProtected={false}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-card border-b border-border pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-3xl opacity-50 pointer-events-none">
          <div className="aspect-square w-[600px] rounded-full bg-gradient-to-tr from-primary/20 to-accent/20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight mb-6">
            Our Mission is Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Financial Freedom</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-10">
            DebtFree is a next-generation debt management and visualization platform designed to help you regain control of your life. 
            We provide the tools, models, and strategies to make paying off debt simple, logical, and incredibly rewarding.
          </p>
          <img src="/logo.png" alt="DebtFree Logo" className="w-20 h-20 object-contain mx-auto drop-shadow-xl mb-4" />
        </div>
      </div>

      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">What It Does</h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Most people don't realize exactly how much cumulative interest they are paying over the lifespan of multiple loans, credit cards, and mortgages. 
                DebtFree fixes this by aggregating your debts into one beautiful dashboard.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingDown className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Amortization Tracking</h3>
                    <p className="text-sm text-text-muted">Instantly generates a full payment schedule for every active loan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Payoff Date Forecasting</h3>
                    <p className="text-sm text-text-muted">See the EXACT date and year you will be 100% debt free based on your current inputs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">100% Data Privacy</h3>
                    <p className="text-sm text-text-muted">No external bank connections to worry about—all inputs are completely managed by you.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <div className="bg-card border border-border rounded-3xl p-8 relative shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" /> Inside the Application
                </h3>
                <div className="space-y-4">
                  <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Layers className="w-4 h-4 text-blue-600" /></div>
                    <div className="h-2 bg-slate-200 rounded-full w-24"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-12 ml-auto"></div>
                  </div>
                  <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Layers className="w-4 h-4 text-emerald-600" /></div>
                    <div className="h-2 bg-slate-200 rounded-full w-32"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-16 ml-auto"></div>
                  </div>
                  <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><Layers className="w-4 h-4 text-amber-600" /></div>
                    <div className="h-2 bg-slate-200 rounded-full w-20"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-10 ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">The Mathematical Models We Use</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Behind the beautiful interface lies a powerful computation engine utilizing two proven financial debt-destruction methods. You can seamlessly simulate both to find out what works best for your psychological and financial needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Avalanche */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">The Avalanche Model</h3>
              <p className="text-text-muted mb-6">
                This mathematical approach strictly optimizes for saving the absolute maximum amount of money on interest. 
              </p>
              <ul className="space-y-3">
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-accent mr-2" /> Sorts your debts by highest interest rate first.</li>
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-accent mr-2" /> Allocates all extra available payments to that highest-rate loan.</li>
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-accent mr-2" /> Mathematically guarantees the fastest payoff and lowest overall interest paid.</li>
              </ul>
            </div>

            {/* Snowball */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                <Snowflake className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">The Snowball Model</h3>
              <p className="text-text-muted mb-6">
                This psychological approach optimizes for momentum. While it might cost slightly more in interest, it provides rapid emotional validation.
              </p>
              <ul className="space-y-3">
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-primary mr-2" /> Sorts your debts by lowest balance first, ignoring interest rates.</li>
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-primary mr-2" /> Knocks out smaller accounts rapidly.</li>
                <li className="flex text-sm text-text-secondary"><CheckCircle2 className="w-5 h-5 text-primary mr-2" /> Highly recommended for individuals who need quick wins to stay motivated.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to Experience It?</h2>
          <p className="text-lg text-text-muted mb-8">
            Input your debt portfolio securely in your browser and see exactly when you'll be completely debt-free.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg shadow-primary/20">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
