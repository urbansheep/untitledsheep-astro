import { defineConfig } from "astro/config";

// import node from "@astrojs/node";
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
    output: "static",
    // output: "server",
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    outputOptions: {
        format: "esm",
    },
    // adapter: node({
    //     mode: "standalone",
    // }),
});
