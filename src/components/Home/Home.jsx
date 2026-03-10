import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// ---------- Helpers ----------
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function useDarkMode() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [enabled]);
  return [enabled, setEnabled];
}

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-16 ${className}`}>
    {" "}
    {children}{" "}
  </section>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Button = ({ href, children, onClick, variant = "solid" }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[.98]";
  const styles = {
    solid: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
    outline:
      "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5",
  };
  const C = href ? "a" : "button";
  return (
    <C href={href} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </C>
  );
};

const floatingShapeColors = [
  "#ff7f50",
  "#87cefa",
  "#32cd32",
  "#ff69b4",
  "#ffd700",
];

// ---------- Main Component ----------
export default function PortfolioPage() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const year = useMemo(() => new Date().getFullYear(), []);
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        width: 40 + Math.random() * 100,
        height: 40 + Math.random() * 100,
        color: floatingShapeColors[i % floatingShapeColors.length],
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    []
  );
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-950/70 border-b border-black/5 dark:border-white/5">
        <Container>
          <nav className="flex h-16 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight">
              
              Atta <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-purple-500 bg-clip-text text-transparent">
              {portfolio.name}
            </span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm hover:opacity-70"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-1 text-sm"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </div>
            <button
              className="md:hidden rounded-xl border border-black/10 dark:border-white/10 px-3 py-1 text-sm"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </nav>

          {/* Mobile menu */}
          {open && (
            <div id="mobile-menu" className="md:hidden pb-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-sm"
                  >
                    {item.label}
                  </a>
                ))}
                {/* <button
                  aria-label="Toggle dark mode"
                  onClick={() => setDark((d) => !d)}
                  className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-1 text-sm w-fit"
                >
                  {dark ? "Light" : "Dark"}
                </button> */}
              </div>
            </div>
          )}
        </Container>
      </header>

      {/* Hero */}
      <Section
        id="home"
        className="h-screen relative overflow-hidden flex items-center justify-center"
      >
        {/* Floating Shapes Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-float"
              style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                backgroundColor: shape.color,
                top: `${shape.top}%`,
                left: `${shape.left}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <Container className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl">
          <div className="flex flex-wrap justify-center space-x-4 "></div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl text-center font-extrabold tracking-tight"
          >
            <span className="text-zinc-900 dark:text-zinc-100 text-center">
              Hi, I'm
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-purple-500 bg-clip-text text-transparent">
              Atta {portfolio.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -25, 0, -25, -5] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="flex text-7xl mt-2 inline-block text-center items-center justify-center"
            style={{ transformOrigin: "bottom center" }}
          >
            👋
          </motion.div>

          {/* <p className="mt-2 text-lg text-zinc-600 text-center dark:text-zinc-300">
            {portfolio.role} • {portfolio.location}
          </p> */}

          <p className="mt-4 text-2xl text-zinc-700 dark:text-zinc-300 text-center w-[100%]">
            {portfolio.summary}
          </p>
          <p className="mt-1 text-2xl text-zinc-700 dark:text-zinc-300 text-center w-[100%]">
            {portfolio.summary1}
          </p>
          <div className="flex flex-wrap justify-center space-x-4 mt-6">
            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 rounded-lg p-[2px]">
              <Button
                onClick={() => {
                  const section = document.getElementById("projects");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                variant="outline"
                className="text-2xl px-6 py-3 text-lg bg-transparent color-white hover:bg-transparent w-full"
              >
                View My Work
              </Button>
            </div>
            <Button
              onClick={() =>
                window.open("/MRATTAURRAHMAN.pdf", "_blank")
              }
              variant="outline"
              className="px-6 py-3 text-lg"
            >
              View Resume
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-9 mt-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                10+
              </span>
              <span className="text-2xl text-gray-500">Projects</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                10+
              </span>
              <span className="text-2xl text-gray-500">Technologies</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                2+
              </span>
              <span className="text-2xl text-gray-500">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                ∞
              </span>
              <span className="text-2xl text-gray-500">Curiosity</span>
            </div>
          </div>
        </Container>
      </Section>

      <div className="hidden md:fixed md:top-1/2 md:right-4 md:-translate-y-1/2 border border-gray-300 p-[5px] rounded-md bg-white dark:bg-zinc-900 z-50 md:flex md:flex-col md:gap-3">
        {portfolio.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            {s.label === "GitHub" && (
              <FaGithub size={20} className="text-gray-800 dark:text-white" />
            )}
            {s.label === "LinkedIn" && (
              <FaLinkedin size={20} className="text-blue-600" />
            )}
            {s.label === "X" && (
              <FaTwitter size={20} className="text-sky-500" />
            )}
            {s.label === "Email" && (
              <MdEmail size={20} className="text-red-500" />
            )}
          </a>
        ))}
      </div>

      <Section id="about" className="bg-white/80 dark:bg-zinc-900">
        <Container>
          {" "}
          {/* About */}
          <AboutInteractiveCard />
        </Container>
      </Section>
      {/* <Section id="testimonials" className="bg-white dark:bg-zinc-900/60">
        <Container> */}
      <Skills />
      {/* </Container>
      </Section> */}

      {/* Projects */}

      <Section id="projects" className="bg-white dark:bg-zinc-900/60">
        <Container>
          <Projects />
        </Container>
      </Section>
      {/* Experience */}
      <Experience />
      <Section id="testimonials" className="bg-white dark:bg-zinc-900/60">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      {/* <Section id="education" className="bg-white/90 dark:bg-zinc-900">
        <Container> */}
      <Education />
      {/* </Container>
      </Section> */}

      {/* Contact */}
      <Section id="contact" className="bg-white dark:bg-zinc-900/60">
        <Container>
          <Contact />
        </Container>
      </Section>
      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/5 py-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm opacity-70">
              © {year} Atta {portfolio.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-3">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm hover:opacity-70"
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

// ---------- Tailwind setup notes ----------
// 1) Install Tailwind in Vite: https://tailwindcss.com/docs/guides/vite
// 2) Add to index.html: <html class="scroll-smooth">
// 3) Enable dark mode via class in tailwind.config.js: darkMode: "class"
// 4) Deploy to Vercel (optional): push to GitHub, then "New Project" → Import
