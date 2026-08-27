// @ts-check
import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import bun from "@nurodev/astro-bun";

console.log("base is", Bun.env.ASTRO_BASE);

// https://astro.build/config
export default defineConfig({
  integrations: [db()],

  base: Bun.env.ASTRO_BASE || "/",

  adapter: bun({ port: Bun.env.ASTRO_PORT }),
  output: "server",

  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },

  security: {
    // Deactivated checkOrigin because Cloudflare Tunneling changes url from https to http
    checkOrigin: false,
  },
});
