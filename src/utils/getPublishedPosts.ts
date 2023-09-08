import { getCollection } from "astro:content";

async function getPublishedPosts() {
    const allPosts = await getCollection("blog", (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });

    return allPosts;
}

export default getPublishedPosts;
