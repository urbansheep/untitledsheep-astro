import { getCollection } from "astro:content";

export async function getSortedPosts() {
    const allPosts = await getCollection("blog", (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });
    // Sort posts by date in descending order (newest first). Type of `date` is number.
    const sortedPosts = allPosts.sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
    );
    return sortedPosts;
}

export default getSortedPosts;
