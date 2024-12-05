"use client";

import AnimatedFooter from "@/components/AnimatedFooter";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import { useLocomotiveScroll } from "@/components/LocomotiveScrollContext";
import Nav from "@/components/Nav";
import { useScrollToTop } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { PropsWithChildren, use, useContext, useEffect, useRef } from "react";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();

  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
}

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
  initial: React.ComponentProps<typeof motion.div>["initial"];
  animate: React.ComponentProps<typeof motion.div>["animate"];
  exit: React.ComponentProps<typeof motion.div>["exit"];
}

function LayoutTransition({ children }: PropsWithChildren) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={segment}
        initial={{ opacity: 0, y: "10%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "10%" }}
        transition={{ duration: 0.5 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useScrollToTop();

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Nav />
      <DarkModeSwitch />
      <LayoutTransition>
        <main className="flex-grow">{children}</main>
        <AnimatedFooter />
      </LayoutTransition>
    </div>
  );
}