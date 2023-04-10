import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, THEME } from '@/config';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

// Last N recent posts, where N = THEME.postsPerFeed

export async function get(context) {
	const allPosts = await getCollection('blog', (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });
    const sortedPosts = allPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    const posts = sortedPosts.slice(0, THEME.postsPerFeed);

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items: posts.map((post) => ({
			title: `Пост ${post.data.id}`,
            pubDate: post.data.date,
            description: post.data.description || post.data.excerpt || post.data.content || [],
            link: `/post/${post.slug}/`,
            content: sanitizeHtml(parser.render(post.body)),
		})),
        customData: `<language>ru-RU</language>`,
	});
}


