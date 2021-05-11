// stores HTMLElement top button reference
let topButton;
// stores current page sections with id's and HTMLElements references
let sections = {};

window.onload = () => {
    // builds the navbar
    createNav();

    // selects first section active by default
    const firstSection = Object.keys(sections)[0];
    firstSection && setActive(firstSection, false);

    window.onscroll = onScroll;
}

function onScroll() {
    // gets top button DOM element
    topButton = topButton ?? document.getElementById("to-top");

    // validates scroll position for top button
    if (window.scrollY === 0) {
        topButton.classList.add("hide");
        setActive(null);
    }
    else {
        topButton.classList.remove("hide");
    }

    // calculates active setion
    calculateSectionViewport();
};

// builds the nav
function createNav() {
    const navBarContainer = document.getElementById("navbar__list");
    const sectionsContainer = document.getElementsByTagName("section");
    const navItems = document.createDocumentFragment();

    // from HTML sections, builds navBar items
    for (let section of sectionsContainer) {
        const title = section.querySelector(".landing__container")?.querySelector("h2")?.textContent ?? "Unknown Section";
        const navItem = createNavItem(section.id, title, section);

        sections[section.id] = {
            title,
            navItem,
            section,
        }

        navItems.appendChild(navItem);
    }

    navBarContainer.appendChild(navItems);
}

// creates nav item
function createNavItem(id, title, section) {
    let item = document.createElement("li");

    item.className = "nav-item";
    item.id = `${id}-nav-item`;
    item.innerText = title;

    item.onclick = () => setActive(id);

    return item;
}

// enables section and navigates to
function setActive(activeId, triggerNavigation = true) {
    for (let id in sections) {
        const { navItem, section } = sections[id];

        if (id === activeId) {
            navItem.classList.add("active");
            section.classList.add("active");

            triggerNavigation && section.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } else {
            navItem.classList.remove("active");
            section.classList.remove("active");
        }
    }
}

// navigates to page top
function toTop() {
    window.scrollTo(0, 0);
}

// calculates if section is the active
function calculateSectionViewport() {
    for (let id in sections) {
        const { section } = sections[id];

        const { top } = section.getBoundingClientRect()

        if (top >= 0 && top <= (window.innerHeight / 2)) {
            setActive(id, false);
            break;
        }
    }
}
