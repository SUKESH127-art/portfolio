import PillNav from "./components/navigation/PillNav";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";

const App = () => {
  return (
    <>
      <PillNav />
      <div className="scroll-container">
        <div className="container mx-auto max-w-7xl">
          <Home />
          <About />
          <Experiences />
          <Projects />
        </div>
      </div>
    </>
  );
};

export default App;
