import { slugify } from "@/utils/slugify";
import type { CollectionEntry } from "astro:content";

function getPostsByTag(posts: CollectionEntry<"blog">[], tag: string) {
    console.log("tag: ", tag);
    console.log("posts before filtering by tag \n", posts);
}

export default getPostsByTag;
