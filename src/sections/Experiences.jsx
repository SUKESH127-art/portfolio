import { Timeline } from "../components/experiences/Timeline";
import experiences from "../data/experiences/experiences.json";
import SectionBackground from "../components/layout/SectionBackground";

const Experiences = () => {
  return (
    <SectionBackground
      imageUrl="/assets/work_experiences/monet1.jpg"
      id="experience"
      className="relative"
      minHeight="100vh"
      style={{ paddingTop: '4rem' }}
    >
      {/* Content */}
      <div className="relative z-10 c-space" style={{ paddingRight: '2.5rem' }}>
        <Timeline data={experiences} />
      </div>
    </SectionBackground>
  );
};

export default Experiences;
