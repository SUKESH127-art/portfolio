"use client";
import PropTypes from 'prop-types';
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

// Tech stack icons for each experience
const getTechStack = (job) => {
  const techStacks = {
    "Google": ["kotlin", "java", "git", "youtube", "android"],
    "PetSmart": ["sqlite", "salesforce", "java", "azure", "git"],
    "Havenly Treats": ["react", "javascript", "css3", "html5", "sqlite"],
    "Veras Retail": ["angular", "ionic", "typescript", "git", "swift"],
    "ASU": ["semiconductor", "physics", "research"],
    "MicroDrop": ["biology", "research", "hospital"]
  };
  return techStacks[job] || ["git", "javascript", "html5", "css3", "react"];
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 100%"],
  });

  // Animation configuration
  const stoppingPoint = 0.8; // Scroll progress when moon/trail stops moving (0-1)
  const stoppingHeight = 0.76; // Height percentage where moon/trail stops (0-1)
  const trailOffset = 120; // Initial trail height offset to compensate for moon's top-30
  const fadeInStart = 0.1; // When trail starts fading in
  const fadeInEnd = 0.15; // When trail finishes fading in


  return (
    <div className="c-space" ref={containerRef}>
      <div ref={ref} className="relative pt-16 pb-16">
        <div className="flex justify-center">
          <div className="relative max-w-2xl w-full">
            <div className="space-y-8 md:space-y-10 pl-8 md:pl-10">
            {data.map((item, index) => (
              <div key={index} className="relative">
                <ExperienceCard
                  title={item.title}
                  job={item.job}
                  date={item.date}
                  logo={item.logo}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
        
        {/* Timeline effects - hidden on mobile */}
        <div className="hidden md:block">
          {/* Shooting star trail - starts from top of experience section */}
          <motion.div
            style={{
              height: useTransform(scrollYProgress, [0, stoppingPoint], [trailOffset, height * stoppingHeight + trailOffset]),
              opacity: useTransform(scrollYProgress, [fadeInStart, fadeInEnd], [0, 1]),
            }}
            className="absolute md:left-18 left-18 top-0 w-[8px] bg-gradient-to-b from-slate-300 to-slate-300 rounded-full"
          />
          
          {/* Metallic Moon Icon - hangs from bottom of trail */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, stoppingPoint], [0, height * stoppingHeight]),
            }}
            className="absolute md:left-3 left-3 top-27 w-28 h-28 flex items-center justify-center"
          >
            {/* Moon Icon */}
            <img 
              src="/assets/moon_icon Background Removed.png" 
              alt="Moon" 
              className="drop-shadow-[0_0_20px_rgba(148,163,184,0.8)] filter brightness-110 contrast-110"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Glass UI Experience Card Component
const ExperienceCard = ({ title, job, date, logo }) => {
  const techStack = getTechStack(job);
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="relative rounded-3xl p-6 md:p-8 bg-white/10 dark:bg-white/5 border border-white/20 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:bg-white/12 transition-all duration-300 overflow-hidden">
        <div className="flex items-start gap-5">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-white/20 border border-white/30 overflow-hidden group-hover:bg-white/30 transition-colors duration-300">
            {logo ? (
              <img 
                src={logo} 
                alt={`${job} logo`}
                className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:rotate-[360deg]"
              />
            ) : (
              <div className="h-12 w-12 rounded bg-white/60" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-2xl md:text-3xl text-sky-900 dark:text-sky-200">{job}</p>
            <h3 className="mt-1 text-xl font-semibold text-sky-700 dark:text-sky-300">
              {title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="text-lg">{date}</span>
            </div>
          </div>
        </div>
        
        {/* Tech Stack Orbiting Effect with Glass Container */}
        <div className="absolute bottom-6 right-6 h-32 w-32 opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="relative h-full w-full rounded-2xl bg-white/15 dark:bg-white/10 border border-white/25 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.2)] backdrop-blur-md flex items-center justify-center overflow-hidden">
            <OrbitingCircles 
              iconSize={24} 
              radius={30} 
              duration={25} 
              speed={1}
              path={false}
            >
              {techStack.map((tech, index) => (
                <TechIcon key={index} src={`/assets/logos/${tech}.svg`} />
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Tech Icon Component
const TechIcon = ({ src }) => (
  <img 
    src={src} 
    className="duration-200 rounded-sm hover:scale-110 w-6 h-6 object-contain drop-shadow-sm" 
    alt="tech icon"
  />
);

TechIcon.propTypes = {
  src: PropTypes.string.isRequired,
};

ExperienceCard.propTypes = {
  title: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  logo: PropTypes.string,
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    logo: PropTypes.string,
    contents: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};
