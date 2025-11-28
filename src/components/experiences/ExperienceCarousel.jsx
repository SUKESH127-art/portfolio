import { FiBriefcase, FiGlobe, FiZap, FiCode, FiActivity, FiBook } from "react-icons/fi";
import Carousel from "../ui/Carousel";
import "./ExperienceCarousel.css";

const PROBLEM_SOLVING = [
  {
    id: 1,
    title: "Google",
    description: [
      "Work as fulltime SWE (2023-Present)",
      "Android SysUI & YouTube XR",
      "0->1: Connected Displays Taskbar",
      "Work featured at Google I/O '25"
    ],
    icon: <FiCode className="carousel-icon" />,
  },
  {
    id: 2,
    title: "Internships",
    description: [
      "Google: Android (Java/Kotlin)",
      "PetSmart: Backend (SQL/Java)",
      "Veras Retail: Frontend (Angular)",
      "Full-Stack: Havenly (React/Firebase)" 
    ],
    icon: <FiBriefcase className="carousel-icon" />,
  },
  {
    id: 3,
    title: "Research",
    description: [
      "Focus: Semiconductors & Hematology",
      "Co-authored 4 publications",
      "Co-founded MicroDrop Diagnostics",
      "Presented at 3 intl. conferences"
    ],
    icon: <FiActivity className="carousel-icon" />,
  },
  {
    id: 4,
    title: "Education",
    description: [
      "Yale 2023: B.S. in Computer Science",
      "Worked as Admissions Office Rep",
      "TA: Intro (CS50) & Algorithms (CS365)",
      "Clubs: Thinkspaces, YCS, Code Haven, SAS, MUN"
    ],
    icon: <FiBook className="carousel-icon" />,
  },
];

const IMPACT = [
  {
    id: 1,
    title: "2019 Coca-Cola Scholar",
    description: [
      "Awarded for leadership & service qualities",
      "Top 0.2% of american graduating seniors",
      "$20k scholarship prize for undergraduate studies",
      "Membership in foundation network"
    ],
    icon: <FiGlobe className="carousel-icon" />,
  },
  {
    id: 2,
    title: "Yale YES-W Scholar",
    description: [
      "One of Yale's top 100 STEM applicants",
      "Early recognition program for outstanding students",
      "Access to mentorship & networking opportunities"
    ],
    icon: <FiBriefcase className="carousel-icon" />,
  },
  {
    id: 3,
    title: "Debate",
    description: [
      "Competed in public forum debate",
      "USA Top 30 at NSDA Nationals",
      "Silver Tournament of Champions Quarterfinalist",
      "Arizona State Public Forum Champion"
    ],
    icon: <FiZap className="carousel-icon" />,
  },
  {
    id: 4,
    title: "Research",
    description: [
      "MRS Advances Best Poster Award",
      "Intel ISEF Finalist",
      "2018 Future Innovator (AZ Tech Council)",
      "1st place at AZ State Science Fair"
    ],
    icon: <FiBriefcase className="carousel-icon" />,
  },
];

const carouselProps = {
  baseWidth: 450,
  height: 400,
  autoplay: true,
  autoplayDelay: 3500,
  pauseOnHover: true,
  loop: true,
};

export default function ExperienceCarousel() {
  return (
    <div className="experience-carousel-grid">
      <Carousel items={PROBLEM_SOLVING} {...carouselProps} title="Professional" />
      <Carousel items={IMPACT} {...carouselProps} title="Honors & Awards" />
    </div>
  );
}

