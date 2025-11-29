import { Suspense, lazy } from "react";
import SectionBackground from "../components/layout/SectionBackground";
import galleryContent from "../data/about/gallery.json";

// Lazy load heavy DomeGallery component
const DomeGallery = lazy(() => import("../components/about/DomeGallery"));

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
            <Suspense fallback={<div className="flex items-center justify-center h-full text-sky-600 animate-pulse">Loading gallery...</div>}>
              <DomeGallery images={images} grayscale={false} showOverlays={false} />
            </Suspense>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default About;
