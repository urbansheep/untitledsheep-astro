import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
    site: 'https://untitled.urbansheep.com',
    integrations: [
        mdx(),
        sitemap({
            entryLimit: 5000
        }),
        prefetch(),
    ],
    output: 'server',
    adapter: node({
        mode: "standalone"
    })
});
