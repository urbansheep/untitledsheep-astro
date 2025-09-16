import getPublishedPosts from "@/utils/getPublishedPosts";

/**
 * Returns a curated list of posts to be featured on the front page
 * A post is featured if its ID is in the `featuredPostIds` array
 */
async function getFeaturedPosts() {
	const allPosts = await getPublishedPosts();
	const featuredPostIds = new Set([
		105494, // Featurequests
		114846859,
		115229558,
		117543946,
		119150024,
	]);

	const featuredPosts = allPosts.filter((post) => featuredPostIds.has(post.data.id));

	return featuredPosts;
}

export default getFeaturedPosts;
