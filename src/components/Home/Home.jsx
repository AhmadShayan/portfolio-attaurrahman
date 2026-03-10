import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AboutInteractiveCard from "../About/About";
import { FaLinkedin, FaTwitter, FaGithub, FaHeart, FaArrowUp, FaReact } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiArrowRight, HiDownload, HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import Skills from "../Skills";
import Projects from "../Projects";
import portfolio from "../portfolio.json";
import Testimonials from "../Testimonials";
import Education from "../Education";
import Contact from "../Contact";
import Experience from "../Experience";
import Profile from "../../../public/profile.png";

// ---------- Hooks ----------
function useDarkMode() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [enabled]);
  return [enabled, setEnabled];
}

const ROLES = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "Next.js Developer",
];

function useTyping(words, typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

function AnimatedCounter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const startTime = performance.now();
    const duration = 1200;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span
      ref={ref}
      className="count-glow font-black bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent"
    >
      {count}{suffix}
    </span>
  );
}

// ---------- Config ----------
const navItems = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-20 py-20 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const socialIconMap = {
  GitHub:   <FaGithub size={16} />,
  LinkedIn: <FaLinkedin size={16} />,
  X:        <FaTwitter size={16} />,
  Email:    <MdEmail size={16} />,
};

const socialColorMap = {
  GitHub:   "hover:bg-zinc-800 hover:text-white hover:border-zinc-700",
  LinkedIn: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  X:        "hover:bg-sky-500 hover:text-white hover:border-sky-500",
  Email:    "hover:bg-red-500 hover:text-white hover:border-red-500",
};

const floatingBadges = [
  { icon: <FaReact className="text-sky-500" />,         label: "React.js",  pos: "top-10 -right-6",   delay: 0   },
  { icon: <SiNextdotjs className="dark:text-white" />,  label: "Next.js",   pos: "bottom-14 -left-8", delay: 0.6 },
  { icon: <SiTailwindcss className="text-cyan-500" />,  label: "Tailwind",  pos: "top-1/2 -left-10",  delay: 1.2 },
];

