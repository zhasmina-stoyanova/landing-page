/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */


/**
 * Defines Global Variables
 * navList: the ul in the menu 
 * numSections: number of sections on the website
 * navMenu: the nav menu containing the nav list items
 * sectionsList: the list of sections on the page
 * navMenuHeightOffset: the height of the nav menu that needs to be substracted 
 *   from the active section's y-coordinate
 * 
 */

let navList = document.getElementById("navbar__list");
let numSections = document.getElementsByTagName("section").length;
let navMenu = document.getElementById("navbar__list");
let sectionsList = document.querySelectorAll("section");
let navMenuHeightOffset = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

//creates the link for the i-th list item
function createLink(i) {
    let aHref = document.createElement("a");
    const hrefSection = "#section" + i;
    aHref.href = hrefSection;
    aHref.innerHTML = "Section " + i;
    return aHref;
}

//sets the height of the navigation menu
function setNavMenuHeight() {
    let navMenuRect = navMenu.getBoundingClientRect();
    navMenuHeightOffset = navMenuRect.height;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// create the nav dinamically depending on the number of sections
function createNavMenu() {
    for (let i = 1; i <= numSections; i++) {
        //create the link
        let aHref = createLink(i);

        //create the list item
        let listItem = document.createElement("li");

        //add link to the list item
        listItem.append(aHref);

        //add new item to the menu
        navList.appendChild(listItem);

        //sets the height of the navigation menu
        setNavMenuHeight();

        //for each click on a link add smooth scrolling to the anchor id 
        //and set the state of the element as 'active' on scrolling
        setEvents(aHref);
    }
}

/**
 * Add class 'active' to section when near top 
 * of viewport and remove the other classes.
 */
function setClassState() {
    for (let j = 0; j < sectionsList.length; j++) {
        let currSection = sectionsList[j];
        let rect = currSection.getBoundingClientRect();
        //if the srolled to element is in the viewport set the section as active
        //or remove the active state - otherwise
        if (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
            currSection.classList.add("active_section");
        } else {
            currSection.classList.remove("active_section");
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

//for each click on a link add smooth scrolling to the anchor id and set the state of the element as 'active' on scrolling
function setEvents(aHref) {
    //for each link add smooth scrolling
    aHref.addEventListener("click", function(event) {
        //remove the default anchor behavior
        event.preventDefault();

        //extract the id of the href target element
        let href = event.srcElement.href;
        let lastIndeOfSIdSymbol = href.lastIndexOf("#");
        let idHrefTarget = href.substring(lastIndeOfSIdSymbol + 1, href.length)

        for (let j = 0; j < sectionsList.length; j++) {
            let currSection = sectionsList[j];
            //if the current id equals the one of the target's href element 
            //set the section as active, or remove theactive state - otherwise
            if (currSection.id === idHrefTarget) {
                currSection.classList.add("active_section");
            } else {
                currSection.classList.remove("active_section");
            }
        }

        //get the active section
        let sectionToActivate = document.getElementById(idHrefTarget);

        //get the object providing information about the position relative to the viewport
        let sectionToActivateRect = sectionToActivate.getBoundingClientRect();

        //smooth scrolls to the element's y-axis's position relative to the whole document minus the height of the nav menu
        window.scrollTo({
            left: window.scrollX,
            top: sectionToActivateRect.top + window.scrollY - navMenuHeightOffset,
            behavior: 'smooth'
        });
    });

    //while scrolling through the sections, make the sections 'active'
    document.addEventListener("scroll", function() {
        setClassState();
    });
}

/**
 * Build menu with a functionality to scroll to section on link click
 * and to set the section's class to "active" when near top of viewport
 */
createNavMenu();