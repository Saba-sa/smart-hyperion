"use client";

import FlipText from "@/components/FlipText";
import { SERVICE_SLUGS } from "@/data/services";
import styles from "@/styles/ServicesGrid.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

function ServiceCard({ title, slug }: { title: string, slug: string }) {
  const text = useMemo(() => title.trim().split(" "), [title]);

  return (
    <div className={`${styles.gridCard} relative`}>
      <Link href={`/services/${slug}`} scroll={false}>
        <motion.div
          initial="initial"
          whileHover="hovered"
          className={`text-slate-900 dark:text-white relative h-full flex gap-2 flex-wrap text-center justify-center items-center text-3xl md:text-4xl lg:text-6xl xl:text-7xl py-6`}
        >
          {text.map((t, i) => (
            <FlipText manualHover lineHeight={1} key={i}>
              {t}
            </FlipText>
          ))}
        </motion.div>
      </Link>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <div
      // className={`flex-grow grid overflow-hidden grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] lg:grid-cols-3 uppercase justify-center font-anton`}
      className={`mb-16 flex-grow grid overflow-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 uppercase justify-center font-anton`}
    >
      {Object.entries(SERVICE_SLUGS).map(([slug, title], i) => (
        <ServiceCard key={i} title={title} slug={slug} />
      ))}
    </div>
  );
}
