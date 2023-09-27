import StarlightTailwindPlugin from "@astrojs/starlight-tailwind";
import defaultTheme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

const withOpacity = (variableName: string) => `rgb(var(${variableName}) / <alpha-value>)`;

const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1488px",
      // aliases
      tablet: "768px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: withOpacity("--primary"),
        "primary-content": withOpacity("--primary-content"),
        "light-1": withOpacity("--light-1"),
        "light-2": withOpacity("--light-2"),
        "light-content": withOpacity("--light-content"),
        "base-1": withOpacity("--base-1"),
        "base-2": withOpacity("--base-2"),
        "base-3": withOpacity("--base-3"),
        "base-content": withOpacity("--base-content"),
        "widget-timer": withOpacity("--widget-timer"),
        "widget-success": withOpacity("--widget-success"),
        "widget-light-1": withOpacity("--widget-light-1"),
        "widget-light-2": withOpacity("--widget-light-2"),
        "widget-light-content": withOpacity("--widget-light-content"),
        "widget-base-1": withOpacity("--widget-base-1"),
        "widget-base-2": withOpacity("--widget-base-2"),
        "widget-base-content": withOpacity("--widget-base-content"),
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "slide-down-and-fade": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down-and-fade": "slide-down-and-fade 1.5s ease-in-out",
      },
    },
  },
  plugins: [StarlightTailwindPlugin(), require("tailwindcss-3d")],
} satisfies Config;

export default config;
