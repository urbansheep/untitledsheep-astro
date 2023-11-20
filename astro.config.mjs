import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import Compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify/functions";

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
    output: "hybrid",
    adapter: netlify(),
    outputOptions: {
        format: "esm",
    },
    // adapter: node({
    //     mode: "standalone",
    // }),
});
