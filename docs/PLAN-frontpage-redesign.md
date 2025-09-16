# Frontpage Redesign Plan

This document outlines the plan for redesigning the frontpage of the Untitled Sheep blog.

## 1. Project Goals

The goal is to create a new frontpage layout with the following components:

1.  An introductory text block.
2.  A curated list of "favorite" posts.
3.  A section that displays a random post, which is initially static but updates to a new random post on the client-side.

## 2. Plan of Action

### Step 1: Initial Setup & Planning
- [x] Create this planning document (`PLAN-frontpage-redesign.md`).

### Step 2: Modify the Frontpage (`src/pages/index.astro`)

- **Intro Text**: Add a static block for introductory text.
- **Favorite Posts**:
    - Identify a fixed list of posts to feature.
    - Fetch these posts by their ID or slug.
    - Display their titles and publication dates.
- **Random Post**:
    - Statically render one random post on the server (pre-build).
    - Add a client-side script to fetch all posts and display a new random post.

### Step 3: Create an API Endpoint for Posts

- Create a new API route (e.g., `/api/posts.json`) that returns a list of all published posts in JSON format. This will be used by the client-side script.

### Step 4: Implement the Client-Side Script

- Write a JavaScript snippet that:
    1.  Fetches the list of posts from the new API endpoint.
    2.  Selects a random post from the list.
    3.  Updates the DOM to replace the statically rendered random post with the new one.

### Step 5: Styling

- Apply basic styling to the new frontpage elements to ensure they fit with the existing design.

### Step 6: Final Review and Cleanup

- Review the implementation to ensure it meets all requirements.
- Remove any temporary or test files.
- Update the `CHANGELOG.md` with the changes made.

## 3. Assumptions & Hypotheses

- **Assumption**: There are enough published posts to select a few "favorites" and for the random post feature to be meaningful.
- **Assumption**: The existing `getPublishedPosts` utility can be reused for the API endpoint.
- **Hypothesis**: Creating a dedicated API endpoint for posts is the most efficient way to provide the necessary data to the client-side script without bloating the main page's initial payload.
- **Hypothesis**: The client-side script will provide a better user experience by showing a new random post on each visit without requiring a full page reload or a new build.

## 4. Traceability

This file will be kept as a trace of the work done.
