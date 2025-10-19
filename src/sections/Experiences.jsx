import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <section 
      id="experience" 
      className="relative pt-16"
      style={{
        backgroundImage: "url('/assets/work_experiences/monet1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        maxWidth: '100%',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      {/* Content */}
      <div className="relative z-10 c-space" style={{ paddingRight: '2.5rem' }}>
        <Timeline data={experiences} />
      </div>
    </section>
  );
};

export default Experiences;
