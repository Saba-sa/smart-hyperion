"use client";

import ScrollToExplore from "@/components/ScrollToExplore";
import { motion } from "framer-motion";

const lineVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1], // custom easing for smoother motion
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};
const headingText = ["your all in one", "IT solutions"];
const paragraphText = "Smart Hyperion";

const Hero = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for a smoother feel
          // Alternatively, use a named easing function:
          // ease: "easeOutQuart",
        }}
        style={{
          backgroundImage: "url('/herobg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 7%, black 100%)", // Adjust the percentage to change the starting point
        }}
      />
      <motion.div
        className="w-full px-4 md:px-10 flex mt-40 md:mt-80 gap-6 md:gap-8 items-center justify-center flex-col relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1
          className={`text-6xl md:text-[5rem] lg:text-[7rem] text-white leading-none tracking-[-0.010em] text-center uppercase font-anton`}
        >
          {headingText.map((text, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div variants={lineVariants}>{text}</motion.div>
            </div>
          ))}
        </h1>
        <div className="overflow-hidden w-full md:w-2/3">
          <motion.p
            className={`text-white text-xl md:text-3xl lg:text-3xl text-center uppercase font-anton`}
            variants={lineVariants}
          >
            {paragraphText}
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-1 cursor-pointer transition-opacity duration-300 flex-row items-center"
            variants={lineVariants}
          >
            <ScrollToExplore />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
