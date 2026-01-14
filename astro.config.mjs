import { defineConfig } from "astro/config";

import Compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
    site: "https://untitled.urbansheep.com",
    integrations: [
        // TODO: sitemap() fails with Astro 4.x hybrid mode - needs investigation
        // sitemap(),
        Compress({
            Image: false,
            SVG: false,
        }),
    ],
    redirects: {
        "/archive/1": "/archive/",
        "/archive/1/": "/archive/",
    },
    output: "hybrid",
    outputOptions: {
        format: "esm",
    },
    adapter: vercel({
        runtime: "nodejs20.x",
    }),
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
});