// ---------- Main ----------
export default function PortfolioPage() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const typedRole = useTyping(ROLES);

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">

      {/* ── Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-zinc-200/60 dark:bg-zinc-800/60">
        <motion.div className="h-full shimmer-line" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-[3px] z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-black/5 dark:border-white/5">
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <a href="#home" className="font-extrabold text-lg tracking-tight shrink-0 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-black">A</span>
              <span>Atta <span className="gradient-text-anim">{portfolio.name}</span></span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-purple-100 dark:bg-purple-950/50 -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Dark mode toggle — proper icons */}
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-zinc-600 dark:text-zinc-400"
              >
                {dark ? <HiSun size={17} /> : <HiMoon size={17} />}
              </button>

              {/* Mobile hamburger — proper icon */}
              <button
                className="md:hidden w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-zinc-600 dark:text-zinc-400"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {open ? <HiX size={18} /> : <HiMenu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-1 pb-4 pt-1">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </header>

      {/* ══════════════════════════════════════
          HERO — split layout (text | photo)
      ══════════════════════════════════════ */}
      <section
        id="home"
        className="scroll-mt-20 relative overflow-hidden flex items-center min-h-[calc(100vh-4rem)] bg-dot-grid noise-hero"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-400/15 dark:bg-purple-600/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-pink-400/15 dark:bg-pink-600/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/8 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* ── Left: text content ── */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800/60 bg-green-50 dark:bg-green-950/40 px-4 py-1.5 text-sm font-medium text-green-700 dark:text-green-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for opportunities
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
              >
                <span className="text-zinc-900 dark:text-white block">Hi, I'm</span>
                <span className="gradient-text-anim">Atta {portfolio.name}</span>
              </motion.h1>

              {/* Typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 h-9 flex items-center justify-center lg:justify-start gap-1 text-xl sm:text-2xl font-semibold text-zinc-500 dark:text-zinc-400"
              >
                <span>{typedRole}</span>
                <span className="inline-block w-[2px] h-6 bg-purple-500 rounded-full cursor-blink" />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 max-w-lg text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                {portfolio.summary} {portfolio.summary1}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3"
              >
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-glow inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-200 active:scale-[.97]"
                >
                  View My Work <HiArrowRight size={15} />
                </button>
                <button
                  onClick={() => window.open("/MRATTAURRAHMAN.pdf", "_blank")}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold border border-zinc-300 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-200 active:scale-[.97]"
                >
                  <HiDownload size={15} /> Download CV
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="mt-10 grid grid-cols-4 gap-4 w-full max-w-sm lg:max-w-none"
              >
                {[
                  { value: 10, suffix: "+", label: "Projects" },
                  { value: 13, suffix: "+", label: "Technologies" },
                  { value: 2,  suffix: "+", label: "Years Exp." },
                  { value: 5,  suffix: "★", label: "Reviews" },
                ].map(({ value, suffix, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl glass-card hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    <span className="text-2xl">
                      <AnimatedCounter to={value} suffix={suffix} />
                    </span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold text-center uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: profile photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="shrink-0 order-1 lg:order-2"
            >
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80">

                {/* Outer rotating dashed ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/40 dark:border-purple-500/30 animate-spin-slow" />

                {/* Inner counter-rotating ring */}
                <div className="absolute inset-4 rounded-full border border-pink-400/30 dark:border-pink-500/20 animate-spin-reverse" />

                {/* Glow ring */}
                <div className="absolute inset-7 rounded-full ring-4 ring-purple-500/15 dark:ring-purple-400/10 shadow-2xl shadow-purple-500/25" />

                {/* Photo */}
                <div className="absolute inset-7 rounded-full overflow-hidden">
                  <img
                    src={Profile}
                    alt="Atta Ur Rahman"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Floating skill badges */}
                {floatingBadges.map(({ icon, label, pos, delay }) => (
                  <motion.div
                    key={label}
                    className={`absolute ${pos} glass-card rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl z-10`}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                      {label}
                    </span>
                  </motion.div>
                ))}

                {/* Experience badge */}
                <motion.div
                  className="absolute -bottom-2 right-4 glass-card rounded-xl px-3 py-2 shadow-xl z-10 flex items-center gap-2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-base">💼</span>
                  <div>
                    <div className="text-[10px] font-black text-zinc-800 dark:text-zinc-200">2+ Years</div>
                    <div className="text-[9px] text-zinc-500 dark:text-zinc-400 -mt-0.5">Experience</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Social Sidebar ── */}
      <div className="hidden md:flex fixed top-1/2 right-4 -translate-y-1/2 z-40 flex-col gap-2">
        {portfolio.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            className={`w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-all duration-200 hover:scale-110 hover:-translate-x-0.5 ${socialColorMap[s.label] ?? ""}`}
          >
            {socialIconMap[s.label]}
          </a>
        ))}
      </div>

      {/* ── Back to Top ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Back to top"
          >
            <FaArrowUp size={13} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── About ── */}
      <Section id="about" className="bg-white/80 dark:bg-zinc-900/80">
        <Container><AboutInteractiveCard /></Container>
      </Section>

      {/* ── Skills ── */}
      <Skills />

      {/* ── Projects ── */}
      <Section id="projects" className="bg-white dark:bg-zinc-900/60">
        <Container><Projects /></Container>
      </Section>

      {/* ── Experience ── */}
      <Experience />

      {/* ── Testimonials ── */}
      <Section id="testimonials" className="bg-zinc-50 dark:bg-zinc-950/50">
        <Container><Testimonials /></Container>
      </Section>

      {/* ── Education ── */}
      <Education />

      {/* ── Contact ── */}
      <Section id="contact" className="bg-white dark:bg-zinc-900/60">
        <Container><Contact /></Container>
      </Section>

      {/* ── Pre-footer CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 py-24">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Open to new opportunities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl"
          >
            Ready to build something{" "}
            <span className="underline decoration-white/40 decoration-wavy underline-offset-4">
              amazing?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-white/75 text-lg max-w-md"
          >
            I'm available for freelance, full-time roles, or open-source
            collaboration. Let's connect and make something great.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 bg-white text-purple-700 font-black rounded-xl hover:scale-[1.03] transition-all shadow-xl shadow-black/20"
            >
              Get In Touch <HiArrowRight size={16} />
            </a>
            <a
              href="/MRATTAURRAHMAN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/25 font-bold rounded-xl hover:bg-white/20 transition-colors"
            >
              <HiDownload size={16} /> Download CV
            </a>
          </motion.div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/5 dark:border-white/5 py-10 bg-white/50 dark:bg-zinc-950/50">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="font-black text-base tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-[10px] font-black">A</span>
                Atta <span className="gradient-text-anim">{portfolio.name}</span>
              </span>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                Crafted with <FaHeart size={10} className="text-pink-500 animate-pulse" /> &amp; React · {year}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-xs text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-2">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-200 hover:scale-110 ${socialColorMap[s.label] ?? ""}`}
                >
                  {socialIconMap[s.label]}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
