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
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click 

// Set sections as active

let list = document.getElementById("navbar__list");

let sections = document.querySelectorAll("section");

let docFragment = document.createDocumentFragment();

let options = {

    root: null,
    rootMargin: "0px",
    threshold: 0.5
}

let observer;

for (let i = 0; i < sections.length; i++) {

    const listItem = document.createElement("li");

    listItem.setAttribute("data-link", sections[i].attributes.getNamedItem("data-nav").value);

    const listItemLink = document.createElement("a");

    listItemLink.textContent = sections[i].attributes.getNamedItem("data-nav").value;

    listItemLink.href = `#${sections[i].id}`;

    listItemLink.classList.add("menu__link");

    listItem.appendChild(listItemLink);

    docFragment.appendChild(listItem)

}

list.appendChild(docFragment);

docFragment = document.getElementById("navbar__list").querySelectorAll("li");

window.addEventListener("scroll", toggleActiveState);

function handler(entries, observer) {

    for (entry of entries) {

        if (entry.isIntersecting) {

            sections.forEach(element => {
            
                element.classList.remove("your-active-class");
            
            });

            docFragment.forEach(element => {

                if (element.attributes.getNamedItem("data-link").value === entry.target.attributes.getNamedItem("data-nav").value) {
                   
                    element.classList.add("item-active-class");

                } else {

                    element.classList.remove("item-active-class");

                }

            });

            entry.target.classList.add("your-active-class");

        }

    }
}

function toggleActiveState() {

    observer = new IntersectionObserver(handler, options);

    let scrollPosition = document.documentElement.scrollTop;

    let currentId;

    sections.forEach((section) => {

        if (scrollPosition >= section.offsetTop - section.offsetHeight * 0.5 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.5 ) {

            currentId = section.attributes.id.value;
            
        }
    });

    if(currentId){

        observer.observe(document.getElementById(currentId));

    }
    else{
        
        sections.forEach(element => {

            element.classList.remove("your-active-class");

        });

        docFragment.forEach(element => {

            element.classList.remove("item-active-class");

        });
    }
    
}

function scrollToSection(event) {

    event.preventDefault();

    if (event.target.nodeName === "A") {

        let clickedLink = event.target.href;

        let sectionId = clickedLink.slice(clickedLink.lastIndexOf("#") + 1);

        let targetSection = document.getElementById(sectionId);

        targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
        
    }
    
}

list.addEventListener("click", scrollToSection);