import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <PageWrapper isProtected={false}>
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em] mb-4">Connect With Us</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? I'd love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 relative z-10">
          {/* Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-10 flex flex-col justify-center border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700" />
            <h2 className="text-3xl font-bold text-white mb-2">Vedant Trivedi</h2>
            <p className="text-emerald-400 font-medium tracking-wide text-sm mb-8 uppercase">Creator & Developer</p>
            
            <div className="space-y-6">
              <a href="mailto:vedanttrivedi87@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 group/link">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover/link:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium">vedanttrivedi87@gmail.com</p>
                </div>
              </a>
              
              <a href="https://github.com/vedant08-blip" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 group/link">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors">
                  <Github className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">GitHub</p>
                  <p className="font-medium">@vedant08-blip</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-slate-300 p-4 rounded-xl border border-transparent">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium">Remote / India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                className="w-full py-4 mt-2 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
