// @ts-check
import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import node from "@astrojs/node";
import { loadEnvFile } from "node:process";

loadEnvFile();
console.log("base is", process.env.ASTRO_BASE)

// https://astro.build/config
export default defineConfig({
  integrations: [db()],

  base: process.env.ASTRO_BASE || "/",

  adapter: node({
    mode: "middleware",
  }),
});
