/* =========================================
   AKARI ARCHIVE
   GAME ENGINE
========================================= */


/* =========================================
   PAGE SYSTEM
========================================= */

let currentPage = 0;

const totalPages = 7;

const pages =
    document.querySelectorAll(".page");

const pageCounter =
    document.getElementById("pageCounter");

const progressBar =
    document.getElementById("progressBar");


function updateNavigation() {

    pageCounter.textContent =
        String(currentPage).padStart(2, "0");

    const progress =
        (currentPage / totalPages) * 100;

    progressBar.style.width =
        `${progress}%`;
}


function goToPage(pageNumber) {

    if (
        pageNumber < 0 ||
        pageNumber > totalPages
    ) {
        return;
    }


    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(
            `page${pageNumber}`
        );


    if (!target) return;


    target.classList.add("active");

    currentPage = pageNumber;

    updateNavigation();
}


/* =========================================
   INTRO
========================================= */

const startButton =
    document.getElementById(
        "startButton"
    );


startButton.addEventListener(
    "click",
    () => {

        goToPage(1);

    }
);


/* =========================================
   GAME 01
   FIND MAHDIEH
========================================= */

const nameButtons =
    document.querySelectorAll(
        "#nameGrid button"
    );

const nameMessage =
    document.getElementById(
        "nameMessage"
    );


let nameCompleted = false;


nameButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (nameCompleted) return;


            const value =
                button.textContent.trim();


            if (value === "مهدیه") {

                nameCompleted = true;

                button.classList.add(
                    "correct"
                );


                nameMessage.innerHTML = `
                    بعضی اسم‌ها برای صدا زدن نیستند.
                    <br><br>
                    «مهدیه» یکی از همان‌ها بود.
                `;

                nameMessage.classList.add(
                    "show"
                );


                setTimeout(
                    () => goToPage(2),
                    3200
                );

            } else {

                button.animate(
                    [
                        {
                            transform:
                                "translateX(0)"
                        },
                        {
                            transform:
                                "translateX(6px)"
                        },
                        {
                            transform:
                                "translateX(-6px)"
                        },
                        {
                            transform:
                                "translateX(0)"
                        }
                    ],
                    {
                        duration: 240
                    }
                );

            }

        }
    );

});


/* =========================================
   GAME 02
   NIGHT
========================================= */

const nightRoom =
    document.getElementById(
        "nightRoom"
    );

const nightMessage =
    document.getElementById(
        "nightMessage"
    );

const clock =
    document.getElementById(
        "clock"
    );

const lampGlow =
    document.querySelector(
        ".lamp-glow"
    );


let nightCount = 0;

const nightTimes = [
    "02:17",
    "03:04",
    "03:51",
    "04:38",
    "05:26"
];


nightRoom.addEventListener(
    "click",
    () => {

        if (nightCount >= 5) return;


        nightCount++;


        clock.textContent =
            nightTimes[
                nightCount - 1
            ];


        lampGlow.style.opacity =
            String(
                .28 +
                (nightCount * .14)
            );


        if (nightCount === 5) {

            nightMessage.innerHTML = `
                خیلی از شب‌ها قرار نبود
                تا صبح بیدار بمانیم.
                <br><br>
                ولی ماندیم.
            `;

            nightMessage.classList.add(
                "show"
            );


            setTimeout(
                () => goToPage(3),
                3300
            );

        }

    }
);


/* =========================================
   GAME 03
   CHOCOLATE MILK
========================================= */

const ingredientButtons =
    document.querySelectorAll(
        "#ingredients button"
    );

const liquid =
    document.getElementById(
        "liquid"
    );

const milkMessage =
    document.getElementById(
        "milkMessage"
    );


let ingredientsChosen = [];


ingredientButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const value =
                button.dataset.value;


            if (
                ingredientsChosen.includes(
                    value
                )
            ) {
                return;
            }


            if (
                ingredientsChosen.length >= 3
            ) {
                return;
            }


            ingredientsChosen.push(value);

            button.classList.add(
                "selected"
            );


            liquid.style.height =
                `${ingredientsChosen.length * 25}%`;


            if (
                ingredientsChosen.length === 3
            ) {

                const correct =
                    ingredientsChosen[0] === "milk" &&
                    ingredientsChosen[1] === "cocoa" &&
                    ingredientsChosen[2] === "laugh";


                if (correct) {

                    milkMessage.innerHTML = `
                        دستور درست شد.
                        <br><br>
                        شیر، کاکائو،
                        و چیزی که هیچ منویی
                        نمی‌تواند بفروشد.
                    `;

                    milkMessage.classList.add(
                        "show"
                    );


                    setTimeout(
                        () => goToPage(4),
                        3500
                    );

                } else {

                    milkMessage.innerHTML = `
                        نه.
                        <br>
                        این یکی خراب شد.
                    `;

                    milkMessage.classList.add(
                        "show"
                    );


                    setTimeout(
                        resetMilk,
                        1200
                    );

                }

            }

        }
    );

});


