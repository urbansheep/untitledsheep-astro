import rss from '@astrojs/rss';
import { SITE, THEME } from '@/config';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();
import { fetchPosts } from '@/utils/fetchPosts';
import { getCollection } from 'astro:content';

// Last N recent posts, where N = THEME.postsPerFeed

export async function get(context) {
    const allPosts = await getCollection('blog', (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });
    const sortedPosts = allPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    // const sortedPosts = await fetchPosts();
    const posts = sortedPosts.slice(0, THEME.postsPerFeed);

    console.log('posts', posts);

    return rss({
        xmlns: { h: 'http://www.w3.org/TR/html4/' },
        title: SITE.title,
        link: SITE.url,
        description: SITE.description,
        site: context.site,
        customData: '<language>ru</language>',
        items: posts.map(post => ({
            title: post.data.title || `Пост ${post.data.id}`,
            pubDate: post.data.date,
            description: post.body,
            link: `/post/${post.data.id}`,
        }))
    });
}
