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
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: {
          500: "#66DC7D"
        },
        gray: {
          400: "#BABABA"
        }
      },
      boxShadow: {
        btn: "5px 4px 5px 0px rgba(158,154,154,1)"
      }
    },
  },
  plugins: [],
};
export default config;
