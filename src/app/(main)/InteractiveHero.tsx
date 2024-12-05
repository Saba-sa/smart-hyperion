"use client";

import { useDarkMode } from "@/components/DarkModeSwitch";
import ScrollToExplore from "@/components/ScrollToExplore";
import { motion, useAnimate } from "framer-motion";
import { MouseEventHandler, useEffect, useState } from "react";

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
const headingText = ["Professional Web Design", "and Development", "Services for Businesses"];
const paragraphText = "Smart Hyperion";

const GridHoverHero = () => {
  const darkMode = useDarkMode();
  const [scope, animate] = useAnimate();

  const [size, setSize] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    generateGridCount();
    window.addEventListener("resize", generateGridCount);

    return () => window.removeEventListener("resize", generateGridCount);
  }, []);

  const generateGridCount = () => {
    const columns = Math.floor(document.body.clientWidth / 75);
    const rows = Math.floor(document.body.clientHeight / 75);

    setSize({
      columns,
      rows,
    });
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    const eventTarget = e.target as EventTarget & { id: string };
    const id = `#${eventTarget.id}`;
    animate(id, { background: `rgba(var(${darkMode ? "--light-grid" : "--dark-grid"}), 0)` }, { duration: 1.5 });
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    const eventTarget = e.target as EventTarget & { id: string };
    const id = `#${eventTarget.id}`;
    animate(id, { background: `rgba(var(${darkMode ? "--light-grid" : "--dark-grid"}), 1)` }, { duration: 0.15 });
  };

  return (
    <div className="h-screen w-full relative">
      <div
        ref={scope}
        className="bg-background w-full h-full grid grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
      >
        {[...Array(size.rows * size.columns)].map((_, i) => (
          <div
            key={i}
            id={`square-${i}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="h-full w-full border-[1px] border-background"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8">
        <motion.div
          className="w-full px-4 md:px-10 flex mt-40 md:mt-80 gap-6 md:gap-8 items-center justify-center flex-col relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            className={`text-6xl md:text-[5rem] lg:text-[7rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
          >
            {headingText.map((text, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div variants={lineVariants}>{text}</motion.div>
              </div>
            ))}
          </h1>
          <div className="overflow-hidden w-full md:w-2/3">
            <motion.p
              className={`text-xl md:text-3xl lg:text-3xl text-center uppercase font-anton`}
              variants={lineVariants}
            >
              {paragraphText}
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="pointer-events-auto flex gap-1 cursor-pointer transition-opacity duration-300 flex-row items-center"
              variants={lineVariants}
            >
              <ScrollToExplore />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GridHoverHero;
