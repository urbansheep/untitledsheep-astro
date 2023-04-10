const header = document.querySelector("header");
const navLinks = header.querySelectorAll("[data-navLink]");

navLinks.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
        link.setAttribute("aria-current", "page");
    }
})
