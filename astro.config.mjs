import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: 'https://untitled.urbansheep.com',
    trailingSlash: 'never',
    integrations: [mdx()]
});
