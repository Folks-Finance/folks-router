import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import { defineConfig, squooshImageService } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://blockchain-italia.github.io",
  image: {
    service: squooshImageService(),
  },
  integrations: [
    starlight({
      title: "Folks Router",
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
          label: "SDK",
          collapsed: true,
          items: [
            {
              label: "Overview",
              link: "docs/sdk/overview",
            },
            {
              label: "Methods",
              collapsed: true,
              items: [
                {
                  label: "fetchSwapQuote",
                  link: "docs/sdk/methods/fetch-swap-quote",
                },
                {
                  label: "prepareSwapTransactions",
                  link: "docs/sdk/methods/prepare-swap-transactions",
                },
              ],
            },
          ],
        },
        ...openAPISidebarGroups,
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
      plugins: [
        starlightOpenAPI([
          {
            base: "docs/api",
            label: "API",
            schema: "https://api.folksrouter.io/v1/docs-json",
          },
        ]),
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    react(),
    starlightOpenAPI(),
    playformCompress(),
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
