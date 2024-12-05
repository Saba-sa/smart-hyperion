"use client";

import { useDarkMode } from "@/components/DarkModeSwitch";
import { FAQ_DATA } from "@/data/faq";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// import { BsPlusLg } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";

const PlusMinusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    className="w-4 h-4 md:w-8 md:h-8" // Set size for mobile and desktop
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <motion.path
      d="M12 5V19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ scaleY: isOpen ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M5 12H19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const FAQ = () => {
  const darkMode = useDarkMode();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openColour = darkMode ? "rgba(45, 45, 45, 1)" : "#fff"; ;
  const closedColour = darkMode ? "rgba(30, 30, 30, 1)" : "#fff";
  
  return (
    <div className="flex w-full justify-center px-4 md:px-0 md:py-20 pb-40 flex-col overflow-hidden">
      <div className="w-full px-10 md:px-10 flex gap-6 md:gap-8 items-center justify-center flex-col relative z-10">
        <h1
          className={`text-6xl md:w-2/3 md:text-[5rem] lg:text-[8rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
        >
          faq&apos;s
        </h1>
        <div className="overflow-hidden flex flex-col w-full md:w-1/2">
          <p className="text-lg md:text-2xl text-center">
            Have Questions? Check Out Our FAQ&apos;s Section for Quick{" "}
            <br className="md:block hidden" />
            and Helpful Answers
          </p>
        </div>
      </div>
      <div className="w-full pt-10 md:px-[10rem] xl:px-[20rem] mx-auto space-y-4">
        {FAQ_DATA.map((item, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              backgroundColor:
                openIndex === index
                  ? openColour
                  : closedColour,
            }}
            transition={{ duration: 0.3 }}
            className="rounded overflow-hidden"
          >
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between items-center w-full px-6 py-6 md:py-10 text-left" // Adjust padding if necessary
            >
              <span className="md:text-2xl text-base pr-8 md:font-medium">
                {item.question}
              </span>
              <div className="flex-shrink-0 text-3xl leading-none">
                {" "}
                {/* <PlusMinusIcon isOpen={openIndex === index} /> */}
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="pt-6 pb-10 text-sm md:text-xl font-light border-t border-gray-500 mx-6"
                  >
                    {item.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
