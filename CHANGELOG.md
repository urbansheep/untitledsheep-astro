# Changelog

All notable changes to the Untitled Sheep project will be documented in this file.

## [2025-07-25]

### Changed
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
