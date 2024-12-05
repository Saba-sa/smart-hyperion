"use client";

import { useLocomotiveScroll } from "@/components/LocomotiveScrollContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export function useScrollToTop() {
  const pathname = usePathname();
  const { scroll, isReady } = useLocomotiveScroll();

  useEffect(() => {
    if (isReady && scroll) {
      console.log("scrolling!!!!", pathname);
      scroll.scrollTo("top", { immediate: true, force: true });
    }
  }, [pathname, isReady, scroll]);
}
