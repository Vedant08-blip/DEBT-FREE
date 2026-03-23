import { Toaster as HotToaster } from 'react-hot-toast';

export default function ToastContainer() {
  return (
    <HotToaster 
      position="top-right" 
      toastOptions={{
        className: 'text-sm font-medium !bg-card !text-text-primary !border !border-border !shadow-card rounded-lg',
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
      }} 
    />
  );
}
