import { useState, useEffect, useLayoutEffect } from "react";
import myProjects from "../data/projects/projects.json";
import mySocials from "../data/entire_site/social/links.json";
import footerData from "../data/projects/footer.json";
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import PropTypes from "prop-types";
import SectionBackground from "../components/layout/SectionBackground";

// Custom hook for isomorphic layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Custom hook for media queries
const useMediaQuery = (query, { defaultValue = false, initializeWithValue = true } = {}) => {
  const IS_SERVER = typeof window === "undefined";
  
  const getMatches = (query) => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  
  // Calculate carousel dimensions
  const cylinderWidth = isScreenSizeSm ? 800 : 1200;
  const faceCount = myProjects.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  // Auto-rotation effect
  useEffect(() => {
    if (!isCarouselActive || isHovered || selectedProject) return;

    const interval = setInterval(() => {
      rotation.set(rotation.get() + 0.5); // Slow rotation: 0.5 degrees per interval
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [isCarouselActive, isHovered, selectedProject, rotation]);

  const handleClick = (project) => {
    setSelectedProject(project);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setSelectedProject(null);
    setIsCarouselActive(true);
  };

  return (
    <SectionBackground
      imageUrl="/assets/impression-sunrise.jpg"
      id="projects"
      className="relative"
      minHeight="100vh"
      style={{ paddingTop: '5rem' }}
    >
      {/* 3D Carousel Container */}
      <div className="relative z-10 w-full overflow-hidden flex items-center justify-center c-space" style={{ minHeight: 'calc(100vh - 11rem)', paddingRight: '2.5rem' }}>
        {/* Glass Indicator Card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-[520px] h-[455px] rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl opacity-60"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          ></div>
        </div>
        
        <div
          className="flex items-center justify-center h-[300px] relative z-10"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <motion.div
            className="relative flex h-full origin-center justify-center"
            style={{
              transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            animate={controls}
          >
            {myProjects.map((project, i) => (
              <motion.div
                key={`project-${project.id}-${i}`}
                className="absolute flex h-full origin-center items-center justify-center p-2"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    i * (360 / faceCount)
                  }deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleClick(project)}
              >
                <ProjectCard3D project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal for Project Details */}
      <AnimatePresence mode="sync">
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Footer Text */}
      <div className="flex items-center justify-between text-white text-sm mt-16 pb-8 c-space" style={{ marginRight: '2.5rem' }}>
        <p className="flex items-center gap-1">
          {footerData.techStack}
        </p>
        <div className="flex gap-3">
          {mySocials.map((social, index) => {
            // Replace WhatsApp with GitHub
            if (social.name === 'WhatsApp') {
              return (
                <a href={footerData.githubUrl} key={index} target="_blank" rel="noopener noreferrer">
                  <img src="/assets/logos/github.svg" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} alt="GitHub" />
                </a>
              );
            }
            return (
              <a href={social.href} key={index}>
                <img src={social.icon} className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} alt={social.name} />
              </a>
            );
          })}
        </div>
        <p>{footerData.copyright}</p>
      </div>
    </SectionBackground>
  );
};

// 3D Carousel Project Card Component (maintains your glassmorphism design)
const ProjectCard3D = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer w-full h-48"
    >
      <div className="relative h-full w-full rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300">
        {/* Project Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter blur-sm group-hover:blur-none transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
            {project.title}
          </h3>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

// Modal Component for Project Details
const ProjectModal = ({ project, onClose }) => {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* GitHub/External Link Button */}
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
            title={project.href.includes('github.com') ? "View on GitHub" : "View Project"}
          >
            {project.href.includes('github.com') ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </a>
        )}

        {/* Modal Content */}
        <div className="p-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Image */}
            <div className="rounded-xl overflow-hidden mt-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
              

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

ProjectCard3D.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    href: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    href: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
    subDescription: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Projects;
