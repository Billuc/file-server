import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { launchCleanup } from "./launchCleanup.mjs";
import { loadEnvFile } from "node:process";

loadEnvFile();
launchCleanup();
console.log("Cleanup service launched !");

const base = process.env.ASTRO_BASE || "/";
console.log("Using base", base);

const app = express();

app.use(function (req, res, next) {
    const uuid = crypto.randomUUID();
    console.log(uuid, "- RECV", req.method, req.url);
    const timer = console.time(uuid);
    
    res.on("finish", () => {
        console.log(uuid, "- SENT", res.statusCode, req.url);
        console.timeEnd(uuid);
    });
    next();
});

app.use(base, express.static("dist/client/"));
app.use(ssrHandler);

const port = process.env.ASTRO_PORT || 3000;
app.listen(port);
console.log("Server started on port", port);
