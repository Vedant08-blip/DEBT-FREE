import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Wraps page content with appropriate layout based on authentication
 * @param {boolean} isProtected - determines if Sidebar or Navbar+Footer should be shown
 */
export default function PageWrapper({ children, isProtected = false }) {
  if (isProtected) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden relative">
        {/* Ambient Dashboard Background Glows */}
        <div className="absolute top-0 inset-x-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3"></div>
        
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 md:ml-64 relative z-10">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Public wrapper
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1 mt-16 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
