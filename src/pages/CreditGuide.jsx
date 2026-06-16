import PageWrapper from '../components/layout/PageWrapper';

export default function CreditGuide() {
  return (
    <PageWrapper isProtected={true}>
      <h1 className="text-3xl font-bold text-white mb-2">Credit Improvement Academy</h1>
      <p className="text-slate-400">Interactive guides and score simulation to boost your credit health.</p>
    </PageWrapper>
  );
}
