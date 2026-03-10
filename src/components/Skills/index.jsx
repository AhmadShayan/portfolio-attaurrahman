import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript, SiNextdotjs, SiFramer, SiMui,
  SiTailwindcss, SiRedux, SiTypescript, SiNodedotjs,
  SiExpress, SiMongodb, SiVercel, SiVite,
} from "react-icons/si";
import {
  FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaGithub, FaGitAlt,
} from "react-icons/fa";

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-20 py-20 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const skillCategories = [
  {
    title: "Core Languages",
    emoji: "⚡",
    gradient: "from-yellow-400 to-orange-500",
    ringColor: "ring-yellow-200 dark:ring-yellow-900/40",
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
    skills: [
      { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-500" },
      { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-500" },
      { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500" },
      { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-600" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    emoji: "🚀",
    gradient: "from-sky-400 to-blue-600",
    ringColor: "ring-sky-200 dark:ring-sky-900/40",
    bg: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20",
    skills: [
      { icon: <FaReact />, name: "React.js", color: "text-sky-500" },
      { icon: <SiNextdotjs />, name: "Next.js", color: "text-zinc-800 dark:text-white" },
      { icon: <SiRedux />, name: "Redux Toolkit", color: "text-purple-500" },
      { icon: <SiNodedotjs />, name: "Node.js", color: "text-green-600" },
      { icon: <SiExpress />, name: "Express", color: "text-zinc-600 dark:text-zinc-400" },
    ],
  },
  {
    title: "UI & Styling",
    emoji: "🎨",
    gradient: "from-pink-400 to-purple-600",
    ringColor: "ring-pink-200 dark:ring-pink-900/40",
    bg: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20",
    skills: [
      { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-cyan-500" },
      { icon: <SiMui />, name: "Material UI", color: "text-blue-500" },
      { icon: <FaBootstrap />, name: "Bootstrap", color: "text-purple-600" },
      { icon: <SiFramer />, name: "Framer Motion", color: "text-pink-500" },
    ],
  },
  {
    title: "Tools & Platforms",
    emoji: "🛠️",
    gradient: "from-violet-400 to-indigo-600",
    ringColor: "ring-violet-200 dark:ring-violet-900/40",
    bg: "bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20",
    skills: [
      { icon: <FaGithub />, name: "GitHub", color: "text-zinc-800 dark:text-white" },
      { icon: <FaGitAlt />, name: "Git", color: "text-orange-600" },
      { icon: <SiVercel />, name: "Vercel", color: "text-zinc-800 dark:text-white" },
      { icon: <SiMongodb />, name: "MongoDB", color: "text-green-600" },
      { icon: <SiVite />, name: "Vite", color: "text-purple-500" },
    ],
  },
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05 },
  }),
};

const Skills = () => (
  <Section id="skills" className="bg-zinc-50/80 dark:bg-zinc-950/60">
    <Container>
      {/* Section header */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          My{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-sm"
        >
          Tools and technologies I use to build great products
        </motion.p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>

      {/* Category cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            className={`rounded-2xl ring-1 ${cat.ringColor} ${cat.bg} p-6 relative overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${cat.gradient} shadow-sm`}
              >
                {cat.emoji}
              </span>
              <h3 className="font-bold text-sm tracking-wide text-zinc-700 dark:text-zinc-200">
                {cat.title}
              </h3>
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  custom={si}
                  variants={chipVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.07, y: -2 }}
                  className="skill-glow flex items-center gap-2 bg-white dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 shadow-sm cursor-default transition-shadow"
                >
                  <span className={`text-lg leading-none ${skill.color}`}>{skill.icon}</span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center text-sm text-zinc-400 dark:text-zinc-500 italic"
      >
        Always exploring new tools · staying current with the ecosystem 🚀
      </motion.p>
    </Container>
  </Section>
);

export default Skills;
