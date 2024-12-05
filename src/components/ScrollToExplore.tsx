"use client";

import { BREAKPOINT_QUERIES } from "@/lib/constants";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { IoArrowDown } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

function FlippingIcon() {
  // const [isHovered, setIsHovered] = useState(false);
  // const isMobile = useMediaQuery({ query: BREAKPOINT_QUERIES.mobile });

  // useEffect(() => {
  //   if (isMobile) {
  //     const timeout = setTimeout(() => {
  //       const interval = setInterval(() => {
  //         setIsHovered((prev) => !prev);
  //       }, 1000);

  //       return () => clearInterval(interval);
  //     }, 500);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isMobile]);

  return (
    <div
      className="relative block overflow-hidden whitespace-nowrap"
      style={{
        lineHeight: 1,
      }}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
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
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="inline-block"
        // animate={isHovered ? "hovered" : "initial"}
      >
        <IoArrowDown className="w-4 h-4 md:w-5 md:h-5 mt-[0.1rem] md:mt-1" />
      </motion.span>
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
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="inline-block absolute inset-0"
        // animate={isHovered ? "hovered" : "initial"}
      >
        <IoArrowDown className="w-4 h-4 md:w-5 md:h-5 mt-[0.1rem] md:mt-1" />
      </motion.span>
    </div>
  );
}

export default function ScrollToExplore() {
  // const scrollY = useMotionValue(0);
  // const smoothScrollY = useSpring(scrollY, {
  //   damping: 50,
  //   stiffness: 400,
  // });
  const isMobile = useMediaQuery({ query: BREAKPOINT_QUERIES.mobile });

  const handleScrollToExplore = () => {
    if (isMobile) return;
    const element = document.getElementById("about");

    if (element) {
      const targetPosition =
        element.offsetTop - element.getBoundingClientRect().height;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      // animate(scrollY, targetPosition, {
      //   duration: 2,
      //   onUpdate: (latest) => {
      //     window.scrollTo({
      //       top: latest,
      //     });
      //   },
      // });
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="flex"
      onClick={handleScrollToExplore}
    >
      <FlippingIcon />
      <div className="text-sm md:text-base lg:text-xl font-bold mx-1">
        Scroll To Explore
      </div>
      <FlippingIcon />
    </motion.div>
  );
}
