import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import portfolio from "../portfolio.json";

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Experience = () => {
  return (
    <Section id="experience" className="bg-zinc-50/80 dark:bg-zinc-950/60">
      <Container>
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Work{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-sm"
          >
            My professional journey so far
          </motion.p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-400 opacity-20" />

          <div className="flex flex-col gap-12">
            {portfolio.experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
                  className={`relative flex flex-col ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-6 md:gap-0 items-start md:items-center`}
                >
                  {/* Card — 50% width on desktop */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="group card-top-accent gradient-border rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                      {/* Role + period row */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          {exp.role}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full shrink-0">
                          <FaCalendarAlt size={9} />
                          {exp.period}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 mb-5">
                        <FaMapMarkerAlt size={12} className="text-pink-500 shrink-0" />
                        {exp.company}
                      </p>

                      {/* Bullets */}
                      <ul className="space-y-2.5">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            <FaCheckCircle size={12} className="mt-1 text-purple-400 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg shadow-purple-500/40 dot-pulse items-center justify-center shrink-0">
                    <FaBriefcase className="text-white" size={15} />
                  </div>

                  {/* Mobile leading dot */}
                  <div className="md:hidden flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md flex items-center justify-center shrink-0">
                      <FaBriefcase className="text-white" size={12} />
                    </div>
                    <span className="text-xs text-zinc-400">{exp.period}</span>
                  </div>

                  {/* Spacer on the opposite side */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Experience;
