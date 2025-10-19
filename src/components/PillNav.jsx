import { useState, useEffect } from 'react';
import StarBorder from './StarBorder';
import './PillNav.css';

const PillNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Me', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' }
  ];

  // Map section IDs to display titles
  const getSectionTitle = (sectionId) => {
    const titles = {
      home: "Home",
      about: "About Me", 
      experience: "Work",
      projects: "Projects"
    };
    return titles[sectionId] || "Home";
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 100; // Reduced from 200 to 100
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page (within 100px)
      const isNearBottom = window.scrollY + windowHeight >= documentHeight - 100;

      if (isNearBottom) {
        // If near bottom, always show the last section as active
        setActiveSection('projects');
        return;
      }

      // Find the current section with more precise detection
      let currentSection = 'home'; // Default to home
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="pill-nav-container">
      <StarBorder 
        color="white" 
        speed="8s"
        className="pill-nav"
      >
        {/* Desktop View */}
        <div className="pill-nav-desktop">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="pill-nav-link"
              onClick={() => handleNavClick(item.id)}
              {...(activeSection === item.id && {
                style: {
                  textDecoration: 'underline',
                  textDecorationColor: '#0e7490',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '8px'
                }
              })}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Section Title */}
        <div className="pill-nav-mobile-title">
          <h2 className="text-lg font-semibold text-neutral-700">
            {getSectionTitle(activeSection)}
          </h2>
        </div>
      </StarBorder>
    </nav>
  );
};

export default PillNav;

