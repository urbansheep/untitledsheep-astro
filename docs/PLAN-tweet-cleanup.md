# Plan: Tweet Cleanup & Normalization

## Goal
Create tooling to analyze tweet-like posts, surface format variants, preview layout options, and normalize older tweets into a consistent shape for cleanup.

## Context & Decisions
- Canonical tweet format: **regular posts** (not link-only) with tweet text + link anchor symbols (★, ¶, ∞, ☭, etc.).
- **No blockquote** for regular tweet posts; keep text + anchor.
- For **retweets of other users**, keep their **username** near the anchor and convert their tweet text to a **blockquote**.
- **No new metadata** is added (only reuse existing text/anchors/links).
- Analysis outputs should live in **/docs**.

### Section-by-Section Cleanup Rules (Phase 1)
1. **form:regular | no-title | no-linkurl | via | tw-link | no-anchor | no-blockquote | single-tweet**
   - Remove leading `urbansheep:` attribution.
   - Remove trailing `(via ...)` attribution and replace with ☭ anchor linking to the tweet.
2. **form:regular | no-title | no-linkurl | via | tw-link | anchor | no-blockquote | single-tweet**
   - Same as above (remove `urbansheep:` + replace `(via ...)` with ☭ anchor).
3. **form:link | title | linkurl | no-via | no-tw-link | no-anchor | no-blockquote | single-tweet**
   - Convert to `form: regular`.
   - Use 🐠 anchor linking to the tweet.
4. **form:link | title | linkurl | no-via | tw-link | anchor | no-blockquote | single-tweet**
   - Convert to `form: regular`.
   - Use 🐠 anchor linking to the tweet.
5. **form:regular | title | no-linkurl | via | tw-link | no-anchor | no-blockquote | single-tweet**
   - Remove `urbansheep:` attribution when present.
   - Move tweet link to end and append anchor ¶.
6. **Skip**
   - Leave all multi-tweet posts unchanged.
   - Leave `form:regular | no-title | no-linkurl | no-via | tw-link | anchor | no-blockquote | single-tweet` unchanged.

## Deliverables
1. **Analyzer Script**
   - Scan `src/content/blog/*.md` for tweet-like patterns.
   - Group by format signature and output a summary report with samples.
   - Outputs stored in `docs/`.

2. **Comparison Page**
   - Astro page to preview tweet layout options side-by-side.
   - Uses representative samples from the analyzer report.

3. **Transformation Script**
   - Normalize posts to canonical format.
   - Safe, idempotent, and supports dry-run and scoped execution.

4. **Changelog Entry**
   - Log all changes in `CHANGELOG.md` with `[AI]` tag.

## Success Criteria
- Analyzer reports format clusters with clear samples.
- Comparison page renders multiple layout options for feedback.
- Transformation script applies canonical formatting with minimal content change.
- No schema violations introduced.

## Notes
- Keep all modifications reversible (report + diff-friendly output).
- Follow existing project guidelines and keep tasks documented.
