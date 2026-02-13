import { handle as ssrHandle } from "./dist/server/entry.mjs";
import { launchCleanup } from "./launchCleanup.mjs";
import { loadEnvFile } from "node:process";
import { serveDir } from "jsr:@std/http";

loadEnvFile();
launchCleanup();
console.log("Cleanup service launched !");

async function handler(req) {
    const uuid = crypto.randomUUID();
    console.log(uuid, "- RECV", req.method, req.url);
    const start = performance.now();
        
    let res = await serveDir(req, { fsRoot: "./dist/client", quiet: true })
    if (!res.ok) {
        res = await ssrHandle(req);
    }
    
    const duration = performance.now() - start;
    console.log(uuid, "- SENT", res.status, req.url, "in", duration.toFixed(3), "ms");
    
    return res;
}

const base = process.env.ASTRO_BASE || "/";
const port = process.env.ASTRO_PORT || 3000;
console.log("Starting server on port", port, "with base", base);
Deno.serve({ port }, handler);
console.log("Server started on port", port);
