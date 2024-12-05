"use client";

import { BREAKPOINT_QUERIES } from "@/lib/constants";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const SPEED = 1500;

interface SliderProps {
  left?: string;
  progress: MotionValue<number>;
  direction: string;
  text: string;
}

function Slider({ progress, direction, text }: SliderProps) {
  const dir = direction == "left" ? -1 : 1;
  const isMobile = useMediaQuery({ query: BREAKPOINT_QUERIES.mobile });
  const speed = isMobile ? SPEED * 0.5 : SPEED;

  const springX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const translateX = useTransform(springX, [0, 1], [speed * dir, -speed * dir]);

  return (
    <motion.div
      style={{ x: translateX, left: "-500%" }}
      className="relative flex items-center whitespace-nowrap text-[8rem] lg:text-[11rem] xl:text-[18rem]"
    >
      {Array.from(Array(20).keys()).map((i) => (
        <Phrase key={i} text={text} />
      ))}
    </motion.div>
  );
}

function Phrase({ text }: { text: string }) {
  return (
    <div className={"px-5 flex gap-5 uppercase leading-none"}>
      <p className={`font-anton`}>{text}</p>
      <p className="">&middot;</p>
    </div>
  );
}

interface SlidingTextDescProps {
  sliders: Array<{
    direction: string;
    text: string;
  }>;
}

export default function SlidingTextDesc({ sliders }: SlidingTextDescProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  return (
    <section
      ref={container}
      className="w-full overflow-hidden mb-[5rem] md:mb-[10rem] lg:mb-[15rem] pt-[8rem] md:pt-[4rem] lg:pt-[7rem]"
    >
      {sliders.map((s) => (
        <Slider
          key={s.direction}
          direction={s.direction}
          progress={scrollYProgress}
          text={s.text}
        />
      ))}
    </section>
  );
}
