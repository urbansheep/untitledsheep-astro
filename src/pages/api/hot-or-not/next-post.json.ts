import type { APIRoute } from "astro";
import getPublishedPosts from "@/utils/getPublishedPosts";
import frontPagePostsData from "@/data/front-page-posts.json";
import processedPostsData from "@/data/processed-posts.json";
import deletePostsData from "@/data/delete-posts.json";

const frontPagePosts: string[] = frontPagePostsData;
const processedPosts: string[] = processedPostsData;
const deletePosts: string[] = deletePostsData;

export const GET: APIRoute = async () => {
  const allPosts = await getPublishedPosts();

  const classifiedSlugs = new Set([
    ...frontPagePosts,
    ...processedPosts,
    ...deletePosts,
  ]);

  const unclassifiedPosts = allPosts.filter(
    (post) => !classifiedSlugs.has(post.slug)
  );

  if (unclassifiedPosts.length === 0) {
    return new Response(JSON.stringify({ empty: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const randomIndex = Math.floor(Math.random() * unclassifiedPosts.length);
  const randomPost = unclassifiedPosts[randomIndex];
  const { Content } = await randomPost.render();

  const postForClient = {
    slug: randomPost.slug,
    data: randomPost.data,
    body: randomPost.body,
    stats: {
      total: allPosts.length,
      remaining: unclassifiedPosts.length,
      frontpage: frontPagePosts.length,
      buried: processedPosts.length,
      deleted: deletePosts.length,
    }
  }

  return new Response(JSON.stringify(postForClient), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
