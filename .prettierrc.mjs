/** @type {import("prettier").Config} */
export default {
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
        {
            files: ["*.md", "*.mdx", "*.mdoc"],
            options: {
                parser: "markdown",
                proseWrap: "preserve",
            },
        },
    ],
};
