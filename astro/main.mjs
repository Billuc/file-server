import { handle as ssrHandle } from "./dist/server/entry.mjs";
import { launchCleanup } from "./launchCleanup.mjs";
import path from "node:path";

launchCleanup();
console.log("Cleanup service launched !");

const base = Bun.env.ASTRO_BASE || "/";
const port = parseInt(Bun.env.ASTRO_PORT || "3000");
console.log("Starting server on port", port, "with base", base);

function removeBase(pathname) {
  if (pathname.startsWith(base)) {
    return pathname.slice(base.length);
  }
  return pathname;
}

function logMiddleware(handler) {
  return async function (req, server) {
    const uuid = crypto.randomUUID();
    console.log(uuid, "- RECV", req.method, req.url);
    const start = performance.now();

    const res = await handler(req, server);

    const duration = performance.now() - start;
    console.log(
      uuid,
      "- SENT",
      res.status,
      req.url,
      "in",
      duration.toFixed(3),
      "ms",
    );

    return res;
  };
}

/**
 * @param {import("bun").BunRequest} req
 */
async function handler(req, server) {
  const url = new URL(req.url);

  try {
    const filePath = path.join("./dist/client", removeBase(url.pathname));
    const file = Bun.file(filePath);
    return new Response(await file.text(), {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (err) {
    const res = await ssrHandle(req, server);
    return res;
  }
}

Bun.serve({ port, fetch: logMiddleware(handler) });
