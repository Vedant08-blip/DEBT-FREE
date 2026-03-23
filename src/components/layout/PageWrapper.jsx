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
      <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
        <style>{`
          .hex-grid-dash {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 4 L56 19 L56 49 L30 64 L4 49 L4 19 Z' fill='none' stroke='rgba(37,99,235,0.04)' stroke-width='1'/%3E%3Cpath d='M30 68 L56 83 L56 113 L30 128 L4 113 L4 83 Z' fill='none' stroke='rgba(37,99,235,0.04)' stroke-width='1'/%3E%3C/svg%3E");
          }
        `}</style>
        
        {/* Ambient Dark Dashboard Background Glows */}
        <div className="absolute inset-x-0 top-[-20%] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-[-20%] h-[700px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Subtle Hex Grid and Noise */}
        <div className="absolute inset-0 hex-grid-dash pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-blue-500/5 pointer-events-none" style={{ animation: 'spin 40s linear infinite' }} />

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
