"use client";

import Card from "@/components/Card";
import { PROJECTS } from "@/data/cardData";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

interface CardsParallaxContext {
  refs: RefObject<HTMLDivElement>[];
  setRefs: Dispatch<SetStateAction<RefObject<HTMLDivElement>[]>>;
}

export function useCardsParallaxContext() {
  const ctx = useContext(cardsParallaxCtx);
  if (!ctx) {
    throw new Error(
      "useCardsParallaxContext must be used within a CardsParallaxProvider"
    );
  }
  return ctx;
}

const cardsParallaxCtx = createContext<CardsParallaxContext | null>(null);

const CardsParallax = () => {
  const container = useRef<HTMLDivElement>(null);
  const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>(
    new Array(PROJECTS.length)
  );

  return (
    <section
      ref={container}
      // className="md:my-[10rem] my-[8rem] border-2 border-red-700 flex flex-col gap-[30rem]"
      className="md:my-[6rem] my-[4rem] flex flex-col gap-[30rem]"
    >
      <cardsParallaxCtx.Provider value={{ refs, setRefs }}>
        {PROJECTS.map((project, i) => {
          const isLastCard = i === PROJECTS.length - 1; // Check if it's the last card

          return (
            <Card
              key={`p_${i}`}
              index={i}
              container={container}
              {...project}
              isLastCard={isLastCard}
            />
          );
        })}
      </cardsParallaxCtx.Provider>
    </section>
  );
};

export default CardsParallax;
