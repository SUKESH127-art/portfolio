import { mySocials } from "../constants";
const Footer = () => {
  return (
    <section 
      id="footer" 
      className="relative flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-slate-700"
      style={{
        backgroundImage: "url(/assets/sky.jpg)",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        width: '100vw',
        maxWidth: '100%',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        paddingTop: '2rem',
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem'
      }}
    >
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-transparent"></div>
      
      {/* Footer Content */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 w-full">
        <div className="mb-4 bg-gradient-to-r from-transparent via-white/40 to-transparent h-[1px] w-full" />
        <div className="flex gap-2">
          
          <p className="text-white flex items-center gap-1">
            <span role="img" aria-label="love">❤️</span>
            React + Vite + Tailwind + 3JS
          </p>
          
        </div>
        <div className="flex gap-3">
          {mySocials.map((social, index) => {
            // Replace WhatsApp with GitHub
            if (social.name === 'WhatsApp') {
              return (
                <a href="https://github.com/SUKESH127-art" key={index} target="_blank" rel="noopener noreferrer">
                  <img src="/assets/logos/github.svg" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} alt="GitHub" />
                </a>
              );
            }
            return (
              <a href={social.href} key={index}>
                <img src={social.icon} className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} alt={social.name} />
              </a>
            );
          })}
        </div>
        <p className="text-white">© 2025 Sukesh Ram.</p>
      </div>
    </section>
  );
};

export default Footer;
