import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import portfolio from "../portfolio.json";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const avatarGradients = [
  "from-purple-500 to-pink-500",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-violet-500 to-indigo-500",
];

const TestimonialCard = ({ t, colorIdx = 0 }) => (
  <motion.div
    className="min-w-[300px] max-w-[320px] mx-2 rounded-2xl bg-white dark:bg-zinc-800/90 shadow-md border border-black/[0.05] dark:border-white/[0.08] p-6 flex flex-col gap-3 relative overflow-hidden cursor-default"
    whileHover={{
      scale: 1.04,
      boxShadow: "0 0 24px 4px rgba(168,85,247,0.28), 0 0 0 1px rgba(168,85,247,0.15)",
    }}
    transition={{ duration: 0.2 }}
  >
    {/* Decorative large quote mark */}
    <FaQuoteLeft className="absolute -top-1 right-5 text-purple-100 dark:text-purple-900/50 text-5xl pointer-events-none" />

    {/* Stars */}
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={12} />
      ))}
    </div>

    {/* Text */}
    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic relative z-10 flex-1">
      "{t.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.07] mt-auto">
      <div
        className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradients[colorIdx % avatarGradients.length]} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}
      >
        {t.author[0].toUpperCase()}
      </div>
      <div>
        <div className="flex items-center gap-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {t.author}
          <FaCheckCircle size={12} className="text-blue-500 shrink-0" />
        </div>
        <div className="text-[11px] text-zinc-400">Verified Client</div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [shuffled, setShuffled] = useState([]);
  const controlsRow1 = useAnimation();
  const controlsRow2 = useAnimation();

  useEffect(() => {
    setShuffled(shuffle(portfolio.testimonials));

    controlsRow1.start({
      x: ["0%", "-50%"],
      transition: { repeat: Infinity, duration: 28, ease: "linear" },
    });
    controlsRow2.start({
      x: ["-50%", "0%"],
      transition: { repeat: Infinity, duration: 34, ease: "linear" },
    });
  }, []);

  const pause = (ctrl) => ctrl.stop();
  const resume = (ctrl, dir) =>
    ctrl.start({
      x: dir === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: { repeat: Infinity, duration: dir === "left" ? 28 : 34, ease: "linear" },
    });

  const doubled = [...portfolio.testimonials, ...portfolio.testimonials];
  const doubledShuffled = shuffled.length ? [...shuffled, ...shuffled] : doubled;

  return (
    <>
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          Client{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Testimonials
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          What clients say about working with me
        </motion.p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div
        className="relative flex overflow-hidden"
        onMouseEnter={() => pause(controlsRow1)}
        onMouseLeave={() => resume(controlsRow1, "left")}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div className="flex" animate={controlsRow1}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} colorIdx={i} />
          ))}
        </motion.div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div
        className="relative flex overflow-hidden mt-6"
        onMouseEnter={() => pause(controlsRow2)}
        onMouseLeave={() => resume(controlsRow2, "right")}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div className="flex" animate={controlsRow2}>
          {doubledShuffled.map((t, i) => (
            <TestimonialCard key={i} t={t} colorIdx={i + 2} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Testimonials;
