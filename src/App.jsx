import { Suspense, lazy } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import PillNav from "./components/navigation/PillNav";
import ScrollBubble from "./components/navigation/ScrollBubble";

// Lazy load sections for code splitting
const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-sky-600">Loading...</div>
  </div>
);

const App = () => {
  return (
    <>
      <SpeedInsights />
      <PillNav />
      <ScrollBubble />
      <div className="scroll-container">
        <div className="container mx-auto max-w-7xl">
          <Suspense fallback={<SectionLoader />}>
            <Home />
            <About />
            <Experiences />
            <Projects />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
