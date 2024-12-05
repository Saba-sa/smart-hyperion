"use client";

import { screens } from "tailwindcss/defaultTheme";

export const BREAKPOINT_QUERIES = {
  mobile: `(max-width: ${screens.sm})`,
  desktop: `(max-width: ${screens.md})`,
};
