import { defineConfig } from "astro/config";

import Compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

export default defineConfig({
    site: "https://untitled.urbansheep.com",
    integrations: [
        sitemap({
            entryLimit: 5000,
        }),
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
    // adapter: node({
    //     mode: "standalone",
    // }),
    adapter: vercel({
        runtime: "nodejs20.x",
    }),
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
});
