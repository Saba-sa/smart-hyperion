import { Metadata } from "next";
import Hero from "./Hero";
import JoinUs from "./JoinUs";
import Team from "./Team";

export const metadata: Metadata = {
  description:
    "Learn more about the dedicated team at Smart Hyperion, offering expert web design, custom development, and digital marketing solutions for businesses of all sizes.",
  title: "Our Team | Smart Hyperion Web Design & Digital Solutions",
};


export default function Page() {

  return (
    <>
      <Hero />
      <Team />
      {/* <JoinUs /> */}
    </>
  )
}