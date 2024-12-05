"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DURATION = 0.25;

const FlipText = ({
  children,
  className,
  lineHeight = 2,
  underline = false,
  manualHover = false,
}: {
  children: string;
  lineHeight?: number;
  className?: string;
  underline?: boolean;
  manualHover?: boolean;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      setHeight(nodeRef.current.getBoundingClientRect().height * 0.075);
    }
  }, []);

  const [height, setHeight] = useState(0);

  return (
    <motion.span
      ref={nodeRef}
      initial={manualHover ? undefined : "initial"}
      whileHover={manualHover ? undefined : "hovered"}
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{
        lineHeight,
      }}
    >
      <div>
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
          }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </div>
      <div className={`absolute inset-0 customUnderline`}>
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
          }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </div>
      <style jsx>{`
        .customUnderline:after {
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
        .customUnderline:hover:after {
          width: 100%;
          left: 0;
        }
      `}</style>
    </motion.span>
  );
};

export default FlipText;
