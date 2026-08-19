/* =========================================================
   AKARI — PERSONAL ARCHIVE
   GAME ENGINE
   ========================================================= */


/* =========================================================
   BASIC STATE
   ========================================================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;

const totalPages = pages.length;


/* =========================================================
   ELEMENTS
   ========================================================= */

const progressNumber =
    document.getElementById("progressNumber");

const progressFill =
    document.getElementById("progressFill");

const startBtn =
    document.getElementById("startBtn");


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(index) {

    if (index < 0 || index >= totalPages) {
        return;
    }

    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === index
        );

    });

    currentPage = index;

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function updateProgress() {

    const number =
        String(currentPage).padStart(2, "0");

    if (progressNumber) {
        progressNumber.textContent = number;
    }

    if (progressFill) {

        const percentage =
            (currentPage / (totalPages - 1)) * 100;

        progressFill.style.width =
            `${percentage}%`;
    }
}


/* =========================================================
   START
   ========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            showPage(1);

        }
    );

}


/* =========================================================
   RESPONSE SYSTEM
   ========================================================= */

/*
    مهم:

    هیچ بازی مستقیماً صفحه بعد را باز نمی‌کند.

    ترتیب:

    بازی
      ↓
    completeGame()
      ↓
    پیام
      ↓
    مکث
      ↓
    دکمه ادامه
      ↓
    صفحه بعد
*/


function completeGame(
    responseElement,
    message,
    nextPage
) {

    if (!responseElement) {
        return;
    }


    responseElement.innerHTML = "";


    const text =
        document.createElement("div");

    text.className =
        "response-text";

    text.textContent =
        message;


    const continueButton =
        document.createElement("button");

    continueButton.type =
        "button";

    continueButton.className =
        "continue-button";

    continueButton.textContent =
        "ادامه‌ی آرشیو ↗";


    responseElement.appendChild(text);

    responseElement.appendChild(
        continueButton
    );


    requestAnimationFrame(() => {

        responseElement.classList.add(
            "visible"
        );

    });


    continueButton.addEventListener(
        "click",
        () => {

            responseElement.classList.remove(
                "visible"
            );

            setTimeout(() => {

                showPage(nextPage);

            }, 450);

        },
        {
            once: true
        }
    );

}


/* =========================================================
   PAGE 01
   NAME GAME
   ========================================================= */

const nameGame =
    document.getElementById("nameGame");

const nameResponse =
    document.getElementById("nameResponse");


if (nameGame) {

    const nameButtons =
        nameGame.querySelectorAll("button");

    let nameFinished = false;


    nameButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (nameFinished) {
                    return;
                }


                const value =
                    button.textContent.trim();


                if (value === "مهدیه") {

                    nameFinished = true;

                    button.classList.add(
                        "correct"
                    );


                    nameButtons.forEach(
                        other => {

                            if (
                                other !== button
                            ) {

                                other.style.opacity =
                                    ".22";
                            }

                        }
                    );


                    setTimeout(() => {

                        completeGame(
                            nameResponse,
                            "بعضی اسم‌ها فقط اسم نیستند.",
                            2
                        );

                    }, 650);

                } else {

                    button.animate(
                        [
                            {
                                transform:
                                    "translateX(0)"
                            },
                            {
                                transform:
                                    "translateX(-5px)"
                            },
                            {
                                transform:
                                    "translateX(5px)"
                            },
                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],
                        {
                            duration: 260
                        }
                    );

                }

            }
        );

    });

}


/* =========================================================
   PAGE 02
   NIGHT GAME
   ========================================================= */

const nightGame =
    document.getElementById("nightGame");

const nightClock =
    document.getElementById("nightClock");

const nightResponse =
    document.getElementById("nightResponse");


