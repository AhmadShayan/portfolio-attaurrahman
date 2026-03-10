import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import portfolio from "../portfolio.json";
import AdminDB from "../../../public/AdminDB.png";
import youtubeClone from "../../../public/youtubeClone.png";
import SocialMedia from "../../../public/SocialMEdia.png";
import AAvisaConsultancy from "../../../public/AAvisaConsultancy.png";
import fitClubIMG from "../../../public/fitClubIMG.png";
import portfolioIMG from "../../../public/portfolioIMG.png";

const imageMap = { AdminDB, youtubeClone, SocialMedia, AAvisaConsultancy, fitClubIMG, portfolioIMG };

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

const ProjectCard = ({ p, index, onClick }) => (
  <motion.article
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="group relative cursor-pointer"
    onClick={onClick}
  >
    <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/10">
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={imageMap[p.image]}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium">Click to explore →</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
          {p.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {p.tagline}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 px-2.5 py-0.5 text-xs font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-1">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-purple-400/30 hover:scale-[1.03] transition-all"
            >
              <FaExternalLinkAlt size={10} /> Live Demo
            </a>
          )}
          {p.links.repo && (
            <a
              href={p.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <FaGithub size={11} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.article>
);

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const visibleProjects = portfolio.projects.slice(0, 4);
  const remainingProjects = portfolio.projects.slice(4);

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          A selection of things I've built — click any card to explore
        </motion.p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {visibleProjects.map((p, index) => (
          <div key={p.title} className="relative">
            <ProjectCard p={p} index={index} onClick={() => setSelected(p)} />

            {/* "+N more" overlay on last card */}
            {index === 3 && remainingProjects.length > 0 && (
              <div
                onClick={() => setShowAll(true)}
                className="absolute inset-0 rounded-2xl bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 cursor-pointer z-10"
              >
                <span className="text-white text-4xl font-extrabold">+{remainingProjects.length}</span>
                <span className="text-white/80 text-sm font-medium">more projects</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Single Project Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={imageMap[selected.image]} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <HiX size={14} />
                </button>
                <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white">{selected.title}</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{selected.tagline}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {selected.tech.map((t) => (
                    <span key={t} className="rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 px-2.5 py-0.5 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  {selected.links.live && (
                    <a href={selected.links.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:scale-[1.02] transition-transform">
                      <FaExternalLinkAlt size={11} /> Live Demo
                    </a>
                  )}
                  {selected.links.repo && (
                    <a href={selected.links.repo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <FaGithub size={13} /> View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── All Projects Modal ── */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAll(false)}
          >
            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-4xl overflow-y-auto max-h-[85vh] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  More{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h3>
                <button
                  onClick={() => setShowAll(false)}
                  className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <HiX size={14} />
                </button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {remainingProjects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="group rounded-xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    <div className="relative h-36 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img src={imageMap[p.image]} alt={p.title} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold mb-1">{p.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 px-2 py-0.5 text-[10px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {p.links.live && (
                          <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.03] transition-transform">
                            <FaExternalLinkAlt size={9} /> Live
                          </a>
                        )}
                        {p.links.repo && (
                          <a href={p.links.repo} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <FaGithub size={10} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
