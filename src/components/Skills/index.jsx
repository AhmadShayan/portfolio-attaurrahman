import React from 'react'
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiNextdotjs,
  SiFramer,
  SiMui,
  SiTailwindcss,
  SiRedux,
} from "react-icons/si";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGithub,
} from "react-icons/fa";


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
const skills = [
  {
    icon: <SiJavascript className="text-yellow-500 text-2xl" />,
    name: "JavaScript",
  },
  { icon: <FaReact className="text-sky-500 text-2xl" />, name: "React.js" },
  //  {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="text-purple-500 dark:text-purple-400 w-6 h-6"
  //       fill="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path d="M12 2L2 7l10 5 10-5-10-5zm8 10l-8 4-8-4v6l8 4 8-4v-6z" />
  //     </svg>
  //   ),
  //   name: "Redux Toolkit",
  // },
    { icon: <SiRedux className="text-purple-500 text-2xl" />, name: "Redux Toolkit" },
 
  {
    icon: <SiNextdotjs className="text-black dark:text-white text-2xl" />,
    name: "Next.js",
  },
  {
    icon: <SiFramer className="text-pink-500 text-2xl" />,
    name: "Framer Motion",
  },
  { icon: <SiMui className="text-blue-500 text-2xl" />, name: "Material UI" },
  { icon: <FaHtml5 className="text-orange-500 text-2xl" />, name: "HTML5" },
  { icon: <FaCss3Alt className="text-blue-600 text-2xl" />, name: "CSS3" },
  {
    icon: <SiTailwindcss className="text-cyan-500 text-2xl" />,
    name: "Tailwind CSS",
  },
  {
    icon: <FaBootstrap className="text-purple-600 text-2xl" />,
    name: "Bootstrap",
  },
  {
    icon: <FaGithub className="text-black dark:text-white text-2xl" />,
    name: "GitHub",
  },
];
const Skills = () => {
  return (
    <Section id="skills" >
      <Container>
      {/* <Section id="skills"> */}
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">Skills
      
    </h2>
    <div className="text-s font-2xl text-zinc-500">My Source of creativity.</div>
    <div className="w-40 mx-auto mt-4 h-1 flex bg-gradient-to-r from-purple-500 to-pink-500"></div>
{/* <div className="text-s mt-1 font-2xl text-zinc-500">Frontend Developer</div> */}
    <div className="relative flex items-center justify-center w-full h-[450px]">
     
      <motion.div
        className="absolute w-48 h-28 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-xl z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Creativity
      </motion.div>

      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full"
        animate={{
          //  rotate: 360 
           scale: [1, 1.1, 1] 
          }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {skills.map((skill, i) => {
          const angle = (i * 2 * Math.PI) / skills.length;
          const radius = 150;

          return (
            <>
            <motion.div
              key={i}
              className="absolute flex flex-col items-center gap-2"
              style={{
                left: `calc(50% + ${radius * Math.cos(angle)}px)`,
                top: `calc(50% + ${radius * Math.sin(angle)}px)`,
                transform: "translate(-50%, -50%)", // keep centered
              }}
              // initial={{ scale: 1 }}
                              // animate={{ rotate: -360 }}
                // transition={{ duration: 20, repeat: Infinity, }}
              // animate={{ scale: 1 }}
              // transition={{ duration: 10, delay: i * 0.2 }}
            >
              <div className=" bg-white dark:bg-zinc-800 rounded-full shadow-md">
                {skill.icon}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {skill.name}
              </span>
            </motion.div>
          
              </>
          );
        })}
      </motion.div>
    </div>
    <div className="text-s font-2xl text-zinc-500">Blending creativity with code to turn ideas into interactive reality.</div>
    <div className="flex items-center justify-between bg-white text-black shadow-lg shadow-pink-300 rounded-lg px-6 py-3 mt-8 max-w-xs mx-auto font-bold">
      <span>Continuous Learning</span>
<svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 6h12v12H6z" />
</svg>
    </div>
  </div>
  </Container>
</Section>
    
  )
}

export default Skills
