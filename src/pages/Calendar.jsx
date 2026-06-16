import PageWrapper from '../components/layout/PageWrapper';

export default function Calendar() {
  return (
    <PageWrapper isProtected={true}>
      <h1 className="text-3xl font-bold text-white mb-2">Payoff Calendar</h1>
      <p className="text-slate-400">Manage your payment dates and check off monthly EMIs.</p>
    </PageWrapper>
  );
}
