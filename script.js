/* =========================================
   AKARI ARCHIVE
   Interactive Engine
========================================= */


/* =========================================
   GLOBAL STATE
========================================= */

let currentPage = 0;

const totalPages = 7;

const completed = {
    name: false,
    night: false,
    milk: false,
    flower: false,
    animals: false,
    writing: false
};


/* =========================================
   PAGE SYSTEM
========================================= */

const pages = document.querySelectorAll(".page");

const currentPageText =
    document.getElementById("currentPage");

const navProgress =
    document.getElementById("navProgress");


function updateNavigation() {

    currentPageText.textContent =
        String(currentPage).padStart(2, "0");

    const progress =
        (currentPage / totalPages) * 100;

    navProgress.style.width =
        `${progress}%`;
}


function goToPage(number) {

    if (number < 0 || number > totalPages) {
        return;
    }

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target =
        document.getElementById(`page${number}`);

    if (!target) return;

    target.classList.add("active");

    currentPage = number;

    updateNavigation();
}


function nextPage() {
    goToPage(currentPage + 1);
}


/* =========================================
   INTRO
========================================= */

function startArchive() {
    goToPage(1);
}


/* =========================================
   01 — NAME GAME
========================================= */

const nameButtons =
    document.querySelectorAll(
        "#nameField button"
    );

const nameMessage =
    document.getElementById(
        "nameMessage"
    );


nameButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent.trim() === "مهدیه") {

            button.classList.add("correct");

            completed.name = true;

            nameMessage.innerHTML = `
                مهدیه صدات نمی‌کنم.
                <br>
                تقریباً هیچ‌وقت.
                <br><br>
                بعضی اسم‌ها برای صدا زدن نیستند؛
                برای وقت‌هایی‌اند که چیزی واقعاً مهم است.
            `;

            nameMessage.classList.add("show");

            setTimeout(() => {
                nextPage();
            }, 3200);

        } else {

            button.style.transform =
                "translateX(4px)";

            setTimeout(() => {
                button.style.transform =
                    "translateX(0)";
            }, 180);

        }

    });

});


/* =========================================
   02 — NIGHT GAME
========================================= */

const nightRoom =
    document.getElementById(
        "nightRoom"
    );

const nightMessage =
    document.getElementById(
        "nightMessage"
    );

const lampLight =
    document.querySelector(
        ".lamp-light"
    );

const clock =
    document.querySelector(
        ".clock"
    );


let nightTouches = 0;

const times = [
    "02:17",
    "03:41",
    "04:26",
    "05:12",
    "06:03"
];


nightRoom.addEventListener("click", () => {

    if (completed.night) return;

    nightTouches++;

    const index =
        Math.min(
            nightTouches,
            times.length - 1
        );

    clock.textContent =
        times[index];

    lampLight.style.opacity =
        0.35 + (nightTouches * 0.12);

    if (nightTouches >= 5) {

        completed.night = true;

        nightMessage.innerHTML = `
            خیلی از شب‌ها قرار نبود
            تا صبح بیدار بمونیم.
            <br><br>
            ولی موندیم.
        `;

        nightMessage.classList.add("show");

        setTimeout(() => {
            nextPage();
        }, 3000);
    }

});


/* =========================================
   03 — CHOCOLATE MILK
========================================= */

const ingredientButtons =
    document.querySelectorAll(
        "#ingredients button"
    );

const milkLiquid =
    document.querySelector(
        ".milk-liquid"
    );

const milkMessage =
    document.getElementById(
        "milkMessage"
    );


let selectedIngredients = [];


ingredientButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (completed.milk) return;

        const ingredient =
            button.dataset.ingredient;

        if (
            selectedIngredients.includes(
                ingredient
            )
        ) {
            return;
        }

        selectedIngredients.push(
            ingredient
        );

        button.classList.add(
            "selected"
        );


        const amount =
            selectedIngredients.length * 25;

        milkLiquid.style.height =
            `${amount}%`;


        /*
            ترتیب درست:

            شیر
            کاکائو
            خنده

            یخ عمداً دام است.
        */

        if (
            selectedIngredients.length === 3
        ) {

            const correct =
                selectedIngredients[0] === "milk" &&
                selectedIngredients[1] === "cocoa" &&
                selectedIngredients[2] === "laugh";

            if (correct) {

                completed.milk = true;

                milkMessage.innerHTML = `
                    این یکی رو نمی‌شه
                    از فروشگاه خرید.
                    <br><br>
                    بعضی شب‌ها فقط با خنده
                    خوب می‌شن.
                `;

                milkMessage.classList.add(
                    "show"
                );

                setTimeout(() => {
                    nextPage();
                }, 3200);

            } else {

                milkMessage.innerHTML = `
                    نه.
                    <br>
                    این دستور یه چیزی کم داشت.
                `;

                milkMessage.classList.add(
                    "show"
                );

                setTimeout(() => {

                    selectedIngredients = [];

                    ingredientButtons.forEach(
                        item =>
                            item.classList.remove(
                                "selected"
                            )
                    );

                    milkLiquid.style.height =
                        "0%";

                    milkMessage.classList.remove(
                        "show"
                    );

                }, 1300);

            }

        }

    });

});


