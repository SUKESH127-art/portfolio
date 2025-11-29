import { Suspense, lazy, Component } from "react";
import PropTypes from "prop-types";
import { SpeedInsights } from "@vercel/speed-insights/react";
import PillNav from "./components/navigation/PillNav";
import ScrollBubble from "./components/navigation/ScrollBubble";

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

// Lazy load sections with error handling
const lazyWithRetry = (componentImport) => {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error("Failed to load component:", error);
      // Retry once after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await componentImport();
    }
  });
};

// Lazy load sections for code splitting
const Home = lazyWithRetry(() => import("./sections/Home"));
const About = lazyWithRetry(() => import("./sections/About"));
const Projects = lazyWithRetry(() => import("./sections/Projects"));
const Experiences = lazyWithRetry(() => import("./sections/Experiences"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-sky-600">Loading...</div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
