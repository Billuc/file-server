import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import config from "./astro.config.mjs";
import { launchCleanup } from "./launchCleanup.mjs";

launchCleanup();

const app = express();
const base = config.base || "/";
app.use(base, express.static("dist/client/"));
app.use(ssrHandler);

app.listen(3000);
