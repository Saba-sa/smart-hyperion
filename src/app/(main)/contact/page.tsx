import { Metadata } from "next";
import ContactUs from "./ContactUs";
import FAQ from "./FAQ";
import Hero from "./Hero";

export const metadata: Metadata = {
  title: "Contact Us | Smart Hyperion Web Design & Digital Marketing",
  description:
    "Get in touch with Smart Hyperion for expert web design, development, and digital marketing solutions. Contact our London-based team for personalized support.",
};

export default function Contact() {
  return (
    <>
      <Hero />
      <ContactUs />
      <FAQ />
    </>
  );
}
