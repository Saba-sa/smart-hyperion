"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const headingText = ["Meet our team"];

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 }, // Start off-screen and invisible
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1], // Custom easing for smoother motion
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <div className="flex w-full md:min-h-screen justify-center pb-40 flex-col overflow-hidden">
      <motion.div
        className="w-full px-10 md:px-10 flex md:mt-80 mt-[15rem] gap-6 md:gap-8 items-center justify-center flex-col relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1
          className={`text-6xl md:w-2/3 md:text-[5rem] lg:text-[9rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
        >
          {headingText.map((text, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div variants={lineVariants}>{text}</motion.div>
            </div>
          ))}
        </h1>
        <div className="overflow-hidden flex flex-col gap-10 md:gap-20 w-full md:w-1/2">
          {[
            "The passionate minds behind unique, effective designs, committed to bringing your vision to life.",
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-xl md:text-3xl text-center"
              variants={lineVariants} // Use the same lineVariants for paragraphs
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
