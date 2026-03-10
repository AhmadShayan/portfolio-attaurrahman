import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiMui, SiFramer } from "react-icons/si";
import { HiX, HiArrowRight, HiCode, HiLightBulb } from "react-icons/hi";
import Profile from "../../../public/profile.png";

const techStack = [
  { icon: <SiJavascript className="text-yellow-500" />, name: "JS" },
  { icon: <FaReact className="text-sky-500" />, name: "React" },
  { icon: <SiNextdotjs className="text-zinc-800 dark:text-white" />, name: "Next.js" },
  { icon: <SiFramer className="text-pink-500" />, name: "Framer" },
  { icon: <SiMui className="text-blue-500" />, name: "MUI" },
  { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
  { icon: <FaCss3Alt className="text-blue-600" />, name: "CSS3" },
  { icon: <SiTailwindcss className="text-cyan-500" />, name: "Tailwind" },
  { icon: <FaBootstrap className="text-purple-600" />, name: "Bootstrap" },
  { icon: <FaGithub className="text-zinc-800 dark:text-white" />, name: "GitHub" },
];

const traits = [
  {
    icon: <HiCode size={22} className="text-purple-500" />,
    title: "Adaptable",
    desc: "Quick to learn new technologies",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <HiLightBulb size={22} className="text-yellow-500" />,
    title: "Curious",
    desc: "Always exploring new concepts",
    gradient: "from-sky-500 to-violet-500",
  },
];

function AboutInteractiveCard() {
  const [revealed, setRevealed] = useState(false);
  const boundsRef = useRef(null);

  return (
    <div className="grid gap-10 md:grid-cols-2 items-center">
      {/* ── Section Title ── */}
      <div className="md:col-span-2 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          About{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Me
          </span>
        </motion.h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>

      {/* ── Left: bio + trait cards ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="max-w-xl"
      >
        <p className="text-base sm:text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          I'm a React.js developer with a solid grip on JavaScript, React.js, and exploring
          Next.js to take my projects to the next level. Over time, I've grown from writing
          simple programs to building clean, responsive, and user-friendly web applications.
        </p>
        <p className="mt-5 text-base sm:text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          What excites me most is solving real problems through code — whether it's crafting
          interactive UIs, optimizing performance, or exploring new technologies. I focus on
          writing code that's not only functional but also easy to read and maintain.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {traits.map(({ icon, title, desc, gradient }) => (
            <div
              key={title}
              className="flex flex-col gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200 group"
            >
              {icon}
              <div className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {title}
              </div>
              <div className="text-sm text-zinc-500">{desc}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Right: interactive photo card ── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="flex justify-center"
      >
        <div ref={boundsRef} className="relative">
          <AnimatePresence initial={false} mode="wait">
            {!revealed ? (
              /* Photo state */
              <motion.div
                key="photo"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-2.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur ring-1 ring-purple-300/40 shadow-2xl relative"
              >
                <img
                  src={Profile}
                  alt="Atta Ur Rahman"
                  className="w-full max-w-xs sm:max-w-sm h-[380px] rounded-xl object-cover"
                />

                {/* Drag handle — floats above photo */}
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.button
                    title="Drag to reveal info"
                    className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-semibold px-4 py-2 rounded-full shadow-xl border border-purple-200 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-grab active:cursor-grabbing select-none"
                    drag
                    dragConstraints={boundsRef}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      if (Math.hypot(info.offset.x, info.offset.y) > 28) setRevealed(true);
                    }}
                  >
                    Drag to reveal <HiArrowRight size={12} />
                  </motion.button>
                </motion.div>

                {/* Decorative orbs */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-2xl pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-2xl pointer-events-none" />
              </motion.div>
            ) : (
              /* Revealed info card */
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-2xl bg-white dark:bg-zinc-900 ring-1 ring-purple-300/40 shadow-2xl p-5 w-[min(340px,90vw)]"
              >
                {/* Close button */}
                <button
                  onClick={() => setRevealed(false)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 transition-colors"
                  aria-label="Close"
                >
                  <HiX size={13} />
                </button>

                {/* Profile row */}
                <div className="flex gap-4 items-start">
                  <img
                    src={Profile}
                    alt="Atta Ur Rahman"
                    className="w-20 h-24 rounded-xl object-cover shrink-0 ring-2 ring-purple-200 dark:ring-purple-800"
                  />
                  <div className="pt-1">
                    <div className="text-base font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-snug">
                      Atta Ur Rahman
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Frontend Developer
                    </div>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Open to opportunities
                    </div>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-4">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((s) => (
                      <span
                        key={s.name}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
                      >
                        <span className="text-base leading-none">{s.icon}</span>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 italic border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  "Crafting modern, responsive web apps with React & Next.js"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutInteractiveCard;
