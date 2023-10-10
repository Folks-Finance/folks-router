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
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
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
        // Tremor Colors
        tremor: {
          brand: {
            faint: "rgb(var(--primary))",
            muted: "#b9ddfe",
            subtle: "#36a4fa",
            DEFAULT: "rgb(var(--primary))",
            emphasis: "#0154a3",
            inverted: "rgb(var(--base-2))",
          },
          background: {
            muted: "rgb(var(--base-1))",
            subtle: "rgb(var(--base-1))",
            DEFAULT: "rgb(var(--base-2))",
            emphasis: "#4a4a5a",
          },
          border: {
            DEFAULT: "rgb(var(--light-1)/0.3)",
          },
          ring: {
            DEFAULT: "transparent",
          },
          content: {
            subtle: "rgb(var(--light-2))",
            DEFAULT: "rgb(var(--light-1))",
            emphasis: "rgb(var(--base-content))",
            strong: "rgb(var(--base-content))",
            inverted: "rgb(var(--light-content))",
          },
        },
      },
      boxShadow: {
        "tremor-card":
          "0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 6px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.15)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.375rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
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
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [StarlightTailwindPlugin(), require("tailwindcss-3d")],
} satisfies Config;

export default config;
