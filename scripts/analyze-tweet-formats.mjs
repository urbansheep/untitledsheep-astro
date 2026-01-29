import fs from "node:fs/promises";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const OUTPUT_PATH = path.join(
    process.cwd(),
    "docs",
    "REPORT-tweet-format-analysis.md"
);

const TWEET_PATTERNS = [
    /twitter\.com\//i,
    /t\.co\//i,
    /statuses\//i,
    /\bvia\s+Twitter\b/i,
    /\bTweet\b/i,
    /\bтвиты\b/i,
];

const ANCHOR_SYMBOLS = "★¶∞☭#✶✷✸✹✺✽✿";

const MAX_SAMPLES = 8;

const normalizeWhitespace = (value) => value.replace(/\s+/g, " ").trim();

const extractFrontmatter = (raw) => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { frontmatter: "", body: raw };
    return { frontmatter: match[1], body: raw.slice(match[0].length) };
};

const parseFrontmatter = (frontmatter) => {
    const lines = frontmatter.split("\n");
    const data = {};
    for (const line of lines) {
        const match = line.match(/^(\w+):\s*(.*)$/);
        if (match) {
            data[match[1]] = match[2];
        }
    }
    return data;
};

const detectTweetLike = (raw) =>
    TWEET_PATTERNS.some((pattern) => pattern.test(raw));

const anchorRegex = new RegExp(`[${ANCHOR_SYMBOLS}]`);

const extractSignature = (frontmatterData, body) => {
    const form = frontmatterData.form || "unknown";
    const title = frontmatterData.title ? "title" : "no-title";
    const linkurl = frontmatterData.linkurl ? "linkurl" : "no-linkurl";
    const hasVia = /via\s+<a[^>]*twitter/i.test(body) || /via\s+Twitter/i.test(body);
    const hasTwitterLink = /twitter\.com\//i.test(body) || /t\.co\//i.test(body);
    const hasAnchorSymbol = anchorRegex.test(body);
    const hasBlockquote = /<blockquote>/i.test(body);
    const multiTweetLinks = (body.match(/twitter\.com\//gi) || []).length > 1;

    return normalizeWhitespace(
        [
            `form:${form}`,
            title,
            linkurl,
            hasVia ? "via" : "no-via",
            hasTwitterLink ? "tw-link" : "no-tw-link",
            hasAnchorSymbol ? "anchor" : "no-anchor",
            hasBlockquote ? "blockquote" : "no-blockquote",
            multiTweetLinks ? "multi-tweet" : "single-tweet",
        ].join(" | ")
    );
};

const summarizeBody = (body) => {
    const text = body
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-zA-Z0-9#]+;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return text.slice(0, 180);
};

const run = async () => {
    const files = await fs.readdir(BLOG_DIR);
    const tweetFiles = [];

    for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const fullPath = path.join(BLOG_DIR, file);
        const raw = await fs.readFile(fullPath, "utf-8");
        if (detectTweetLike(raw)) {
            tweetFiles.push({ file, raw });
        }
    }

    const groups = new Map();
    for (const { file, raw } of tweetFiles) {
        const { frontmatter, body } = extractFrontmatter(raw);
        const frontmatterData = parseFrontmatter(frontmatter);
        const signature = extractSignature(frontmatterData, body);

        if (!groups.has(signature)) {
            groups.set(signature, []);
        }
        groups.get(signature).push({
            file,
            id: frontmatterData.id || "",
            form: frontmatterData.form || "",
            title: frontmatterData.title || "",
            linkurl: frontmatterData.linkurl || "",
            bodySummary: summarizeBody(body),
        });
    }

    const sortedGroups = [...groups.entries()].sort(
        (a, b) => b[1].length - a[1].length
    );

    const lines = [];
    lines.push("# Tweet Format Analysis Report");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");
    lines.push(`Total tweet-like posts: ${tweetFiles.length}`);
    lines.push("");

    for (const [signature, items] of sortedGroups) {
        lines.push(`## ${signature}`);
        lines.push("");
        lines.push(`Count: ${items.length}`);
        lines.push("");
        const samples = items.slice(0, MAX_SAMPLES);
        for (const sample of samples) {
            const linkPart = sample.linkurl ? ` | linkurl: ${sample.linkurl}` : "";
            const titlePart = sample.title ? ` | title: ${sample.title}` : "";
            lines.push(
                `- ${sample.file} (id: ${sample.id}${linkPart}${titlePart})`
            );
            lines.push(`  - ${sample.bodySummary}`);
        }
        lines.push("");
    }

    await fs.writeFile(OUTPUT_PATH, lines.join("\n"));
    console.log(`Report written to ${OUTPUT_PATH}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
