import PageWrapper from "../components/layout/PageWrapper";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Mail,
  Github,
  MapPin,
  Send,
  Linkedin,
  Check,
  Terminal,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

function GlitchText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    if (hovering) {
      iterationRef.current = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (i < iterationRef.current) return text[i];
              if (char === " ") return " ";
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );
        if (iterationRef.current >= text.length) clearInterval(intervalRef.current);
        iterationRef.current += 0.5;
      }, 30);
    } else {
      clearInterval(intervalRef.current);
      // We wrap this in a check to avoid unnecessary state updates if already matches
      setDisplay((prev) => (prev === text ? prev : text));
    }
    return () => clearInterval(intervalRef.current);
  }, [hovering, text]);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: "default", letterSpacing: "0.03em" }}
    >
      {display}
    </span>
  );
}

function TerminalAvatar() {
  const lines = [
    { text: "$ whoami", delay: 0.3 },
    { text: "> vedant_trivedi", delay: 0.7, accent: true },
    { text: "$ role", delay: 1.1 },
    { text: "> fullstack_dev", delay: 1.5, accent: true },
    { text: "$ status", delay: 1.9 },
    { text: "> open_to_work ✓", delay: 2.3, green: true },
  ];

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 blur-2xl" />

      <div
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(10,12,28,0.98) 0%, rgba(16,22,45,0.95) 100%)",
          boxShadow: "0 0 60px rgba(37,99,235,0.15), 0 0 120px rgba(16,185,129,0.05)",
        }}
      >
        {/* Terminal bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <Terminal className="w-3.5 h-3.5 text-slate-500 ml-2" />
          <span className="text-[11px] text-slate-500 font-mono">vedant@portfolio ~ bash</span>
        </div>

        {/* Terminal content */}
        <div className="px-6 py-6 font-mono text-sm space-y-1.5 min-h-[160px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
              className={
                line.green
                  ? "text-emerald-400"
                  : line.accent
                    ? "text-blue-300 font-semibold"
                    : "text-slate-400"
              }
            >
              {line.text}
            </motion.div>
          ))}

          {/* blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-blue-400 mt-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "vedanttrivedi87@gmail.com",
    href: "mailto:vedanttrivedi87@gmail.com",
    color: "blue",
    glow: "rgba(59,130,246,0.3)",
    bg: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@vedant08-blip",
    href: "https://github.com/vedant08-blip",
    color: "emerald",
    glow: "rgba(16,185,129,0.3)",
    bg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "#",
    color: "indigo",
    glow: "rgba(99,102,241,0.3)",
    bg: "bg-indigo-500/10",
    hoverBg: "hover:bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ahmedabad, Gujarat · India",
    href: null,
    color: "amber",
    glow: null,
    bg: "bg-amber-500/10",
    hoverBg: "",
    iconColor: "text-amber-400",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PageWrapper isProtected={false}>
      <div
        className="max-w-7xl mx-auto px-6 py-20 relative"
        onMouseMove={handleMouseMove}
      >
        {/* Ambient background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600 blur-[180px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500 blur-[180px]"
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <p className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">
                Connect With Me
              </p>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-none">
              Let's Build{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 40%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <GlitchText text="Something" />
              </span>
              <br />
              <span className="text-white/90">
                <GlitchText text="Amazing" />
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Collaboration, projects, ideas, or just a hello — I'm always open
              to new opportunities.
            </p>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 relative z-10">

          {/* LEFT — Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Terminal identity block */}
            <TerminalAvatar />

            {/* Identity label */}
            <div
              className="rounded-2xl p-6 border border-white/5 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xl tracking-tight">Vedant Trivedi</p>
                  <p className="text-emerald-400 text-sm font-semibold mt-0.5">Full Stack Developer</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-bold">Available</span>
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div
              className="rounded-2xl p-6 border border-white/5 space-y-2"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(16px)",
              }}
            >
              {contactLinks.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    whileHover={item.href ? { x: 4 } : {}}
                    className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 border border-transparent
                      ${item.href ? `hover:border-white/8 hover:bg-white/3 cursor-pointer` : ""}`}
                    style={{ position: "relative" }}
                  >
                    {item.href && item.glow && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 30px ${item.glow}10` }}
                      />
                    )}
                    <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`${item.iconColor} w-4.5 h-4.5`} size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-medium text-slate-300 text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a key={i} href={item.href} target={item.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="block no-underline">
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,12,28,0.95) 0%, rgba(16,22,45,0.9) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 80px rgba(37,99,235,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
              }}
            />

            <div className="relative p-10">
              <div className="mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "2.5rem" }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"
                />
                <h3 className="text-2xl font-bold text-white tracking-tight">Send a Message</h3>
                <p className="text-slate-500 text-sm mt-1">I usually reply within 24 hours.</p>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-sm font-semibold text-emerald-300">
                        Message sent! I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {[
                  { type: "text", placeholder: "Your Name", id: "name" },
                  { type: "email", placeholder: "your@email.com", id: "email" },
                  { type: "text", placeholder: "Subject", id: "subject" },
                ].map((field, i) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="relative"
                  >
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-xl px-5 py-4 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 font-medium"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: focused === field.id
                          ? "1px solid rgba(59,130,246,0.5)"
                          : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: focused === field.id
                          ? "0 0 20px rgba(59,130,246,0.1), inset 0 0 20px rgba(59,130,246,0.03)"
                          : "none",
                      }}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="relative"
                >
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    onFocus={() => setFocused("msg")}
                    onBlur={() => setFocused(null)}
                    className="w-full rounded-xl px-5 py-4 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 font-medium resize-none"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: focused === "msg"
                        ? "1px solid rgba(59,130,246,0.5)"
                        : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: focused === "msg"
                        ? "0 0 20px rgba(59,130,246,0.1), inset 0 0 20px rgba(59,130,246,0.03)"
                        : "none",
                    }}
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2.5 group relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8, #4f46e5)",
                    boxShadow: "0 0 30px rgba(37,99,235,0.4), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Send Message</span>
                  <Send
                    size={16}
                    className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}