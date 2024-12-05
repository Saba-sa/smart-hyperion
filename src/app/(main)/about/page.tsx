import SlidingTextDesc from "@/components/SlidingTextDesc";
import { Categories } from "./Categories";
import Clients from "./Clients";
import Hero from "./Hero";
import Team from "./Team";
import { Metadata } from "next";

const SLIDERS = [
  { direction: "right", text: "our expertise" },
  { direction: "left", text: "our expertise" },
];

export const metadata: Metadata = {
  description:
    "Learn more about Smart Hyperion, a London-based team offering expert web design, custom development, and digital marketing solutions for businesses of all sizes.",
  title: "About Us | Smart Hyperion Web Design & Digital Solutions",
};

export default function About() {
  return (
    <>
      <Hero />
      <SlidingTextDesc sliders={SLIDERS} />
      <Categories />
      {/* <Team /> */}
      <Clients />
    </>
  );
}
