"use client";

import {
  AnimatePresence,
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  ValueAnimationTransition,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import FlipText from "./FlipText";
import { useLocomotiveScroll } from "./LocomotiveScrollContext";

const menuVariants = {
  closed: {
    y: "100%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  open: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const lineVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.1 + i * 0.1,
      duration: 0.3,
    },
  }),
};

const linkVariants = {
  closed: { y: "100%" },
  open: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1], // custom easing for smoother motion
    },
  },
};

const topLineVariants = {
  closed: {
    rotate: 0,
    y: "-4px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    y: "4px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    rotate: 45,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const bottomLineVariants = {
  closed: {
    rotate: 0,
    y: "4px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    y: "-4px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    rotate: -45,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const NAV_LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Team",
    href: "/team",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const animateOptions: ValueAnimationTransition = {
  duration: 0.5,
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.5,
};

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const [scope, animate] = useAnimate();
  const lastScrollDirection = useRef<"up" | "down">();
  const { scrollY } = useScroll();

  const inView = useInView(scope, {
    once: false,
  });

  const y = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest === 0 || isOpen) {
      animate(y, 0, animateOptions);
    }
    if (latest < 200) return;

    const isScrollingDown = (scrollY.getPrevious() ?? 0) - latest < 0;
    const scrollDirection = isScrollingDown ? "down" : "up";

    if (lastScrollDirection.current === scrollDirection) return;

    if (isScrollingDown && inView) {
      animate(y, -200, animateOptions);
    } else if (!isScrollingDown && !inView) {
      animate(y, 0, animateOptions);
    }

    lastScrollDirection.current = scrollDirection;
  });

  return (
    <>
      <motion.button
        ref={scope}
        style={{ y }}
        className="md:top-[3.5rem] top-4 fixed right-4 md:right-10 z-30 size-[3rem] md:size-[4rem] bg-white rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={toggleMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        initial="closed"
        animate={isOpen ? "open" : isHovered ? "hover" : "closed"}
      >
        <div className="relative size-5 md:size-7 flex items-center justify-center">
          <motion.span
            className="absolute left-0 w-full h-0.5 bg-black origin-center"
            variants={topLineVariants}
          />
          <motion.span
            className="absolute left-0 w-full h-0.5 bg-black origin-center"
            variants={bottomLineVariants}
          />
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="nav-modal"
            className="fixed h-screen inset-0 text-foreground bg-background flex flex-col z-20 px-3 lg:px-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            data-lenis-prevent
          >
            <ul
              className={`space-y-4 flex-grow w-full pt-[10rem] uppercase font-anton`}
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.li variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="xl:text-[9rem] text-[4rem] md:text-[7rem] text-foreground hover:text-primary transition-colors"
                      onClick={toggleMenu}
                      scroll={false}
                    >
                      <FlipText lineHeight={1}>{link.name}</FlipText>
                    </Link>
                  </motion.li>
                </div>
              ))}
            </ul>
            <motion.div
              variants={lineVariants}
              className="mb-12 flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between text-md lg:text-xl"
            >
              <a href="mailto:enquiries@smarthyperion.com">
                <FlipText
                  lineHeight={1.5}
                  className="flex-grow text-center lg:text-start"
                >
                  enquiries@smarthyperion.com
                </FlipText>
              </a>
              <span className="inline-flex justify-center lg:text-start lg:justify-end gap-10">
                <FlipText lineHeight={1.5}>Twitter</FlipText>
                <FlipText lineHeight={1.5}>Instagram</FlipText>
                {/* <FlipText lineHeight={1.5}>Behance</FlipText>
                <FlipText lineHeight={1.5}>Dribble</FlipText> */}
              </span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
