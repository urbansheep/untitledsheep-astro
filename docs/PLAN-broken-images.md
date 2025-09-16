# Markdown Image Link Conversion Issue: Research Plan

## Steps

- [x] 1. Explore the Astro project structure and identify where markdown is converted to HTML.
- [x] 2. Review relevant files (content, templates, components, config) for markdown/image handling logic.
- [x] 3. Ask diagnostic questions to gather more context from the user.
- [x] 4. Collect user answers and update the plan as needed.
- [x] 5. List possible hypotheses and experiments (to be filled after Q&A).
- [x] 6. For each experiment, record conclusions and update the plan.
- [x] 7. Before each experiment, confirm with the user for approval or additional input.
- [x] 8. Collect all unique post types (values of `form` in frontmatter) used in blog posts.  
  _Types identified: `quote`, `link`, `regular`, `photo`, `photogallery`, `chat`._
- [x] 9. For each post type, select or create a representative sample with an asset image reference and test how the image is rendered.  
  _Status: Complete. Test posts created and results recorded below._

---

## Diagnostic Questions (to be answered by user)

**1. Can you provide an example of a markdown image link from your content and how it is being rendered incorrectly in HTML?**  
- Posts with local images linked via "@-references" (e.g., 67950112627, 59025737961) do not get correct links to assets.
- Photo-posts (images in front matter) work fine.
- A "regular" post (145791403746) displays images fine.
- Posts of different types get different treatment for markdown/asset links.

**2. Are you using any custom markdown processing plugins or Astro integrations (e.g., remark, rehype, custom renderers)?**  
- User is not sure; requests investigation.

**3. Does the issue occur for all images or only specific cases (e.g., relative vs. absolute paths, certain file types)?**  
- User is not sure if all issues are discovered.

**4. Are there any relevant custom components or shortcodes used for images in your markdown?**  
- Not specified.

**5. Have you made any recent changes to the markdown processing or template logic?**  
- No known correct state; current state is the starting point.

**6. Is the problem present in both development and production builds?**  
- Development version has styling/path issues; unclear if the problem spans both dev/prod.

**7. Any other symptoms or related issues you've noticed?**  
- No additional symptoms specified.

---

## Hypotheses & Experiments

### Findings So Far

- All markdown image links in blog posts use the "@/assets/media/..." path format.
- Astro's default markdown renderer does not resolve the "@" alias in markdown image links.
- Posts using the <Image> component (e.g., "photo" posts) work because the component resolves the asset path.
- There are no custom markdown plugins or integrations to handle this aliasing.
- This is a project-wide issue affecting all posts with images in markdown.

### Hypotheses

- Astro's markdown renderer does not support "@" alias resolution in image links.
- Adding a remark/rehype plugin or custom markdown processing could resolve the alias.
- Changing image paths in markdown to relative paths may fix the issue.
- A custom remark plugin or pre-processing step could rewrite "@/" to the correct relative path.

### Possible Experiments

- [x] Test if changing a markdown image link from "@/assets/media/..." to a relative path (e.g., "../../assets/media/...") works.  
  _Status: Complete. Result: Markdown inside HTML blocks is not rendered; see conclusions below._
- [x] Test if using pure markdown syntax for the gallery (no HTML blocks) renders images correctly.  
  _Status: Complete. Result: Relative path image renders, "@/assets/..." does not._
- [x] Investigate adding a remark/rehype plugin to resolve "@" aliases and bare filenames in markdown image links.  
  _Status: Complete. `remark/alias-images.js` rewrites `@/assets/...` to `/assets/...` and bare filenames to `/assets/media/<filename>`._
- [ ] (Removed) Try a custom pre-processing script to rewrite image links before markdown is rendered.
- [ ] (Removed) Explore using a custom markdown component or shortcode for images in markdown.

---

## Post Type Diagnostic Matrix (Updated with Test Posts)

| Post Type     | Image Reference Location | Reference Format           | Renders? | Notes                                                                 |
|---------------|-------------------------|----------------------------|----------|-----------------------------------------------------------------------|
| Post Type     | Reference Method                  | Alias `@/assets/...` | Relative Path | HTML Block Markdown | HTML `<img>` Tag | Notes                                              |
|---------------|------------------------------------|----------------------|---------------|---------------------|------------------|----------------------------------------------------|
| regular       | pure markdown                      | Yes                  | Yes           | No                  | Yes              | Alias and relative work; markdown in HTML fails.   |
| photo         | frontmatter & pure markdown bodies | Yes (frontmatter)    | Yes           | No                  | Yes              | `<Image>` resolves alias; markdown alias fails.    |
| photogallery  | markdown inside HTML & pure markdown | No (HTML) / Yes (pure) | No (HTML) / Yes (pure) | No                  | Yes              | Alias markdown in HTML fails; `<img>` works.      |

---

## Experiment Results & Conclusions

### Experiment: Relative Path in Markdown

- **Action:** Changed the first image link in 67950112627.md from `![](@/assets/media/67950112627_1.png)` to `![](../../assets/media/67950112627_1.png)`.
- **Result:** Neither the relative path image nor the "@/assets/..." image rendered; the raw markdown was displayed as text.
- **Conclusion:** Markdown image links inside HTML blocks (e.g., `<div>`, `<figure>`) are not processed as markdown by Astro's renderer. This is a markdown limitation, not a path issue. To render images, use pure markdown syntax outside HTML blocks, or use Astro components/shortcodes for galleries.

### Experiment: Pure Markdown Gallery (No HTML Blocks)

- **Action:** Replaced the gallery HTML in 67950112627.md with two pure markdown image links: one using a relative path, one using "@/assets/..." alias.
- **Result:** The image with the relative path (`../../assets/media/67950112627_1.png`) rendered correctly. The image with the "@/assets/..." alias did not render.
- **Conclusion:** Pure markdown image links work if a correct relative path is used. The "@/assets/..." alias does not work in markdown image links. Removing HTML blocks allows markdown images to render.

### Test Posts Results

#### Test Regular Post (`test-regular.md`)
- Markdown Alias: rewritten by remark plugin and rendered correctly.
- Relative Path: rendered correctly.
- Markdown inside HTML block: displayed as raw text.
- HTML `<img>` tag with alias: rendered correctly.

#### Test Photo Post (`test-photo.md`)
- Frontmatter Alias (with `<Image>` component): rendered correctly.
- Markdown Alias: rewritten and rendered correctly.
- Relative Path in markdown: rendered correctly.
- Markdown inside HTML block: raw text.
- HTML `<img>` tag with alias: rendered correctly.

#### Test Photogallery Post (`test-photogallery.md`)
- Markdown Alias inside HTML block: raw text (HTML blocks disable markdown).
- Relative Path inside HTML block: raw text.
- Pure Markdown Alias (outside HTML): rewritten and rendered correctly.
- Pure Markdown Relative: rendered correctly.
- HTML `<img>` tag inside gallery: rendered correctly.
