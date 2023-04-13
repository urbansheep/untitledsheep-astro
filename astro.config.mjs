import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

export default defineConfig({
    site: 'https://untitled.urbansheep.com',
    integrations: [mdx()],
    output: 'server',
    adapter: node({
        mode: "standalone"
    })
});
