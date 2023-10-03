import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import astroI18next from "astro-i18next";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://blockchain-italia.github.io",
  integrations: [
    starlight({
      title: "",
      logo: {
        src: "/src/assets/images/folks-router-logo.png",
      },
      sidebar: [
        {
          label: "Introduction",
          link: "docs/introduction",
        },
        {
          label: "Fees",
          link: "docs/fees",
        },
        {
          label: "Referral Program",
          link: "docs/referral-program",
        },
        {
          label: "API",
          link: "docs/api",
        },
        {
          label: "Contracts",
          link: "docs/contracts",
        },
      ],
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      defaultLocale: "root",
      social: {
        github: "https://github.com/Folks-Finance/folks-router",
      },
      customCss: ["./src/tailwind.css"],
      favicon: "/favicon.png",
    }),
    tailwind({ applyBaseStyles: false }),
    react(),
    astroI18next(),
    compress(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          // This is a helper to load icons from the file system
          // The files under `./assets/icons` with `.svg` extension will be loaded as it's file name
          // Optionally --> we can also provide a transform callback to change each icon (optional)
          "token-icons": FileSystemIconLoader("./src/assets/icons/token"),
          "social-icons": FileSystemIconLoader("./src/assets/icons/social"),
          "dex-icons": FileSystemIconLoader("./src/assets/icons/dex"),
          "folks-router-advantages-icons": FileSystemIconLoader("./src/assets/icons/folks-router-advantages"),
          "manage-your-assets-icons": FileSystemIconLoader("./src/assets/icons/manage-your-assets"),
          "language-icons": FileSystemIconLoader("./src/assets/icons/flags"),
        },
      }),
    ],
  },
});
