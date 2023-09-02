import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
    site: "https://untitled.urbansheep.com",
    integrations: [
        sitemap({
            entryLimit: 5000,
        }),
    ],
    output: "server",
    adapter: netlify(),
    // adapter: node({
    //       mode: "standalone"
    //   })
});
