let currentScreen = 1;

const totalScreens = 6;

const screens = document.querySelectorAll(".screen");

const progressBar = document.getElementById("progress-bar");

const progressCurrent =
    document.querySelector(".progress-current");


function updateProgress() {

    const percentage =
        (currentScreen / totalScreens) * 100;

    progressBar.style.width =
        `${percentage}%`;

    progressCurrent.textContent =
        String(currentScreen).padStart(2, "0");
}


function showScreen(number) {

    if (number < 1 || number > totalScreens) {
        return;
    }

    screens.forEach((screen, index) => {

        screen.classList.toggle(
            "active",
            index === number - 1
        );

    });

    currentScreen = number;

    updateProgress();
}


function nextScreen() {

    if (currentScreen < totalScreens) {

        showScreen(currentScreen + 1);

    }

}


function previousScreen() {

    if (currentScreen > 1) {

        showScreen(currentScreen - 1);

    }

}


function restart() {

    showScreen(1);

}


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
    ) {

        nextScreen();

    }

    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
    ) {

        previousScreen();

    }

});


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {

        nextScreen();

    } else {

        previousScreen();

    }

}


/* =========================
   START
========================= */

updateProgress();
