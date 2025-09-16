# Product Requirements Document: Hot-or-Not Post Curation Tool

*   **Author**: Cline (AI Software Engineer)
*   **Date**: July 25, 2025
*   **Version**: 1.0

## 1. Introduction

The owner of the "Untitled Sheep" blog requires an internal tool to efficiently classify blog posts. The goal is to create a curated list of posts to be featured on the front page and to maintain a separate list of posts that have already been reviewed. This process, dubbed "hot-or-not," needs to be simple, fast, and operate within the existing project structure without adding external dependencies.

## 2. Goals and Objectives

*   **Primary Goal**: To build a simple, web-based interface for rapidly classifying blog posts into two categories: "Front page" or "Processed".
*   **Key Objectives**:
    *   Display one random, unclassified post at a time.
    *   Provide clear actions to classify the post.
    *   Persist the classification data locally within the project's file system.
    *   Ensure the tool works seamlessly in the local development environment.
    *   Provide clear feedback to the user when all posts have been classified.

## 3. User Stories

*   **As the blog owner, I want to** view a random post that I haven't classified yet, **so that I can** make a quick decision about its placement.
*   **As the blog owner, I want to** click a "Front page" button, **so that I can** add the currently displayed post to a special list of featured content.
*   **As the blog owner, I want to** click a "Processed" button, **so that I can** mark the post as reviewed and prevent it from appearing in the tool again.
*   **As the blog owner, I want to** automatically be shown the next post after classifying one, **so that I can** move through my backlog efficiently.
*   **As the blog owner, I want to** see a confirmation message when the queue is empty, **so that I can** know that my work is complete.

## 4. Functional Requirements

### 4.1. Data Storage

*   A new directory will be created at `src/data/`.
*   This directory will contain two JSON files to store the state:
    *   `front-page-posts.json`: An array of post slugs (e.g., `["my-first-post", "another-great-post"]`).
    *   `processed-posts.json`: An array of post slugs that have been reviewed.

### 4.2. API Endpoints

Two API endpoints will be created under `src/pages/api/hot-or-not/`.

*   **`GET /api/hot-or-not/next-post.json`**
    *   **Purpose**: Fetches the next unclassified post.
    *   **Logic**:
        1.  Reads all published posts from the Astro content collection.
        2.  Reads the slugs from both `front-page-posts.json` and `processed-posts.json`.
        3.  Filters out any posts whose slugs appear in either list.
        4.  Selects one post at random from the remaining (unclassified) posts.
        5.  Returns the full post object as JSON.
        6.  If no unclassified posts remain, it returns a response indicating the queue is empty.

*   **`POST /api/hot-or-not/classify.ts`**
    *   **Purpose**: Saves the classification of a post.
    *   **Request Body**: `{ "slug": string, "classification": "front-page" | "processed" }`
    *   **Logic**:
        1.  Receives the post slug and the chosen classification.
        2.  Reads the appropriate JSON file based on the classification.
        3.  Appends the new slug to the array.
        4.  Writes the updated array back to the file system.
        5.  Returns a success status code (e.g., `200 OK`).

### 4.3. Frontend Interface

*   A new page will be created at the `/hot-or-not` route (`src/pages/hot-or-not.astro`).
*   The page will feature:
    *   A display area for a single post, reusing the existing `PostCard.astro` component for visual consistency.
    *   Two buttons: "Front page" and "Processed".
    *   A message area that displays "Got queue cleared, yay!" when no posts are left.

### 4.4. Client-Side Functionality

*   A client-side script on the `/hot-or-not` page will manage the user interaction.
*   **On Page Load**: It will call the `next-post` API to fetch and render the first post.
*   **On Button Click**:
    1.  It will capture the slug of the current post and the classification from the clicked button.
    2.  It will send a `POST` request to the `classify` API.
    3.  Upon receiving a successful response, it will immediately call the `next-post` API again to fetch and render the next post, creating a seamless loop.

## 5. Non-Functional Requirements

*   **Technology**: The solution must be built using the existing tech stack: Astro, Node.js, and vanilla JavaScript. No new external libraries or dependencies are to be added.
*   **Environment**: The file-writing functionality (classification) is required to work only in the local development environment (`npm run dev`). On a static production site, the page may be visible, but the classification actions will be non-functional.
*   **Performance**: The tool must be fast and responsive, with minimal latency between actions.

## 6. Out of Scope

*   User authentication or access control.
*   A UI for viewing or manually editing the generated JSON lists.
*   The implementation of using `front-page-posts.json` on the actual blog index page. This PRD only covers the creation and population of the list.
*   An "undo" or "re-classify" feature.
