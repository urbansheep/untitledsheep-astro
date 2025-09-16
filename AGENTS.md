# AI Agent Guidelines for Untitled Sheep Project

This document consolidates all AI guidelines, rules, and instructions for working with the Untitled Sheep blog project. This includes rules for Cline, Claude, and any other AI agents working on this codebase.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Change Logging Requirements](#change-logging-requirements)
3. [AI-Generated Changes Protocol](#ai-generated-changes-protocol)
4. [File Operations Guidelines](#file-operations-guidelines)
5. [Development Server Management](#development-server-management)
6. [Git Repository Management](#git-repository-management)
7. [Task Management Workflow](#task-management-workflow)
8. [Architecture and Technical Guidelines](#architecture-and-technical-guidelines)
9. [Claude Code Specific Settings](#claude-code-specific-settings)

---

## Project Overview

**Before working on this project, review the comprehensive [PROJECT-OVERVIEW.md](../docs/PROJECT-OVERVIEW.md) file** to understand the project structure, architecture, and workflows. This document will help you quickly orient yourself with the codebase.

### Quick Reference
- **Framework**: Astro.js v3 with Node.js v18.14.1+
- **Architecture**: Static site generator with Content Collections
- **Language**: Russian-language blog ("Безымянная овца")
- **Deployment**: Configured for Vercel
- **Repository**: https://github.com/urbansheep/untitledsheep-astro.git

### Key Directories
- `src/content/blog/` - Blog posts in Markdown
- `src/components/` - Reusable UI components
- `src/layouts/` - Page layouts
- `src/pages/` - Page routes
- `src/utils/` - Utility functions
- `src/styles/` - CSS styles
- `.clinerules/` - AI agent rules and task lists (git-ignored)
- `docs/` - Project documentation and plans

---

## Change Logging Requirements

**ALL changes to the project MUST be logged in the [CHANGELOG.md](./CHANGELOG.md) file.**

### Format Required:
```markdown
## [YYYY-MM-DD]

### Added/Changed/Fixed/Removed
- Description of change (Files affected) [AI or HUMAN]
```

### Guidelines:
1. **Group changes by type** (Added, Changed, Fixed, Removed)
2. **Provide clear, concise description** of each change
3. **Include files or directories affected** in parentheses
4. **Mark ALL AI-generated changes** with `[AI]` tag
5. **Human changes do not require a tag** (assumed by default)
6. **Include brief explanation** of why the change was made if not obvious

---

## AI-Generated Changes Protocol

When changes are made by AI assistants (Cline, Claude, etc.):

### Commit Requirements:
1. **ALL changes must be clearly marked** with `[AI]` in the changelog
2. **Commit message should include "[AI]"** at the beginning
3. **Document the prompt or task** that led to the AI-generated changes
4. **Review AI-generated code thoroughly** before committing

### Example Commit Message:
```
[AI] Add: Hot-or-Not post curation tool

- Created post classification interface
- Added API endpoints for post management
- Implemented client-side interaction logic

Files: src/pages/hot-or-not.astro, src/pages/api/hot-or-not/
```

---

## File Operations Guidelines

### Efficiency Rules:
1. **Pre-plan operations**: Plan the entire sequence before executing
2. **Batch similar operations**: Group similar operations together
3. **Use wildcards and patterns**: Operate on multiple files at once
4. **Quote file paths**: Always enclose paths in quotes (`"`) to prevent shell interpretation
5. **Minimize file checks**: Perform existence checks in batches
6. **Combine operations**: Use compound commands (`&&`, `||`, `;`)
7. **Create scripts for complex operations**: Instead of executing commands one by one
8. **Clean up temporary files**: Remove any temporary files after completing tasks

### Examples:
```bash
# Good: Batch operations
ls -la file1.txt file2.txt
rm -f file1.txt file2.txt

# Better: Pattern matching
rm -f *.txt

# Required: Quote paths with special characters
mv "file with spaces.txt" "new location/"
```

---

## Development Server Management

**Before launching a new test blog instance** with `npm run dev`:

1. **Check if one is already running** to avoid port conflicts
2. **Look for existing terminal sessions** running the dev server
3. **Check for processes on port 4321** (Astro's default port)
4. **Avoid unnecessary resource usage**

### Available Commands:
- `npm run dev` - Start local dev server at `localhost:4321`
- `npm run dev:host` - Start server accessible on local network
- `npm run test` - Run linting and Astro checks
- `npm run build` - Build production site
- `npm run preview` - Preview production build

---

## Git Repository Management

### Commit Guidelines:
1. **Write descriptive commit messages** explaining the purpose
2. **Use imperative mood** (e.g., "Add feature" not "Added feature")
3. **Reference issue numbers** when applicable
4. **Keep commits focused** on single logical change
5. **For AI changes, prefix with "[AI]"**
6. **Use provided `.gitmessage` template**
7. **Commit `CHANGELOG.md` last** to ensure it includes all other changes in a batch.

### Branching Strategy:
- `main` branch should always be deployable
- `feature/description` for new features
- `fix/description` for bug fixes

### Before Committing:
1. **Run `npm run test`** to ensure all checks pass
2. **Update CHANGELOG.md** with your changes
3. **Review all changes** for project standards
4. **Ensure no sensitive information** is included

---

## Task Management Workflow

### 1. Task Definition & Planning
- **Task-List Files**: Create `TASK-LIST-<feature-name>.md` in `.clinerules/` directory
- **PRD for Complex Features**: Create `PLAN-<feature-name>.md` in `docs/` directory
- **Branching**: Each feature gets corresponding Git branch
- **Break down work** into small, actionable steps

### 2. Execution
- **Continuous Reference**: Refer to task list throughout work
- **Dynamic Updates**: Revise task list as requirements evolve
- **Track Progress**: Update status in task lists

### 3. Review & Completion
- **Pre-Commit Review**: Ensure work aligns with plan
- **Cleanup**: Rename `TASK-LIST-*.md` to `DONE-LIST-*.md` when complete

### Example Task List Structure:
```markdown
# Development Task List: Feature Name

**Phase 1: Setup**
- [ ] 1. Create necessary directories
- [ ] 2. Set up data structures

**Phase 2: Implementation**
- [ ] 3. Create API endpoints
- [ ] 4. Build frontend interface
```

---

## Architecture and Technical Guidelines

### Content Management:
- **Blog posts**: Markdown files in `src/content/blog/`
- **Schema validation**: Defined in `src/content/config.ts`
- **Post types**: regular, link, quote, photo, photogallery, video, audio, chat
- **Drafts**: Posts with `isDraft: true` won't be published
- **Future posts**: Posts with future dates won't appear

### Component Structure:
- **Layouts**: `LayoutBase.astro`, `LayoutContent.astro`
- **Components**: Reusable UI in `src/components/`
- **Pages**: Route-based in `src/pages/`
- **Utilities**: Helper functions in `src/utils/`

### Key Utilities:
- `getPublishedPosts.ts` - Returns published posts only
- `getSortedPosts.ts` - Returns posts sorted by date
- `getPostsByTag.ts` - Returns posts filtered by tag
- `getFeaturedPosts.ts` - Returns curated posts for homepage

### Styling:
- **Custom CSS only** (no styling libraries)
- **Self-hosted fonts** for performance
- **Image optimization** via Astro's built-in tools

---

## Claude Code Specific Settings

### Permissions Configuration:
Located in `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(tree:*)",
      "Bash(find:*)"
    ],
    "deny": [],
    "ask": []
  }
}
```

### Claude Code Integration Notes:
- This project is configured to work with Claude Code
- File paths should always be quoted in shell commands
- Use efficient file operations to minimize command calls
- Batch operations when possible for better performance

---

## Quick Reference Links

- **Project overview**: [PROJECT-OVERVIEW.md](../docs/PROJECT-OVERVIEW.md)
- **Change log**: [CHANGELOG.md](./CHANGELOG.md)
- **Git commit template**: [.gitmessage](./.gitmessage)
- **Git repository**: https://github.com/urbansheep/untitledsheep-astro.git
- **Astro Documentation**: https://docs.astro.build/
- **Content Collections**: https://docs.astro.build/en/guides/content-collections/

---

## Important Notes

### Security:
- **Never commit sensitive information**
- **Review all AI-generated code** before committing
- **Follow security best practices** for web development

### Performance:
- **Images are automatically optimized** by Astro
- **CSS is minified** in production builds
- **Static generation** for fast page loads
- **Minimal JavaScript** for better performance

### Accessibility:
- **Add ARIA labels** where needed (planned improvement)
- **Use semantic HTML** structures
- **Ensure keyboard navigation** works properly

### Future Considerations:
- Dark theme implementation planned
- Search functionality (PageFind or FuseJS) planned
- Typography improvements planned
- Analytics integration with Partytown planned

---

*This document consolidates guidelines from .clinerules/CLINE-RULES.md, .clinerules/PROJECT-OVERVIEW.md, and other project documentation. Keep this file updated as the project evolves.*
