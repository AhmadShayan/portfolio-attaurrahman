import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Brand icons
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiMui,SiFramer  } from "react-icons/si";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Profile from"../../../public/profile.png"
/* --- tiny badge for skill icons --- */
const IconBadge = ({ children }) => (
  <span className="w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-700 grid place-items-center shadow-sm bg-white dark:bg-zinc-800">
    {children}
  </span>
);

/* --- right side interactive card --- */
function AboutInteractiveCard() {
  const [revealed, setRevealed] = useState(false);
  const boundsRef = useRef(null);

  return (
    <>
      {/* <Section id="about" className="about ">
        <Container> */}
          {/* <div className="flex flex-row justify-center items-center"> */}
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Heading full-width */}
            <div className="md:col-span-2 text-center">
              <h2 className="text-4xl font-extrabold">
                About{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              {/* <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500" /> */}
            </div>

            {/* Left: text + two feature cards */}

            <div className="max-w-xl">
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                I'm a React.js developer with a solid grip on JavaScript,
                React.js, and exploring Next.js to take my React projects to the
                next level. Over time, I've moved from writing simple programs
                to building clean, responsive, and user-friendly web
                applications.
              </p>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                What excites me most is solving real problems through
                code—whether it’s crafting interactive UIs, optimizing
                performance, or exploring new technologies. I focus on writing
                code that’s not only functional but also easy to read and
                maintain, while always pushing myself to learn and grow as a
                developer.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Adaptable
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">
                    Quick to learn new technologies
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
                    Curious
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">
                    Always exploring new concepts
                  </div>
                </div>
              </div>
            </div>

            {/* Right: interactive photo → reveal card */}
            {/* <div className="flex justify-center md:justify-center align-center height-full">
              
            </div> */}
                                  <div className="flex  justify-center align-center relative w-auto sm:w-auto mx-auto md:mx-0">
      <div ref={boundsRef} className="relative ">
        <AnimatePresence initial={false} mode="wait">
          {!revealed ? ( 
            /* --- initial: big photo --- */
            <motion.div
              key="photo"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur ring-1 ring-purple-300/40 shadow-xl"
            >
              <img
                src={Profile} /* <-- replace with your image */
                alt="Profile"
                className="w-full h-[420px] rounded-xl object-cover"
              />
              {/* floating glow dots like the SS */}
              <motion.div
                className="absolute -top-3 left-2 h-10 w-[80px] rounded-full bg-purple-100 grid place-items-center shadow-md"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* draggable handle */}
              
<motion.button
  title="Drag to reveal"
  className="h-7 w-[70px] rounded-full flex items-center justify-center
             bg-white dark:bg-zinc-800 
             text-zinc-800 dark:text-white 
             text-[11px] font-semibold 
             border border-zinc-200 dark:border-zinc-700 
             shadow-sm grid place-items-center"
  drag
  dragConstraints={boundsRef}
  dragMomentum={false}
  onDragEnd={(_, info) => {
    const d = Math.hypot(info.offset.x, info.offset.y);
    if (d > 28) setRevealed(true);
  }}
>
  <div className="flex items-center justify-center mb-1">
    
  Drag <AiOutlineArrowRight className="inline-block ml-1 mt-1"/>
  </div>
</motion.button>

              
              </motion.div>

              {/* <motion.div
                className="absolute -bottom-4 -left-4 h-11 w-11 rounded-full bg-sky-100 grid place-items-center text-lg"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡
              </motion.div> */}
            </motion.div>
          ) : (
            /* --- after drag: compact info card --- */
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl p-3 bg-white dark:bg-zinc-900 ring-1 ring-purple-300/40 shadow-xl "
            >
              {/* close button */}
              <button
                onClick={() => setRevealed(false)}
                className="absolute top-13  font-bold right-1 mr-2 bg-black text-white border rounded-full "
                aria-label="Close"
              >
                <AiOutlineCloseCircle className="w-5 h-5"/>
              </button>

              <div className="flex gap-4">
                              {/* <motion.div
                className="relative -top-7 right-8 h-10 w-10 rounded-full bg-purple-100 grid place-items-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💡
              </motion.div> */}
                <img
                  src={Profile}
                  alt="Avatar"
                  className="w-40 h-60 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-lg font-bold mt-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Atta Ur Rahman</div>
                  <div className="text-s mt-1 font-2xl text-zinc-500">Frontend Developer</div>

                  <div className="mt-3">
                    <div className="text-sm font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Skills</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <IconBadge><SiJavascript  className="text-sky-500" /></IconBadge>
                      <IconBadge><FaReact className="text-sky-500" /></IconBadge>
                      <IconBadge><SiNextdotjs  className="text-sky-400" /></IconBadge>
                      <IconBadge><SiFramer  className="text-yellow-500" /></IconBadge>
                      <IconBadge><SiMui  className="text-yellow-500" /></IconBadge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                      <IconBadge><FaHtml5  className="text-blue-600" /></IconBadge>
                      <IconBadge><FaCss3Alt  className="text-yellow-500" /></IconBadge>
                      <IconBadge><SiTailwindcss   className="text-blue-600" /></IconBadge>
                      <IconBadge><FaBootstrap  className="text-black dark:text-white" /></IconBadge>
                      <IconBadge><FaGithub className="text-black dark:text-white" /></IconBadge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-m font-bold text-zinc-600 dark:text-zinc-300">
                React.js Developer crafting modern, responsive web apps.
              </p>

              {/* small decorative bulb */}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
          </div>

    {/* </div> */}
        {/* </Container>

      </Section> */}


    </>
  );
}
export default AboutInteractiveCard;