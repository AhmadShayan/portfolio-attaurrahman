import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AboutInteractiveCard from "../About/About";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Skills from "../Skills";
import Projects from "../Projects";
import portfolio from "../portfolio.json";
import Testimonials from "../Testimonials";
import Education from "../Education";
import Contact from "../Contact";
import Experience from "../Experience";

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
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ---------- Helpers ----------
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-20 py-20 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

const Button = ({ href, children, onClick, variant = "solid", className = "" }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[.97]";
  const styles = {
    solid:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]",
    outline:
      "border border-zinc-300 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30",
  };
  const C = href ? "a" : "button";
  return (
    <C href={href} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </C>
  );
};

const floatingShapeColors = ["#a855f7", "#ec4899", "#6366f1", "#f59e0b", "#10b981", "#06b6d4"];

const socialIconMap = {
  GitHub: <FaGithub size={17} />,
  LinkedIn: <FaLinkedin size={17} />,
  X: <FaTwitter size={17} />,
  Email: <MdEmail size={17} />,
};

const socialColorMap = {
  GitHub: "hover:bg-zinc-800 hover:text-white hover:border-zinc-700",
  LinkedIn: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  X: "hover:bg-sky-500 hover:text-white hover:border-sky-500",
  Email: "hover:bg-red-500 hover:text-white hover:border-red-500",
};

// ---------- Main Component ----------
export default function PortfolioPage() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const typedRole = useTyping(ROLES);

  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        width: 60 + Math.random() * 140,
        height: 60 + Math.random() * 140,
        color: floatingShapeColors[i % floatingShapeColors.length],
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: i * 2,
      })),
    []
  );

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
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
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-[3px] z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-black/5 dark:border-white/5">
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <a href="#home" className="font-bold text-lg tracking-tight shrink-0">
              Atta{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                {portfolio.name}
              </span>
            </a>

            {/* Desktop Nav Links */}
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
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-purple-100 dark:bg-purple-950/50 -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Dark Mode Toggle */}
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-base hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {dark ? "☀️" : "🌙"}
              </button>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-base leading-none"
                  >
                    {open ? "✕" : "☰"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
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

      {/* ── Hero ── */}
      <section
        id="home"
        className="scroll-mt-20 relative min-h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Gradient mesh blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {floatingShapes.map((shape, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.06] dark:opacity-[0.1] animate-float"
              style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                backgroundColor: shape.color,
                top: `${shape.top}%`,
                left: `${shape.left}%`,
                animationDelay: `${shape.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <Container className="relative z-10 flex flex-col items-center text-center py-28">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800/60 bg-green-50 dark:bg-green-950/40 px-4 py-1.5 text-sm font-medium text-green-700 dark:text-green-400"
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
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="text-zinc-900 dark:text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Atta {portfolio.name}
            </span>
          </motion.h1>

          {/* Waving hand */}
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -20, 0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
            className="text-5xl mt-3 inline-block select-none"
            style={{ transformOrigin: "bottom center" }}
          >
            👋
          </motion.span>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 h-9 flex items-center justify-center gap-1 text-xl sm:text-2xl font-semibold text-zinc-500 dark:text-zinc-400"
          >
            <span>{typedRole}</span>
            <span className="inline-block w-[2px] h-6 bg-purple-500 rounded-full cursor-blink" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            {portfolio.summary} {portfolio.summary1}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              variant="solid"
            >
              View My Work →
            </Button>
            <Button
              onClick={() => window.open("/MRATTAURRAHMAN.pdf", "_blank")}
              variant="outline"
            >
              📄 Download CV
            </Button>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full max-w-2xl"
          >
            {[
              { value: 10, suffix: "+", label: "Projects Built" },
              { value: 13, suffix: "+", label: "Technologies" },
              { value: 2,  suffix: "+", label: "Years Exp." },
              { value: 5,  suffix: "★", label: "Client Reviews" },
            ].map(({ value, suffix, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm"
              >
                <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                  <AnimatedCounter to={value} suffix={suffix} />
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-16 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center hover:scale-110 transition-transform text-lg font-bold"
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── About ── */}
      <Section id="about" className="bg-white/80 dark:bg-zinc-900/80">
        <Container>
          <AboutInteractiveCard />
        </Container>
      </Section>

      {/* ── Skills ── */}
      <Skills />

      {/* ── Projects ── */}
      <Section id="projects" className="bg-white dark:bg-zinc-900/60">
        <Container>
          <Projects />
        </Container>
      </Section>

      {/* ── Experience ── */}
      <Experience />

      {/* ── Testimonials ── */}
      <Section id="testimonials" className="bg-zinc-50 dark:bg-zinc-950/50">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      {/* ── Education ── */}
      <Education />

      {/* ── Contact ── */}
      <Section id="contact" className="bg-white dark:bg-zinc-900/60">
        <Container>
          <Contact />
        </Container>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/5 dark:border-white/5 py-10 bg-white/50 dark:bg-zinc-950/50">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              © {year}{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Atta {portfolio.name}
              </span>
              . Crafted with ❤️ & React
            </p>
            <div className="flex flex-wrap gap-5">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
