import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { launchCleanup } from "./launchCleanup.mjs";
import { loadEnvFile } from "node:process";

loadEnvFile();
launchCleanup();
console.log("Cleanup service launched !");

const base = process.env.ASTRO_BASE || "/";
console.log("using base", base);

const app = express();
app.use(base, express.static("dist/client/"));
app.use(ssrHandler);

const port = process.env.ASTRO_PORT || 3000;
app.listen(port);
console.log("Server started on port", port);
