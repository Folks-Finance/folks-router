import StarlightTailwindPlugin from "@astrojs/starlight-tailwind";
import defaultTheme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

// Generated color palette (https://uicolors.app/create) for "--primary"
const accent = {
  "50": "#f0f7ff",
  "100": "#e0eefe",
  "200": "#b9ddfe",
  "300": "#7cc2fd",
  "400": "#36a4fa",
  "500": "#0c89eb",
  "600": "#0069c7", // <-- primary
  "700": "#0154a3",
  "800": "#064886",
  "900": "#0b3d6f",
  "950": "#07264a",
};
// Generated color palette (https://uicolors.app/create) for "--base-1"
const gray = {
  "50": "#f7f7f8",
  "100": "#eeeef0",
  "200": "#d8d9df",
  "300": "#b6b7c3",
  "400": "#8f91a1",
  "500": "#717386",
  "600": "#5b5d6e",
  "700": "#4a4a5a",
  "800": "#40414c",
  "900": "#383842",
  "950": "#232329", // <-- base-1
};

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
        // Starlight Colors
        accent,
        gray,
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
