### Added
- Added debug log output to the Hot-or-Not queue so operators can trace recent actions (`src/pages/hot-or-not.astro`) [AI]

### Changed
- Disabled HTML minification by updating `astro-compress` settings (`astro.config.mjs`) [AI]
- Consolidated local AI agent rules to point to the central guideline doc (`.clinerules/CLINE-RULES.md`) [AI]
- Pointed Hot-or-Not queue APIs at the writable `var/data` directory to avoid mutating tracked files (`src/pages/api/hot-or-not/classify.ts`, `src/pages/api/hot-or-not/next-post.json.ts`, `.gitignore`) [AI]
- Tracked Tumblr post `7905790` as already processed so it no longer reappears in the queue (`src/data/processed-posts.json`) [AI]

### Removed
- Removed the outdated CALL CENTER // Movie link post that no longer passes schema validation (`src/content/blog/4988822.md`) [AI]
