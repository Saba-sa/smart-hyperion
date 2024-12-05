"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LuLoader2 } from "react-icons/lu";
import { ButtonHTMLAttributes, useRef, useState } from "react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

interface EncryptButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isLoading?: boolean;
}

const EncryptButton = ({ children, isLoading = false }: EncryptButtonProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const [text, setText] = useState(children);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(children);
  };

  return (
    <motion.button
      disabled={isLoading}
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`group relative overflow-hidden rounded-lg formShadow md:text-lg bg-white dark:bg-neutral-900 border border-gray-700 dark:border-neutral-200 px-10 py-2 font-mono font-medium uppercase transition-colors dark:hover:text-blue-400 disabled:pointer-events-none disabled:opacity-50`}
    >
      <div className="relative z-10 flex items-center gap-2">
        <motion.span
          animate={{
            y: !isLoading ? 0 : 6,
            opacity: !isLoading ? 1 : 0,
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </div>
      <SpinOverlay visible={isLoading} />
      <ScanOverlay visible={!isLoading} />
    </motion.button>
  );
};

const ScanOverlay = ({ visible }: { visible: boolean }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-blue-400/0 from-40% via-blue-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </AnimatePresence>
  );
};

const SpinOverlay = ({ visible }: { visible: boolean }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            y: -12,

            opacity: 0,
          }}
          animate={{
            y: 0,

            opacity: 1,
          }}
          exit={{
            y: 12,

            opacity: 0,
          }}
          className="absolute inset-0 grid place-content-center"
        >
          {/* <Icon className={`text-xl duration-300 ${spin && "animate-spin"}`} /> */}
          <LuLoader2 className="size-5 duration-300 animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EncryptButton;
