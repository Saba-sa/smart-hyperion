"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursorContext } from "./CursorFollower";

const DURATION = 0.25;

export default function ContactFooterButton() {
  const { setMode } = useCursorContext();
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const { width } = buttonRef.current.getBoundingClientRect();
      setSize(width);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setMode("none");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMode("default");
  };

  return (
    <motion.button
      ref={buttonRef}
      initial="initial"
      whileHover="hovered"
      // className="relative border-black border-[2px] shadow-sm flex justify-center items-center w-full h-full font-semibold text-black bg-white rounded-full overflow-hidden transition-colors duration-300 ease-in-out hover:text-white"
      className="relative dark:border-white dark:bg-[--footer-bg] bg-white border-black border-[2px] px-6 py-2 shadow-sm flex justify-center font-semibold items-center w-full h-full rounded-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`relative block overflow-hidden whitespace-nowrap z-10 uppercase font-anton`}
        style={{
          lineHeight: 1.5,
        }}
      >
        <div>
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
            }}
            className="inline-block text-slate-900 dark:text-white"
          >
            you
          </motion.span>
        </div>
        <div className="absolute inset-0">
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
            }}
            className="inline-block text-white dark:text-[--footer-bg]"
          >
            me
          </motion.span>
        </div>
      </span>
      <motion.div
        className="absolute bg-slate-900 dark:bg-white"
        initial={{ scale: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          y: isHovered ? "-50%" : "-30%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          borderRadius: "50%",
          width: size,
          height: size,
          top: "50%",
          left: "50%",
          x: "-50%",
        }}
      />
    </motion.button>
  );
}
