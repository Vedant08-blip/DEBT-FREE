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
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar  />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 md:ml-64">
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
