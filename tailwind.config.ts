import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-right": {
          from: {
            transform: "translateX(-50%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "slide-right": "slide-right 45s infinite linear",
        "slide-right-mobile": "slide-right 45s infinite linear", // Untuk media query
      },
    },
  },
  plugins: [],
};
export default config;
