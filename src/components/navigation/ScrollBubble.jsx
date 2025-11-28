import { useEffect, useState } from "react";
import GlassSurface from "../ui/GlassSurface";
import navigationData from "../../data/entire_site/navigation/items.json";

const sections = navigationData.sections || ["home", "about", "experience", "projects"];

const ScrollBubble = () => {
  const [activeSection, setActiveSection] = useState(sections[0] || "home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let currentSection = sections[0] || "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % sections.length;
    const nextSectionId = sections[nextIndex];
    const target = document.getElementById(nextSectionId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (nextSectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isLastSection = sections[sections.length - 1] === activeSection;
  const arrow = isLastSection ? "↑" : "↓";
  const isExperienceSection = activeSection === 'experience';
  const isProjectsSection = activeSection === 'projects';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="scroll-bubble fixed bottom-6 md:bottom-10 right-6 md:right-10 z-50"
      aria-label="Scroll to next section"
    >
      <GlassSurface 
        width={64} 
        height={64} 
        borderRadius={9999} 
        className="p-0 flex items-center justify-center"
        backgroundOpacity={isExperienceSection ? 0.5 : 0}
        
      >
        <span className={`text-2xl leading-none ${isProjectsSection ? 'text-white' : 'text-sky-700 dark:text-sky-200'}`}>{arrow}</span>
      </GlassSurface>
    </button>
  );
};

export default ScrollBubble;

