import SectionBackground from "../components/layout/SectionBackground";
import DomeGallery from "../components/about/DomeGallery";
import galleryContent from "../data/about/gallery.json";

const About = () => {
  const { images = [] } = galleryContent;

  return (
    <SectionBackground
      imageUrl="/assets/mountain.png"
      className="section-gradient-overlay"
      id="about"
      minHeight="130vh"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="c-space mt-8 h-full" style={{ paddingRight: '2.5rem' }}>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="w-full h-[70vh] lg:h-[80vh]">
            <DomeGallery images={images} grayscale={false} showOverlays={false} />
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default About;
