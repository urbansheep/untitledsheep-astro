# AI Agent Guidelines

Guidelines for AI agents working on this codebase.

## After Making Changes

When adding or changing features, provide direct links to each type of page or relevant feature to enable quick acceptance testing. Example:

**Test links for image-related changes:**
- Photo post: `/post/1003723159`
- Photo gallery: `/post/12156873742`
- Regular post with images: `/post/0134ff38-gibson-interview`

## Post Types Reference

The blog supports these post forms (from `src/content/config.ts`):
- `regular` - Text posts, may contain inline images
- `photo` - Single image posts with `.cover` class
- `photogallery` - Multiple images in gallery layout
- `link` - Link posts
- `quote` - Quote posts
- `video` - Video posts
- `audio` - Audio posts
- `chat` - Chat transcript posts

## Key Files for Styling

- `src/styles/global.css` - Layout, spacing variables, cover images
- `src/styles/prose.css` - Post content styling by form type
- `src/layouts/LayoutBase.astro` - Main wrapper layout
- `src/layouts/LayoutContent.astro` - Article/prose wrapper

## CSS Custom Properties

Spacing and layout use CSS custom properties defined in `global.css`:
- `--wrapper-padding` - Current wrapper padding (responsive)
- `--spacing-*` - Spacing scale (xxs through 5xl)

## Development Commands

```bash
npm run dev        # Local dev server at localhost:3000
npm run dev:host   # Dev server accessible on local network (for mobile testing)
npm run build      # Production build
npm run check      # Astro checks
```
