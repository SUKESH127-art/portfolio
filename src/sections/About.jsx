const About = () => {

  return (
    <section 
      className="section-gradient-overlay" 
      id="about"
      style={{
        backgroundImage: 'url(/assets/watercolor-painting-seascape-beach-Itogahama-Oita-Japan.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginTop: 0,
        paddingTop: '5rem'
      }}
    >
      <div className="c-space mt-8" style={{ paddingRight: '2.5rem' }}>
        <div className="flex justify-center items-center min-h-[80vh]">
          {/* Carousel content removed */}
        </div>
      </div>
    </section>
  );
};

export default About;
