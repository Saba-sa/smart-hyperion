"use client";

import type LocomotiveScroll from "locomotive-scroll";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

interface LocomotiveScrollContextType {
  scroll: LocomotiveScroll | null;
  isReady: boolean;
}

const scrollCtx = createContext<LocomotiveScrollContextType | null>(null);

export function useLocomotiveScroll() {
  const ctx = useContext(scrollCtx);
  if (!ctx) {
    throw new Error(
      "useLocomotiveScroll must be used within a LocomotiveScrollProvider"
    );
  }

  return ctx;
}

export function LocomotiveScrollProvider({ children }: PropsWithChildren) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollRef.current = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.2,
          wheelMultiplier: 0.9,
        },
      });
      setIsReady(true);
    })();
    return () => {
      scrollRef.current?.destroy();
      setIsReady(false);
    };
  }, []);

  return (
    <scrollCtx.Provider value={{ scroll: scrollRef.current, isReady }}>
      {children}
    </scrollCtx.Provider>
  );
}
