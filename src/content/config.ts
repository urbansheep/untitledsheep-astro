import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    schema: z.object({
        isDraft: z.boolean().default(false),
        id: z.number(),
        form: z.enum(['regular', 'link', 'quote', 'photo', 'photogallery', 'video', 'audio', 'chat']),
        title: z.union([z.string(), z.null()]).optional(),
        tags: z.array(z.string()),
        date: z.date().transform((str) => new Date(str)),
        tumblr: z.string().optional(),
        photo_original_url: z.string().optional(),
        photo: z.string().optional(),
        photo_caption: z.string().optional(),
        photo_source: z.string().optional(),
        photo_source_url: z.string().optional(),
        photo_source_title: z.string().optional(),
        linkurl: z.string().optional(),
    }),
});

// Name of collection = name of the folder with md files. Example: src/content/blog
export const collections = {
    'blog': blogCollection,
};
