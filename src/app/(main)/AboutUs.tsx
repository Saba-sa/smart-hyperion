"use client";

import FlipText from "@/components/FlipText";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="flex md:py-20 px-4 pt-28 flex-col justify-center items-center w-full"
    >
      <div className={`lg:w-[70%] font-anton text-center uppercase px-2`}>
        <p className="text-3xl lg:text-5xl">About Us</p>
        <p className="text-2xl lg:text-4xl text-center leading-tight pt-10">
          Our team is committed to delivering exceptional results. From concept
          to completion, we work closely with you to understand your unique
          needs and goals. Whether you&apos;re a small startup or a large
          enterprise, we have the skills and resources to help you achieve your
          digital objectives.
        </p>
      </div>
      <div className="py-5 lg:py-12">
        <Link href="/about" scroll={false}>
          <FlipText
            className={`font-anton text-slate-900 dark:text-blue-200 transition-colors duration-300 hover:text-white text-xl lg:text-2xl uppercase`}
            underline
          >
            More About Us
          </FlipText>
        </Link>
      </div>
    </section>
  );
}
