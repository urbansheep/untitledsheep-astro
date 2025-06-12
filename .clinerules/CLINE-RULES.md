# Cline Rules for Untitled Sheep Project

## Project Overview

Before working on this project, review the [PROJECT-OVERVIEW.md](./PROJECT-OVERVIEW.md) file to understand the project structure, architecture, and workflows. This comprehensive document will help you quickly orient yourself with the codebase and understand how different components interact.

## Change Logging

All changes to the project must be logged in the [CHANGELOG.md](./CHANGELOG.md) file following this format:

```markdown
## [YYYY-MM-DD]

### Added/Changed/Fixed/Removed
- Description of change (Files affected) [AI or HUMAN]
```

### Guidelines for Change Logging:

1. Group changes by type (Added, Changed, Fixed, Removed)
2. Provide a clear, concise description of each change
3. Include the files or directories affected in parentheses
4. Mark all AI-generated changes with `[AI]` tag
5. Human changes do not require a tag (assumed by default)
6. Include a brief explanation of why the change was made if it's not obvious

## AI-Generated Changes

When changes are made by AI assistants like Cline:

1. All changes must be clearly marked with `[AI]` in the changelog
2. The commit message should include "[AI]" at the beginning
3. Document the prompt or task that led to the AI-generated changes
4. Review AI-generated code thoroughly before committing

## Efficient File Operations

When performing file operations, follow these guidelines to improve efficiency:

1. **Pre-plan operations**: Before executing file operations, plan the entire sequence of operations needed
2. **Batch similar operations**: Group similar operations together to reduce the number of commands
3. **Use wildcards and patterns**: Utilize wildcards and patterns to operate on multiple files at once
4. **Minimize file checks**: Perform file existence checks in batches or use commands that handle non-existent files gracefully
5. **Combine operations**: Use compound commands (e.g., `&&`, `||`, `;`) to execute multiple operations in a single command
6. **Create scripts for complex operations**: For complex sequences of operations, create a script file instead of executing commands one by one
7. **Clean up temporary files**: Remove any temporary files or scripts after completing tasks

### Examples:

```bash
# Instead of multiple individual file checks and removals:
# ls -la file1.txt
# rm file1.txt
# ls -la file2.txt
# rm file2.txt

# Do this instead:
ls -la file1.txt file2.txt  # Check multiple files at once
rm -f file1.txt file2.txt   # Remove multiple files, -f ignores non-existent files

# Or even better, use a single command with pattern matching:
rm -f *.txt                 # Remove all .txt files
```

## Git Repository Management

The project is hosted on GitHub at `https://github.com/urbansheep/untitledsheep-astro.git`.

### Commit Guidelines:

1. Write descriptive commit messages that explain the purpose of the change
2. Use the imperative mood in commit messages (e.g., "Add feature" not "Added feature")
3. Reference issue numbers in commit messages when applicable
4. Keep commits focused on a single logical change
5. For AI-generated changes, prefix commit messages with "[AI]"
6. Use the provided `.gitmessage` template for consistent commit messages:
   ```bash
   # Set the template for this repository
   git config commit.template .gitmessage
   
   # For a global setting across all repositories
   git config --global commit.template .gitmessage
   ```

### Branching Strategy:

1. `main` branch should always be in a deployable state
2. Create feature branches for new features or significant changes
3. Use the format `feature/description` for feature branches
4. Use the format `fix/description` for bug fix branches

### Before Committing:

1. Run `npm run test` to ensure all linting and checks pass
2. Update the CHANGELOG.md with your changes
3. Review all changes to ensure they meet project standards
4. Ensure no sensitive information is included in the commit

## Quick Reference

- Project overview: [PROJECT-OVERVIEW.md](./PROJECT-OVERVIEW.md)
- Change log: [CHANGELOG.md](./CHANGELOG.md)
- Git commit template: [.gitmessage](./.gitmessage)
- Development commands: See "Build & Deployment" section in PROJECT-OVERVIEW.md
- Git repository: https://github.com/urbansheep/untitledsheep-astro.git
