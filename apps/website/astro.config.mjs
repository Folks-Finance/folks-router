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
      title: "Folks Router",
      favicon: "/favicon.png",
      logo: {
        src: "/src/assets/images/folks-router-logo.png",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        it: {
          label: "Italiano",
        },
      },
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "SDK",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Install", link: "docs/sdk/install" },
          ],
        },
        {
          label: "Swap Widget",
          autogenerate: { directory: "docs/swap-widget" },
        },
      ],
      customCss: ["./src/tailwind.css"],
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
