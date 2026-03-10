import React from 'react'
import { motion } from "framer-motion";
import portfolio from "../portfolio.json";

// ----
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

const Experience = () => {
  return (
<>
      <Section id="experience">
        <Container>
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-1">
            My professional journey so far
          </p>

          <ol className="mt-10 space-y-8 relative border-l border-gray-300 dark:border-zinc-700">
            {portfolio.experience.map((exp, index) => (
              <li key={exp.company} className="relative pl-8">
                {/* Timeline dot */}
                <span className="absolute left-[-6px] top-2 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md" />

                <Card className="p-6 transition hover:shadow-lg hover:scale-[1.02] duration-300">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {exp.role}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    {exp.company}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-3 list-disc pl-5 text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

</>
  )
}

export default Experience
