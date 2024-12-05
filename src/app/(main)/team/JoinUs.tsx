"use client";

import { useLocomotiveScroll } from "@/components/LocomotiveScrollContext";
import { useEffect } from "react";
import ContactUs from "./JoinUsForm"
export default function JoinUs() {
  const { scroll, isReady } = useLocomotiveScroll();
  useEffect(() => {
    if (isReady && scroll) {
      if (window.location.hash === "#join") scroll.scrollTo("#join");
      else scroll.scrollTo("top", { immediate: true, force: true });
    }
  }, [isReady, scroll]);

  return <section id="join" className=""><ContactUs/></section>;
}
