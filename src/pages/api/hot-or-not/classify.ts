import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(process.cwd(), "var/data");
const frontPagePostsPath = path.join(dataDir, "front-page-posts.json");
const processedPostsPath = path.join(dataDir, "processed-posts.json");
const deletePostsPath = path.join(dataDir, "delete-posts.json");

export const POST: APIRoute = async ({ request }) => {
  try {
    const { slug, classification } = await request.json();

    if (!slug || !classification) {
      return new Response("Missing slug or classification", { status: 400 });
    }

    if (classification !== "front-page" && classification !== "processed" && classification !== "delete") {
      return new Response("Invalid classification", { status: 400 });
    }

    const filePath =
      classification === "front-page"
        ? frontPagePostsPath
        : classification === "processed"
        ? processedPostsPath
        : deletePostsPath;

    let fileContent: string[];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      fileContent = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist, start with an empty array
      fileContent = [];
    }

    if (!fileContent.includes(slug)) {
      fileContent.push(slug);
      await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2));
    }

    return new Response("Classification successful", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
};
