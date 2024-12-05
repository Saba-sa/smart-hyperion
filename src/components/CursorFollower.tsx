"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { useDarkMode } from "./DarkModeSwitch";

const DEFAULT_SIZE = 35;
const MAX_SIZE = 150;

interface CursorContextType {
  mode: "default" | "blur" | "none";
  setMode: (mode: "default" | "blur" | "none") => void;
}

const cursorCtx = createContext<CursorContextType>({
  mode: "default",
  setMode: () => {},
});

export function useCursorContext() {
  return useContext(cursorCtx);
}

export function CursorFollowerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"default" | "blur" | "none">("default");

  return (
    <cursorCtx.Provider value={{ mode, setMode }}>
      <CursorFollower />
      {children}
    </cursorCtx.Provider>
  );
}

export default function CursorFollower() {
  const darkMode = useDarkMode();
  const { mode } = useCursorContext();
  const [isHovered, setIsHovered] = useState(false);
  const [cursorSize, setCursorSize] = useState(DEFAULT_SIZE);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 40, stiffness: 300, mass: 0.9 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const element = document.elementFromPoint(clientX, clientY);
      const isPointer = element
        ? window.getComputedStyle(element).cursor === "pointer"
        : false;
      setIsHovered(isPointer);
      let newCursorSize = isPointer
        ? 0.5 * (element?.clientWidth ?? DEFAULT_SIZE * 2)
        : DEFAULT_SIZE;
      if (newCursorSize > MAX_SIZE) {
        newCursorSize = MAX_SIZE;
      } else if (newCursorSize < DEFAULT_SIZE) {
        newCursorSize = DEFAULT_SIZE * 2;
      }
      setCursorSize(newCursorSize);

      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouse.x, mouse.y, cursorSize]);

  // const mainColour = darkMode ? "--cursor-dark" : "--cursor-light";
  const mainColour = "--cursor-light";
  const bgColour = "--primary";

  const variants = {
    default: {
      border: isHovered
        ? "3px solid rgba(var(--primary), 0.2)"
        : `3px solid rgba(var(${mainColour}), 0.7)`,
      backgroundColor: isHovered
        ? `rgba(var(${bgColour}), 0.2)`
        : `rgba(var(${bgColour}), 0)`,
      width: cursorSize,
      height: cursorSize,
    },
    none: {
      border: isHovered
        ? `3px solid rgba(var(${mainColour}), 0)`
        : `3px solid rgba(var(${mainColour}), 0.7)`,
      backgroundColor: "rgba(var(--primary), 0)",
      width: cursorSize,
      height: cursorSize,
    },
    blur: {
      border: isHovered
        ? "3px solid rgba(var(--primary), 0.2)"
        : `3px solid rgba(var(${mainColour}), 0.7)`,
        backgroundColor: isHovered
        ? `rgba(var(${bgColour}), 0.2)`
        : `rgba(var(${bgColour}), 0)`,
      backdropFilter: isHovered ? "blur(8px)" : "none",
      width: cursorSize,
      height: cursorSize,
    },
  };

  return (
    <div>
      <motion.div
        className="pointer-events-none z-20 fixed w-[15px] h-[15px] rounded-full flex items-center justify-center text-white"
        aria-hidden="true"
        initial={{
          left: -DEFAULT_SIZE,
          top: -DEFAULT_SIZE,
        }}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
        variants={variants}
        animate={mode}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isHovered && mode === "blur" ? "View" : null}
      </motion.div>
    </div>
  );
}
