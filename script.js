let currentPage = 1;

const totalPages = 6;

const pages = document.querySelectorAll(".page");

const currentPageText =
    document.getElementById("currentPage");

const navProgress =
    document.getElementById("navProgress");


/* =========================================
   PAGE ANIMATIONS
========================================= */

function animatePage(pageNumber) {

    const page = pages[pageNumber - 1];

    if (!page) return;

    /* reset */

    const animatedElements =
        page.querySelectorAll(
            ".page-copy, .cat-illustration, .bottle-scene, .flower-garden, .paper, .final-content"
        );

    animatedElements.forEach(element => {

        element.classList.remove("page-enter");

        void element.offsetWidth;

        element.classList.add("page-enter");

    });


    /* special elements */

    if (pageNumber === 2) {

        const cat =
            page.querySelector(".cat");

        if (cat) {

            cat.classList.remove("cat-enter");

            void cat.offsetWidth;

            cat.classList.add("cat-enter");

        }

    }


    if (pageNumber === 3) {

        const bottle =
            page.querySelector(".milk-bottle");

        if (bottle) {

            bottle.classList.remove("bottle-enter");

            void bottle.offsetWidth;

            bottle.classList.add("bottle-enter");

        }

    }


    if (pageNumber === 4) {

        const flowers =
            page.querySelectorAll(".flower");

        flowers.forEach((flower, index) => {

            flower.classList.remove("flower-enter");

            void flower.offsetWidth;

            flower.style.animationDelay =
                `${index * 180}ms`;

            flower.classList.add("flower-enter");

        });

    }


    if (pageNumber === 5) {

        const paper =
            page.querySelector(".paper");

        if (paper) {

            paper.classList.remove("paper-enter");

            void paper.offsetWidth;

            paper.classList.add("paper-enter");

        }

    }


    if (pageNumber === 6) {

        const finalContent =
            page.querySelector(".final-content");

        if (finalContent) {

            finalContent.classList.remove(
                "final-enter"
            );

            void finalContent.offsetWidth;

            finalContent.classList.add(
                "final-enter"
            );

        }

    }

}


/* =========================================
   SHOW PAGE
========================================= */

function showPage(pageNumber) {

    if (
        pageNumber < 1 ||
        pageNumber > totalPages
    ) {
        return;
    }


    pages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === pageNumber - 1
        );

    });


    currentPage = pageNumber;

    updateNavigation();

    animatePage(pageNumber);

}


/* =========================================
   NEXT
========================================= */

function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


/* =========================================
   PREVIOUS
========================================= */

function previousPage() {

    if (currentPage > 1) {

        showPage(currentPage - 1);

    }

}


/* =========================================
   NAVIGATION
========================================= */

function updateNavigation() {

    const percentage =
        (currentPage / totalPages) * 100;


    navProgress.style.width =
        `${percentage}%`;


    currentPageText.textContent =
        String(currentPage).padStart(2, "0");

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowDown"
        ) {

            nextPage();

        }


        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowUp"
        ) {

            previousPage();

        }

    }
);


/* =========================================
   MOBILE SWIPE
========================================= */

let touchStartX = 0;
let touchStartY = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function(event) {

        const touchEndX =
            event.changedTouches[0].screenX;

        const touchEndY =
            event.changedTouches[0].screenY;


        const deltaX =
            touchStartX - touchEndX;

        const deltaY =
            touchStartY - touchEndY;


        if (
            Math.abs(deltaY) >
            Math.abs(deltaX)
        ) {

            return;

        }


        if (
            Math.abs(deltaX) < 60
        ) {

            return;

        }


        if (deltaX > 0) {

            nextPage();

        } else {

            previousPage();

        }

    },
    { passive: true }
);


/* =========================================
   RESTART
========================================= */

function restart() {

    showPage(1);

}


/* =========================================
   INITIALIZE
========================================= */

showPage(1);
