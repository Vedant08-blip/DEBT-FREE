import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import { ShieldCheck, BookOpen, AlertCircle, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import Toggle from '../components/ui/Toggle';

export default function CreditGuide() {
  // Simulator states
  const [simulatorState, setSimulatorState] = useState({
    paymentHistory: true, // +150
    lowUtilization: false, // +140
    longHistory: true,    // +70
    creditMix: false,     // +50
    noNewInquiries: true  // +40
  });

  // Action checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Check your credit report once a year for errors", checked: false },
    { id: 2, text: "Set up reminders/alerts for all EMI due dates", checked: true },
    { id: 3, text: "Keep credit card utilization under 30%", checked: false },
    { id: 4, text: "Do not close your oldest credit card accounts", checked: false },
    { id: 5, text: "Avoid applying for multiple loans/cards in a short period", checked: false }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Calculate simulated credit score
  const estimatedScore = useMemo(() => {
    let score = 300; // Base score
    if (simulatorState.paymentHistory) score += 180;
    if (simulatorState.lowUtilization) score += 160;
    if (simulatorState.longHistory) score += 80;
    if (simulatorState.creditMix) score += 50;
    if (simulatorState.noNewInquiries) score += 80;
    return score;
  }, [simulatorState]);

  // Score Rating
  const scoreRating = useMemo(() => {
    if (estimatedScore >= 750) return { label: "Excellent", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", text: "Outstanding credit profile. You qualify for the lowest interest rates." };
    if (estimatedScore >= 680) return { label: "Good", color: "text-blue-400 border-blue-500/30 bg-blue-500/10", text: "Very strong profile. Good approval odds for standard loans." };
    if (estimatedScore >= 600) return { label: "Fair", color: "text-amber-400 border-amber-500/30 bg-amber-500/10", text: "Average score. You can secure credit, but interest rates might be higher." };
    return { label: "Needs Work", color: "text-rose-400 border-rose-500/30 bg-rose-500/10", text: "High risk profile. Focus aggressively on timely payments and debt reduction." };
  }, [estimatedScore]);

  return (
    <PageWrapper isProtected={true}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-500" /> Credit Academy
        </h1>
        <p className="text-slate-400 mt-1">Learn how debt management shapes your creditworthiness and simulate credit score factors.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Simulator Widget */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" /> Credit Score Simulator
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Radial Dial Indicator */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-950/40 border border-white/5 rounded-2xl">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Simulated Score</p>
                <motion.span 
                  key={estimatedScore}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400"
                >
                  {estimatedScore}
                </motion.span>
                
                <div className={`mt-4 px-4 py-1.5 rounded-full border text-sm font-bold ${scoreRating.color}`}>
                  {scoreRating.label}
                </div>
                
                <p className="text-xs text-slate-400 mt-3 text-center max-w-xs">{scoreRating.text}</p>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Simulate Actions:</h4>
                
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/30 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">Flawless Payment History</p>
                    <p className="text-[11px] text-slate-400">All EMI payments made on time</p>
                  </div>
                  <Toggle 
                    checked={simulatorState.paymentHistory} 
                    onChange={(checked) => setSimulatorState(prev => ({ ...prev, paymentHistory: checked }))} 
                  />
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/30 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">Low Credit Utilization</p>
                    <p className="text-[11px] text-slate-400">Utilizing &lt;30% of card limits</p>
                  </div>
                  <Toggle 
                    checked={simulatorState.lowUtilization} 
                    onChange={(checked) => setSimulatorState(prev => ({ ...prev, lowUtilization: checked }))} 
                  />
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/30 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">Long Credit Age</p>
                    <p className="text-[11px] text-slate-400">First account opened &gt;5 years ago</p>
                  </div>
                  <Toggle 
                    checked={simulatorState.longHistory} 
                    onChange={(checked) => setSimulatorState(prev => ({ ...prev, longHistory: checked }))} 
                  />
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/30 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">Diverse Credit Mix</p>
                    <p className="text-[11px] text-slate-400">Mix of cards, home, auto loans</p>
                  </div>
                  <Toggle 
                    checked={simulatorState.creditMix} 
                    onChange={(checked) => setSimulatorState(prev => ({ ...prev, creditMix: checked }))} 
                  />
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/30 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">No Hard Inquiries</p>
                    <p className="text-[11px] text-slate-400">No recent hard inquiries or applications</p>
                  </div>
                  <Toggle 
                    checked={simulatorState.noNewInquiries} 
                    onChange={(checked) => setSimulatorState(prev => ({ ...prev, noNewInquiries: checked }))} 
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Core breakdown education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/20 border-white/5">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> High Impact Factors
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li>
                  <strong className="text-white">Payment History (35%):</strong> Setting up EMI reminders is the easiest way to safeguard this. Just one 30-day delinquency can drop your score by 100 points.
                </li>
                <li>
                  <strong className="text-white">Credit Utilization (30%):</strong> Keep balances below 30% of individual and cumulative credit limits. Below 10% is optimal for an Excellent score.
                </li>
              </ul>
            </Card>
            <Card className="bg-slate-900/20 border-white/5">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-blue-400" /> Moderate Impact Factors
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li>
                  <strong className="text-white">Credit History Length (15%):</strong> The age of your oldest account, newest account, and average age of all accounts. Avoid closing old, unused accounts.
                </li>
                <li>
                  <strong className="text-white">Credit Mix & New Credit (20%):</strong> Having both installment loans and credit cards shows responsible handling of different debt structures.
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Action checklist side panel */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Credit Growth Plan
            </h2>
            <p className="text-xs text-slate-400 mb-6">Complete these best practices to clean up your credit history.</p>
            
            <div className="space-y-4">
              {checklist.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`flex gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    item.checked 
                      ? 'bg-emerald-500/5 border-emerald-500/10 opacity-70' 
                      : 'bg-slate-950/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="mt-0.5">
                    {item.checked ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 bg-transparent" />
                    )}
                  </div>
                  <span className={`text-xs ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/15">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Pro Financial Rule
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Paying off high-interest debt first not only saves money, but automatically reduces your credit card utilization ratio, boosting your credit score faster than other strategies!
            </p>
          </div>
        </Card>

      </div>
    </PageWrapper>
  );
}
