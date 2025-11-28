// import { Timeline } from "../components/experiences/Timeline";
// import experiences from "../data/experiences/experiences.json";
import SectionBackground from "../components/layout/SectionBackground";
import ExperienceCarousel from "../components/experiences/ExperienceCarousel";
import "./Experiences.css";

const Experiences = () => {
  return (
    <SectionBackground
      imageUrl="/assets/path.jpg"
      id="experience"
      className="relative"
      maxHeight="30vh"
      backgroundSize="cover"
      
    >
      {/* Content */}
      <div
        className="relative z-10 c-space pt-10 pb-1"
        style={{ paddingRight: "2.5rem" }}
      >
        <ExperienceCarousel />
        {/* <Timeline data={experiences} /> */}
      </div>
    </SectionBackground>
  );
};

export default Experiences;
