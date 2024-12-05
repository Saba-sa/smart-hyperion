import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
      }
    },
    fontFamily: {
      sans: ["var(--font-geist-sans)"],
      anton: ["var(--font-anton)"],
    }
  }
};
export default config;
