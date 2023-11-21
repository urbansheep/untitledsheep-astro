import { defineConfig } from "astro/config";

import Compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

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
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },

});
