"use client";

import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const ParallaxImage = () => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-[70vh] md:h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[100vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src="/team.jpg"
            fill
            alt="image"
            className="px-4 md:px-10"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxImage;
