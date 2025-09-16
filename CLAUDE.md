# Claude AI Guidelines

**📋 For complete AI agent guidelines, see: [AGENTS.md](./AGENTS.md)**

This file serves as a quick pointer to the comprehensive AI guidelines document. All AI agents working on this project (Claude, Cline, etc.) should refer to the main guidelines document.

## Quick Start

1. **Read first**: [AGENTS.md](./AGENTS.md) - Complete AI guidelines and rules
2. **Project overview**: [.clinerules/PROJECT-OVERVIEW.md](.clinerules/PROJECT-OVERVIEW.md) - Technical documentation
3. **Change tracking**: [CHANGELOG.md](./CHANGELOG.md) - Required for all changes

## Key Reminders for Claude

- **ALL changes must be logged** in CHANGELOG.md with `[AI]` tag
- **Quote file paths** in shell commands to handle special characters
- **Check for running dev server** before starting new instance
- **Review .clinerules/PROJECT-OVERVIEW.md** before starting work
- **Use task lists** in `.clinerules/` for complex features
- **Always run `npm run test`** before committing

## Repository Structure Summary

```
/
├── .clinerules/          # AI rules and task lists (git-ignored)
├── docs/                 # Project documentation and plans
├── src/
│   ├── content/blog/     # Blog posts in Markdown
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Page routes
│   ├── utils/            # Utility functions
│   └── styles/           # CSS styles
├── AGENTS.md            # Complete AI guidelines (this reference)
├── CHANGELOG.md         # Required change log
└── README.md            # Project information
```

---

**💡 This is a Russian-language blog project built with Astro.js. Always refer to [AGENTS.md](./AGENTS.md) for complete guidelines.**