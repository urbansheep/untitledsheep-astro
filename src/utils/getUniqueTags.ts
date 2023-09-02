import type { CollectionEntry } from "astro:content";

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
    // const tags = [...new Set(posts.map((post) => post.data.tags).flat())];
    // return tags;
    let tags = new Set<string>();
    posts.forEach((post) => {
        post.data.tags?.flatMap((tag) => {
            tags.add(tag.toString());
        });
    });
    return [...tags];
};

export default getUniqueTags;
