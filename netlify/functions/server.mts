// Netlify Functions v2 SSR adapter.
//
// We reuse the Cloudflare Worker bundle produced by `vite build`
// (dist/server/index.js exports a default `{ fetch }` handler that follows
// the Web standard). Netlify Functions v2 also speak Web fetch, so we just
// forward the Request and return the Response.
//
// We provide a stubbed `env` and `ctx` because the app does not rely on
// Cloudflare-specific bindings.

// @ts-expect-error — bundled at deploy time via netlify.toml `included_files`.
import workerHandler from "../../dist/server/index.js";

import type { Config, Context } from "@netlify/functions";

type WorkerHandler = {
  fetch: (
    request: Request,
    env: Record<string, unknown>,
    ctx: Record<string, unknown>,
  ) => Promise<Response> | Response;
};

const handler = workerHandler as WorkerHandler;

export default async function (request: Request, _context: Context): Promise<Response> {
  try {
    const env = (process.env ?? {}) as Record<string, unknown>;
    const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
    return await handler.fetch(request, env, ctx);
  } catch (error) {
    console.error("Netlify SSR adapter error:", error);
    return new Response(
      `<!doctype html><meta charset="utf-8"><title>Server error</title>` +
        `<div style="font-family:system-ui;padding:2rem;text-align:center">` +
        `<h1>Algo deu errado</h1><p>Tente recarregar a página.</p></div>`,
      { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
}

export const config: Config = {
  path: "/*",
  // Let the static publish dir handle existing files first.
  preferStatic: true,
};