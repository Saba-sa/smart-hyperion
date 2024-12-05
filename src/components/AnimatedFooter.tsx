"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ContactFooterButton from "./ContactFooterButton";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import FlipText from "./FlipText";

const mainFooterTitle = ["It All Starts", "With"];

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

export default function AnimatedFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["100%", "97%"]);
  const height = useTransform(scrollYProgress, [0, 1], ["100%", "97%"]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0rem", "1rem"]
  );

  return (
    <footer
      className="flex justify-center items-center w-full flex-col lg:py-8 py-2 h-screen"
      ref={ref}
    >
      <motion.div
        className="text-slate-900 bg-white dark:text-white dark:bg-[--footer-bg] flex flex-col flex-grow"
        style={{ width, height, borderRadius }}
      >
        <div className="p-8 pt-10 flex-col flex flex-grow">
          <div className="flex lg:justify-evenly justify-center sm:items-center sm:flex-col-reverse lg:flex-row lg:px-10">
            <span className="font-bold lg:flex-1 lg:text-xl hidden sm:inline">
              Tech Solutions
            </span>
            <span
              className={`font-bold lg:flex-1 lg:text-center text-2xl sm:order-1 lg:-order-none lg:text-3xl uppercase font-anton`}
            >
              Smart Hyperion
            </span>
            <span className="font-bold lg:flex-1 lg:text-end lg:text-xl hidden sm:inline">
              Based in London
            </span>
          </div>
          <motion.div
            className="flex flex-1 flex-col justify-center items-center w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* <div className="text-xl overflow-hidden sm:inline hidden">
              <motion.div
                className={`font-bold leading-none text-center text-nowrap`}
                variants={lineVariants}
                viewport={{ once: true }}
              >
                <h1>Have a Project in Mind?</h1>
              </motion.div>
            </div> */}
            {mainFooterTitle.map((title, index) => (
              <div key={index} className="overflow-hidden md:w-full">
                <motion.div
                  className={`text-[4rem] md:text-[8rem] lg:text-[11rem] uppercase leading-none text-center font-anton px-5 md:p-0 lg:px-[10rem]`}
                  variants={lineVariants}
                  viewport={{ once: true }}
                >
                  <h2>{title}</h2>
                </motion.div>
              </div>
            ))}
            <div className="overflow-hidden mt-4">
              <motion.div
                className="lg:w-[14rem] lg:h-[5rem] lg:text-3xl text-2xl"
                variants={lineVariants}
                viewport={{ once: true }}
              >
                <Link href="/contact" scroll={false}>
                  <ContactFooterButton />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <div className="flex lg:flex-row flex-col justify-between text-base md:text-2xl md:font-bold">
            {/* <div className="flex-1"></div> */}
            <div className="hidden md:flex justify-evenly">
              <div className="flex flex-col text-center gap-5 md:inline-flex md:flex-row flex-1 md:justify-evenly">
                <FlipText>Twitter</FlipText>
                <FlipText>Instagram</FlipText>
              </div>
              {/* <div className="flex flex-col text-center md:inline-flex md:flex-row flex-1 md:justify-evenly">
                <span>Behance</span>
                <span>Dribble</span>
              </div> */}
            </div>
            <div className="text-center text-sm lg:text-end">
              <span>Copyright Smart Hyperion Limited © 2024</span>
            </div>
            <div className="w-full md:hidden flex gap-2 items-center justify-center py-2">
              <FaTwitter className="text-lg" />
              <FaInstagram className="text-lg" />
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
