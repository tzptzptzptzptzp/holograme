import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
