"use client";

import { useCardsParallaxContext } from "@/app/(main)/CardsParallax";
import {
  motion,
  MotionValue,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

const lineVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

interface CardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  // targetScale: number;
  // progress: MotionValue<number>;
  // range: [number, number];
  isLastCard: boolean;
  container: RefObject<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  // targetScale,
  // progress,
  // range,
  index,
  container,
  isLastCard,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // const scale = useTransform(progress, range, [1, targetScale]);
  const { refs, setRefs } = useCardsParallaxContext();
  const { scrollYProgress } = useScroll({
    target: !isLastCard ? refs[index + 1] : undefined,
    offset: ["start end", "start start"],
  });

  const [blur, setBlur] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setBlur(value * 20);
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
    mass: 0.1,
  });
  const scale = useTransform(smoothScroll, [0, 1], [1, 0.75]);

  useEffect(() => {
    if (cardRef.current) {
      setRefs((prev) => {
        return [...prev.slice(0, index), cardRef, ...prev.slice(index + 1)];
      });
    }
  }, [index, setRefs]);

  return (
    <motion.div
      ref={cardRef}
      // className="h-screen flex items-center justify-center sticky top-0 border-2 border-blue-700"
      className="h-screen flex items-center justify-center sticky top-0 p-3 md:p-[2rem]"
    >
      <motion.div
        className="flex-grow flex flex-col shadow-3xl items-center bg-white relative w-full h-full rounded-xl overflow-hidden"
        style={{
          // top: `calc(-5vh + ${i * 25}px)`,
          scale: !isLastCard ? scale : 1,
          filter: !isLastCard ? `blur(${blur}px)`: "blur(0px)",
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* <div className="absolute w-full h-full top-0 bg-gradient-to-b from-transparent to-black/70" /> */}
        <div className="absolute w-full h-full top-0" style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), 45%, rgba(0, 0, 0, 0.9))",
        }} />
        <div className="relative w-full flex items-center justify-center h-full flex-col gap-2 mb-10 z-10 p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            className="flex items-center gap-2 overflow-hidden flex-col relative mt-[50%] xl:mt-[25%]"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            <motion.h2
              variants={lineVariants}
              className={`text-center uppercase text-6xl md:text-8xl m-0 text-white font-anton`}
            >
              {title}
            </motion.h2>
            <motion.p
              variants={lineVariants}
              className="md:text-xl text-base md:w-2/3 leading-tight text-center text-white"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