if (nightGame) {

    const lamp =
        nightGame.querySelector(".lamp");

    let hour = 2;

    let minute = 17;

    let taps = 0;

    let nightFinished = false;


    function updateClock() {

        const h =
            String(hour).padStart(2, "0");

        const m =
            String(minute).padStart(2, "0");


        if (nightClock) {

            nightClock.textContent =
                `${h}:${m}`;
        }

    }


    lamp.addEventListener(
        "click",
        () => {

            if (nightFinished) {
                return;
            }


            taps++;


            nightGame.classList.add(
                "lit"
            );


            minute += 13;


            if (minute >= 60) {

                hour +=
                    Math.floor(minute / 60);

                minute =
                    minute % 60;

            }


            if (hour >= 24) {
                hour = hour % 24;
            }


            updateClock();


            lamp.animate(
                [
                    {
                        transform:
                            "translateX(-50%) scale(1)"
                    },
                    {
                        transform:
                            "translateX(-50%) scale(.94)"
                    },
                    {
                        transform:
                            "translateX(-50%) scale(1)"
                    }
                ],
                {
                    duration: 300
                }
            );


            if (taps >= 5) {

                nightFinished = true;


                setTimeout(() => {

                    completeGame(
                        nightResponse,
                        "بعضی شب‌ها قرار نبود زود تمام شوند.",
                        3
                    );

                }, 800);

            }

        }
    );

}


/* =========================================================
   PAGE 03
   COCOA GAME
   ========================================================= */

const cocoaIngredients =
    document.getElementById(
        "cocoaIngredients"
    );

const cocoaLiquid =
    document.getElementById(
        "cocoaLiquid"
    );

const cocoaResponse =
    document.getElementById(
        "cocoaResponse"
    );


if (cocoaIngredients) {

    const buttons =
        cocoaIngredients.querySelectorAll(
            "button"
        );


    const required =
        new Set([
            "milk",
            "cocoa",
            "laugh"
        ]);


    const selected =
        new Set();


    let cocoaFinished = false;


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (cocoaFinished) {
                    return;
                }


                const ingredient =
                    button.dataset.ingredient;


                if (
                    selected.has(
                        ingredient
                    )
                ) {
                    return;
                }


                selected.add(
                    ingredient
                );


                button.classList.add(
                    "used"
                );


                const amount =
                    Math.min(
                        selected.size * 34,
                        100
                    );


                if (cocoaLiquid) {

                    cocoaLiquid.style.height =
                        `${amount}%`;

                }


                if (
                    [...required].every(
                        item =>
                            selected.has(item)
                    )
                ) {

                    cocoaFinished = true;


                    setTimeout(() => {

                        completeGame(
                            cocoaResponse,
                            "نسخه‌ی درستش همیشه کمی خنده هم لازم داشت.",
                            4
                        );

                    }, 900);

                }

            }
        );

    });

}


/* =========================================================
   PAGE 04
   FLOWER GAME
   ========================================================= */

const flowerGame =
    document.getElementById(
        "flowerGame"
    );

const flowerResponse =
    document.getElementById(
        "flowerResponse"
    );


if (flowerGame) {

    const weights =
        flowerGame.querySelectorAll(
            ".weight"
        );

    let removed =
        0;

    let flowerFinished =
        false;


    weights.forEach(weight => {

        weight.addEventListener(
            "click",
            () => {

                if (flowerFinished) {
                    return;
                }


                weight.classList.add(
                    "removed"
                );


                removed++;


                const stem =
                    flowerGame.querySelector(
                        ".flower-stem"
                    );

                const head =
                    flowerGame.querySelector(
                        ".flower-head"
                    );


                if (stem) {

                    const angle =
                        9 - removed * 2;

                    stem.style.transform =
                        `rotate(${angle}deg)`;
                }


                if (head) {

                    head.style.transform =
                        `translateY(${-removed * 4}px)`;
                }


                if (removed >= weights.length) {

                    flowerFinished = true;


                    setTimeout(() => {

                        completeGame(
                            flowerResponse,
                            "بعضی چیزها وقتی کنار می‌روند، تازه می‌شود نفس کشید.",
                            5
                        );

                    }, 850);

                }

            }
        );

    });

}


/* =========================================================
   PAGE 05
   DOG & CAT GAME
   ========================================================= */

