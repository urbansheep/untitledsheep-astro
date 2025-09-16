import type { APIRoute } from 'astro';
import getPublishedPosts from '@/utils/getPublishedPosts';
import { slugify } from '@/utils/slugify';

export const GET: APIRoute = async ({ params, request }) => {
    const posts = await getPublishedPosts();

    const postData = posts.map(post => ({
        slug: post.slug,
        title: post.data.title,
        date: post.data.date,
        url: `/post/${slugify(post.slug)}/`
    }));

    return new Response(JSON.stringify(postData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
