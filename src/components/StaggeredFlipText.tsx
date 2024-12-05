"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const DURATION = 0.25;
const STAGGER = 0.025;

const StaggeredFlipText = ({
  children,
  className,
  underline = false,
}: {
  children: string;
  className?: string;
  underline?: boolean;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      setHeight(nodeRef.current.getBoundingClientRect().height * 0.075);
    }
  }, []);

  const [height, setHeight] = useState(0);

  const words = children.split(" ");

  const renderWords = (
    renderCallback: (key: string, letter: string, i: number) => React.ReactNode
  ) => {
    return words.reduce<{ i: number, rendered: ReactNode[] }>((acc, curr, idx) => {
      const letters = curr
        .split("")
        .map((letter, letterIdx) =>
          renderCallback(`${idx}-${letterIdx}`, letter, acc.i + letterIdx)
        );
      const renderedWord = [...letters, <span key={`${idx}-space`}> </span>];
      return { i: acc.i + curr.length, rendered: [...acc.rendered, ...renderedWord] };
    }, { i: 0, rendered: [] }).rendered;
  };

  return (
    <motion.span
      ref={nodeRef}
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{
        lineHeight: 2,
      }}
    >
      <div>
        {renderWords((key, letter, i) => (
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
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i
            }}
            className="inline-block"
            key={key}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className={`absolute inset-0 custom-underline`}>
        {renderWords((key, letter, i) => (
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
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i
            }}
            className="inline-block"
            key={key}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <style jsx>{`
        .custom-underline:after {
          background: none repeat scroll 0 0 transparent;
          bottom: 0;
          content: "";
          display: ${underline ? "block" : "none"};
          height: ${height}px;
          left: 50%;
          position: absolute;
          background: #fff;
          transition: width 0.3s ease 0s, left 0.3s ease 0s;
          width: 0;
        }
        .custom-underline:hover:after {
          width: 100%;
          left: 0;
        }
      `}</style>
    </motion.span>
  );
};

export default StaggeredFlipText;
