import { visit } from 'unist-util-visit';

/**
 * Remark plugin to rewrite image URLs:
 * - Bare filenames (e.g., image.png) will be left as-is (relative to markdown file).
 * - Aliases like "@/assets/media/xxx.png" will be rewritten to the public path "/assets/media/xxx.png".
 */
export default function aliasImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      let url = node.url;
      // Rewrite "@/assets/media/..." to "/assets/media/..."
      if (url.startsWith('@/assets/media/')) {
        node.url = url.replace(/^@\//, '/');
        return;
      }
      // Rewrite bare filenames (e.g., "image.png") to "/assets/media/image.png"
      // Skip URLs that start with '/', 'http', or './' (already valid or relative)
      if (!url.startsWith('/') && !url.match(/^[a-z]+:\/\//) && !url.startsWith('./') && !url.startsWith('../')) {
        node.url = `/assets/media/${url}`;
      }
    });
  };
}
