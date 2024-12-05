import { CursorFollowerProvider } from "@/components/CursorFollower";
import { DarkModeProvider } from "@/components/DarkModeSwitch";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import LocomotiveScroll from "locomotive-scroll";
import { LocomotiveScrollProvider } from "@/components/LocomotiveScrollContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LocomotiveScrollProvider>
      <ThemeProvider attribute="class">
        <DarkModeProvider>
          <CursorFollowerProvider>{children}</CursorFollowerProvider>
        </DarkModeProvider>
      </ThemeProvider>
    </LocomotiveScrollProvider>
  );
}
