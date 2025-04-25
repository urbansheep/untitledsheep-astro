# Photogallery Posts Fix Todo

## Gallery Structure Documentation

Based on the analysis of the codebase, here's how galleries should be structured:

### CSS Structure
There are two main CSS classes for galleries:

1. `.gallery` - A flex container that displays images in a row (on larger screens) or column (on smaller screens)
   ```css
   .prose .gallery {
       display: flex;
       flex-direction: column;
       align-items: center;
       gap: var(--spacing-sm);
       margin-bottom: var(--spacing-lg);
   }

   @media (width >= 600px) {
       .prose .gallery {
           flex-direction: row;
           flex-wrap: wrap;
           justify-content: center;
           gap: var(--spacing-lg);
       }
       
       .prose .gallery img {
           max-width: calc(50% - var(--spacing-lg));
       }
   }
   ```

2. `.gallery-wrapper` - Similar to `.gallery` but with different spacing and layout
   ```css
   .prose .gallery-wrapper {
       display: flex;
       flex-direction: column;
       align-items: center;
       gap: var(--spacing-xl);
       margin-bottom: var(--spacing-xl);
       text-align: center;
   }
   ```

### Image Path Handling
Images are processed by the `alias-images.js` remark plugin which:
- Rewrites `@/assets/media/...` to `/assets/media/...`
- Rewrites bare filenames to `/assets/media/filename`

### Correct Markdown Syntax
Images should be included using one of these formats:

1. Markdown syntax on separate lines inside a gallery div:
   ```html
   <div class="gallery-wrapper">

   ![Alt text](@/assets/media/image.jpg)

   ![Alt text](@/assets/media/another-image.jpg)

   </div>
   ```

2. Markdown with captions on separate lines:
   ```html
   <div class="gallery-wrapper">

   ![Alt text](@/assets/media/image.jpg)

   <figcaption>Caption text</figcaption>

   ![Alt text](@/assets/media/another-image.jpg)

   <figcaption>Another caption</figcaption>

   </div>
   ```

**Important Notes:**
- The markdown image syntax must be on its own line, not inside HTML tags
- The @-links don't get resolved in raw HTML, so use markdown syntax for images
- Each image and caption should be on separate lines with empty lines between them
- Use the `.gallery-wrapper` class for better layout and spacing

## List of Photogallery Posts to Fix

- [x] 16883206459.md - Fixed: Converted to markdown syntax on separate lines with proper captions
- [x] 25804945417.md - Fixed: Converted to markdown syntax on separate lines with proper captions
- [x] 21645402453.md - Fixed: Converted to markdown syntax on separate lines
- [x] 35114856422.md - Fixed: Converted to markdown syntax on separate lines
- [x] 58158911808.md - Fixed: Converted to markdown syntax on separate lines
- [x] 42176330765.md - Fixed: Converted to markdown syntax on separate lines
- [x] 12156873742.md - Fixed: Converted to markdown syntax on separate lines
- [x] 23338729204.md - Fixed: Converted to markdown syntax on separate lines with proper captions
- [x] 30233923280.md - Fixed: Converted to markdown syntax on separate lines
- [x] 49167864117.md - Fixed: Changed gallery class to gallery-wrapper
- [x] 67950112627.md - Fixed: Already using correct format with gallery-wrapper

## Additional Requirements

### Styling Requirements
- Description text should go under the images in smaller type (using a `<small>` tag), aligned to the left edge but not sticking out to the left, with max width limited to the width of the related image.
- Image galleries should be displayed as a grid on desktop and as a stack on mobile.

## Fix Plan

For each post:
1. Check if referenced images exist in the media directory
2. Fix image syntax if needed
3. Verify the gallery structure (using `.gallery` or `.gallery-wrapper` as appropriate)
4. Test in browser to ensure images display correctly
5. Mark as fixed in this todo list

## CSS Improvements Completed
- ✅ Added styling for `<figcaption>` and `<small>` tags under images to ensure they are properly aligned and sized
- ✅ Ensured gallery layout works as a grid on desktop and stack on mobile
