import type { APIRoute } from "astro";
import getPublishedPosts from "@/utils/getPublishedPosts";
import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(process.cwd(), "var/data");

async function readJson(fileName: string): Promise<string[]> {
  try {
    const file = await fs.readFile(path.join(dataDir, fileName), "utf-8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export const GET: APIRoute = async () => {
  const allPosts = await getPublishedPosts();

  const [frontPagePosts, processedPosts, deletePosts] = await Promise.all([
    readJson("front-page-posts.json"),
    readJson("processed-posts.json"),
    readJson("delete-posts.json"),
  ]);

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