const animalGame =
    document.getElementById(
        "animalGame"
    );

const dog =
    document.getElementById(
        "dog"
    );

const cat =
    document.getElementById(
        "cat"
    );

const animalResponse =
    document.getElementById(
        "animalResponse"
    );


if (
    animalGame &&
    dog &&
    cat
) {

    let touches =
        0;

    let animalFinished =
        false;


    function moveAnimals() {

        const width =
            animalGame.clientWidth;


        const distance =
            Math.max(
                30,
                Math.min(
                    width * .28,
                    100
                )
            );


        dog.style.left =
            `${distance}px`;

        cat.style.right =
            `${distance}px`;

    }


    animalGame.addEventListener(
        "click",
        () => {

            if (animalFinished) {
                return;
            }


            touches++;


            moveAnimals();


            animalGame.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },
                    {
                        transform:
                            "scale(1.015)"
                    },
                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 350
                }
            );


            if (touches >= 3) {

                animalFinished = true;


                dog.style.left =
                    "calc(50% - 80px)";

                cat.style.right =
                    "calc(50% - 80px)";


                setTimeout(() => {

                    completeGame(
                        animalResponse,
                        "شاید همیشه شبیه سگ و گربه بودیم. ولی بعضی شب‌ها واقعاً خوب بود.",
                        6
                    );

                }, 900);

            }

        }
    );

}


/* =========================================================
   PAGE 06
   WRITING GAME
   ========================================================= */

const wordGame =
    document.getElementById(
        "wordGame"
    );

const sentence =
    document.getElementById(
        "sentence"
    );

const lastDrawerBtn =
    document.getElementById(
        "lastDrawerBtn"
    );


if (
    wordGame &&
    sentence
) {

    const buttons =
        wordGame.querySelectorAll(
            "button"
        );


    const selectedWords =
        [];


    let writingFinished =
        false;


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (writingFinished) {
                    return;
                }


                if (
                    selectedWords.length >= 3
                ) {
                    return;
                }


                const word =
                    button.textContent.trim();


                if (
                    selectedWords.includes(
                        word
                    )
                ) {
                    return;
                }


                selectedWords.push(
                    word
                );


                button.classList.add(
                    "selected"
                );


                sentence.classList.add(
                    "has-words"
                );


                sentence.innerHTML =
                    selectedWords
                        .map(
                            item =>
                                `<span>${item}</span>`
                        )
                        .join(" · ");


                if (
                    selectedWords.length === 3
                ) {

                    writingFinished =
                        true;


                    setTimeout(() => {

                        sentence.innerHTML =
                            `
                            <span>
                                ${selectedWords.join("، ")}
                            </span>
                            `;


                        if (lastDrawerBtn) {

                            lastDrawerBtn.classList.remove(
                                "hidden"
                            );

                        }

                    }, 600);

                }

            }
        );

    });

}


/* =========================================================
   FINAL DRAWER
   ========================================================= */

const openDrawerBtn =
    document.getElementById(
        "openDrawerBtn"
    );

const drawer =
    document.getElementById(
        "drawer"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


if (
    openDrawerBtn &&
    drawer &&
    finalMessage
) {

    openDrawerBtn.addEventListener(
        "click",
        () => {

            drawer.style.opacity =
                "0";

            drawer.style.transform =
                "translateY(-20px) scale(.97)";


            setTimeout(() => {

                drawer.classList.add(
                    "hidden"
                );

                finalMessage.classList.remove(
                    "hidden"
                );


            }, 650);

        }
    );

}


/* =========================================================
   LAST DRAWER FROM WRITING PAGE
   ========================================================= */

if (lastDrawerBtn) {

    lastDrawerBtn.addEventListener(
        "click",
        () => {

            showPage(7);

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

showPage(0);


/* =========================================================
   PREVENT ACCIDENTAL FORM BEHAVIOR
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document.activeElement?.tagName === "BUTTON"
        ) {

            event.preventDefault();

        }

    }
);
