// @ts-check
import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import deno from "@deno/astro-adapter";
import { loadEnvFile, env } from "node:process"; // Using Node env for Astro

loadEnvFile();
console.log("base is", env.ASTRO_BASE);

// https://astro.build/config
export default defineConfig({
  integrations: [db()],

  base: env.ASTRO_BASE || "/",

  adapter: deno({ start: false }),
  output: "server",

  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
});
