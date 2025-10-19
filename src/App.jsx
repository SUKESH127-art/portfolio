import PillNav from "./components/PillNav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";

const App = () => {
  return (
    <>
      <PillNav />
      <div className="scroll-container">
        <div className="container mx-auto max-w-7xl">
          <Hero />
          <About />
          <Experiences />
          <Projects />
        </div>
      </div>
    </>
  );
};

export default App;
