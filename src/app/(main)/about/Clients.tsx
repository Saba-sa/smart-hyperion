"use client";

import { LOGOS } from "@/data/clientLogos";
import { motion } from "framer-motion";
import Image from "next/image";

function LogoWrapper({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse: boolean;
}) {
  return (
    <motion.div
      className="flex whitespace-nowrap"
      // animate={{
      //   x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      // }}
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      // transition={{
      //   x: {
      //     repeat: Infinity,
      //     repeatType: "loop",
      //     duration: 40,
      //     ease: "linear",
      //   },
      // }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear", repeatType: "loop" }}
    >
      {children}
    </motion.div>
  );
}

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden my-8">
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
      <LogoWrapper reverse={reverse}>
        <LogoGroup />
      </LogoWrapper>
    </div>
  );
}
const LogoGroup = () => {
  return (
    <>
      {LOGOS.map((logo) => (
        <motion.div
          key={logo.name}
          className="inline-flex items-center justify-center md:w-[300px] md:h-[300px] w-[200px] h-[200px] mx-2 md:mx-4 border border-gray-900 bg-white dark:bg-black rounded-lg text-4xl relative overflow-hidden group"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="w-full rounded-lg h-full flex items-center justify-center"
            initial={{ borderColor: "rgba(255,255,255,0)" }}
            whileHover={{ borderColor: "rgba(255,255,255,1)" }}
            transition={{ duration: 2 }}
            style={{ borderWidth: 1, borderStyle: "solid" }}
          >
            <div className="flex justify-center items-center w-[7rem] h-[8rem] md:w-[9rem] md:h-[10rem] relative">
              <Image fill src={`/${logo.content}`} alt={logo.name} />
            </div>
          </motion.div>
          <motion.div className="absolute text-sm md:text-lg bottom-0 font-light left-0 right-0 py-4 px-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            {logo.company}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

const Clients = () => {
  return (
    <div className="flex flex-col w-full py-10 md:min-h-screen">
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <h1
          className={`text-5xl md:w-2/3 md:text-[5rem] lg:text-[8rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
        >
          selected clients
        </h1>
        <p className="px-4 md:px-0 md:w-[40%] text-center text-base md:text-2xl lg:text-[1.8rem]">
          We Are Proud to Have Built Strong Partnerships With a Wide Range of
          Clients
        </p>
      </div>
      <div className="w-full overflow-hidden py-12 relative">
        <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        <LogoRow />
        <LogoRow reverse />
      </div>
    </div>
  );
};

export default Clients;