function resetMilk() {

    ingredientsChosen = [];

    ingredientButtons.forEach(
        button => {
            button.classList.remove(
                "selected"
            );
        }
    );


    liquid.style.height = "0%";


    milkMessage.classList.remove(
        "show"
    );

}


/* =========================================
   GAME 04
   FLOWER
========================================= */

const weights =
    document.querySelectorAll(
        ".weight"
    );

const flowerMessage =
    document.getElementById(
        "flowerMessage"
    );

const stem =
    document.querySelector(
        ".stem"
    );


let weightsRemoved = 0;


weights.forEach(weight => {

    weight.addEventListener(
        "click",
        () => {

            if (
                weight.classList.contains(
                    "removed"
                )
            ) {
                return;
            }


            weight.classList.add(
                "removed"
            );


            weightsRemoved++;


            if (weightsRemoved === 4) {

                stem.style.height =
                    "195px";


                flowerMessage.innerHTML = `
                    بعضی چیزها را نمی‌شود
                    تا آخر مسیر با خودت برد.
                    <br><br>
                    سبک‌تر شدن،
                    همیشه به معنی فراموش کردن نیست.
                `;

                flowerMessage.classList.add(
                    "show"
                );


                setTimeout(
                    () => goToPage(5),
                    3800
                );

            }

        }
    );

});


/* =========================================
   GAME 05
   DOG & CAT
========================================= */

const animalRoom =
    document.getElementById(
        "animalRoom"
    );

const dog =
    document.getElementById(
        "dog"
    );

const cat =
    document.getElementById(
        "cat"
    );

const animalMessage =
    document.getElementById(
        "animalMessage"
    );


let animalSteps = 0;


animalRoom.addEventListener(
    "click",
    () => {

        if (animalSteps >= 4) return;


        animalSteps++;


        const positions = [
            12,
            25,
            36,
            44
        ];


        dog.style.left =
            `${positions[animalSteps - 1]}%`;

        cat.style.right =
            `${positions[animalSteps - 1]}%`;


        if (animalSteps === 4) {

            animalMessage.innerHTML = `
                مثل همیشه،
                <br>
                مثل سگ و گربه به هم می‌پریدیم.
                <br><br>
                ولی خیلی از شب‌ها
                تا صبح می‌خندیدیم
                و برای هم از روزمان می‌گفتیم.
                <br><br>
                این بار هیچ‌کدام کوتاه نیامدیم.
            `;

            animalMessage.classList.add(
                "show"
            );


            setTimeout(
                () => goToPage(6),
                5200
            );

        }

    }
);


/* =========================================
   GAME 06
   WRITING
========================================= */

const wordButtons =
    document.querySelectorAll(
        "#wordGrid button"
    );

const sentenceBox =
    document.getElementById(
        "sentenceBox"
    );

const drawerButton =
    document.getElementById(
        "drawerButton"
    );


let selectedWords = [];


wordButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const word =
                button.textContent.trim();


            if (
                selectedWords.includes(word)
            ) {
                return;
            }


            if (
                selectedWords.length >= 3
            ) {
                return;
            }


            selectedWords.push(word);

            button.classList.add(
                "selected"
            );


            renderSentence();


            if (
                selectedWords.length === 3
            ) {

                drawerButton.classList.remove(
                    "hidden"
                );

            }

        }
    );

});


function renderSentence() {

    if (
        selectedWords.length === 0
    ) {

        sentenceBox.innerHTML = `
            <span>
                هنوز چیزی نوشته نشده.
            </span>
        `;

        return;
    }


    sentenceBox.innerHTML = `
        ${selectedWords.join("، ")}
        <br>
        <small>
            بعضی داستان‌ها
            لازم نیست دوباره نوشته شوند.
        </small>
    `;

}


drawerButton.addEventListener(
    "click",
    () => {

        goToPage(7);

    }
);


/* =========================================
   FINAL DRAWER
========================================= */

const birthdayButton =
    document.getElementById(
        "birthdayButton"
    );

const drawer =
    document.getElementById(
        "drawer"
    );

const birthday =
    document.getElementById(
        "birthday"
    );


birthdayButton.addEventListener(
    "click",
    () => {

        drawer.classList.add(
            "hidden"
        );

        birthday.classList.remove(
            "hidden"
        );


        pageCounter.textContent =
            "∞";

        progressBar.style.width =
            "100%";

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateNavigation();
