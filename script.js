let currentPage = 1;

const totalPages = 6;

const pages = document.querySelectorAll(".page");

const currentPageText =
    document.getElementById("currentPage");

const navProgress =
    document.getElementById("navProgress");


/* =========================================
   PAGE TRANSITION
========================================= */

function showPage(pageNumber) {

    if (pageNumber < 1 || pageNumber > totalPages) {
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

}


/* =========================================
   NEXT / PREVIOUS
========================================= */

function nextPage() {

    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }

}


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


        /* اگر حرکت بیشتر عمودی بود،
           آن را نادیده می‌گیریم */

        if (
            Math.abs(deltaY) >
            Math.abs(deltaX)
        ) {

            return;

        }


        /* حداقل فاصله برای Swipe */

        if (Math.abs(deltaX) < 60) {
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
