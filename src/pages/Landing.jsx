import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Shield, Zap } from 'lucide-react';
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
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8">
              Start for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
              Login to Dashboard
            </Button>
          </Link>
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
      <section className="py-20 bg-background">
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
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
            <h2 className="text-3xl font-bold text-text-primary mb-8">Ready to change your financial future?</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-left max-w-3xl mx-auto">
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-border">
                <p className="text-text-muted italic mb-4">"This tool helped me realize I could be debt free 3 years earlier just by adding ₹2,000 extra to my home loan EMI."</p>
                <p className="font-semibold text-text-primary">- Rahul S.</p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-border">
                <p className="text-text-muted italic mb-4">"The visual comparison between Avalanche and Snowball made it so easy to pick the right strategy for my 4 credit cards."</p>
                <p className="font-semibold text-text-primary">- Priya M.</p>
              </div>
            </div>
            <div className="mt-10">
              <Link to="/register">
                <Button size="lg" className="px-8 shadow-lg shadow-primary/30">Create Free Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
