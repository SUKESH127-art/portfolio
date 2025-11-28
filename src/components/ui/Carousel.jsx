import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import PropTypes from "prop-types";
import GlassSurface from "./GlassSurface";
import "./Carousel.css";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items,
  baseWidth = 300,
  height,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  title = "work",
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2.5;
  const trackItemOffset = itemWidth + GAP;
  const resolvedHeight = height ?? baseWidth * 0.5;
  const itemHeight = resolvedHeight - containerPadding * 10

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [xValue, setXValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  // Sync x motion value to state for rotation calculations
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => setXValue(latest));
    return unsubscribe;
  }, [x]);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  // Calculate rotation based on x position and item index
  const calculateRotateY = (index, currentX) => {
    const itemX = -index * trackItemOffset;
    const diff = currentX - itemX;
    const maxDiff = trackItemOffset;
    if (diff > maxDiff) return -90;
    if (diff < -maxDiff) return 90;
    return (diff / maxDiff) * 90;
  };

  return (
    <GlassSurface
      width={baseWidth}
      height={resolvedHeight}
      borderRadius={round ? baseWidth / 2 : 24}
      className={`carousel-container ${round ? "round" : ""}`}
      backgroundOpacity={0.15}
      style={{
        padding: "16px 16px 48px",
      }}
    >
      <div
        ref={containerRef}
        className="carousel-inner"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="carousel-pill">{title}</div>
        <motion.div
          className="carousel-track"
          drag="x"
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${
              currentIndex * trackItemOffset + itemWidth / 2
            }px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationComplete={handleAnimationComplete}
        >
          {carouselItems.map((item, index) => (
            <motion.div
              key={index}
              className={`carousel-item ${round ? "round" : ""}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : `${itemHeight}px`,
                rotateY: calculateRotateY(index, xValue),
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className="carousel-item-top">
                <div className="carousel-item-title">{item.title}</div>
              </div>
              <div className="carousel-item-description">
                {Array.isArray(item.description) ? (
                  <ul className="carousel-description-list">
                    {item.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <motion.div
                key={index}
                className={`carousel-indicator ${
                  currentIndex % items.length === index ? "active" : "inactive"
                }`}
                animate={{
                  scale: currentIndex % items.length === index ? 1.2 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]).isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  baseWidth: PropTypes.number,
  height: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  loop: PropTypes.bool,
  round: PropTypes.bool,
  title: PropTypes.string,
};
