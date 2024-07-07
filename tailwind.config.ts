import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        s: { max: "767px" },
        m: { min: "768px", max: "1023px" },
        l: { min: "1024px" },
      },
      colors: {
        text: "#333",
        background: "#FFF",
        primary: "#FCA5A5",
        secondary: "#7CB8FF",
        gray: "#777",
        disableText: "#BBB",
        disableBackground: "#EEE",
      },
    },
  },
  plugins: [],
};
export default config;
