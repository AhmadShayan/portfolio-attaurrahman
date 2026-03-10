import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import portfolio from "../portfolio.json";
import { FaStar } from "react-icons/fa";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Testimonials = () => {
  const [shuffled, setShuffled] = useState([]);
  const controlsRow1 = useAnimation();
  const controlsRow2 = useAnimation();

  useEffect(() => {
    setShuffled(shuffle(portfolio.testimonials));

    // Start infinite scrolling for both rows
    controlsRow1.start({
      x: ["0%", "-100%"],
      transition: { repeat: Infinity, duration: 30, ease: "linear" },
    });
    controlsRow2.start({
      x: ["-100%", "0%"],
      transition: { repeat: Infinity, duration: 35, ease: "linear" },
    });
  }, []);

  // Pause function
  const handleHoverRow = (controls) => {
    controls.stop();
  };

  const handleLeaveRow = (controls, direction) => {
    controls.start({
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: { repeat: Infinity, duration: direction === "left" ? 30 : 35, ease: "linear" },
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-10 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">Testimonials</h2>

      {/* Row 1 - Right to Left */}
      <div
        className="relative flex overflow-hidden "
        onMouseEnter={() => handleHoverRow(controlsRow1)}
        onMouseLeave={() => handleLeaveRow(controlsRow1, "left")}
      >
        <motion.div className="flex gap-8 min-w-full" animate={controlsRow1}>
          {[...portfolio.testimonials, ...portfolio.testimonials].map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[300px] max-w-sm p-5 m-2 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition-transform duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  0px 0px 12px 2px rgba(168, 85, 247, 0.5),
                  0px 0px 14px 4px rgba(236, 72, 153, 0.4),
                  0px 0px 16px 6px rgba(56, 189, 248, 0.4)
                `,
                zIndex: 10,
              }}
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-sm italic mb-3">"{t.text}"</p>
              <p className="text-sm font-semibold">~ {t.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Left to Right (shuffled) */}
      <div
        className="relative flex overflow-hidden mt-10"
        onMouseEnter={() => handleHoverRow(controlsRow2)}
        onMouseLeave={() => handleLeaveRow(controlsRow2, "right")}
      >
        <motion.div className="flex gap-8 min-w-full" animate={controlsRow2}>
          {[...shuffled, ...shuffled].map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[300px] max-w-sm p-5 m-2 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition-transform duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  0px 0px 12px 2px rgba(168, 85, 247, 0.5),
                  0px 0px 14px 4px rgba(236, 72, 153, 0.4),
                  0px 0px 16px 6px rgba(56, 189, 248, 0.4)
                `,
                zIndex: 10,
              }}
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-sm italic mb-3">"{t.text}"</p>
              <p className="text-sm font-semibold">~ {t.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Testimonials;
