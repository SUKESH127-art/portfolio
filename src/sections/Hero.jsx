import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";

const Hero = () => {
  return (
    <section id="home" className="flex items-start justify-center min-h-screen md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <div className="absolute bottom-20 md:bottom-32 right-32 md:right-40 pointer-events-none overflow-visible">
        <img 
          src="/assets/seagulls.png" 
          alt="Seagulls" 
          className="w-auto h-[30vh] md:h-[40vh] object-contain"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
