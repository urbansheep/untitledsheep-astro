import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    schema: z.object({
        isDraft: z.boolean().default(false),
        id: z.number(),
        form: z.enum(['regular', 'link', 'quote', 'photo', 'photogallery', 'video', 'audio', 'chat']),
        title: z.union([z.string(), z.null()]).optional(),
        tags: z.array(z.union([z.string(), z.number()])).optional(),
        date: z.date().transform((str) => new Date(str)),
        tumblr: z.union([z.string(), z.null()]).optional(),
        photo_original_url: z.union([z.string(), z.null()]).optional(),
        photo: z.union([z.string(), z.null()]).optional(),
        photo_caption: z.union([z.string(), z.null()]).optional(),
        photo_source: z.union([z.string(), z.null()]).optional(),
        photo_source_url: z.union([z.string(), z.null()]).optional(),
        photo_source_title: z.union([z.string(), z.null()]).optional(),
        linkurl: z.union([z.string(), z.null()]).optional(),
    }),
});

// Name of collection = name of the folder with md files. Example: src/content/blog
export const collections = {
    'blog': blogCollection,
};