/* =========================================
   04 — FLOWER GAME
========================================= */

const flowerWeights =
    document.querySelectorAll(
        ".flower-weight"
    );

const flowerMessage =
    document.getElementById(
        "flowerMessage"
    );

let removedWeights = 0;


flowerWeights.forEach(weight => {

    weight.addEventListener("click", () => {

        if (completed.flower) return;

        weight.classList.add(
            "removed"
        );

        removedWeights++;


        if (removedWeights >= 4) {

            completed.flower = true;

            const flower =
                document.querySelector(
                    ".flower-head"
                );

            const stem =
                document.querySelector(
                    ".flower-stem"
                );

            flower.style.transform =
                "translateX(-50%) translateY(-8px)";

            stem.style.height =
                "195px";


            flowerMessage.innerHTML = `
                بعضی چیزها رو نمی‌شه
                با خودت تا آخر مسیر ببری.
                <br><br>
                اما این به معنی
                بی‌ارزش بودنشون نیست.
            `;

            flowerMessage.classList.add(
                "show"
            );


            setTimeout(() => {
                nextPage();
            }, 3500);

        }

    });

});


/* =========================================
   05 — DOG & CAT
========================================= */

const dog =
    document.getElementById("dog");

const cat =
    document.getElementById("cat");

const animalStage =
    document.getElementById(
        "animalStage"
    );

const usMessage =
    document.getElementById(
        "usMessage"
    );


let animalTouches = 0;


animalStage.addEventListener(
    "click",
    event => {

        if (completed.animals) return;

        animalTouches++;

        const stageWidth =
            animalStage.offsetWidth;

        const target =
            stageWidth * 0.50;


        if (animalTouches === 1) {

            dog.style.left =
                "28%";

            cat.style.right =
                "28%";

        }


        if (animalTouches === 2) {

            dog.style.left =
                "38%";

            cat.style.right =
                "38%";

        }


        if (animalTouches === 3) {

            dog.style.left =
                "44%";

            cat.style.right =
                "44%";

        }


        if (animalTouches >= 4) {

            completed.animals = true;

            dog.style.left =
                "46%";

            cat.style.right =
                "46%";


            usMessage.innerHTML = `
                ما همیشه یه جور عجیبی
                <br>
                مثل سگ و گربه بودیم.
                <br><br>
                می‌پریدیم به هم،
                قهر می‌کردیم،
                آشتی می‌کردیم،
                و بعضی شب‌ها تا صبح می‌خندیدیم.
                <br><br>
                این بار اما...
                <br>
                هیچ‌کدوم کوتاه نیومدیم.
            `;

            usMessage.classList.add(
                "show"
            );


            setTimeout(() => {
                nextPage();
            }, 5200);

        }

    }
);


/* =========================================
   06 — WRITING GAME
========================================= */

const wordButtons =
    document.querySelectorAll(
        "#wordPool button"
    );

const sentence =
    document.getElementById(
        "sentence"
    );

const openDrawer =
    document.getElementById(
        "openDrawer"
    );


let selectedWords = [];


wordButtons.forEach(button => {

    button.addEventListener("click", () => {

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

            setTimeout(() => {

                openDrawer.classList.remove(
                    "hidden"
                );

            }, 700);

        }

    });

});


function renderSentence() {

    if (selectedWords.length === 0) {

        sentence.innerHTML = `
            <span>
                هنوز چیزی نوشته نشده.
            </span>
        `;

        return;
    }


    const words =
        selectedWords.join("، ");


    sentence.innerHTML = `
        ${words}
        <br>
        <small>
            بعضی داستان‌ها
            لازم نیست دوباره نوشته شوند.
        </small>
    `;

}


openDrawer.addEventListener(
    "click",
    () => {

        completed.writing = true;

        nextPage();

    }
);


/* =========================================
   FINAL
========================================= */

function openBirthday() {

    const calendar =
        document.getElementById(
            "calendar"
        );

    const birthday =
        document.getElementById(
            "birthday"
        );


    calendar.classList.add(
        "hidden"
    );

    birthday.classList.remove(
        "hidden"
    );


    currentPageText.textContent =
        "∞";

    navProgress.style.width =
        "100%";

}


/* =========================================
   INITIALIZE
========================================= */

updateNavigation();
