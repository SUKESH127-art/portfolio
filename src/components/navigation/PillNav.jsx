import { useState, useEffect, useRef } from 'react';
import GlassSurface from '../ui/GlassSurface';
import './PillNav.css';
import navigationData from '../../data/entire_site/navigation/items.json';

const PillNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);
  const activeSectionRef = useRef('home');

  const navItems = navigationData.navItems;

  // Map section IDs to display titles
  const getSectionTitle = (sectionId) => {
    return navigationData.mobileTitles[sectionId] || "Home";
  };

  const handleNavClick = (sectionId, event) => {
    event.preventDefault();

    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    isNavigatingRef.current = true;
    setActiveSection(sectionId);

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    navigationTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const sections = navigationData.sections;
      const scrollPosition = window.scrollY + 100; // Reduced from 200 to 100
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentActive = activeSectionRef.current;

      // Check if we're near the bottom of the page (within 100px)
      const isNearBottom = window.scrollY + windowHeight >= documentHeight - 100;

      if (isNearBottom) {
        if (currentActive !== 'projects') {
          setActiveSection('projects');
        }
        return;
      }

      let currentSection = currentActive;

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sections[i];
            break;
          }
        }
      }

      if (currentSection !== currentActive) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const isExperienceSection = activeSection === 'experience';
  const isProjectsSection = activeSection === 'projects';

  return (
    <nav className="pill-nav-container">
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={9999}
        className="pill-nav-glass"
        backgroundOpacity={isExperienceSection ? 0.4 : 0}
        style={{ padding: '0.75rem 2rem' }}
      >
        {/* Desktop View */}
        <div className="pill-nav-desktop">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const linkStyle = isActive ? {
              textDecoration: 'underline',
              textDecorationColor: isProjectsSection ? '#ffffff' : '#0e7490',
              textDecorationThickness: '2px',
              textUnderlineOffset: '8px',
              color: isProjectsSection ? '#ffffff' : undefined
            } : {
              ...(isProjectsSection && { color: '#ffffff' })
            };
            
            return (
              <a
                key={index}
                href={item.href}
                className={`pill-nav-link ${isProjectsSection ? 'pill-nav-link--projects' : ''}`}
                onClick={(e) => handleNavClick(item.id, e)}
                style={linkStyle}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Section Title */}
        <div className="pill-nav-mobile-title">
          <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            {getSectionTitle(activeSection)}
          </h2>
        </div>
      </GlassSurface>
    </nav>
  );
};

export default PillNav;

