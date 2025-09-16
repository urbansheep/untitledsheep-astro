# Development Task List: Hot-or-Not Tool

This document outlines the development steps for creating the "Hot-or-Not" post curation tool.

**Phase 1: Setup and Data Structure**
- [ ] 1. Create the data storage directory: `src/data`.
- [ ] 2. Create the `front-page-posts.json` file with an empty array `[]`.
- [ ] 3. Create the `processed-posts.json` file with an empty array `[]`.

**Phase 2: API Endpoints**
- [ ] 4. Create the API endpoint for fetching the next post: `src/pages/api/hot-or-not/next-post.json.ts`.
    - [ ] 4a. Implement logic to read all published posts.
    - [ ] 4b. Implement logic to read both `front-page-posts.json` and `processed-posts.json`.
    - [ ] 4c. Implement logic to filter out already classified posts.
    - [ ] 4d. Implement logic to select a random post from the remainder.
    - [ ] 4e. Handle the case where no posts are left and return an "empty" signal.
- [ ] 5. Create the API endpoint for classifying a post: `src/pages/api/hot-or-not/classify.ts`.
    - [ ] 5a. Implement logic to handle `POST` requests.
    - [ ] 5b. Implement logic to read the request body for `slug` and `classification`.
    - [ ] 5c. Implement logic to read, update, and write to the correct JSON file (`fs.readFile` and `fs.writeFile`).
    - [ ] 5d. Return a success response.

**Phase 3: Frontend**
- [ ] 6. Create the main page for the tool: `src/pages/hot-or-not.astro`.
    - [ ] 6a. Add the basic page layout, extending `LayoutBase.astro`.
    - [ ] 6b. Create the HTML structure for the post display area and the classification buttons.
    - [ ] 6c. Add a container for the "queue cleared" message.
- [ ] 7. Implement the client-side script within `hot-or-not.astro`.
    - [ ] 7a. Write a function to fetch the next post from the API.
    - [ ] 7b. Write a function to render the post data (or the "empty" message) into the page.
    - [ ] 7c. Add an event listener to call the initial fetch function on page load.
    - [ ] 7d. Write a function to handle button clicks, which calls the `classify` API.
    - [ ] 7e. Ensure the `next-post` fetch is called again after a successful classification.

**Phase 4: Finalization**
- [ ] 8. Add the new files to the `CHANGELOG.md`.
- [ ] 9. Test the complete workflow in the local development environment.
