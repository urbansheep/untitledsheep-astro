# Changelog

All notable changes to the Untitled Sheep project will be documented in this file.

## [2025-09-16]

### Added
- `getFeaturedPosts.ts` utility to fetch featured posts for the front page (`src/utils/getFeaturedPosts.ts`) [AI]
- New documentation files for AI agents and repository analysis (`AGENTS.md`, `CLAUDE.md`, `REPO_ANALYSIS_PROGRESS.md`) [AI]

### Changed
- Updated global styles for better readability and consistency (`src/styles/global.css`) [AI]
- Updated front page to use the new `getFeaturedPosts` utility (`src/pages/index.astro`) [AI]
- Updated blog posts with new content (`src/content/blog/7570979329.md`, `src/content/blog/7647936845.md`) [AI]

### Fixed
- Corrected `.gitignore` to properly ignore AI-specific files and logs (`.gitignore`) [AI]

## [2025-09-16]

### Changed
- Moved PROJECT-OVERVIEW.md from .clinerules/ to docs/ folder to consolidate documentation (docs/PROJECT-OVERVIEW.md, .clinerules/CLINE-RULES.md) [AI]

## [2025-09-16]

### Added
- Major enhancements to the Hot-or-Not tool with comprehensive UI improvements:
    - Sticky control panel with background styling and fixed height layout
    - Real-time statistics tracking (remaining/frontpage/buried/deleted counts)
    - Inline feedback messages for all user actions
    - Post type indicator showing content format (PHOTO, LINK, QUOTE, etc.)
    - 10-post preloading system with visual queue dot indicators
    - Keyboard shortcuts: F (Front page), B (Bury), D (Delete), S (Skip)
    - Enhanced content rendering based on post type (photos, links, quotes)
    - "Delete" classification option for marking posts for removal
    (`src/pages/hot-or-not.astro`, `src/pages/api/hot-or-not/next-post.json.ts`, `src/pages/api/hot-or-not/classify.ts`, `src/data/delete-posts.json`) [AI]

### Changed
- Renamed "Processed" button to "Bury" for better semantic meaning
- Improved post content display with type-specific formatting and fallback handling
- Enhanced API endpoints to include statistics and support delete classification

## [2025-07-26]

### Changed
- Improved the Hot-or-Not tool based on feedback:
    - Now displays the full post content instead of just metadata.
    - Moved the classification toolbar above the post content.
    - Added a "Skip" button to advance to the next post without classifying.
    (`src/pages/hot-or-not.astro`, `src/pages/api/hot-or-not/next-post.json.ts`) [AI]

## [2025-07-25]

### Added
- Hot-or-Not post curation tool (`src/pages/hot-or-not.astro`, `src/pages/api/hot-or-not/next-post.json.ts`, `src/pages/api/hot-or-not/classify.ts`, `src/data/front-page-posts.json`, `src/data/processed-posts.json`) [AI]

## [2025-07-25]

### Changed
- Updated the project rules to replace the "Feature & Task Workflow" section with a more comprehensive "Task Management" section. This new section clarifies the use of `TASK-LIST-*.md` files as a work-in-progress indicator for all ongoing tasks, enhancing task tracking and resilience. (`.clinerules/CLINE-RULES.md`) [AI]
- Refined the "Feature & Task Workflow" to move task-lists into the git-ignored `.clinerules` directory and PRD/plan files into a new `docs/` directory. This prevents local-only task lists from being committed. (`.clinerules/CLINE-RULES.md`, `.gitignore`, `TASK-LIST-hot-or-not-tool.md`, `PLAN-frontpage-redesign.md`, `PLAN-hot-or-not-tool.md`) [AI]
- Added "Feature & Task Workflow" section to the project rules to standardize how new features and tasks are planned and executed. (`.clinerules/CLINE-RULES.md`) [AI]
- Updated `CLINE-RULES.md` to require quoting file paths in shell commands to prevent errors with special characters. (`.clinerules/CLINE-RULES.md`) [AI]

## [2025-07-15]

### Fixed
- Page titles now correctly use the `title` field from frontmatter instead of a generic post ID (`src/pages/post/[slug].astro`) [AI]

### Changed
- Updated project rules to require checking for running dev server instances before launching a new one (`.clinerules/CLINE-RULES.md`, `.clinerules/PROJECT-OVERVIEW.md`) [AI]
- Corrected the development server port in project documentation (`.clinerules/PROJECT-OVERVIEW.md`) [AI]

### Added
- New frontpage layout with intro text, favorite posts, and a random post section (`src/pages/index.astro`) [AI]
- API endpoint to get all published posts (`src/pages/api/posts.json.ts`) [AI]
- Client-side script to fetch and display a random post on the frontpage (`src/pages/index.astro`) [AI]
- Styles for the new frontpage sections (`src/styles/global.css`) [AI]
- Plan file for the frontpage redesign (`PLAN-frontpage-redesign.md`) [AI]

### Changed
- Updated `src/pages/index.astro` to use the new frontpage layout [AI]

## [2023-09-02]

### Changed
- Updated post fetching logic for Astro v3 (`src/utils/getPublishedPosts.ts`, `src/utils/getSortedPosts.ts`, `src/utils/getPostsByTag.ts`) [AI]

## [2025-06-12]

### Added
- Created comprehensive .clinerules/PROJECT-OVERVIEW.md with detailed documentation of the project structure, architecture, and workflows [AI]
- Added CHANGELOG.md to track project changes with clear distinction between AI-generated and human changes [AI]
- Updated .clinerules/CLINE-RULES.md with guidelines for project documentation, change logging, and git repository management [AI]
- Added .gitmessage template file to standardize commit messages and distinguish between AI and human changes [AI]
- Created commit-project-docs.sh script to help with the initial commit of documentation files [AI]

### Changed
- Added "Efficient File Operations" section to .clinerules/CLINE-RULES.md with guidelines for batching file operations [AI]
- Updated "Efficient File Operations" section to include a rule about cleaning up temporary files after tasks [AI]
