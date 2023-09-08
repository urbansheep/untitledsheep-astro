const nav = document.querySelector("[data-menu]");
const navLinks = nav.querySelectorAll("[data-navLink]");

const currentPath = window.location.pathname;
// if currentPath has a slash at the end, remove it
const currentPathWithoutSlash = currentPath.endsWith("/")
    ? currentPath.slice(0, -1)
    : currentPath;

navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // if linkHref has a slash at the end, remove it
    const linkHrefWithoutSlash = linkHref.endsWith("/")
        ? linkHref.slice(0, -1)
        : linkHref;

    if (linkHrefWithoutSlash === currentPathWithoutSlash) {
        link.setAttribute("aria-current", "page");
    }
});
