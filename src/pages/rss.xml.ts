import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE, THEME } from "@/config";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
    const allPosts = await getCollection("blog", (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });
    const sortedPosts = allPosts.sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );

    // Last N recent posts, where N = THEME.postsPerFeed
    const posts = sortedPosts.slice(0, THEME.postsPerFeed);

    return rss({
        stylesheet: "/rss/styles.xsl",
        xmlns: { h: "http://www.w3.org/TR/html4/" },
        title: SITE.title,
        description: SITE.description,
        site: context.site?.toString() || SITE.url,
        customData: "<language>ru</language>",
        items: posts.map((post) => ({
            title: post.data.title || `Пост ${post.data.id}`,
            pubDate: post.data.date,
            description: post.data.photo
                ? `${SITE.url}${post.data.photo.src} ${post.body}`
                : post.body,
            link: `/post/${post.data.id}`,
            guid: post.data.id,
            customData: `
                <h:img src="${SITE.url}${post.data.photo}" />
                <enclosure url="${SITE.url}${post.data.photo}" />
            `,
        })),
    });
}
