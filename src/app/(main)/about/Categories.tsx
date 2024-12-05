"use client";

import { SERVICE_SLUGS } from "@/data/services";
import styles from "@/styles/Categories.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

export const Categories = () => {
  return (
    <div className="w-full md:min-h-screen mt-40 flex flex-col">
      {Object.entries(SERVICE_SLUGS).map(([slug, category]) => (
        <div
          key={category}
          className={`${styles.serviceCard} flex items-center py-14 justify-center`}
        >
          <Link href={`/services/${slug}`} scroll={false}>
            <motion.div initial="initial" whileHover="hovered" className="flex">
              <div
                className="relative block overflow-hidden whitespace-nowrap"
                style={{
                  lineHeight: 1,
                }}
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
                >
                  <h1
                    className={`text-3xl w-2/3 md:text-[5rem] lg:text-[8rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
                  >
                    {category}
                  </h1>
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
                >
                  <h1
                    className={`text-3xl w-2/3 md:text-[5rem] lg:text-[8rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
                  >
                    {category}
                  </h1>{" "}
                </motion.span>
              </div>
            </motion.div>
          </Link>
        </div>
      ))}
    </div>
  );
};
