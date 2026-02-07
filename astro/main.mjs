import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { launchCleanup } from "./launchCleanup.mjs";

launchCleanup();

const app = express();
const base = process.env.ASTRO_BASE || "/";
app.use(base, express.static("dist/client/"));
app.use(ssrHandler);

app.listen(process.env.ASTRO_PORT || 3000);
