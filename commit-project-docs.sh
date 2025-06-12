#!/bin/bash

# Script to commit the project documentation files with proper formatting

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed or not in PATH"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Add the files to staging
git add .clinerules/ CHANGELOG.md .gitmessage commit-project-docs.sh

# Commit with appropriate message
git commit -m "[AI] Add project documentation and change tracking

- Added .clinerules/PROJECT-OVERVIEW.md with comprehensive project documentation
- Added CHANGELOG.md to track project changes
- Updated .clinerules/CLINE-RULES.md with guidelines for documentation and git workflow
- Added .gitmessage template for standardized commit messages
- Added commit-project-docs.sh script for initial documentation commit

These files improve project observability and make it easier to return
to the project after periods of inactivity."

echo "Changes committed successfully!"
echo "To push these changes to the remote repository, run: git push"
