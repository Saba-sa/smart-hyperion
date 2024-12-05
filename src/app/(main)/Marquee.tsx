"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  children: string;
  speed?: number;
  className?: string;
}

export default function Marquee({
  children = "This is an infinitely scrolling text. ",
  speed = 50,
  className = "",
}: MarqueeProps) {
  const [repeatedText, setRepeatedText] = useState(children);
  const [loopWidth, setLoopWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateText = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;

        // Calculate how many times to repeat the text to fill the screen width
        const repetitions = Math.ceil(containerWidth / textWidth) + 1;
        setRepeatedText(children.repeat(repetitions));

        // Set the loop width to the full width of the repeated text
        setLoopWidth(textWidth * repetitions);
      }
    };

    updateText();
    window.addEventListener("resize", updateText);
    return () => window.removeEventListener("resize", updateText);
  }, [children]);

  const duration = useMemo(() => loopWidth / speed, [loopWidth, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        animate={{ x: [-loopWidth / 2, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        }}
        className="inline-block"
      >
        <span ref={textRef} className="inline-block">
          {repeatedText}
        </span>
        <span className="inline-block">{repeatedText}</span>
      </motion.div>
    </div>
  );
}
