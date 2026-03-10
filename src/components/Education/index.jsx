import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import portfolio from "../portfolio.json";

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-16 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Education = () => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [height, setHeight] = useState("auto");
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Update height dynamically when toggle changes
  useEffect(() => {
    const newHeight = showCertificates
      ? backRef.current?.offsetHeight || 0
      : frontRef.current?.offsetHeight || 0;
    setHeight(newHeight);
  }, [showCertificates]);

  return (
    <Section id="education">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
            {showCertificates ? "Certifications" : "Education"}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-4">
            <span
              className={
                !showCertificates ? "font-semibold text-purple-500" : "text-gray-500"
              }
            >
              Education
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showCertificates}
                onChange={() => setShowCertificates((s) => !s)}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-sky-500 relative transition-all">
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    showCertificates ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </div>
            </label>

            <span
              className={showCertificates ? "font-semibold text-sky-500" : "text-gray-500"}
            >
              Certificates
            </span>
          </div>
        </div>

        {/* Outer container with dynamic height */}
        <motion.div
          animate={{ height }}
          transition={{ duration: 0.6 }}
          className="relative w-full flex justify-center overflow-hidden"
          style={{ perspective: 1000 }}
        >
          {/* Flipping card */}
          <motion.div
            animate={{ rotateY: showCertificates ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* FRONT (Education) */}
            <div
              ref={frontRef}
              className="w-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <div className="relative p-4 sm:p-6">
                {/* Timeline line - hidden on mobile, visible on md and up */}
                <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-sky-500 transform -translate-x-1/2" />

                <div className="flex flex-col space-y-8 sm:space-y-12">
                  {portfolio.education.map((edu, i) => (
                    <div key={i} className="relative flex items-center w-full">
                      {/* Mobile layout - single column */}
                      <div className="md:hidden w-full">
                        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-xl p-4 sm:p-5 mx-2">
                          <div className="flex items-center mb-3">
                            <div className="w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 shadow-md mr-3 flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-left">{edu.degree}</h3>
                          </div>
                          <div className="text-left pl-7">
                            <p className="text-sm text-gray-500">{edu.institution}</p>
                            <p className="text-xs text-gray-400">{edu.period}</p>
                            {edu.Number && (
                              <p className="text-xs text-gray-400">{edu.Number}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout - timeline with alternating sides */}
                      <div className="hidden md:flex items-center w-full">
                        {i % 2 === 0 ? (
                          <>
                            <div className="w-[45%] pr-4 text-right">
                              <div className="bg-white dark:bg-zinc-800 shadow-md rounded-xl p-5">
                                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                <p className="text-sm text-gray-500">{edu.institution}</p>
                                <p className="text-xs text-gray-400">{edu.period}</p>
                                {edu.Number && (
                                  <p className="text-xs text-gray-400">{edu.Number}</p>
                                )}
                              </div>
                            </div>
                            <div className="w-[10%] flex justify-center">
                              <div className="w-5 h-5 rounded-full border-4 border-white dark:border-zinc-900 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 shadow-md" />
                            </div>
                            <div className="w-[45%]" />
                          </>
                        ) : (
                          <>
                            <div className="w-[45%]" />
                            <div className="w-[10%] flex justify-center">
                              <div className="w-5 h-5 rounded-full border-4 border-white dark:border-zinc-900 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 shadow-md" />
                            </div>
                            <div className="w-[45%] pl-4 text-left">
                              <div className="bg-white dark:bg-zinc-800 shadow-md rounded-xl p-5">
                                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                <p className="text-sm text-gray-500">{edu.institution}</p>
                                <p className="text-xs text-gray-400">{edu.period}</p>
                                {edu.Number && (
                                  <p className="text-xs text-gray-400">{edu.Number}</p>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BACK (Certificates) */}
            <div
              ref={backRef}
              className="w-full absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="p-4 sm:p-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {portfolio.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800 p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{cert.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{cert.issuer}</p>
                      {cert.description && (
                        <p className="text-xs text-gray-400 mb-2 line-clamp-3">{cert.description}</p>
                      )}
                      <p className="text-xs text-gray-400">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Education;
