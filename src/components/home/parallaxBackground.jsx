import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-white/20">
      <div className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent z-10 pointer-events-none" />
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Cloud Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/cloud.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            opacity: 0.6,
            y: mountain3Y,
          }}
        />
        {/* Cloud Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/cloud.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            opacity: 0.5,
            y: mountain2Y,
          }}
        />
        {/* Cloud Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/cloud.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            opacity: 0.4,
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
