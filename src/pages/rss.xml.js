import rss from '@astrojs/rss';
import { SITE, THEME } from '@/config';
import { getCollection } from 'astro:content';

// Last N recent posts, where N = THEME.postsPerFeed

export async function get(context) {
    const allPosts = await getCollection('blog', (post) => {
        return !post.data.isDraft && post.data.date <= new Date();
    });
    const sortedPosts = allPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    const posts = sortedPosts.slice(0, THEME.postsPerFeed);

    // console.log(posts);

    return rss({
        stylesheet: '/rss/styles.xsl',
        xmlns: { h: 'http://www.w3.org/TR/html4/' },
        title: SITE.title,
        link: SITE.url,
        description: SITE.description,
        site: context.site,
        customData: '<language>ru</language>',
        items: posts.map(post => ({
            title: post.data.title || `Пост ${post.data.id}`,
            pubDate: post.data.date,
            description: post.data.photo ? `${SITE.url}${post.data.photo} ${post.body}` : post.body,
            link: `/post/${post.data.id}`,
            guid: post.data.id,
            customData: `
                <h:img src="${SITE.url}${post.data.photo}" />
                <enclosure url="${SITE.url}${post.data.photo}" />
            `
        }))


    });
}



