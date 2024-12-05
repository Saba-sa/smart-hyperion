"use client";
import { motion } from "framer-motion";

const Hero = () => {
  const headingText = ["let's work", "together"];

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
    <div className="flex w-full justify-center mt-60 pb-20 flex-col overflow-hidden">
      <motion.div
        className="w-full px-10 md:px-10 flex gap-6 md:gap-8 items-center justify-center flex-col relative z-10"
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
        <div className="overflow-hidden flex flex-col gap-20 mt-[2rem] w-full md:w-1/2">
          <motion.p
            className="text-base font-light md:text-3xl text-center"
            variants={lineVariants} // Use the same lineVariants for paragraphs
          >
            Reach out through the form, and we&apos;ll respond within the next
            24 hours. If you prefer to email instead, you can reach out to us at{" "}
            <a className="font-medium" href="mailto:enquiries@smarthyperion.com">
              enquiries@smarthyperion.com
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
