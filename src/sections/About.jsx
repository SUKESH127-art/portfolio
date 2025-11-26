import SectionBackground from "../components/layout/SectionBackground";

const About = () => {
  return (
    <SectionBackground
      imageUrl="/assets/watercolor-painting-seascape-beach-Itogahama-Oita-Japan.jpg"
      className="section-gradient-overlay"
      id="about"
      minHeight="100vh"
      style={{ paddingTop: '5rem' }}
    >
      <div className="c-space mt-8" style={{ paddingRight: '2.5rem' }}>
        <div className="flex justify-center items-center min-h-[80vh]">
          {/* Carousel content removed */}
        </div>
      </div>
    </SectionBackground>
  );
};

export default About;
