import SlidingTextDesc from "@/components/SlidingTextDesc";
import AboutUs from "./AboutUs";
import InteractiveHero from "./InteractiveHero";
import Marquee from "./Marquee";
import ServicesGrid from "./ServicesGrid";
import { Metadata } from "next";

const SLIDERS = [
  { direction: "right", text: "your needs" },
  { direction: "left", text: "sorted" },
];

export const metadata: Metadata = {
  title: "Smart Hyperion | Web Design, Development & Digital Solutions",
  description:
    "Smart Hyperion specializes in custom website design, development, and affordable digital solutions for businesses. Get expert web and app development services tailored to your needs.",
};

export default function Home() {
  return (
    <>
      <InteractiveHero />
      <SlidingTextDesc sliders={SLIDERS} />
      <AboutUs />
      <Marquee
        className={`text-7xl md:text-9xl lg:text-[10rem] uppercase font-anton md:mb-10 mt-[10rem]`}
      >
        Our Services &middot; &nbsp;
      </Marquee>
      <ServicesGrid />
    </>
  );
}
