import fs from "node:fs/promises";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const REPORT_PATH = path.join(
    process.cwd(),
    "docs",
    "REPORT-tweet-transformation.md"
);

const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_IDS = new Set(
    process.argv
        .filter((arg) => arg.startsWith("--id="))
        .flatMap((arg) => arg.replace("--id=", "").split(","))
        .filter(Boolean)
        .map((id) => id.trim())
);

const TWEET_LINK_REGEX = /<a\s+[^>]*href=["']([^"']*twitter\.com[^"']*)["'][^>]*>(.*?)<\/a>/gi;
const VIA_TWITTER_REGEX = /\(\s*via\s+<a[^>]*twitter[^>]*>[^<]*<\/a>\s*\)|\(\s*via\s+Twitter\s*\/[^\)]*\)|\(\s*via\s+twitter\/[^\)]*\)/gi;
const VIA_PARENS_REGEX = /\(\s*via[^\)]*\)/gi;
const VIA_PLAIN_REGEX = /\bvia\s+twitter\/[^\s]+/gi;

const isRetweetBlock = (text) => /<p>\s*[^<]+:\s*/i.test(text);
const isUrbansheepRetweet = (text) => /<p>\s*urbansheep:/i.test(text);

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

const cleanViaText = (body) =>
    body
        .replace(VIA_TWITTER_REGEX, "")
        .replace(VIA_PARENS_REGEX, "")
        .replace(VIA_PLAIN_REGEX, "")
        .replace(/\s{2,}/g, " ");

const convertRetweetParagraphs = (body) => {
    if (!isRetweetBlock(body) || isUrbansheepRetweet(body)) {
        return body;
    }

    return body.replace(/<p>([^<]+:\s*)([\s\S]*?)<\/p>/i, (_match, prefix, rest) => {
        const cleanedRest = rest.trim();
        return `<p>${prefix.trim()}</p>\n<blockquote><p>${cleanedRest}</p></blockquote>`;
    });
};

const normalizeBody = (body) => {
    let output = cleanViaText(body);
    output = convertRetweetParagraphs(output);
    output = output.replace(/\s+<\/p>/g, "</p>");
    output = output.replace(/<p>\s+<\/p>/g, "");
    output = output.replace(/\n{3,}/g, "\n\n");
    return output.trim() + "\n";
};

const shouldProcess = (raw) => /twitter\.com\//i.test(raw) || /statuses\//i.test(raw);

const run = async () => {
    const files = await fs.readdir(BLOG_DIR);
    const reportLines = [
        "# Tweet Transformation Report",
        "",
        `Generated: ${new Date().toISOString()}`,
        `Dry Run: ${DRY_RUN ? "yes" : "no"}`,
        ONLY_IDS.size ? `Only IDs: ${[...ONLY_IDS].join(", ")}` : "Only IDs: none",
        "",
    ];

    let changedCount = 0;

    for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const fullPath = path.join(BLOG_DIR, file);
        const raw = await fs.readFile(fullPath, "utf-8");

        if (!shouldProcess(raw)) continue;

        const { frontmatter, body } = extractFrontmatter(raw);
        const frontmatterData = parseFrontmatter(frontmatter);

        if (ONLY_IDS.size && !ONLY_IDS.has(String(frontmatterData.id))) {
            continue;
        }

        const normalizedBody = normalizeBody(body);
        if (normalizedBody === body.trim() + "\n") {
            continue;
        }

        changedCount += 1;
        reportLines.push(`- ${file} (id: ${frontmatterData.id || ""})`);

        if (!DRY_RUN) {
            const rebuilt = `---\n${frontmatter}\n---\n\n${normalizedBody}`;
            await fs.writeFile(fullPath, rebuilt);
        }
    }

    reportLines.push("");
    reportLines.push(`Total changed files: ${changedCount}`);

    await fs.writeFile(REPORT_PATH, reportLines.join("\n"));
    console.log(`Report written to ${REPORT_PATH}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
