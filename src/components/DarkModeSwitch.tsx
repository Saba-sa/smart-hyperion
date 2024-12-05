"use client";

import styles from "@/styles/Switch.module.css";
import { motion } from "framer-motion";
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

interface DarkModeContextType {
  darkMode: boolean;
  toggleSwitch: () => void;
}

const darkModeCtx = createContext<DarkModeContextType>({
  darkMode: false,
  toggleSwitch: () => {},
});

export function useDarkModeContext() {
  return useContext(darkModeCtx);
}

export function useDarkMode() {
  return useDarkModeContext().darkMode;
}

export function DarkModeProvider({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleSwitch = () => {
    document.documentElement.classList.toggle("dark");
    if (darkMode) {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      (localStorage.theme === "dark" ||
        (!localStorage.theme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches))
    ) {
      setDarkMode(true);
    }
  }, []);

  return (
    <darkModeCtx.Provider value={{ darkMode, toggleSwitch }}>
      {children}
    </darkModeCtx.Provider>
  )
}

export default function DarkModeSwitch() {
  const { darkMode, toggleSwitch } = useDarkModeContext();

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 2,
  };

  return (
    <div
      className={`${styles.switch} border absolute top-4 left-4 z-10 ${
        darkMode ? styles.switchDark : styles.switchLight
      }`}
      data-ison={darkMode}
      onClick={toggleSwitch}
    >
      <motion.div
        className={`${styles.handle} border flex justify-center items-center ${
          darkMode ? styles.handleDark : styles.handleLight
        }`}
        layout
        transition={spring}
      >
        {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </motion.div>
    </div>
  );
}
